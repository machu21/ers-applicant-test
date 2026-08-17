"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight, BookOpen, Brain, Copy, CheckCircle2, Check, ExternalLink, Sparkles } from "lucide-react";
import { useAssessmentStore } from "@/store/useAssessmentStore";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
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
    // Trigger entrance animation shortly after mount
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
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
    <main className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden selection:bg-purple-200 selection:text-purple-900">
      
      {/* 1. Ambient Background Layer (The Gimmick) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-400/20 rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/20 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite_alternate] pointer-events-none"></div>

      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-multiply">
        <Image 
          src="https://plus.unsplash.com/premium_photo-1681487178876-a1156952ec60?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D" 
          alt="Abstract Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Top Navigation Bar */}
      <nav className="w-full bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] sticky top-0 z-50 transition-all">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 transition-transform duration-500 group-hover:rotate-12">
              <Image src="/logo.png" alt="Elevate Remote Solutions Logo" width={40} height={40} className="w-full h-full object-contain" priority />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 hidden sm:block">
              Elevate <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600 font-bold">Remote Solutions</span>
            </span>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 sm:hidden">Elevate</span>
          </div>
          <div className="text-sm font-semibold text-slate-500 bg-slate-100/80 px-4 py-1.5 rounded-full border border-slate-200/50">
            Applicant Portal
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className={`flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16 relative z-10 transition-all duration-1000 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Hero Section */}
        <div className="text-center space-y-6 relative">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-white border border-purple-100 text-purple-700 uppercase tracking-widest mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 mr-2 text-purple-500" />
            Screening Process
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
            Complete your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 bg-[length:200%_auto] animate-[pulse_4s_linear_infinite]">
              Assessment
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Please complete the modules below. Once finished, you will receive a secure, unique link to attach to your job application.
          </p>
        </div>

        {/* Assessment Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          
          {/* --- ENGLISH CARD --- */}
          <div className={`group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border transition-all duration-500 flex flex-col h-full ${isEnglishDone ? 'border-emerald-200/60 shadow-[0_8px_30px_rgb(16,185,129,0.12)]' : 'border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2'}`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner transition-transform duration-500 ${isEnglishDone ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white' : 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white group-hover:scale-110 group-hover:rotate-3'}`}>
              {isEnglishDone ? <CheckCircle2 size={32} /> : <BookOpen size={32} />}
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">English Proficiency</h3>
            <p className="text-slate-600 mb-10 flex-grow leading-relaxed">
              A comprehensive evaluation of your business English, grammar, and reading comprehension skills tailored for remote communication.
            </p>
            
            {isEnglishDone ? (
              <div className="space-y-4 mt-auto bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
                <div className="flex items-center text-sm font-bold text-emerald-700 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Completed
                </div>
                <div className="flex gap-2">
                  <input type="text" readOnly value={englishUrl} className="w-full bg-white border border-emerald-200/60 text-slate-500 text-xs rounded-xl px-4 py-3 outline-none cursor-text font-medium" />
                  <button onClick={() => handleCopy(englishUrl, 'english')} className="flex-shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl transition-all flex items-center shadow-md hover:shadow-lg active:scale-95">
                    {copiedEnglish ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <Link href={englishUrl} className="flex-shrink-0 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-4 py-3 rounded-xl transition-all flex items-center shadow-sm active:scale-95" title="View Result">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <Link href="/english" className="relative overflow-hidden inline-flex items-center justify-center w-full bg-slate-900 text-white font-semibold py-4 px-6 rounded-2xl transition-all mt-auto shadow-md hover:shadow-xl hover:bg-slate-800 active:scale-[0.98] group/btn">
                <span className="relative z-10 flex items-center">
                  Start English Test <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                </span>
              </Link>
            )}
          </div>

          {/* --- WORKING GENIUS CARD --- */}
          <div className={`group relative bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border transition-all duration-500 flex flex-col h-full ${isPersonalityDone ? 'border-emerald-200/60 shadow-[0_8px_30px_rgb(16,185,129,0.12)]' : 'border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2'}`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner transition-transform duration-500 ${isPersonalityDone ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white' : 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white group-hover:scale-110 group-hover:-rotate-3'}`}>
              {isPersonalityDone ? <CheckCircle2 size={32} /> : <Brain size={32} />}
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Working Genius</h3>
            <p className="text-slate-600 mb-10 flex-grow leading-relaxed">
              Discover your innate working genius and how you can best contribute to a team. This assessment helps identify your collaborative strengths.
            </p>
            
            {isPersonalityDone ? (
              <div className="space-y-4 mt-auto bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
                <div className="flex items-center text-sm font-bold text-emerald-700 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Completed
                </div>
                <div className="flex gap-2">
                  <input type="text" readOnly value={personalityUrl} className="w-full bg-white border border-emerald-200/60 text-slate-500 text-xs rounded-xl px-4 py-3 outline-none cursor-text font-medium" />
                  <button onClick={() => handleCopy(personalityUrl, 'personality')} className="flex-shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl transition-all flex items-center shadow-md hover:shadow-lg active:scale-95">
                    {copiedPersonality ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <Link href={personalityUrl} className="flex-shrink-0 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-4 py-3 rounded-xl transition-all flex items-center shadow-sm active:scale-95" title="View Result">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ) : (
              <Link href="/personality" className="relative overflow-hidden inline-flex items-center justify-center w-full bg-slate-900 text-white font-semibold py-4 px-6 rounded-2xl transition-all mt-auto shadow-md hover:shadow-xl hover:bg-slate-800 active:scale-[0.98] group/btn">
                <span className="relative z-10 flex items-center">
                  Start Assessment <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                </span>
              </Link>
            )}
          </div>
          
        </div>

        {/* Debug Reset */}
        {(isEnglishDone || isPersonalityDone) && (
          <div className="text-center pt-8 pb-4">
            <button onClick={resetAssessment} className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors bg-white/50 px-4 py-2 rounded-full border border-slate-200/50">
              Reset Data
            </button>
          </div>
        )}

      </div>
    </main>
  );
}