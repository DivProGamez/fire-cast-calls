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
        tv-card cursor-pointer relative group min-h-[200px] max-w-[180px] mx-auto
        ${character.isPurchased 
          ? 'hover:border-primary/60 focus:border-primary' 
          : 'hover:border-warning/60 focus:border-warning opacity-80'
        }
        transition-all duration-300 ease-out p-4
      `}
      tabIndex={0}
      role="button"
      aria-label={`${character.name} - ${character.isPurchased ? 'Available' : 'Locked'}`}
    >
      {/* Compact Character Image */}
      <div className="aspect-square mb-3 rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 relative shadow-md">
        <img
          src={character.iconUrl}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `data:image/svg+xml;base64,${btoa(`
              <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="hsl(260, 84%, 65%)"/>
                    <stop offset="100%" stop-color="hsl(280, 89%, 67%)"/>
                  </linearGradient>
                </defs>
                <rect width="120" height="120" fill="url(#bg)"/>
                <circle cx="60" cy="45" r="20" fill="rgba(255,255,255,0.9)"/>
                <path d="M 35 75 Q 60 60 85 75 L 85 100 Q 60 110 35 100 Z" fill="rgba(255,255,255,0.9)"/>
              </svg>
            `)}`;
          }}
        />
        
        {/* Compact Lock Overlay */}
        {!character.isPurchased && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <div className="text-center">
              <Lock className="w-6 h-6 text-warning mx-auto mb-1" />
              <span className="text-xs font-bold text-warning">LOCKED</span>
            </div>
          </div>
        )}

        {/* Compact Available Indicator */}
        {character.isPurchased && (
          <div className="absolute top-2 right-2 bg-success/90 rounded-full p-1">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Compact Character Info */}
      <div className="text-center space-y-2">
        <h3 className="font-bold text-base tracking-tight">
          {character.name}
        </h3>
        
        <div>
          {character.isFree ? (
            <span className="inline-block px-2 py-1 bg-gradient-to-r from-success to-success/80 text-white text-xs rounded-lg font-bold">
              ✨ FREE
            </span>
          ) : character.isPurchased ? (
            <span className="inline-block px-2 py-1 bg-gradient-to-r from-primary to-accent text-white text-xs rounded-lg font-bold">
              ✓ OWNED
            </span>
          ) : (
            <span className="inline-block px-2 py-1 bg-gradient-to-r from-warning to-warning/80 text-white text-xs rounded-lg font-bold">
              🔒 PREMIUM
            </span>
          )}
        </div>
      </div>

      {/* Focus Effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_20px_hsl(var(--primary)/0.3)]"></div>
    </div>
  );
};