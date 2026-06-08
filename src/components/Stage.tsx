import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * Container de palco — apenas centraliza o conteúdo da cena. O fundo de marca
 * (gradiente, grid, glow, vinheta) é desenhado uma única vez no <Background/>,
 * preenchendo o frame inteiro. Aqui é transparente de propósito, para não criar
 * nenhuma "moldura" presa à área de design (que denunciava o formato 1:1).
 */
export const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {children}
    </AbsoluteFill>
  );
};
