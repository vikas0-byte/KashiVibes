export const APP_CONSTANTS = {
  APP_NAME: 'KashiVibes',
  SUPPORT_EMAIL: 'support@kashivibes.com',
  SUPPORT_PHONE: '+91 98765 43210',
  ADDRESS: 'Varanasi, Uttar Pradesh, India',
  
  // API Endpoints
  API_ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      PROFILE: '/auth/profile',
      LOGOUT: '/auth/logout'
    },
    USER: {
      PROFILE: '/users/profile',
      BOOKINGS: '/users/bookings',
      WISHLIST: '/users/wishlist'
    }
  },
  
  // Validation Messages
  VALIDATION_MESSAGES: {
    REQUIRED: 'This field is required',
    EMAIL: 'Please enter a valid email address',
    MOBILE: 'Please enter a valid 10-digit mobile number',
    PASSWORD_STRENGTH: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
    PASSWORD_MISMATCH: 'Passwords do not match'
  },
  
  // Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'auth_token',
    USER_DATA: 'user_data',
    LANGUAGE: 'language',
    THEME: 'theme'
  }
};