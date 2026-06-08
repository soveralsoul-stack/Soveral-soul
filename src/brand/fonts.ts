/**
 * Fontes locais (servidas de /public/fonts) — sem rede no render.
 * A rede deste ambiente intercepta TLS e o Chromium rejeita a CA do proxy,
 * então carregamos os TTFs localmente em vez de via Google Fonts.
 */
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const DISPLAY = "Bebas Neue";
export const BODY = "Space Grotesk";

loadFont({
  family: DISPLAY,
  url: staticFile("fonts/BebasNeue-Regular.ttf"),
  weight: "400",
});

loadFont({
  family: BODY,
  url: staticFile("fonts/SpaceGrotesk.ttf"),
  weight: "300 700", // variável
});
