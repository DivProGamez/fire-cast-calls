import React, { createContext, useContext, useState, useEffect } from 'react';

// Character data structure
export interface Character {
  id: number;
  name: string;
  iconUrl: string;
  videoUrl: string;
  isFree: boolean;
  isPurchased: boolean;
  sku?: string;
}

// App state interface
interface AppState {
  currentScreen: 'splash' | 'menu' | 'main' | 'call' | 'video' | 'purchase';
  selectedCharacter: Character | null;
  characters: Character[];
  isLoading: boolean;
  focusedElement: string | null;
  purchasedItems: string[];
}

interface AppContextValue {
  state: AppState;
  navigateToScreen: (screen: AppState['currentScreen']) => void;
  selectCharacter: (character: Character) => void;
  setFocusedElement: (elementId: string | null) => void;
  handlePurchase: (sku: string) => Promise<void>;
  restorePurchases: () => Promise<void>;
  playCharacterVideo: (character: Character) => void;
  stopVideo: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// Generate character data
const generateCharacters = (): Character[] => {
  return Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    name: `Character ${i + 1}`,
    iconUrl: `/images/character_${i + 1}_icon.png`,
    videoUrl: `/videos/character_${i + 1}_video.mp4`,
    isFree: i < 2,
    isPurchased: i < 2, // Free characters are always purchased
    sku: i >= 2 ? `sku.niche${i + 1}` : undefined,
  }));
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentScreen: 'splash',
    selectedCharacter: null,
    characters: generateCharacters(),
    isLoading: true,
    focusedElement: null,
    purchasedItems: [],
  });

  // Initialize app and check purchases
  useEffect(() => {
    const initApp = async () => {
      // Simulate splash screen loading
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Load purchased items from localStorage
      const savedPurchases = localStorage.getItem('fake-call-purchases');
      if (savedPurchases) {
        const purchasedItems = JSON.parse(savedPurchases);
        setState(prev => ({
          ...prev,
          purchasedItems,
          characters: prev.characters.map(char => ({
            ...char,
            isPurchased: char.isFree || purchasedItems.includes(char.sku || ''),
          })),
          isLoading: false,
          currentScreen: 'menu',
        }));
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          currentScreen: 'menu',
        }));
      }
    };

    initApp();
  }, []);

  const navigateToScreen = (screen: AppState['currentScreen']) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
  };

  const selectCharacter = (character: Character) => {
    setState(prev => ({ ...prev, selectedCharacter: character }));
  };

  const setFocusedElement = (elementId: string | null) => {
    setState(prev => ({ ...prev, focusedElement: elementId }));
  };

  const handlePurchase = async (sku: string): Promise<void> => {
    try {
      // Simulate purchase process
      console.log('Processing purchase for:', sku);
      
      // In real app, this would call Amazon IAP
      // For demo purposes, we'll simulate success after delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newPurchasedItems = [...state.purchasedItems, sku];
      
      // Save to localStorage
      localStorage.setItem('fake-call-purchases', JSON.stringify(newPurchasedItems));
      
      // Update state
      setState(prev => ({
        ...prev,
        purchasedItems: newPurchasedItems,
        characters: prev.characters.map(char => ({
          ...char,
          isPurchased: char.isFree || newPurchasedItems.includes(char.sku || ''),
        })),
      }));

      // Show success message (in real app, use toast)
      console.log('Purchase successful!');
    } catch (error) {
      console.error('Purchase failed:', error);
      throw error;
    }
  };

  const restorePurchases = async (): Promise<void> => {
    try {
      // In real app, this would call Amazon IAP to restore purchases
      console.log('Restoring purchases...');
      
      // For demo, we'll just check localStorage
      const savedPurchases = localStorage.getItem('fake-call-purchases');
      if (savedPurchases) {
        const purchasedItems = JSON.parse(savedPurchases);
        setState(prev => ({
          ...prev,
          purchasedItems,
          characters: prev.characters.map(char => ({
            ...char,
            isPurchased: char.isFree || purchasedItems.includes(char.sku || ''),
          })),
        }));
      }
    } catch (error) {
      console.error('Restore purchases failed:', error);
    }
  };

  const playCharacterVideo = (character: Character) => {
    setState(prev => ({
      ...prev,
      selectedCharacter: character,
      currentScreen: 'video',
    }));
  };

  const stopVideo = () => {
    setState(prev => ({
      ...prev,
      currentScreen: 'menu',
      selectedCharacter: null,
    }));
  };

  const contextValue: AppContextValue = {
    state,
    navigateToScreen,
    selectCharacter,
    setFocusedElement,
    handlePurchase,
    restorePurchases,
    playCharacterVideo,
    stopVideo,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};