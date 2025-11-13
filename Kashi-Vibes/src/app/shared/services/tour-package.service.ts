import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, timestamp } from 'rxjs';
import { TourPackage } from '../models/interface/tour-package.model';

@Injectable({
  providedIn: 'root'
})
export class TourPackageService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/tourpackages`;

  getTourPackageById(id: string): Observable<TourPackage> {
    return this.http.get<TourPackage>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => this.decryptResponse(response))
    );
  }

  getAllTourPackages(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => this.decryptResponse(response))
    );
  }


  createTourPackage(packageData: TourPackage): Observable<string> {
    const encryptData = this.encryptRequest(packageData);
    return this.http.post<string>(this.apiUrl, encryptData, {
      headers: this.getAuthHeaders()
    });
  }

  private getAuthHeaders(): { [key: string]: string } {
    const token = localStorage.getItem('auth_token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-API-Key': environment.apiKey
    };
  }

  private encryptRequest(data: any): any {
    return {
      encryptedData: btoa(JSON.stringify(data)),
      timestamp: new Date().toISOString()
    };
  }

  private decryptResponse(response: any): any {
    if(response.encryptedData) {
      return JSON.parse(atob(response.encryptedData));
    }

    return response;
  }

  constructor() { }
}
