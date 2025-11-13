import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, SearchIcon } from 'lucide-angular';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <form 
      (ngSubmit)="handleSubmit()"
      class="flex w-full max-w-2xl mx-auto gap-2 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20"
    >
      <div class="relative flex-1">
        <lucide-icon 
          [name]="SearchIcon"
          class="absolute left-3 pr-1 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70"
        ></lucide-icon>
        <input
          name="search"
          type="text"
          [(ngModel)]="searchQuery"
          [placeholder]="placeholder"
          class="pl-12 bg-transparent border-none text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 h-12 w-full"/>
      </div>
      <button 
        type="submit" 
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-gradient-primary text-white hover:bg-gradient-secondary shadow-glow transition-all duration-normal hover:scale-105 h-11 rounded-full px-8"
      >
        Search
      </button>
    </form>
  `
})
export class SearchBarComponent {

  readonly SearchIcon = SearchIcon;
  @Input() placeholder: string = "Search destination, temple, or ride...";
  @Output() onSearch = new EventEmitter<string>();

  searchQuery: string = '';

  handleSubmit() {
    if (this.searchQuery.trim()) {
      this.onSearch.emit(this.searchQuery.trim());
    }
  }
}