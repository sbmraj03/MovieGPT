import React, { useEffect, useRef } from 'react';

// Overlay player; can optionally use browser Fullscreen API.
// forceFullscreen=true will request browser fullscreen on mount.
const FullscreenVideoPlayer = ({ trailerKey, onClose, forceFullscreen = false }) => {
  const overlayRef = useRef(null);
  // Lock page scroll while the overlay is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow || '';
    };
  }, []);

  useEffect(() => {
    if (!forceFullscreen) return;
    const elem = overlayRef.current || document.documentElement;
    const req = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.msRequestFullscreen;
    if (req) {
      try {
        req.call(elem);
      } catch (e) {
        // ignore
      }
    }
    const handleFsChange = () => {
      // When the user exits browser fullscreen (Esc), close the overlay
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        onClose();
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    document.addEventListener('msfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
      document.removeEventListener('msfullscreenchange', handleFsChange);
    };
  }, [forceFullscreen]);
  const handleClose = () => {
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!trailerKey) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9999] bg-black">
      {/* YouTube Video */}
      <div className="absolute inset-0">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&controls=1&showinfo=1&rel=0&modestbranding=1&fs=1&cc_load_policy=1&playsinline=1`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default FullscreenVideoPlayer;
