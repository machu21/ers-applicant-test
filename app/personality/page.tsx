"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import personalityQuestions from "../../data/personality-pool.json";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { ArrowRight } from "lucide-react";

// The 5-point scale definition
const scaleOptions = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

export default function PersonalityTest() {
  const router = useRouter();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  
  const { setPersonalityAnswer, completePersonalityTest, personalityStatus } = useAssessmentStore();

  const currentQuestion = personalityQuestions[currentIndex];
  const isLastQuestion = currentIndex === personalityQuestions.length - 1;

  // Prevent re-taking
  useEffect(() => {
    if (personalityStatus === 'completed') {
      router.push("/");
    }
  }, [personalityStatus, router]);

const handleNext = () => {
    if (selectedValue === null) return;

    setPersonalityAnswer(currentQuestion.id, selectedValue);

    if (isLastQuestion) {
      const finalTraits: Record<string, number> = {
        autonomy: 0,
        conscientiousness: 0,
        communication: 0
      };
      
      const allAnswers = { ...useAssessmentStore.getState().personalityAnswers, [currentQuestion.id]: selectedValue };

      personalityQuestions.forEach((q) => {
        const answerVal = allAnswers[q.id];
        const points = q.polarity === 1 ? answerVal : (6 - answerVal);
        finalTraits[q.trait] += points;
      });

      completePersonalityTest(finalTraits);
      
      // NEW: Generate the URL and go straight to the results page!
      const encodedData = btoa(JSON.stringify({ traits: finalTraits }));
      router.push(`/results?type=personality&data=${encodedData}`);
      
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedValue(null);
    }
  };

  if (personalityStatus === 'completed') return null;

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 flex flex-col items-center">
      
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Statement {currentIndex + 1} of {personalityQuestions.length}</span>
          <span>{Math.round(((currentIndex) / personalityQuestions.length) * 100)}% Completed</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div 
            className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${((currentIndex) / personalityQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Statement Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        <div className="p-8 md:p-10 text-center">
          <h2 className="text-2xl font-medium text-slate-900 mb-12 leading-relaxed">
            "{currentQuestion.statement}"
          </h2>

          {/* Likert Scale */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-2">
            {scaleOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedValue(option.value)}
                className={`
                  flex flex-col items-center p-3 rounded-xl transition-all w-full sm:w-24
                  ${
                    selectedValue === option.value
                      ? "bg-emerald-50 border-2 border-emerald-500 shadow-sm"
                      : "bg-white border-2 border-slate-100 hover:border-emerald-200 hover:bg-slate-50"
                  }
                `}
              >
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center mb-2 font-bold
                    ${
                      selectedValue === option.value 
                        ? "bg-emerald-500 text-white" 
                        : "bg-slate-100 text-slate-500"
                    }
                  `}
                >
                  {option.value}
                </div>
                <span className={`text-xs font-medium text-center ${selectedValue === option.value ? "text-emerald-700" : "text-slate-500"}`}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Action */}
        <div className="bg-slate-50 px-8 py-5 border-t border-slate-200 flex justify-end">
          <button
            onClick={handleNext}
            disabled={selectedValue === null}
            className={`
              inline-flex items-center justify-center py-3 px-6 rounded-lg font-medium transition-all
              ${
                selectedValue !== null
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }
            `}
          >
            {isLastQuestion ? "Complete Module" : "Next Statement"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>

      </div>
    </main>
  );
}