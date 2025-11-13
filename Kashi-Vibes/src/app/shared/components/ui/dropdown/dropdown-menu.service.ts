import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownMenuService {
  // State signals
  private _isOpen = signal<boolean>(false);
  private _activeSubMenu = signal<string | null>(null);

  // Computed states
  isOpen = computed(() => this._isOpen());
  activeSubMenu = computed(() => this._activeSubMenu());

  open() {
    this._isOpen.set(true);
  }

  close() {
    this._isOpen.set(false);
    this._activeSubMenu.set(null);
  }

  toggle() {
    this._isOpen.update(state => !state);
  }

  setActiveSubMenu(menuId: string | null) {
    this._activeSubMenu.set(menuId);
  }

  // Keyboard navigation
  handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        // Handle keyboard navigation
        event.preventDefault();
        break;
    }
  }
}