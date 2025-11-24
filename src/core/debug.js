/**
 * Debug logging utilities for Enspyred Contact Form
 * Only logs to console when debug mode is enabled in plugin settings
 */

const isDebugEnabled = () => {
  return window.ECF_DATA?.debug === true;
};

export const debugLog = (...args) => {
  if (isDebugEnabled()) {
    console.log('[ECF]', ...args);
  }
};

export const debugWarn = (...args) => {
  if (isDebugEnabled()) {
    console.warn('[ECF]', ...args);
  }
};

export const debugError = (...args) => {
  if (isDebugEnabled()) {
    console.error('[ECF]', ...args);
  }
};
