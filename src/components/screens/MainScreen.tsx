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
      {/* Professional Header */}
      <div className="flex items-center justify-between p-8 border-b-2 border-border/30">
        <Button
          onClick={handleBack}
          variant="outline"
          className="tv-button bg-gradient-to-r from-secondary to-muted hover:from-primary/20 hover:to-accent/20"
          id="main-back"
        >
          <ArrowLeft className="w-6 h-6 mr-3" />
          Back to Menu
        </Button>
        
        <h1 className="text-5xl font-black gradient-primary bg-clip-text text-transparent tracking-tight">
          Choose Character
        </h1>
        
        <div className="text-right text-lg text-muted-foreground font-semibold">
          <p className="bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
            {state.characters.filter(c => c.isPurchased).length} / {state.characters.length} Available
          </p>
        </div>
      </div>

      {/* Character Selection - Professional 2×3 Grid */}
      <div className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Free Characters Row */}
          <div className="space-y-8">
            <div className="flex items-center justify-center space-x-4">
              <Star className="w-8 h-8 text-success animate-pulse" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
                Free Characters
              </h2>
              <Star className="w-8 h-8 text-success animate-pulse" />
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
          <div className="space-y-8">
            <div className="flex items-center justify-center space-x-4">
              <Lock className="w-8 h-8 text-warning animate-pulse" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-warning to-accent bg-clip-text text-transparent">
                Premium Characters
              </h2>
              <Lock className="w-8 h-8 text-warning animate-pulse" />
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

      {/* Professional Footer */}
      <div className="p-6 border-t-2 border-border/30 text-center">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4">
          <p className="text-lg font-semibold text-muted-foreground">
            🎮 <span className="text-primary">Arrow Keys</span> or <span className="text-accent">Remote</span> to Navigate • 
            <span className="text-success"> Enter/OK</span> to Select • 
            <span className="text-warning"> ESC/Back</span> to Return
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