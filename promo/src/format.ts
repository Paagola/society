import {createContext, useContext} from 'react';

// Formato del vídeo: vertical (9:16) o apaisado (16:9). Cada escena coloca sus piezas según este valor.
export const WideContext = createContext(false);
export const useWide = () => useContext(WideContext);
