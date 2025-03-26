import {
  SlBlurEvent,
  SlChangeEvent,
  SlClearEvent,
  SlFocusEvent,
  SlInputEvent,
  SlInvalidEvent,
} from '@shoelace-style/shoelace';

/**
 * Define custom event handler types
 */
export type SlInputEventHandlers = {
  onSlBlur?: (e: SlBlurEvent) => void;
  onSlChange?: (e: SlChangeEvent) => void;
  onSlClear?: (e: SlClearEvent) => void;
  onSlFocus?: (e: SlFocusEvent) => void;
  onSlInput?: (e: SlInputEvent) => void;
  onSlInvalid?: (e: SlInvalidEvent) => void;
};
