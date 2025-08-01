import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Locale = 'en' | 'de';

interface LocalizationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

// Translation dictionaries
const translations = {
  en: {
    // Common
    'common.points': 'Points',
    'common.claim': 'Claim',
    'common.claimed': 'CLAIMED',
    'common.close': 'Close',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.tryAgain': 'Try Again',
    'common.viewDetails': 'View Details',
    'common.loading': 'Loading...',
    
    // Home Screen
    'home.availableRewards': 'Available Rewards',
    'home.rewardsHistory': 'Rewards History',
    'home.welcome': 'Welcome back',
    'home.totalPoints': 'Total Points',
    'home.availableRewardsCount': 'Available Rewards',
    
    // Points Card
    'points.yourBalance': 'Your Balance',
    'points.earnMore': 'Earn more points by visiting our partner stores',
    
    // Rewards
    'rewards.pointsEarned': 'Points Earned!',
    'rewards.claimFailed': 'Failed',
    'rewards.claimSuccessful': 'Claim Successful!',
    'rewards.rewardClaimed': 'Reward Claimed',
    'rewards.availableRewards': 'Available Rewards',
    'rewards.rewardDetails': 'Reward Details',
    'rewards.currentBalance': 'Current Balance',
    'rewards.summary': 'Summary',
    'rewards.totalRewards': 'Total Rewards',
    'rewards.claimed': 'Claimed',
    'rewards.available': 'Available',
    'rewards.affordableNow': 'Affordable Now',
    'rewards.needMore': 'Need {{count}} more',
    
    // History
    'history.pointsEarned': 'Points Earned',
    'history.pointsClaimed': 'Points Claimed',
    'history.receivedBonus': 'Received bonus points at {{place}}',
    'history.spentPoints': 'Spent points at {{place}}',
    
    // Errors
    'error.notEnoughPoints': 'You do not have enough points to claim this reward.',
    'error.somethingWrong': 'Something went wrong',
    
    // Ordering
    'order.sortBy': 'Sort by',
    'order.location': 'Location',
    'order.pointsAsc': 'Points (Low to High)',
    'order.pointsDesc': 'Points (High to Low)',
    'order.nearby': 'Nearby',
    'order.filterSort': 'Filter & Sort',
    'order.apply': 'Apply',
    'order.reset': 'Reset',
    
    // Settings
    'settings.language': 'Language',
    'settings.english': 'English',
    'settings.german': 'German',
  },
  de: {
    // Common
    'common.points': 'Punkte',
    'common.claim': 'Einlösen',
    'common.claimed': 'EINGELÖST',
    'common.close': 'Schließen',
    'common.cancel': 'Abbrechen',
    'common.continue': 'Weiter',
    'common.tryAgain': 'Erneut versuchen',
    'common.viewDetails': 'Details anzeigen',
    'common.loading': 'Wird geladen...',
    
    // Home Screen
    'home.availableRewards': 'Verfügbare Belohnungen',
    'home.rewardsHistory': 'Belohnungshistorie',
    'home.welcome': 'Willkommen zurück',
    'home.totalPoints': 'Gesamtpunkte',
    'home.availableRewardsCount': 'Verfügbare Belohnungen',
    
    // Points Card
    'points.yourBalance': 'Ihr Guthaben',
    'points.earnMore': 'Sammeln Sie mehr Punkte in unseren Partnershops',
    
    // Rewards
    'rewards.pointsEarned': 'Punkte erhalten!',
    'rewards.claimFailed': 'Fehlgeschlagen',
    'rewards.claimSuccessful': 'Erfolgreich eingelöst!',
    'rewards.rewardClaimed': 'Belohnung eingelöst',
    'rewards.availableRewards': 'Verfügbare Belohnungen',
    'rewards.rewardDetails': 'Belohnungsdetails',
    'rewards.currentBalance': 'Aktuelles Guthaben',
    'rewards.summary': 'Zusammenfassung',
    'rewards.totalRewards': 'Belohnungen gesamt',
    'rewards.claimed': 'Eingelöst',
    'rewards.available': 'Verfügbar',
    'rewards.affordableNow': 'Jetzt erschwinglich',
    'rewards.needMore': '{{count}} weitere benötigt',
    
    // History
    'history.pointsEarned': 'Punkte erhalten',
    'history.pointsClaimed': 'Punkte eingelöst',
    'history.receivedBonus': 'Bonuspunkte erhalten bei {{place}}',
    'history.spentPoints': 'Punkte ausgegeben bei {{place}}',
    
    // Errors
    'error.notEnoughPoints': 'Sie haben nicht genügend Punkte für diese Belohnung.',
    'error.somethingWrong': 'Etwas ist schiefgelaufen',
    
    // Ordering
    'order.sortBy': 'Sortieren nach',
    'order.location': 'Standort',
    'order.pointsAsc': 'Punkte (Niedrig zu Hoch)',
    'order.pointsDesc': 'Punkte (Hoch zu Niedrig)',
    'order.nearby': 'In der Nähe',
    'order.filterSort': 'Filtern & Sortieren',
    'order.apply': 'Anwenden',
    'order.reset': 'Zurücksetzen',
    
    // Settings
    'settings.language': 'Sprache',
    'settings.english': 'Englisch',
    'settings.german': 'Deutsch',
  },
};

interface LocalizationProviderProps {
  children: ReactNode;
}

export function LocalizationProvider({ children }: LocalizationProviderProps) {
  const [locale, setLocale] = useState<Locale>('en');

  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = translations[locale][key as keyof typeof translations[typeof locale]] || key;
    
    // Handle interpolation
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{{${paramKey}}}`, String(paramValue));
      });
    }
    
    return translation;
  };

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
}