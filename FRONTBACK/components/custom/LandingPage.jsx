"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Code, MessageSquare, Zap, Lock, Clock, Database, ArrowRight, Menu, X } from 'lucide-react';

function LandingPage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const features = [
    {
      icon: MessageSquare,
      title: "AI Chat Interface",
      description: "Real-time conversation with AI assistant, token-based usage system, and persistent message history",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      icon: Code,
      title: "Code Generation",
      description: "Generate complete React applications with AI, preview in real-time with Sandpack integration",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      icon: Lock,
      title: "Google OAuth",
      description: "Secure authentication with Google Sign-in, user profile management, and token tracking",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      icon: Database,
      title: "Workspace Management",
      description: "Create and manage multiple workspaces, save chat histories and generated code with Convex",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10"
    },
    {
      icon: Zap,
      title: "Token System",
      description: "Start with 50,000 tokens, consumption based on AI response size with real-time balance tracking",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-500/10 to-orange-500/10"
    },
    {
      icon: Clock,
      title: "Real-time Sync",
      description: "Automatic data synchronization across all devices with persistent storage",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-500/10 to-blue-500/10"
    }
  ];

  const workflow = [
    {
      step: 1,
      title: "Authenticate",
      description: "Sign in securely with Google OAuth",
      icon: Lock
    },
    {
      step: 2,
      title: "Create Workspace",
      description: "Start a new project workspace",
      icon: Database
    },
    {
      step: 3,
      title: "Interact with AI",
      description: "Chat with AI or generate code",
      icon: MessageSquare
    },
    {
      step: 4,
      title: "Preview & Edit",
      description: "See changes in real-time",
      icon: Code
    },
    {
      step: 5,
      title: "Save & Sync",
      description: "Everything persists automatically",
      icon: Clock
    }
  ];

  return (
    <div className="bg-black text-white overflow-hidden min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-gray-900/50 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Sparky Logo" className="w-10 h-10 object-contain" />
              <span className="text-lg font-bold tracking-tight">Sparky</span>
            </a>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
            <a href="#workflow" className="text-gray-300 hover:text-white transition">How It Works</a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => router.push('/hero')} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-sm hover:opacity-95 transition">Go to Workspace</button>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" className="p-2 rounded-md text-gray-300 hover:text-white">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-black border-t border-gray-900/50">
            <div className="px-6 py-4 flex flex-col gap-3">
              <a href="#features" onClick={() => setMobileOpen(false)} className="text-gray-300 py-2">Features</a>
              <a href="#workflow" onClick={() => setMobileOpen(false)} className="text-gray-300 py-2">How It Works</a>
              <div className="pt-2 border-t border-gray-900/40 mt-2 flex flex-col gap-2">
                <button onClick={() => { setMobileOpen(false); router.push('/hero'); }} className="w-full text-left px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold">Go to Workspace</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            {/* Left Content */}
            <div className="relative z-10">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-medium">
                  🚀 AI-Powered Development
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                Meet Sparky—<br/>Your AI Development<br/><span className="text-gray-600">Companion</span>
              </h1>
              <p className="text-gray-400 text-base mb-8 leading-relaxed">Generate code, chat with AI, and preview applications in real-time. Powered by Google Gemini and built with modern technologies.</p>
              <button onClick={() => router.push('/hero')} className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition text-sm flex items-center gap-2 group">
                Go To Workspace
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </div>

            {/* Right Robot Image (enlarged & responsive) */}
            <div className="relative h-auto md:h-[640px] flex items-center justify-center">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex items-center justify-center">
                <img 
                  src="/abc.png" 
                  alt="Sparky AI Robot" 
                  className="w-48 md:w-96 lg:w-[520px] object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative border-t border-gray-900/50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-3">Powerful Features</h2>
            <p className="text-gray-400 text-base">Everything you need for AI-powered development</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              const isHovered = hoveredCard === i;
              return (
                <div 
                  key={i}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`relative group overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer transform ${
                    isHovered 
                      ? 'border-transparent scale-105 shadow-2xl' 
                      : 'border-gray-800/60 hover:border-gray-700'
                  }`}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className={`absolute inset-0 bg-gray-950/50 ${isHovered ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      isHovered 
                        ? `bg-gradient-to-br ${feature.gradient} shadow-lg scale-110` 
                        : `bg-gradient-to-br ${feature.gradient} opacity-80`
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold mb-3 group-hover:translate-x-1 transition-transform">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed flex-grow group-hover:text-gray-300 transition-colors">{feature.description}</p>
                    
                    <div className={`mt-6 flex items-center gap-2 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0`}>
                      Learn more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Border gradient on hover */}
                  {isHovered && (
                    <div className={`absolute inset-0 rounded-2xl pointer-events-none border border-transparent bg-gradient-to-br ${feature.gradient} opacity-20`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <div id="workflow" className="relative border-t border-gray-900/50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-3">How It Works</h2>
            <p className="text-gray-400 text-base">Simple steps to get started</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2">
            {workflow.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="relative group">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-6 h-full hover:border-gray-700 transition group cursor-pointer">
                    {/* Step Number */}
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 font-bold text-white group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    
                    {/* Icon */}
                    <div className="mb-4">
                      <Icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="font-bold text-sm mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors">{item.description}</p>
                  </div>
                  
                  {/* Arrow between steps */}
                  {i < workflow.length - 1 && (
                    <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20">
                      <div className="text-gray-600 text-lg group-hover:text-blue-400 transition-colors">→</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="relative border-t border-gray-900/50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "50,000 Tokens",
                description: "Start with generous token allocation to explore all features",
                icon: Zap
              },
              {
                title: "Real-time Preview",
                description: "See your code changes instantly with Sandpack integration",
                icon: Code
              },
              {
                title: "Auto-Save",
                description: "All your work is automatically saved and synchronized",
                icon: Database
              }
            ].map((highlight, i) => {
              const Icon = highlight.icon;
              return (
                <div key={i} className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition group">
                  <Icon className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                  <p className="text-gray-400 text-sm">{highlight.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative border-t border-gray-900/50 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Build with AI?</h2>
          <p className="text-gray-400 text-lg mb-10">Start generating code, chat with AI, and build faster with Sparky</p>
          
          <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold transition text-base flex items-center gap-2 mx-auto group">
            Go To Workspace
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-gray-900/50 py-8 px-6 sm:px-8 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs">© 2024 Sparky AI. All rights reserved.</p>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition text-lg font-bold">f</a>
            <a href="#" className="text-gray-400 hover:text-white transition text-lg font-bold">𝕏</a>
            <a href="#" className="text-gray-400 hover:text-white transition text-lg">▶</a>
          </div>
          
          <p className="text-gray-500 text-xs">AI-Powered Development</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;