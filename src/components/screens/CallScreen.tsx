import React, { useEffect, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useInput } from '@/hooks/useInput';
import { Button } from '@/components/ui/button';
import { Phone, PhoneOff, ArrowLeft } from 'lucide-react';

export const CallScreen: React.FC = () => {
  const { state, navigateToScreen, playCharacterVideo } = useApp();
  const audioRef = useRef<HTMLAudioElement>(null);

  useInput({
    onEnter: () => handleAnswer(),
    onEscape: () => handleCancel(),
  });

  // Play ringtone on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.play().catch(console.error);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleAnswer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    if (state.selectedCharacter) {
      // Play short answer sound then start video
      playCharacterVideo(state.selectedCharacter);
    }
  };

  const handleCancel = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    navigateToScreen('menu');
  };

  const handleBack = () => {
    handleCancel();
  };

  if (!state.selectedCharacter) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <p className="text-xl">No character selected</p>
      </div>
    );
  }

  return (
    <div className="landscape-only fixed inset-0 bg-background">
      {/* Audio Elements */}
      <audio ref={audioRef} preload="auto">
        <source src="/audio/ringtone.mp3" type="audio/mpeg" />
      </audio>

      {/* Call Interface */}
      <div className="relative h-full flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="tv-button text-muted-foreground"
            id="call-back"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Incoming Call</p>
          </div>
          
          <div className="w-20"></div> {/* Spacer */}
        </div>

        {/* Character Display */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-8 max-w-md">
            
            {/* Character Avatar */}
            <div className="relative">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary/30 animate-pulse-glow">
                <img
                  src={state.selectedCharacter.iconUrl}
                  alt={state.selectedCharacter.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <rect width="200" height="200" fill="hsl(217, 24%, 12%)"/>
                        <circle cx="100" cy="80" r="30" fill="hsl(195, 100%, 50%)"/>
                        <path d="M 70 130 Q 100 110 130 130 L 130 160 Q 100 180 70 160 Z" fill="hsl(195, 100%, 50%)"/>
                      </svg>
                    `)}`;
                  }}
                />
              </div>
              
              {/* Calling Animation */}
              <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping"></div>
            </div>

            {/* Character Info */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">{state.selectedCharacter.name}</h1>
              <p className="text-xl text-muted-foreground">Video Call</p>
            </div>

            {/* Call Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-lg text-primary font-semibold">Calling...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call Actions */}
        <div className="p-8">
          <div className="flex items-center justify-center space-x-12 max-w-md mx-auto">
            
            {/* Decline Button */}
            <Button
              onClick={handleCancel}
              className="w-20 h-20 rounded-full gradient-danger border-0 text-white hover:scale-110"
              id="call-decline"
            >
              <PhoneOff className="w-8 h-8" />
            </Button>

            {/* Answer Button */}
            <Button
              onClick={handleAnswer}
              className="w-20 h-20 rounded-full gradient-success border-0 text-white hover:scale-110 animate-pulse-glow"
              id="call-answer"
            >
              <Phone className="w-8 h-8" />
            </Button>
          </div>

          {/* Instructions */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-lg">
              <span className="text-success font-semibold">Answer</span> to start video call
            </p>
            <p className="text-sm text-muted-foreground">
              Use remote OK/Enter to answer • Back/Escape to decline
            </p>
          </div>
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