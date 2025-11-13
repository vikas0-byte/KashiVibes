import { computed, Injectable, signal } from '@angular/core';

export interface AccordionState {
  openItems: Set<string>;
  type: 'single' | 'multiple';
  animated: boolean;
  animationDuration: number;
}

@Injectable({
  providedIn: 'root'
})
export class AccordionService {

  private state =signal<AccordionState>({
    openItems: new Set(),
    type: 'single',
    animated: true,
    animationDuration: 200
  });

  // Computed signals
  readonly openItems = computed(() => this.state().openItems);
  readonly accordiontype = computed(() => this.state().type)
  readonly isAnimated = computed(() => this.state().animated);
  readonly animationDuration = computed(() => this.state().animationDuration);

  //Public Api

  setType(type: 'single' | 'multiple'): void {
    this.state.update(current => {
      if (type === 'single' && current.openItems.size > 1) {
        const first = Array.from(current.openItems)[0];
        return { ...current, type, openItems: new Set([first]) };
      }
      return { ...current, type };
    });
  }

  toggleItem(itemId: string): void {
    this.state.update(current => {
      const newOpenItems = new Set(current.openItems);

      if (current.type === 'single') {
        newOpenItems.clear();
        if(!current.openItems.has(itemId)) {
          newOpenItems.add(itemId);
        }
      } else {
        if (newOpenItems.has(itemId)) {
          newOpenItems.delete(itemId);
        } else {
          newOpenItems.add(itemId);
        }
      }

      return { ...current, openItems: newOpenItems };
    });
  }

  openItem(itemId: string): void {
    this.state.update(current => {
      const newOpenItems = new Set(current.openItems);

      if (current.type === 'single') {
        newOpenItems.clear();
      }
      newOpenItems.add(itemId);

      return { ...current, openItems: newOpenItems };
    })
  }

  closeItem(itemId: string): void {
    this.state.update(current => {
      const newOpenItems = new Set(current.openItems);
      newOpenItems.delete(itemId);
      return { ...current, openItems: newOpenItems };
    })
  }

  closeAll(): void {
    this.state.update(current => ({ ...current, openItems: new Set() }));
  }

  openAll(): void {
    this.state.update(current => {
      if (current.type === 'single') {
        console.warn('Cannot open all items in single mode.');
        return current;
      }
      return current;
    })
  }

  setAnimationConfig(animated: boolean, duration: number = 200): void {
    this.state.update(current => ({ ...current, animated, animationDuration: duration }));
  }

  isItemOpen(itemId: string): boolean {
    return this.openItems().has(itemId);
  }

  getOpenItems(): string[] {
    return Array.from(this.openItems());
  }
}
