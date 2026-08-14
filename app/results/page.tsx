"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertTriangle, User, Copy, Check } from "lucide-react";
import Link from "next/link";

// 1. Move all the logic into a separate component
function ResultsContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any>(null);
  const [type, setType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const rawType = searchParams.get("type");
    const rawData = searchParams.get("data");

    if (!rawData || !rawType) {
      setError("Incomplete assessment link.");
      return;
    }

    try {
      const decodedString = atob(rawData);
      const parsed = JSON.parse(decodedString);
      
      setType(rawType);
      setData(parsed);
    } catch (err) {
      setError("The link appears to be broken or tampered with.");
    }
  }, [searchParams]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-200 text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Invalid Link</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link href="/" className="text-indigo-600 hover:underline">Return to Home</Link>
        </div>
      </main>
    );
  }

  if (!data || !type) return null;

  const MAX_TRAIT_SCORE = 15; 

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 flex justify-center">
      <div className="w-full max-w-3xl space-y-8">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            {type === 'english' ? "English Assessment Results" : "Personality Assessment Results"}
          </h1>
          <p className="text-slate-500 mt-2">Elevate Remote Solutions</p>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium py-2.5 px-5 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Link Copied!" : "Copy Link for Application"}
            </button>
          </div>
        </div>

        {/* --- ENGLISH SCORECARD --- */}
        {type === 'english' && data.score !== undefined && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-indigo-50 border-b border-indigo-100 p-4">
              <h2 className="text-lg font-semibold text-indigo-900 flex items-center">
                <CheckCircle2 className="mr-2 w-5 h-5 text-indigo-600" />
                English Proficiency Score
              </h2>
            </div>
            <div className="p-8 text-center">
              <div className="text-5xl font-extrabold text-slate-900 mb-2">
                {data.score}%
              </div>
              <p className="text-slate-500">Overall Accuracy</p>
              <div className="w-full bg-slate-100 rounded-full h-4 mt-6 max-w-md mx-auto">
                <div 
                  className={`h-4 rounded-full transition-all ${data.score >= 80 ? 'bg-emerald-500' : data.score >= 60 ? 'bg-amber-400' : 'bg-red-500'}`} 
                  style={{ width: `${data.score}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* --- PERSONALITY SCORECARD --- */}
        {type === 'personality' && data.traits && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-emerald-50 border-b border-emerald-100 p-4">
              <h2 className="text-lg font-semibold text-emerald-900 flex items-center">
                <User className="mr-2 w-5 h-5 text-emerald-600" />
                Behavioral Trait Breakdown
              </h2>
            </div>
            <div className="p-8">
              <div className="space-y-6 max-w-lg mx-auto">
                {Object.entries(data.traits).map(([trait, score]) => {
                  const numScore = Number(score);
                  const percentage = Math.round((numScore / MAX_TRAIT_SCORE) * 100);
                  
                  return (
                    <div key={trait}>
                      <div className="flex justify-between text-sm font-medium mb-2">
                        <span className="capitalize text-slate-700">{trait}</span>
                        <span className="text-slate-500">{numScore} / {MAX_TRAIT_SCORE}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3">
                        <div 
                          className="bg-emerald-500 h-3 rounded-full transition-all" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        
        <div className="text-center pt-8 border-t border-slate-200">
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
            ← View Portal
          </Link>
        </div>

      </div>
    </main>
  );
}

// 2. Wrap the content in a Suspense boundary for the default export
export default function ResultsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-500 animate-pulse font-medium">Loading results...</div>
      </main>
    }>
      <ResultsContent />
    </Suspense>
  );
}