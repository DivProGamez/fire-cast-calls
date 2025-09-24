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
        tv-card cursor-pointer relative group min-h-[280px] w-full
        ${character.isPurchased 
          ? 'hover:border-primary/60 focus:border-primary' 
          : 'hover:border-warning/60 focus:border-warning opacity-80'
        }
        transition-all duration-300 ease-out
      `}
      tabIndex={0}
      role="button"
      aria-label={`${character.name} - ${character.isPurchased ? 'Available' : 'Locked'}`}
    >
      {/* Character Image */}
      <div className="aspect-square mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 relative shadow-lg">
        <img
          src={character.iconUrl}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            // Fallback to a professional default icon
            const target = e.target as HTMLImageElement;
            target.src = `data:image/svg+xml;base64,${btoa(`
              <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="hsl(260, 84%, 65%)"/>
                    <stop offset="100%" stop-color="hsl(280, 89%, 67%)"/>
                  </linearGradient>
                </defs>
                <rect width="200" height="200" fill="url(#bg)"/>
                <circle cx="100" cy="75" r="35" fill="rgba(255,255,255,0.9)"/>
                <path d="M 60 140 Q 100 115 140 140 L 140 175 Q 100 190 60 175 Z" fill="rgba(255,255,255,0.9)"/>
                <text x="100" y="190" text-anchor="middle" fill="white" font-size="14" font-family="Arial, sans-serif" font-weight="bold">
                  ${character.name}
                </text>
              </svg>
            `)}`;
          }}
        />
        
        {/* Lock Overlay */}
        {!character.isPurchased && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center animate-pulse">
              <Lock className="w-12 h-12 text-warning mx-auto mb-3 drop-shadow-lg" />
              <span className="text-lg font-bold text-warning tracking-wider drop-shadow">LOCKED</span>
            </div>
          </div>
        )}

        {/* Available Indicator */}
        {character.isPurchased && (
          <div className="absolute top-3 right-3 bg-success/90 rounded-full p-2 shadow-lg">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      {/* Character Info */}
      <div className="text-center space-y-4">
        <h3 className="font-black text-2xl tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          {character.name}
        </h3>
        
        <div className="space-y-2">
          {character.isFree ? (
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-success to-success/80 text-white text-sm rounded-2xl font-bold shadow-lg tracking-wider">
              ✨ FREE
            </span>
          ) : character.isPurchased ? (
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-primary to-accent text-white text-sm rounded-2xl font-bold shadow-lg tracking-wider">
              ✓ OWNED
            </span>
          ) : (
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-warning to-warning/80 text-white text-sm rounded-2xl font-bold shadow-lg tracking-wider">
              🔒 PREMIUM
            </span>
          )}
        </div>
      </div>

      {/* Professional Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[var(--shadow-glow)]"></div>
    </div>
  );
};