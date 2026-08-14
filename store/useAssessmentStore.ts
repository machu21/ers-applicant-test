import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AssessmentState {
  englishAnswers: Record<string, string>;
  englishScore: number | null;
  englishStatus: 'idle' | 'in-progress' | 'completed';

  personalityAnswers: Record<string, number>;
  personalityTraits: Record<string, number> | null;
  personalityStatus: 'idle' | 'in-progress' | 'completed';

  setEnglishAnswer: (questionId: string, answer: string) => void;
  setPersonalityAnswer: (questionId: string, score: number) => void;
  
  completeEnglishTest: (finalScore: number) => void;
  completePersonalityTest: (traits: Record<string, number>) => void;
  
  // Replaced the combined URL generator with two separate ones
  generateEnglishUrl: () => string | null;
  generatePersonalityUrl: () => string | null;
  
  resetAssessment: () => void;
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      englishAnswers: {},
      englishScore: null,
      englishStatus: 'idle',
      personalityAnswers: {},
      personalityTraits: null,
      personalityStatus: 'idle',

      setEnglishAnswer: (questionId, answer) => 
        set((state) => ({ englishAnswers: { ...state.englishAnswers, [questionId]: answer }, englishStatus: 'in-progress' })),

      setPersonalityAnswer: (questionId, score) => 
        set((state) => ({ personalityAnswers: { ...state.personalityAnswers, [questionId]: score }, personalityStatus: 'in-progress' })),

      completeEnglishTest: (finalScore) => 
        set(() => ({ englishScore: finalScore, englishStatus: 'completed' })),

      completePersonalityTest: (traits) => 
        set(() => ({ personalityTraits: traits, personalityStatus: 'completed' })),

      // Generates an English-specific URL payload
      generateEnglishUrl: () => {
        const state = get();
        if (state.englishStatus !== 'completed') return null;
        const encodedData = typeof window !== 'undefined' ? btoa(JSON.stringify({ score: state.englishScore })) : '';
        return `/results?type=english&data=${encodedData}`;
      },

      // Generates a Personality-specific URL payload
      generatePersonalityUrl: () => {
        const state = get();
        if (state.personalityStatus !== 'completed') return null;
        const encodedData = typeof window !== 'undefined' ? btoa(JSON.stringify({ traits: state.personalityTraits })) : '';
        return `/results?type=personality&data=${encodedData}`;
      },

      resetAssessment: () => 
        set(() => ({
          englishAnswers: {}, englishScore: null, englishStatus: 'idle',
          personalityAnswers: {}, personalityTraits: null, personalityStatus: 'idle',
        })),
    }),
    { name: 'elevate-assessment-storage' }
  )
);