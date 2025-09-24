import { useEffect, useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';

interface InputConfig {
  onEnter?: () => void;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
}

export const useInput = (config: InputConfig) => {
  const { setFocusedElement } = useApp();

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    
    // Prevent default behavior for navigation keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' ', 'Escape', 'Backspace'].includes(key)) {
      event.preventDefault();
      event.stopPropagation();
    }

    switch (key) {
      case 'Enter':
      case ' ':
        config.onEnter?.();
        break;
      case 'Escape':
      case 'Backspace':
        config.onEscape?.();
        break;
      case 'ArrowUp':
        config.onArrowUp?.();
        break;
      case 'ArrowDown':
        config.onArrowDown?.();
        break;
      case 'ArrowLeft':
        config.onArrowLeft?.();
        break;
      case 'ArrowRight':
        config.onArrowRight?.();
        break;
    }
  }, [config]);

  // Gamepad support
  const handleGamepadInput = useCallback(() => {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0];
    
    if (gamepad) {
      // D-Pad or Left stick
      const leftStickX = gamepad.axes[0];
      const leftStickY = gamepad.axes[1];
      
      // Button mappings (common gamepad layout)
      const buttonA = gamepad.buttons[0]?.pressed; // A/Cross
      const buttonB = gamepad.buttons[1]?.pressed; // B/Circle
      const dpadUp = gamepad.buttons[12]?.pressed;
      const dpadDown = gamepad.buttons[13]?.pressed;
      const dpadLeft = gamepad.buttons[14]?.pressed;
      const dpadRight = gamepad.buttons[15]?.pressed;
      
      if (buttonA) config.onEnter?.();
      if (buttonB) config.onEscape?.();
      
      if (dpadUp || leftStickY < -0.5) config.onArrowUp?.();
      if (dpadDown || leftStickY > 0.5) config.onArrowDown?.();
      if (dpadLeft || leftStickX < -0.5) config.onArrowLeft?.();
      if (dpadRight || leftStickX > 0.5) config.onArrowRight?.();
    }
  }, [config]);

  useEffect(() => {
    // Keyboard event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Gamepad polling
    const gamepadInterval = setInterval(handleGamepadInput, 100);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(gamepadInterval);
    };
  }, [handleKeyDown, handleGamepadInput]);
};

// Hook for TV-style navigation grid
export const useGridNavigation = (
  gridId: string,
  rows: number,
  cols: number,
  initialPosition: { row: number; col: number } = { row: 0, col: 0 }
) => {
  const { state, setFocusedElement } = useApp();
  
  const getElementId = useCallback((row: number, col: number) => {
    return `${gridId}-${row}-${col}`;
  }, [gridId]);

  const getCurrentPosition = useCallback(() => {
    if (!state.focusedElement || !state.focusedElement.startsWith(gridId)) {
      return initialPosition;
    }
    
    const parts = state.focusedElement.split('-');
    const row = parseInt(parts[parts.length - 2]) || 0;
    const col = parseInt(parts[parts.length - 1]) || 0;
    
    return { row: Math.min(row, rows - 1), col: Math.min(col, cols - 1) };
  }, [state.focusedElement, gridId, rows, cols, initialPosition]);

  const navigateGrid = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    const { row, col } = getCurrentPosition();
    let newRow = row;
    let newCol = col;

    switch (direction) {
      case 'up':
        newRow = Math.max(0, row - 1);
        break;
      case 'down':
        newRow = Math.min(rows - 1, row + 1);
        break;
      case 'left':
        newCol = Math.max(0, col - 1);
        break;
      case 'right':
        newCol = Math.min(cols - 1, col + 1);
        break;
    }

    const newElementId = getElementId(newRow, newCol);
    setFocusedElement(newElementId);
    
    // Focus the actual DOM element
    const element = document.getElementById(newElementId);
    if (element) {
      element.focus();
    }
  }, [getCurrentPosition, rows, cols, getElementId, setFocusedElement]);

  const inputConfig: InputConfig = {
    onArrowUp: () => navigateGrid('up'),
    onArrowDown: () => navigateGrid('down'),
    onArrowLeft: () => navigateGrid('left'),
    onArrowRight: () => navigateGrid('right'),
  };

  useInput(inputConfig);

  return {
    getCurrentPosition,
    getElementId,
    navigateGrid,
    focusedElement: state.focusedElement,
  };
};