export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  avatar?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  notifications: boolean;
  newsletter: boolean;
  language: string;
  currency: string;
}