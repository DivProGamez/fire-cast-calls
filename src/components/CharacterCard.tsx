import React from 'react';
import { Character } from '@/contexts/AppContext';
import { Lock, CheckCircle } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  id?: string;
  onClick: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character, 
  id, 
  onClick 
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`
        tv-card cursor-pointer relative group
        ${character.isPurchased 
          ? 'hover:border-primary/50 hover:bg-primary/5' 
          : 'hover:border-warning/50 hover:bg-warning/5 opacity-75'
        }
      `}
      tabIndex={0}
      role="button"
      aria-label={`${character.name} - ${character.isPurchased ? 'Available' : 'Locked'}`}
    >
      {/* Character Image */}
      <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-muted relative">
        <img
          src={character.iconUrl}
          alt={character.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to a default character icon
            const target = e.target as HTMLImageElement;
            target.src = `data:image/svg+xml;base64,${btoa(`
              <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="200" fill="hsl(217, 24%, 12%)"/>
                <circle cx="100" cy="80" r="30" fill="hsl(195, 100%, 50%)"/>
                <path d="M 70 130 Q 100 110 130 130 L 130 160 Q 100 180 70 160 Z" fill="hsl(195, 100%, 50%)"/>
                <text x="100" y="190" text-anchor="middle" fill="hsl(210, 40%, 98%)" font-size="16" font-family="sans-serif">
                  ${character.name}
                </text>
              </svg>
            `)}`;
          }}
        />
        
        {/* Lock Overlay */}
        {!character.isPurchased && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center">
              <Lock className="w-8 h-8 text-warning mx-auto mb-2" />
              <span className="text-sm font-semibold text-warning">LOCKED</span>
            </div>
          </div>
        )}

        {/* Available Indicator */}
        {character.isPurchased && (
          <div className="absolute top-2 right-2">
            <CheckCircle className="w-6 h-6 text-success" />
          </div>
        )}
      </div>

      {/* Character Info */}
      <div className="text-center space-y-2">
        <h3 className="font-semibold text-lg">{character.name}</h3>
        
        <div className="space-y-1">
          {character.isFree ? (
            <span className="inline-block px-3 py-1 bg-success/20 text-success text-sm rounded-full font-medium">
              FREE
            </span>
          ) : character.isPurchased ? (
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-medium">
              OWNED
            </span>
          ) : (
            <span className="inline-block px-3 py-1 bg-warning/20 text-warning text-sm rounded-full font-medium">
              PREMIUM
            </span>
          )}
        </div>
      </div>

      {/* Focus Ring */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-focus:border-primary transition-colors pointer-events-none"></div>
    </div>
  );
};