import { Injectable, signal, computed, effect } from '@angular/core';

export interface SelectState {
  isOpen: boolean;
  selectedValue: string | null;
  selectedLabel: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  // React ke useState jaisa signals
  private _state = signal<SelectState>({
    isOpen: false,
    selectedValue: null,
    selectedLabel: null
  });

  // React ke jaisa computed values
  state = this._state.asReadonly();
  isOpen = computed(() => this._state().isOpen);
  selectedValue = computed(() => this._state().selectedValue);
  selectedLabel = computed(() => this._state().selectedLabel);

  // React ke functions jaisa
  open = () => this._state.update(state => ({ ...state, isOpen: true }));
  close = () => this._state.update(state => ({ ...state, isOpen: false }));
  toggle = () => this._state.update(state => ({ ...state, isOpen: !state.isOpen }));

  selectValue = (value: string, label: string) => {
    this._state.update(state => ({
      ...state,
      selectedValue: value,
      selectedLabel: label,
      isOpen: false
    }));
  }

  clearSelection = () => {
    this._state.update(state => ({
      ...state,
      selectedValue: null,
      selectedLabel: null
    }));
  }
}