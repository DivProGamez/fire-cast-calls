import React, { useRef, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useInput } from '@/hooks/useInput';
import { Button } from '@/components/ui/button';
import { X, VolumeX, Volume2 } from 'lucide-react';

export const VideoOverlay: React.FC = () => {
  const { state, stopVideo } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(false);

  useInput({
    onEscape: () => stopVideo(),
    onEnter: () => toggleMute(),
  });

  useEffect(() => {
    if (videoRef.current && state.selectedCharacter) {
      videoRef.current.play().catch(console.error);
    }
  }, [state.selectedCharacter]);

  const handleVideoEnd = () => {
    stopVideo();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  if (!state.selectedCharacter) {
    return null;
  }

  return (
    <div className="video-overlay">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        onEnded={handleVideoEnd}
        onError={() => {
          console.error('Video failed to load');
          stopVideo();
        }}
        playsInline
        autoPlay
      >
        <source src={state.selectedCharacter.videoUrl} type="video/mp4" />
        {/* Fallback content */}
        <div className="flex items-center justify-center h-full bg-background text-center p-8">
          <div>
            <p className="text-2xl font-bold mb-4">Video Unavailable</p>
            <p className="text-lg text-muted-foreground mb-6">
              Cannot play video for {state.selectedCharacter.name}
            </p>
            <Button onClick={stopVideo} className="tv-button">
              Return to Menu
            </Button>
          </div>
        </div>
      </video>

      {/* Video Controls Overlay */}
      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors group">
        
        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between">
            
            {/* Character Info */}
            <div className="text-white">
              <h3 className="text-xl font-semibold">{state.selectedCharacter.name}</h3>
              <p className="text-white/80">Video Call</p>
            </div>
            
            {/* Close Button */}
            <Button
              onClick={stopVideo}
              variant="ghost"
              className="w-12 h-12 rounded-full bg-black/40 text-white hover:bg-red-600/80 border-0"
              id="video-close"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-center space-x-6">
            
            {/* Mute Toggle */}
            <Button
              onClick={toggleMute}
              variant="ghost"
              className="w-12 h-12 rounded-full bg-black/40 text-white hover:bg-white/20 border-0"
              id="video-mute"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </Button>

            {/* End Call Button */}
            <Button
              onClick={stopVideo}
              className="px-8 py-3 rounded-full gradient-danger border-0 text-white hover:scale-105"
              id="video-end-call"
            >
              <X className="w-5 h-5 mr-2" />
              End Call
            </Button>
          </div>
        </div>

        {/* Center Tap Area for Mobile */}
        <div 
          className="absolute inset-0 md:hidden"
          onClick={stopVideo}
          role="button"
          aria-label="End video call"
        />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 text-white/80 text-sm bg-black/40 px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        Press Escape or Back to end call
      </div>
    </div>
  );
};