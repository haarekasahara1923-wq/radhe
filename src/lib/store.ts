import { create } from 'zustand';

interface TypingState {
  language: 'English' | 'Hindi';
  startTime: number | null;
  timeLeft: number; // in seconds
  isStarted: boolean;
  isFinished: boolean;
  content: string;
  userInput: string;
  wpm: number; // Net WPM
  grossWpm: number;
  accuracy: number;
  errors: number;
  cpm: number;
  
  selectedTime: number; // in seconds
  setTimeLimit: (minutes: number) => void;
  setLanguage: (lang: 'English' | 'Hindi') => void;
  setContent: (content: string) => void;
  setUserInput: (input: string) => void;
  startTest: () => void;
  finishTest: () => void;
  updateMetrics: () => void;
  tick: () => void;
  reset: () => void;
  resetStore: () => void;
}

export const useTypingStore = create<TypingState>((set, get) => ({
  language: 'English',
  startTime: null,
  selectedTime: 30 * 60, // Default 30 minutes
  timeLeft: 30 * 60, 
  isStarted: false,
  isFinished: false,
  content: '',
  userInput: '',
  wpm: 0,
  grossWpm: 0,
  accuracy: 0,
  errors: 0,
  cpm: 0,

  setTimeLimit: (minutes) => set({ 
    selectedTime: minutes * 60, 
    timeLeft: minutes * 60,
    startTime: null,
    isStarted: false,
    isFinished: false,
    userInput: '',
    wpm: 0,
    grossWpm: 0,
    accuracy: 0,
    errors: 0,
    cpm: 0
  }),

  setLanguage: (language) => set({ language }),
  setContent: (content) => {
    const { selectedTime } = get();
    set({ 
      content, 
      userInput: '', 
      isStarted: false, 
      isFinished: false, 
      timeLeft: selectedTime,
      startTime: null,
      wpm: 0,
      grossWpm: 0,
      accuracy: 0,
      errors: 0,
      cpm: 0
    });
  },
  
  setUserInput: (userInput) => {
    const state = get();
    if (state.isFinished) return;

    // Limit input to content length
    if (userInput.length > state.content.length) return;
    
    if (!state.isStarted && userInput.length > 0) {
      set({ isStarted: true, startTime: Date.now() });
    }
    
    set({ userInput });
    get().updateMetrics();

    if (userInput.length === state.content.length && state.content.length > 0) {
      get().finishTest();
    }
  },

  startTest: () => set({ isStarted: true, startTime: Date.now() }),
  
  finishTest: () => set({ isFinished: true, isStarted: false }),

  tick: () => {
    const { timeLeft, isStarted, finishTest } = get();
    if (isStarted && timeLeft > 0) {
      set({ timeLeft: timeLeft - 1 });
      if (timeLeft === 1) {
        finishTest();
      }
    }
  },

  updateMetrics: () => {
    const { content, userInput, startTime } = get();
    if (!startTime) return;

    let totalErrors = 0;
    const typedLength = userInput.length;
    
    // Calculate errors
    for (let i = 0; i < typedLength; i++) {
      if (userInput[i] !== content[i]) {
        totalErrors++;
      }
    }

    const timeElapsedInSeconds = (Date.now() - startTime) / 1000;
    if (timeElapsedInSeconds < 1) return; // Don't calculate metrics in the first second to avoid spikes

    const timeElapsedInMinutes = timeElapsedInSeconds / 60;

    // Gross WPM = (total characters typed / 5) / time
    const grossWpm = Math.round((typedLength / 5) / timeElapsedInMinutes);
    
    // Net WPM = Gross WPM - (uncorrected errors / time)
    // Since we don't allow backspacing past current char in some modes, we use standard error penalty
    const netWpm = Math.max(0, Math.round(grossWpm - (totalErrors / timeElapsedInMinutes)));
    
    const accuracy = typedLength > 0 
      ? Math.round(((typedLength - totalErrors) / typedLength) * 100) 
      : 100;
      
    const cpm = Math.round(typedLength / timeElapsedInMinutes);

    set({ wpm: netWpm, grossWpm, accuracy, errors: totalErrors, cpm });
  },

  resetStore: () => {
    const { selectedTime } = get();
    set({
      userInput: '',
      isStarted: false,
      isFinished: false,
      timeLeft: selectedTime,
      startTime: null,
      wpm: 0,
      grossWpm: 0,
      accuracy: 0,
      errors: 0,
      cpm: 0
    });
  },

  reset: () => {
    const { selectedTime } = get();
    set({
      userInput: '',
      isStarted: false,
      isFinished: false,
      timeLeft: selectedTime,
      startTime: null,
      wpm: 0,
      grossWpm: 0,
      accuracy: 0,
      errors: 0,
      cpm: 0
    });
  }

}));


