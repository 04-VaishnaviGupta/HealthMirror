import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Monitor, Menu, Brain, Shield, Stethoscope, Search, Bell } from "lucide-react";
import Dashboard from '@/components/Dashboard';
import HealthMirrorLogo from '@/components/HealthMirrorLogo';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  if (showDashboard) {
    return <Dashboard onBack={() => setShowDashboard(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-light via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container mx-auto px-4 xs:px-6 py-3 xs:py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 xs:space-x-3">
              <div className="w-8 xs:w-9 sm:w-10 h-8 xs:h-9 sm:h-10">
                <HealthMirrorLogo className="w-full h-full" />
              </div>
              <span className="text-base xs:text-lg sm:text-xl font-bold bg-gradient-to-r from-health-primary to-health-accent bg-clip-text text-transparent">
                HealthMirror
              </span>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <a href="#features" className="text-gray-700 hover:text-health-primary transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-health-primary transition-colors font-medium">How It Works</a>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t mt-3">
              <div className="flex flex-col space-y-3">
                <a 
                  href="#features" 
                  className="text-gray-700 hover:text-health-primary transition-colors font-medium px-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  className="text-gray-700 hover:text-health-primary transition-colors font-medium px-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  How It Works
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 xs:pt-24 sm:pt-32 pb-12 xs:pb-16 sm:pb-20 px-4 xs:px-6">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in max-w-[90rem] mx-auto">
            <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800 mb-4 xs:mb-6 sm:mb-8 leading-tight">
              Your AI Wellness
              <span className="block bg-gradient-to-r from-health-primary via-health-accent to-health-secondary bg-clip-text text-transparent">
                Mirror
              </span>
            </h1>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 xs:mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-2 xs:px-4">
              Advanced AI-powered medical analysis using facial recognition to detect stress, fatigue, and skin conditions. 
              Get comprehensive health insights with medical-grade accuracy in seconds.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 sm:gap-6 justify-center px-2 xs:px-4 max-w-3xl mx-auto">
              <Button 
                onClick={() => setShowDashboard(true)}
                className="bg-gradient-to-r from-health-primary to-health-accent hover:from-health-primary/90 hover:to-health-accent/90 text-white px-4 xs:px-6 sm:px-10 py-5 xs:py-6 sm:py-8 text-base xs:text-lg sm:text-xl rounded-lg xs:rounded-xl sm:rounded-2xl health-shadow-lg transition-all duration-300 hover:scale-105 transform w-full xs:w-auto"
              >
                <Camera className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 mr-2 xs:mr-2 sm:mr-3" />
                Start Medical Analysis
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-health-primary text-health-primary hover:bg-health-primary hover:text-white px-4 xs:px-6 sm:px-10 py-5 xs:py-6 sm:py-8 text-base xs:text-lg sm:text-xl rounded-lg xs:rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 transform w-full xs:w-auto"
              >
                <Monitor className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 mr-2 xs:mr-2 sm:mr-3" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 xs:py-16 sm:py-24 px-4 xs:px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8 xs:mb-10 sm:mb-16">
            Medical-Grade AI Analysis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 max-w-7xl mx-auto">
            <Card className="glass-effect border-0 hover:scale-105 transition-all duration-300 group">
              <CardContent className="p-4 xs:p-6 sm:p-10 text-center">
                <div className="w-14 xs:w-16 sm:w-20 h-14 xs:h-16 sm:h-20 bg-gradient-to-r from-health-danger to-health-warning rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 xs:mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-7 xs:w-8 sm:w-10 h-7 xs:h-8 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold mb-2 xs:mb-3 sm:mb-4 text-gray-800">Stress & Emotion Detection</h3>
                <p className="text-sm xs:text-base text-gray-600 leading-relaxed">
                  Real-time analysis using FER-2013 and AffectNet datasets to detect stress levels, fatigue markers, and emotional states through advanced facial expression recognition.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 hover:scale-105 transition-all duration-300 group">
              <CardContent className="p-4 xs:p-6 sm:p-10 text-center">
                <div className="w-14 xs:w-16 sm:w-20 h-14 xs:h-16 sm:h-20 bg-gradient-to-r from-health-secondary to-health-success rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 xs:mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-7 xs:w-8 sm:w-10 h-7 xs:h-8 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold mb-2 xs:mb-3 sm:mb-4 text-gray-800">Comprehensive Skin Analysis</h3>
                <p className="text-sm xs:text-base text-gray-600 leading-relaxed">
                  Advanced CNN models trained on DermNet and SD-198 medical datasets to identify acne, pigmentation disorders, aging signs, and dermatological conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect border-0 hover:scale-105 transition-all duration-300 group">
              <CardContent className="p-4 xs:p-6 sm:p-10 text-center">
                <div className="w-14 xs:w-16 sm:w-20 h-14 xs:h-16 sm:h-20 bg-gradient-to-r from-health-accent to-health-info rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 xs:mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="w-7 xs:w-8 sm:w-10 h-7 xs:h-8 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold mb-2 xs:mb-3 sm:mb-4 text-gray-800">Personalized Health Plan</h3>
                <p className="text-sm xs:text-base text-gray-600 leading-relaxed">
                  Receive evidence-based recommendations, treatment protocols, and wellness strategies tailored to your unique health profile and analyzed conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-12 xs:py-16 sm:py-24 px-4 xs:px-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
        <div className="container mx-auto">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8 xs:mb-10 sm:mb-16">
            Medical AI Analysis Process
          </h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-8 max-w-7xl mx-auto">
            {[
              { step: "1", title: "Facial Capture", desc: "10-second high-resolution webcam analysis capturing 468 facial landmarks", icon: Camera, color: "from-health-primary to-health-info" },
              { step: "2", title: "AI Processing", desc: "Multi-model analysis using medical datasets and computer vision algorithms", icon: Search, color: "from-health-secondary to-health-success" },
              { step: "3", title: "Health Assessment", desc: "Comprehensive evaluation of stress, skin health, and wellness indicators", icon: Monitor, color: "from-health-accent to-health-primary" },
              { step: "4", title: "Treatment Plan", desc: "Personalized medical recommendations and wellness optimization strategies", icon: Bell, color: "from-health-warning to-health-danger" }
            ].map((item, index) => (
              <div key={index} className="text-center animate-float group" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className={`w-14 xs:w-16 sm:w-24 h-14 xs:h-16 sm:h-24 bg-gradient-to-r ${item.color} rounded-xl xs:rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-3 xs:mb-4 sm:mb-6 text-white font-bold text-xl xs:text-2xl sm:text-3xl shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  {item.step}
                </div>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold mb-2 xs:mb-3 sm:mb-4 text-gray-800">{item.title}</h3>
                <p className="text-sm xs:text-base text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 xs:py-8 sm:py-12 px-4 xs:px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 xs:space-x-3 mb-3 xs:mb-4 sm:mb-6">
            <div className="w-8 xs:w-9 sm:w-10 h-8 xs:h-9 sm:h-10">
              <HealthMirrorLogo className="w-full h-full" />
            </div>
            <span className="text-lg xs:text-xl sm:text-2xl font-bold">HealthMirror</span>
          </div>
          <p className="text-sm xs:text-base sm:text-lg text-gray-400">© 2025 HealthMirror. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
