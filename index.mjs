import filters from './src/filters';
import Canvas from './src/canvas';

// Canvas
export { Canvas };

// Filters
export const invert = filters.invert;
export const greyscale = filters.greyscale;
export const grayscale = filters.grayscale;
export const invertGreyscale = filters.greyscale;
export const invertGrayscale = filters.grayscale;
export const sepia = filters.sepia;
export const silhouette = filters.silhouette;
export const threshold = filters.threshold;
export const invertedThreshold = filters.invertedThreshold;
export const brightness = filters.brightness;
export const darkness = filters.darkness;
export const myOldFriend = filters.myOldFriend;
export const sharpen = filters.sharpen;
export const blur = filters.blur;
export const convolute = filters.convolute;
