import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectManagerService {
  private openSelectId = signal<string | null>(null);

  openSelect(selectId: string) {
    this.openSelectId.set(selectId);
  }

  closeSelect() {
    this.openSelectId.set(null);
  }

  isSelectOpen(selectId: string): boolean {
    return this.openSelectId() === selectId;
  }

  getOpenSelectId(): string | null {
    return this.openSelectId();
  }
}