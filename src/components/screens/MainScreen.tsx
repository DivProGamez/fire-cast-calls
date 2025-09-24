import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { useGridNavigation } from '@/hooks/useInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lock, Star } from 'lucide-react';
import { CharacterCard } from '@/components/CharacterCard';

export const MainScreen: React.FC = () => {
  const { state, navigateToScreen, selectCharacter } = useApp();
  
  // Grid navigation for character selection (2 rows, 3 columns)
  const { getElementId } = useGridNavigation('character-grid', 2, 3);

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
      {/* Compact Professional Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/30">
        <Button
          onClick={handleBack}
          variant="outline"
          className="tv-button text-base px-6 py-3 bg-gradient-to-r from-secondary to-muted hover:from-primary/20 hover:to-accent/20"
          id="main-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <h1 className="text-2xl md:text-3xl font-bold gradient-primary bg-clip-text text-transparent">
          Choose Character
        </h1>
        
        <div className="text-right text-sm text-muted-foreground">
          <p className="bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
            {state.characters.filter(c => c.isPurchased).length}/{state.characters.length}
          </p>
        </div>
      </div>

      {/* Compact Character Selection */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Free Characters Row */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-5 h-5 text-success" />
              <h2 className="text-xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
                Free Characters
              </h2>
            </div>
            
            <div className="character-grid">
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

          {/* Premium Characters Row */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Lock className="w-5 h-5 text-warning" />
              <h2 className="text-xl font-bold bg-gradient-to-r from-warning to-accent bg-clip-text text-transparent">
                Premium Characters
              </h2>
            </div>
            
            <div className="character-grid">
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

      {/* Compact Footer */}
      <div className="p-3 border-t border-border/30 text-center">
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-2">
          <p className="text-sm text-muted-foreground">
            🎮 <span className="text-primary">Arrows</span> • <span className="text-success">Enter</span> • <span className="text-warning">ESC</span>
          </p>
        </div>
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