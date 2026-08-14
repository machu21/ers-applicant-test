"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import englishQuestions from "../../data/english-pool.json";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function EnglishTest() {
  const router = useRouter();
  
  // Local state for the UI
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Global Zustand state
  const { setEnglishAnswer, completeEnglishTest, englishStatus } = useAssessmentStore();

  const currentQuestion = englishQuestions[currentIndex];
  const isLastQuestion = currentIndex === englishQuestions.length - 1;

  // Prevent re-taking if already completed
  useEffect(() => {
    if (englishStatus === 'completed') {
      router.push("/");
    }
  }, [englishStatus, router]);

const handleNext = () => {
    if (!selectedOption) return;

    setEnglishAnswer(currentQuestion.id, selectedOption);

    if (isLastQuestion) {
      let correctAnswers = 0;
      const allAnswers = { ...useAssessmentStore.getState().englishAnswers, [currentQuestion.id]: selectedOption };

      englishQuestions.forEach((q) => {
        if (allAnswers[q.id] === q.correctAnswer) {
          correctAnswers++;
        }
      });

      const finalScore = Math.round((correctAnswers / englishQuestions.length) * 100);
      completeEnglishTest(finalScore);
      
      // NEW: Generate the URL and go straight to the results page!
      const encodedData = btoa(JSON.stringify({ score: finalScore }));
      router.push(`/results?type=english&data=${encodedData}`);
      
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };
  
  if (englishStatus === 'completed') return null; // Avoid flicker before redirect

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 flex flex-col items-center">
      
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Question {currentIndex + 1} of {englishQuestions.length}</span>
          <span>{Math.round(((currentIndex) / englishQuestions.length) * 100)}% Completed</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${((currentIndex) / englishQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        <div className="p-8 md:p-10">
          {/* Category Pill */}
          <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 uppercase tracking-wider">
            {currentQuestion.category.replace("-", " ")}
          </div>

          <h2 className="text-2xl font-semibold text-slate-900 mb-8 leading-relaxed whitespace-pre-line">
            {currentQuestion.text}
          </h2>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(option)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between
                  ${
                    selectedOption === option
                      ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                      : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700"
                  }
                `}
              >
                <span className="text-lg">{option}</span>
                {selectedOption === option && (
                  <CheckCircle2 className="text-indigo-600 w-6 h-6" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="bg-slate-50 px-8 py-5 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className={`
              inline-flex items-center justify-center py-3 px-6 rounded-lg font-medium transition-all
              ${
                selectedOption
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }
            `}
          >
            {isLastQuestion ? "Complete Module" : "Next Question"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>

      </div>
    </main>
  );
}