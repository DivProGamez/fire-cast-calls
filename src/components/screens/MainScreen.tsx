import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { useGridNavigation } from '@/hooks/useInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lock, Star } from 'lucide-react';
import { CharacterCard } from '@/components/CharacterCard';

export const MainScreen: React.FC = () => {
  const { state, navigateToScreen, selectCharacter } = useApp();
  
  // Grid navigation for character selection (2 rows, 6 columns)
  const { getElementId } = useGridNavigation('character-grid', 2, 6);

  const handleBack = () => {
    navigateToScreen('menu');
  };

  const handleCharacterSelect = (character: any) => {
    selectCharacter(character);
    
    if (character.isPurchased) {
      navigateToScreen('call');
    } else {
      navigateToScreen('purchase');
    }
  };

  // Organize characters into rows
  const freeCharacters = state.characters.filter(char => char.isFree);
  const premiumCharacters = state.characters.filter(char => !char.isFree);

  return (
    <div className="landscape-only fixed inset-0 bg-background overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border/50">
        <Button
          onClick={handleBack}
          variant="outline"
          className="tv-button"
          id="main-back"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Menu
        </Button>
        
        <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
          Choose Your Character
        </h1>
        
        <div className="text-right text-sm text-muted-foreground">
          <p>{state.characters.filter(c => c.isPurchased).length} / {state.characters.length} Available</p>
        </div>
      </div>

      {/* Character Selection */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Free Characters Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Star className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Free Characters</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {freeCharacters.map((character, index) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  id={getElementId(0, index)}
                  onClick={() => handleCharacterSelect(character)}
                />
              ))}
            </div>
          </div>

          {/* Premium Characters Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Lock className="w-6 h-6 text-warning" />
              <h2 className="text-2xl font-bold">Premium Characters</h2>
              <span className="text-sm text-muted-foreground">(Unlock with purchase)</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {premiumCharacters.map((character, index) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  id={getElementId(1, index)}
                  onClick={() => handleCharacterSelect(character)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border/50 text-center text-sm text-muted-foreground">
        Use arrow keys or remote to navigate • Press OK/Enter to select • Press Back/Escape to return
      </div>

      {/* Portrait Warning */}
      <div className="portrait-warning fixed inset-0 bg-background items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="text-6xl">📱➡️📺</div>
          <h2 className="text-2xl font-bold">Rotate Your Device</h2>
          <p className="text-lg text-muted-foreground">
            This app is optimized for landscape mode
          </p>
        </div>
      </div>
    </div>
  );
};