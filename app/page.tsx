"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight, BookOpen, Brain, Copy, CheckCircle2, Check, ExternalLink } from "lucide-react";
import { useAssessmentStore } from "@/store/useAssessmentStore";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [copiedEnglish, setCopiedEnglish] = useState(false);
  const [copiedPersonality, setCopiedPersonality] = useState(false);

  const { 
    englishStatus, 
    personalityStatus, 
    generateEnglishUrl, 
    generatePersonalityUrl, 
    resetAssessment 
  } = useAssessmentStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isEnglishDone = englishStatus === "completed";
  const isPersonalityDone = personalityStatus === "completed";

  const englishUrl = isEnglishDone ? `${window.location.origin}${generateEnglishUrl()}` : "";
  const personalityUrl = isPersonalityDone ? `${window.location.origin}${generatePersonalityUrl()}` : "";

  const handleCopy = (url: string, type: 'english' | 'personality') => {
    navigator.clipboard.writeText(url);
    if (type === 'english') {
      setCopiedEnglish(true);
      setTimeout(() => setCopiedEnglish(false), 2000);
    } else {
      setCopiedPersonality(true);
      setTimeout(() => setCopiedPersonality(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* Top Navigation Bar with Custom Logo */}
      <nav className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            {/* Next.js Image Component rendering your logo */}
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10">
              <Image 
                src="/logo.png" 
                alt="Elevate Remote Solutions Logo" 
                width={40} 
                height={40} 
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 hidden sm:block">
              Elevate <span className="text-purple-700 font-medium">Remote Solutions</span>
            </span>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 sm:hidden">
              Elevate
            </span>
          </div>

          <div className="text-sm font-medium text-slate-500">
            Applicant Portal
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-5">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-purple-50 text-purple-700 uppercase tracking-wider mb-2">
            Screening Process
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Complete your Assessment
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Please complete the modules below. Once finished, you will receive a unique link to attach to your job application.
          </p>
        </div>

        {/* Assessment Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* --- ENGLISH CARD --- */}
          <div className={`bg-white rounded-2xl p-8 border shadow-sm flex flex-col h-full transition-all duration-300 ${isEnglishDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200 hover:shadow-lg hover:-translate-y-1'}`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm ${isEnglishDone ? 'bg-emerald-500 text-white' : 'bg-purple-700 text-white'}`}>
              {isEnglishDone ? <CheckCircle2 size={28} /> : <BookOpen size={28} />}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">English Proficiency</h3>
            <p className="text-slate-600 mb-8 flex-grow leading-relaxed">
              A comprehensive evaluation of your business English, grammar, and reading comprehension skills tailored for remote communication.
            </p>
            
            {isEnglishDone ? (
              <div className="space-y-4 mt-auto">
                <div className="flex items-center text-sm font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" /> Module Completed
                </div>
                <div className="flex gap-2">
                  <input type="text" readOnly value={englishUrl} className="w-full bg-white border border-emerald-200 text-slate-500 text-xs rounded-lg px-3 py-2 outline-none cursor-text" />
                  <button onClick={() => handleCopy(englishUrl, 'english')} className="flex-shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center shadow-sm">
                    {copiedEnglish ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <Link href={englishUrl} className="flex-shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-lg transition-colors flex items-center" title="View Result">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <Link href="/english" className="group inline-flex items-center justify-center w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 px-4 rounded-xl transition-all mt-auto shadow-sm">
                Start English Test <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          {/* --- PERSONALITY CARD --- */}
          <div className={`bg-white rounded-2xl p-8 border shadow-sm flex flex-col h-full transition-all duration-300 ${isPersonalityDone ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200 hover:shadow-lg hover:-translate-y-1'}`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm ${isPersonalityDone ? 'bg-emerald-500 text-white' : 'bg-emerald-600 text-white'}`}>
              {isPersonalityDone ? <CheckCircle2 size={28} /> : <Brain size={28} />}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Personality Assessment</h3>
            <p className="text-slate-600 mb-8 flex-grow leading-relaxed">
              A behavioral assessment designed to understand your working style, autonomy, and communication preferences in a remote setting.
            </p>
            
            {isPersonalityDone ? (
              <div className="space-y-4 mt-auto">
                <div className="flex items-center text-sm font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" /> Module Completed
                </div>
                <div className="flex gap-2">
                  <input type="text" readOnly value={personalityUrl} className="w-full bg-white border border-emerald-200 text-slate-500 text-xs rounded-lg px-3 py-2 outline-none cursor-text" />
                  <button onClick={() => handleCopy(personalityUrl, 'personality')} className="flex-shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center shadow-sm">
                    {copiedPersonality ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <Link href={personalityUrl} className="flex-shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-2 rounded-lg transition-colors flex items-center" title="View Result">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <Link href="/personality" className="group inline-flex items-center justify-center w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 px-4 rounded-xl transition-all mt-auto shadow-sm">
                Start Personality Test <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
          
        </div>

        {/* Debug Reset - Hidden naturally at the bottom */}
        {(isEnglishDone || isPersonalityDone) && (
          <div className="text-center pt-16">
            <button onClick={resetAssessment} className="text-xs text-slate-400 hover:text-slate-600 underline transition-colors">
              Reset Data (Admin Debug)
            </button>
          </div>
        )}

      </div>
    </main>
  );
}