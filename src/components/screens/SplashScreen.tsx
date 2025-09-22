import React, { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

export const SplashScreen: React.FC = () => {
  const { state, navigateToScreen } = useApp();

  useEffect(() => {
    // Auto-navigate after loading
    if (!state.isLoading) {
      navigateToScreen('menu');
    }
  }, [state.isLoading, navigateToScreen]);

  return (
    <div className="landscape-only fixed inset-0 bg-background flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* App Logo */}
        <div className="flex items-center justify-center">
          <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center animate-pulse-glow">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-primary-foreground">FC</span>
            </div>
          </div>
        </div>

        {/* App Title */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">
            Fake Call Video
          </h1>
          <p className="text-xl text-muted-foreground">Entertainment & Prank App</p>
        </div>

        {/* Loading Animation */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full gradient-primary animate-pulse"></div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Loading...</p>
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