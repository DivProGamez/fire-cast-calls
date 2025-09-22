import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider, useApp } from "@/contexts/AppContext";
import { SplashScreen } from "@/components/screens/SplashScreen";
import { MenuScreen } from "@/components/screens/MenuScreen";
import { MainScreen } from "@/components/screens/MainScreen";
import { CallScreen } from "@/components/screens/CallScreen";
import { VideoOverlay } from "@/components/screens/VideoOverlay";
import { PurchaseDialog } from "@/components/screens/PurchaseDialog";

const queryClient = new QueryClient();

const AppContent = () => {
  const { state } = useApp();

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'menu':
        return <MenuScreen />;
      case 'main':
        return <MainScreen />;
      case 'call':
        return <CallScreen />;
      case 'video':
        return <VideoOverlay />;
      case 'purchase':
        return (
          <>
            <MainScreen />
            <PurchaseDialog />
          </>
        );
      default:
        return <MenuScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {renderScreen()}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
