import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button } from "@/components/ui/button";
import { Camera, Brain, Shield, Eye, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { validateAndNormalizeHealthData } from '@/utils/health-analysis-validator';

interface WebcamScannerProps {
  onScanComplete: (data: any) => void;
}

const WebcamScanner = ({ onScanComplete }: WebcamScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const { toast } = useToast();

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user"
  };

  const handleUserMedia = useCallback(() => {
    console.log("Camera access granted");
    setHasPermission(true);
  }, []);

  const handleUserMediaError = useCallback((error: any) => {
    console.error("Camera access error:", error);
    toast({
      title: "Camera Access Required",
      description: "Please allow camera access to use HealthMirror's medical analysis feature.",
      variant: "destructive"
    });
    setHasPermission(false);
  }, [toast]);

  const performAIScan = useCallback(async () => {
    if (!hasPermission || !webcamRef.current) {
      toast({
        title: "Camera Access Required",
        description: "Please enable camera access first.",
        variant: "destructive"
      });
      return;
    }

    // Start countdown
    setCountdown(2);
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 0) {
          clearInterval(countdownInterval);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    // Wait for countdown
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsScanning(true);
    setScanProgress(0);

    try {
      // Capture image from webcam
      const imageSrc = webcamRef.current.getScreenshot();
      
      if (!imageSrc) {
        throw new Error("Failed to capture image from webcam");
      }

      // Simulate progress during analysis with more realistic progression
      const progressSteps = [10, 25, 40, 60, 75, 90];
      let currentStep = 0;
      
      const progressInterval = setInterval(() => {
        if (currentStep < progressSteps.length) {
          setScanProgress(progressSteps[currentStep]);
          currentStep++;
        } else {
          clearInterval(progressInterval);
        }
      }, 800);

      console.log("Processing comprehensive medical analysis...");
      
      // Call Supabase Edge Function for AI analysis
      const { data, error } = await supabase.functions.invoke('analyze-health', {
        body: { imageData: imageSrc }
      });

      clearInterval(progressInterval);
      setScanProgress(100);

      if (error) {
        console.error("Analysis error:", error);
        throw new Error(error.message || "Failed to analyze image");
      }

      if (!data) {
        throw new Error("No analysis data received");
      }

      console.log("Raw AI Analysis result:", data);

      // Validate and normalize the data for consistency
      const validatedData = validateAndNormalizeHealthData(data);
      console.log("Validated analysis data:", validatedData);

      // Complete the scan
      setTimeout(() => {
        setIsScanning(false);
        setScanProgress(0);
        onScanComplete(validatedData);
        
        toast({
          title: "Medical Analysis Complete!",
          description: "Your comprehensive health assessment is ready with professional-grade insights.",
        });
      }, 1000);

    } catch (error) {
      console.error("Scan error:", error);
      setIsScanning(false);
      setScanProgress(0);
      
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Please try again with better lighting.",
        variant: "destructive"
      });
    }
  }, [hasPermission, onScanComplete, toast]);

  return (
    <div className="space-y-4 xs:space-y-5 sm:space-y-6">
      {/* Video Feed */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl xs:rounded-2xl overflow-hidden aspect-video shadow-xl">
        <Webcam
          ref={webcamRef}
          audio={false}
          videoConstraints={videoConstraints}
          onUserMedia={handleUserMedia}
          onUserMediaError={handleUserMediaError}
          className="w-full h-full object-cover"
          screenshotFormat="image/jpeg"
          screenshotQuality={0.8}
        />
        
        {/* Countdown Overlay */}
        {countdown !== null && (
          <div className="absolute inset-0 bg-gradient-to-br from-health-primary/20 to-health-accent/20 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white/95 backdrop-blur-md rounded-full w-24 xs:w-28 sm:w-32 h-24 xs:h-28 sm:h-32 flex items-center justify-center shadow-2xl border-2 border-health-primary">
              <span className="text-4xl xs:text-5xl sm:text-6xl font-bold bg-gradient-to-r from-health-primary to-health-accent bg-clip-text text-transparent">
                {countdown}
              </span>
            </div>
          </div>
        )}
        
        {/* Scan Overlay */}
        {isScanning && (
          <div className="absolute inset-0 bg-gradient-to-br from-health-primary/20 to-health-accent/20 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white/95 backdrop-blur-md rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 text-center w-[85%] xs:w-[80%] sm:w-[75%] max-w-sm mx-auto shadow-xl border border-white/20">
              <div className="w-10 xs:w-14 sm:w-16 h-10 xs:h-14 sm:h-16 bg-gradient-to-r from-health-primary to-health-accent rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 xs:mb-3 sm:mb-4">
                <Brain className="w-5 xs:w-7 sm:w-8 h-5 xs:h-7 sm:h-8 text-white" />
              </div>
              <p className="text-base xs:text-lg sm:text-xl font-bold mb-2 xs:mb-2.5 sm:mb-3 bg-gradient-to-r from-health-primary to-health-accent bg-clip-text text-transparent">
                AI Analyzing...
              </p>
              <div className="w-32 xs:w-40 sm:w-48 bg-gray-200 rounded-full h-2.5 xs:h-3 sm:h-3.5 mb-2 xs:mb-2.5 sm:mb-3 mx-auto">
                <div 
                  className="bg-gradient-to-r from-health-primary to-health-accent h-2.5 xs:h-3 sm:h-3.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <p className="text-xs xs:text-sm sm:text-base font-semibold text-gray-700">{scanProgress}% Complete</p>
              <div className="text-[10px] xs:text-xs sm:text-sm text-gray-600 mt-1.5 xs:mt-2 sm:mt-2.5 font-medium">
                {scanProgress < 25 && "🔍 Detecting facial landmarks..."}
                {scanProgress >= 25 && scanProgress < 50 && "🧬 Analyzing skin texture & health..."}
                {scanProgress >= 50 && scanProgress < 75 && "🧠 Evaluating stress & emotion markers..."}
                {scanProgress >= 75 && scanProgress < 90 && "⚕️ Processing medical indicators..."}
                {scanProgress >= 90 && "📋 Generating personalized recommendations..."}
              </div>
            </div>
          </div>
        )}

        {/* Camera Guide Overlay */}
        {hasPermission && !isScanning && countdown === null && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 xs:top-6 sm:top-8 left-1/2 transform -translate-x-1/2 w-[90%] xs:w-[85%] sm:w-[80%] max-w-2xl">
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-lg overflow-hidden">
                <div className="px-3 py-2 xs:px-4 xs:py-3 sm:px-6 sm:py-4">
                  <div className="flex items-start gap-2 xs:gap-3 sm:gap-4">
                    <div className="flex-shrink-0 bg-red-100 rounded-full p-1.5 xs:p-2">
                      <AlertTriangle className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-red-800 mb-0.5 xs:mb-1">
                        Important: Position Check
                      </h3>
                      <div className="space-y-1 xs:space-y-1.5">
                        <p className="text-xs xs:text-sm sm:text-base text-red-700 font-medium">
                          • Look straight into the camera
                        </p>
                        <p className="text-xs xs:text-sm sm:text-base text-red-700 font-medium">
                          • Keep your face centered and well-lit
                        </p>
                        <p className="text-xs xs:text-sm sm:text-base text-red-700 font-medium">
                          • Maintain a neutral expression
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Camera Access Placeholder */}
        {!hasPermission && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center p-4 xs:p-6 sm:p-8">
              <div className="w-10 xs:w-12 sm:w-16 h-10 xs:h-12 sm:h-16 bg-gradient-to-r from-health-primary to-health-accent rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 xs:mb-4">
                <Camera className="w-5 xs:w-6 sm:w-8 h-5 xs:h-6 sm:h-8 text-white" />
              </div>
              <p className="text-base xs:text-lg sm:text-xl font-semibold text-gray-700 mb-1 xs:mb-1.5 sm:mb-2">Camera Access Required</p>
              <p className="text-xs xs:text-sm sm:text-base text-gray-600">Please allow camera access when prompted</p>
            </div>
          </div>
        )}
      </div>

      {/* Scan Button */}
      <Button
        onClick={performAIScan}
        disabled={!hasPermission || isScanning || countdown !== null}
        className="w-full bg-gradient-to-r from-health-primary to-health-accent hover:from-health-primary/90 hover:to-health-accent/90 text-white py-3 xs:py-4 sm:py-6 text-xs xs:text-sm sm:text-lg rounded-lg xs:rounded-xl sm:rounded-2xl disabled:opacity-50 transition-all duration-300 hover:scale-[1.02] transform shadow-lg"
      >
        {countdown !== null ? (
          "Starting scan..."
        ) : isScanning ? (
          <>
            <div className="animate-spin rounded-full h-3.5 xs:h-4 sm:h-5 w-3.5 xs:w-4 sm:w-5 border-b-2 border-white mr-1.5 xs:mr-2 sm:mr-2.5" />
            Processing Medical Analysis...
          </>
        ) : (
          <>
            <Shield className="w-3.5 xs:w-4 sm:w-5 h-3.5 xs:h-4 sm:h-5 mr-1.5 xs:mr-2 sm:mr-2.5" />
            Start Medical-Grade Health Analysis
          </>
        )}
      </Button>

      <div className="text-center space-y-2 xs:space-y-2.5 sm:space-y-3">
        <p className="text-xs xs:text-sm sm:text-base text-gray-700 font-medium">
          Ensure good lighting and a clear view of your face
        </p>
        <p className="text-[10px] xs:text-xs sm:text-sm text-gray-500">
          🔬 Advanced health insights based on validated medical datasets
        </p>
      </div>
    </div>
  );
};

export default WebcamScanner;
