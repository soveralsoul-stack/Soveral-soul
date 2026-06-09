import React from "react";

/**
 * Espectro de áudio do frame atual (0..1 por banda), calculado no nível do
 * vídeo com o frame ABSOLUTO e distribuído via contexto — assim a waveform
 * reage ao áudio real mesmo em cenas que começam mais tarde na timeline.
 * `null` enquanto o áudio carrega (ou se não houver trilha).
 */
export const AudioVizContext = React.createContext<number[] | null>(null);

export const useAudioViz = () => React.useContext(AudioVizContext);
