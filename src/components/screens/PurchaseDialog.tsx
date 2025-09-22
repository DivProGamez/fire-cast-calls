import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useInput } from '@/hooks/useInput';
import { Button } from '@/components/ui/button';
import { X, CreditCard, Lock, Star } from 'lucide-react';

export const PurchaseDialog: React.FC = () => {
  const { state, navigateToScreen, handlePurchase } = useApp();
  const [isPurchasing, setIsPurchasing] = useState(false);

  useInput({
    onEscape: () => handleCancel(),
    onEnter: () => !isPurchasing && handleBuy(),
  });

  const handleCancel = () => {
    navigateToScreen('main');
  };

  const handleBuy = async () => {
    if (!state.selectedCharacter?.sku || isPurchasing) return;

    setIsPurchasing(true);
    
    try {
      await handlePurchase(state.selectedCharacter.sku);
      
      // Show success and navigate to call
      setTimeout(() => {
        navigateToScreen('call');
        setIsPurchasing(false);
      }, 1000);
      
    } catch (error) {
      console.error('Purchase failed:', error);
      setIsPurchasing(false);
    }
  };

  if (!state.selectedCharacter) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full mx-auto shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Unlock Character</h2>
          <Button
            onClick={handleCancel}
            variant="ghost"
            className="w-10 h-10 rounded-full p-0"
            id="purchase-close"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Character Preview */}
        <div className="text-center space-y-4 mb-8">
          <div className="relative mx-auto w-32 h-32">
            <img
              src={state.selectedCharacter.iconUrl}
              alt={state.selectedCharacter.name}
              className="w-full h-full object-cover rounded-full border-4 border-primary/30"
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
            <div className="absolute -top-2 -right-2">
              <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4 text-warning-foreground" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold">{state.selectedCharacter.name}</h3>
            <p className="text-muted-foreground">Premium Character</p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center space-x-3">
            <Star className="w-5 h-5 text-primary" />
            <span>High-quality video content</span>
          </div>
          <div className="flex items-center space-x-3">
            <Star className="w-5 h-5 text-primary" />
            <span>Realistic call experience</span>
          </div>
          <div className="flex items-center space-x-3">
            <Star className="w-5 h-5 text-primary" />
            <span>Lifetime access</span>
          </div>
        </div>

        {/* Price */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            $0.99
          </div>
          <p className="text-sm text-muted-foreground">One-time purchase</p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleBuy}
            disabled={isPurchasing}
            className="w-full h-12 text-lg gradient-primary border-0 text-primary-foreground"
            id="purchase-buy"
          >
            {isPurchasing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Buy Now
              </>
            )}
          </Button>

          <Button
            onClick={handleCancel}
            variant="outline"
            className="w-full h-12 text-lg"
            id="purchase-cancel"
            disabled={isPurchasing}
          >
            Maybe Later
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground mt-6 space-y-1">
          <p>Secure payment via Amazon In-App Purchase</p>
          <p>Purchase will be linked to your Amazon account</p>
        </div>
      </div>
    </div>
  );
};