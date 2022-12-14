import create from "zustand";
import { immer } from "zustand/middleware/immer";

export type GameState = {
  startTime: Date | null;
  endTime: Date | null;
  startGame: () => void;
  endGame: () => void;
  resetTimer: () => void;
  mistakes: string;
  makeMistake: (key: string) => void;
  typed: string;
  type: (key: string) => void;
  removeLastTyped: () => void;
  cleanTyped: () => void;
  isGameFocused: boolean;
  focusGame: () => void;
  unfocusGame: () => void;
  isCapsLockOn: boolean | null;
  capsLockNullify: () => void;
  capsLockOn: () => void;
  capsLockOff: () => void;
  isRestartFocused: boolean | null;
  nullifyRestart: () => void;
  focusRestart: () => void;
  unfocusRestart: () => void;
};

const useGameStore = create<GameState>()(
  immer((set) => ({
    startTime: null,
    endTime: null,
    startGame() {
      set((state) => {
        state.typed = "";
        state.mistakes = "";
        state.startTime = new Date();
      });
    },
    endGame() {
      set((state) => {
        state.endTime = new Date();
      });
    },
    resetTimer() {
      set((state) => {
        state.startTime = null;
        state.endTime = null;
      });
    },
    mistakes: "",
    makeMistake(key: string) {
      set((state) => {
        state.mistakes = state.mistakes.concat(key);
      });
    },
    typed: "",
    type(key: string) {
      set((state) => {
        if (state.isGameFocused) {
          state.typed = state.typed.concat(key);
        }
      });
    },
    removeLastTyped() {
      set((state) => {
        state.typed = state.typed.slice(0, -1);
      });
    },
    cleanTyped() {
      set((state) => {
        state.typed = "";
      });
    },
    isGameFocused: true,
    focusGame() {
      set((state) => {
        state.isGameFocused = true;
      });
    },
    unfocusGame() {
      set((state) => {
        state.isGameFocused = false;
      });
    },
    isCapsLockOn: null,
    capsLockNullify() {
      set((state) => {
        state.isCapsLockOn = null;
      });
    },
    capsLockOn() {
      set((state) => {
        state.isCapsLockOn = true;
      });
    },
    capsLockOff() {
      set((state) => {
        state.isCapsLockOn = false;
      });
    },
    isRestartFocused: null,
    nullifyRestart() {
      set((state) => {
        state.isRestartFocused = null;
      });
    },
    focusRestart() {
      set((state) => {
        state.isRestartFocused = true;
      });
    },
    unfocusRestart() {
      set((state) => {
        state.isRestartFocused = false;
      });
    },
  })),
);

export default useGameStore;
