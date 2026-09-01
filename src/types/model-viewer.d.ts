import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type ModelViewerAttributes = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  src?: string;
  'ios-src'?: string;
  alt?: string;
  ar?: boolean;
  'ar-modes'?: string;
  'camera-controls'?: boolean;
  'auto-rotate'?: boolean;
  'shadow-intensity'?: string;
  exposure?: string;
  reveal?: string;
};

// React 19 / @types/react 19+ moved the JSX namespace from the global
// `JSX` to `React.JSX`. Declaring only `declare global { namespace JSX }`
// (as before) silently fails to merge under that setup, which is why you
// saw: "Property 'model-viewer' does not exist on type 'JSX.IntrinsicElements'".
// Declaring it in both places makes this work on React 18 and 19.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerAttributes;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerAttributes;
    }
  }
}

export {};