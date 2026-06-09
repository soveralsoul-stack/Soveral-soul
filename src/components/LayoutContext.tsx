import React from "react";

export type CtaVariant = "whatsapp" | "instagram";

export interface LayoutInfo {
  /** true quando o formato é landscape (16:9) → cenas podem usar a largura. */
  landscape: boolean;
  /** largura/altura da área de design (palco) em px. */
  dw: number;
  dh: number;
}

export const LayoutContext = React.createContext<LayoutInfo>({
  landscape: false,
  dw: 1080,
  dh: 1080,
});

export const useLayout = () => React.useContext(LayoutContext);
