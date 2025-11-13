import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogs: Map<string, any> = new Map();

  register(id: string, dialog: any) {
    this.dialogs.set(id, dialog);
  }

  open(id: string) {
    this.dialogs.get(id)?.open();
  }

  close(id: string) {
    this.dialogs.get(id)?.close();
  }

  unregister(id: string) {
    this.dialogs.delete(id);
  }
}