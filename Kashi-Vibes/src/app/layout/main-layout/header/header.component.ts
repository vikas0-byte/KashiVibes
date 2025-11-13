import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { 
  BookOpen, 
  ChevronDownIcon, 
  Gift, 
  Heart, 
  LogOut, 
  LucideAngularModule, 
  MailIcon, 
  MapPinIcon, 
  MenuIcon, 
  PhoneIcon, 
  User, 
  X 
} from 'lucide-angular';
import { LoginDialogComponent } from '../../../features/auth/components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../../../features/auth/components/register-dialog/register-dialog.component';
import { AuthService } from '../../../Core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    LoginDialogComponent,
    RegisterDialogComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Injections
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  public authService = inject(AuthService);

  // Icons
  readonly phoneIcon = PhoneIcon;
  readonly mailIcon = MailIcon;
  readonly mapPinIcon = MapPinIcon; 
  readonly menuIcon = MenuIcon;
  readonly xIcon = X;
  readonly chevronDownIcon = ChevronDownIcon;
  readonly userIcon = User;
  readonly bookOpenIcon = BookOpen;
  readonly heartIcon = Heart;
  readonly giftIcon = Gift;
  readonly logOutIcon = LogOut;

  // Signals
  logoImage = 'assets/icons/logo.png';
  isMobileMenuOpen = signal(false);
  isPackagesOpen = signal(false);
  userDropdownOpen = signal(false);
  currentRoute = signal('');
  showLoginDialog = signal(false);
  showRegisterDialog = signal(false);
  isLoggedIn = signal(false);
  userName = signal('');

  // Subscriptions
  private routerSubscription!: Subscription;
  private authSubscription!: Subscription;

  // Data
  packageItems = [
    { label: 'Street Food & Hidden Gems', href: '/package/street-food-hidden-gems' },
    { label: 'Varanasi 5N/6D', href: '/packages/varanasi-5n6d' },
    { label: 'Varanasi to Bodhgaya', href: '/packages/varanasi-bodhgaya' },
    { label: 'Varanasi to Ayodhya', href: '/packages/varanasi-ayodhya' },
    { label: 'Prayagraj Vindhyachal', href: '/packages/prayagraj-vindhyachal' }
  ];

  navItems = [
    { label: 'Boats', href: '/boats' },
    { label: 'Cabs', href: '/cabs' },
    { label: 'Puja Services', href: '/puja' },
    { label: 'Festivals', href: '/festivals' },
    { label: 'Stays', href: '/stays' },
    { label: 'Things to Do', href: '/things-to-do' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  userMenuItems = [
    { label: 'My Profile', href: '/profile', icon: this.userIcon },
    { label: 'My Bookings', href: '/bookings', icon: this.bookOpenIcon },
    { label: 'Wishlist', href: '/wishlist', icon: this.heartIcon },
    { label: 'Rewards', href: '/rewards', icon: this.giftIcon }
  ];

  ngOnInit() {
    this.setupRouterSubscription();
    this.checkAuthStatus();
    this.setupQueryParamsListener();
  }

ngOnDestroy() {
  this.routerSubscription?.unsubscribe();
  this.authSubscription?.unsubscribe();
}

  private setupRouterSubscription(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute.set(event.url);
        this.closeAllDropdowns();
      });
  }

  

  private setupQueryParamsListener(): void {
  this.route.queryParams.subscribe((params: Params) => {
    if (params['showLogin'] === 'true') {
      this.showLoginDialog.set(true);
      
      this.router.navigate([], {
        queryParams: { showLogin: null },
        queryParamsHandling: 'merge'
      });
    }
  });
}

private checkAuthStatus(): void {
    this.isLoggedIn.set(this.authService.isAuthenticated());
    const user = this.authService.currentUser();
    this.userName.set(user?.name || '');
  }

  // Route helpers
  isActiveRoute(route: string): boolean {
    return this.currentRoute() === route || this.currentRoute().startsWith(route + '/');
  }

  isPackageActive(): boolean {
    return this.currentRoute().startsWith('/package') || this.currentRoute().startsWith('/packages');
  }

  // Dropdown handlers
  onDropdownItemHover(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    target.style.backgroundColor = 'rgba(230, 126, 34, 0.1)';
    target.style.paddingLeft = '1.5rem';
  }

  onDropdownItemLeave(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    target.style.backgroundColor = 'transparent';
    target.style.paddingLeft = '1rem';
  }

  closeAllDropdowns(): void {
    this.isMobileMenuOpen.set(false);
    this.isPackagesOpen.set(false);
    this.userDropdownOpen.set(false);
  }

  // Navigation handler
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeAllDropdowns();
  }

  // Auth handlers
  onLoginClick(): void {
    this.showLoginDialog.set(true);
    this.closeAllDropdowns();
  }

  onLogoutClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('🔄 Logout process started...');
    
    // Auth service call
    this.authService.logout();
    
    // UI state reset
    this.userDropdownOpen.set(false);
    
    // ✅ Force change detection
    this.cdr.detectChanges();
    
    // Navigation
    this.router.navigate(['/']).then(() => {
      console.log('✅ Navigation completed after logout');
      
      // ✅ Force change detection again after navigation
      this.cdr.detectChanges();
      
      // Debug
      setTimeout(() => {
        console.log('🔍 Final check - Authenticated:', this.authService.isAuthenticated());
        console.log('🔍 Final check - Token exists:', !!this.authService.getToken());
      }, 100);
    });
  }

  // Dialog handlers
  onLoginDialogChange(open: boolean): void {
    this.showLoginDialog.set(open);
  }

  onRegisterDialogChange(open: boolean): void {
    this.showRegisterDialog.set(open);
  }

  onSwitchToRegister(): void {
    this.showLoginDialog.set(false);
    this.showRegisterDialog.set(true);
  }

  onSwitchToLogin(): void {
    this.showRegisterDialog.set(false);
    this.showLoginDialog.set(true);
  }

  // Handle successful auth
  onAuthSuccess(): void {
    this.checkAuthStatus();
  }
}