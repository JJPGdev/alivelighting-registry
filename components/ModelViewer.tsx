"use client";

import { useEffect, useRef } from "react";

interface ModelViewerProps {
  src: string;
  alt?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          "auto-rotate"?: boolean;
          "camera-controls"?: boolean;
          loading?: string;
          "shadow-intensity"?: string;
          exposure?: string;
          ar?: boolean;
        },
        HTMLElement
      >;
    }
  }
}

export default function ModelViewer({ src, alt = "3D model produs AliveLighting" }: ModelViewerProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  return (
    <model-viewer
      ref={ref as React.RefObject<HTMLElement>}
      src={src}
      alt={alt}
      auto-rotate
      camera-controls
      loading="eager"
      shadow-intensity="0"
      exposure="0.8"
      style={{
        width: "100%",
        height: "100%",
        background: "transparent",
        "--progress-bar-color": "transparent",
        "--poster-color": "transparent",
      } as React.CSSProperties}
    />
  );
}