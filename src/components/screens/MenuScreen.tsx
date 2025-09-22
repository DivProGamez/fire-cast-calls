import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { useInput } from '@/hooks/useInput';
import { Button } from '@/components/ui/button';
import { Phone, Play, RotateCcw, ExternalLink } from 'lucide-react';

export const MenuScreen: React.FC = () => {
  const { navigateToScreen, restorePurchases } = useApp();

  useInput({
    onEnter: () => {
      // Default action - navigate to main
      navigateToScreen('main');
    },
    onEscape: () => {
      // No action on menu screen
    },
  });

  const handleCallVideo = () => {
    navigateToScreen('main');
  };

  const handleMoreApps = () => {
    // In real app, this would open Amazon App Store
    window.open('https://www.amazon.com/mobile-apps', '_blank');
  };

  const handleRestorePurchases = async () => {
    try {
      await restorePurchases();
      // Show success feedback
      console.log('Purchases restored successfully');
    } catch (error) {
      console.error('Failed to restore purchases:', error);
    }
  };

  return (
    <div className="landscape-only fixed inset-0 bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-12 max-w-2xl">
          {/* Logo and Title */}
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                <Phone className="w-12 h-12 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-6xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
                Fake Call Video
              </h1>
              <p className="text-2xl text-muted-foreground">
                Choose from amazing characters for your prank calls
              </p>
            </div>
          </div>

          {/* Menu Buttons */}
          <div className="space-y-6">
            <Button
              onClick={handleCallVideo}
              className="tv-button w-full max-w-md h-20 text-2xl gradient-primary border-0 text-primary-foreground hover:scale-105"
              id="menu-call-video"
            >
              <Play className="w-8 h-8 mr-4" />
              Call Video
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <Button
                onClick={handleMoreApps}
                variant="outline"
                className="tv-button h-16 text-lg"
                id="menu-more-apps"
              >
                <ExternalLink className="w-6 h-6 mr-2" />
                More Apps
              </Button>

              <Button
                onClick={handleRestorePurchases}
                variant="outline"
                className="tv-button h-16 text-lg"
                id="menu-restore"
              >
                <RotateCcw className="w-6 h-6 mr-2" />
                Restore Purchases
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>6 Free Characters + 6 Premium Characters Available</p>
            <p>Optimized for Fire TV, Tablets & Mobile Devices</p>
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