import { Config } from "@remotion/cli/config";

// Render local, sem dependências de rede. ffmpeg vem embutido no @remotion/renderer.
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(null); // usa todos os cores disponíveis
Config.setChromiumOpenGlRenderer("angle");

// Qualidade de saída (H.264, ótimo para entrega em redes/whatsapp/web).
Config.setCodec("h264");
Config.setCrf(18); // 18 = visualmente lossless; suba para arquivos menores
