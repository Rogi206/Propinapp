
export type UserRole = 'individual' | 'company';

export interface UserLocation {
  lat: number;
  lng: number;
  addressName?: string;
}

export interface TipHistory {
  id: string;
  amount: number;
  timestamp: string;
  workerId?: string;
  workerName?: string;
}

export interface LandingPageConfig {
  displayName: string;
  bio: string;
  themeColor: string;
  welcomeMessage: string;
  avatarUrl?: string;
  coverUrl?: string;
  category?: string;
  phone?: string;
  address?: string;
  location?: UserLocation;
  tipPresets?: number[];
  currencySymbol?: string;
  showCustomAmount?: boolean;
}

export interface Worker {
  id: string;
  name: string;
  position: string;
  totalTips: number;
  avatarUrl?: string;
}

export interface User {
  id: string;
  username: string;
  password?: string;
  email: string;
  role: UserRole;
  config: LandingPageConfig;
  workers?: Worker[];
  tipHistory: TipHistory[];
}

export interface TippingEtiquette {
  country: string;
  recommendedTip: string;
  customs: string;
}

export enum AppView {
  AUTH = 'auth',
  DASHBOARD = 'dashboard',
  PROFILE_EDITOR = 'profile_editor',
  TEAM = 'team',
  CARDS = 'cards',
  PUBLIC_VIEW = 'public_view'
}
