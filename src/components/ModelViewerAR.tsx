import '@google/model-viewer';
import { useEffect, useRef, useState } from 'react';

// NOTE: <model-viewer>'s JSX typing lives in src/types/model-viewer.d.ts.
// Do not add another type declaration for it anywhere else.

// ---------------------------------------------------------------------------
// The viewer, mounted only once its container is visible and sized.
// This fixes the original "$updateSource ... BAILING OUT EARLY" bug:
// model-viewer refuses to load into a 0x0 element, which happens when it's
// rendered inside a modal before layout has settled. We don't render the
// <model-viewer> tag at all until a ResizeObserver confirms the container
// has real width/height.
// ---------------------------------------------------------------------------
interface ModelViewerCoreProps {
  src: string;
  iosSrc?: string;
  alt: string;
  ar?: boolean;
  cameraControls?: boolean;
  autoRotate?: boolean;
}

function ModelViewerCore({
  src,
  iosSrc,
  alt,
  ar = true,
  cameraControls = true,
  autoRotate = false,
}: ModelViewerCoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasSize, setHasSize] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setHasSize(true);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 400 }}>
      {hasSize ? (
        <model-viewer
          src={src}
          ios-src={iosSrc}
          alt={alt}
          // IMPORTANT: never pass ar={false} / camera-controls={false} etc.
          // React sets custom-element boolean props as the literal string
          // "false", and model-viewer only checks attribute *presence*, so
          // ar="false" is still truthy. Spread conditionally instead so the
          // attribute is fully omitted when the feature should be off.
          {...(ar ? { ar: true, 'ar-modes': 'webxr scene-viewer quick-look' } : {})}
          {...(cameraControls ? { 'camera-controls': true } : {})}
          {...(autoRotate ? { 'auto-rotate': true } : {})}
          shadow-intensity="1"
          exposure="1"
          reveal="auto"
          style={{ width: '100%', height: '100%', backgroundColor: '#f5f5f5' }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#888',
            fontSize: 14,
          }}
        >
          Loading 3D viewer…
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Modal wrapper. ModelViewerCore is only mounted once the modal is open
// AND its content box has laid out — never rendered into a display:none
// or still-animating-open container.
// ---------------------------------------------------------------------------
interface ArModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  modelSrc: string;
  iosSrc?: string;
  alt: string;
}

export function ArModal({ isOpen, onClose, title, modelSrc, iosSrc, alt }: ArModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          width: 'min(900px, 92vw)',
          height: 'min(700px, 85vh)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18 }}>{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}
          >
            ×
          </button>
        </div>

        {/* This flex-1 region is what gives the viewer real height.
            Without min-height/flex here, the container can be 0px tall
            and model-viewer will refuse to load — the original bug. */}
        <div style={{ flex: 1, minHeight: 0, padding: 16 }}>
          <ModelViewerCore src={modelSrc} iosSrc={iosSrc} alt={alt} ar cameraControls autoRotate />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Example usage — a product page trigger button
// ---------------------------------------------------------------------------
export function SofaArExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>View Modern Sofa in AR</button>
      <ArModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="View Modern Sofa in AR"
        modelSrc="/models/sofa.glb"
        iosSrc="/models/sofa.usdz"
        alt="Modern sofa 3D model"
      />
    </>
  );
}
