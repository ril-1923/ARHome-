
import { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';

interface ARViewerProps {
  modelGlb: string;
  onClose: () => void;
}

function ARViewer({ modelGlb, onClose }: ARViewerProps) {
  const viewerRef = useRef<HTMLElement>(null);
  const [hasError, setHasError] = useState(false);

  // Close with Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  // Reset error when changing products
  useEffect(() => {
    setHasError(false);

    const el = viewerRef.current;

    if (!el) return;

    el.setAttribute('loading', 'eager');

    const handleError = () => {
      setHasError(true);
    };

    el.addEventListener('error', handleError);

    return () => {
      el.removeEventListener('error', handleError);
    };
  }, [modelGlb]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-secondary mb-3"
        onClick={onClose}
        aria-label="Close AR viewer"
      >
        Close
      </button>

      {hasError ? (
        <div className="alert alert-danger" role="alert">
          Couldn't load the 3D model. Please try again.
        </div>
      ) : (
        <model-viewer
          ref={viewerRef}
          src={modelGlb}
          alt="3D furniture model"
          camera-controls
          auto-rotate
          ar
          ar-modes="webxr scene-viewer quick-look"
          style={{
            width: '100%',
            height: '500px',
          }}
        />
      )}
    </div>
  );
}

export default ARViewer;

