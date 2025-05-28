import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, Camera, Monitor } from "lucide-react";
import WebcamScanner from './WebcamScanner';
import DetailedHealthMetrics from './DetailedHealthMetrics';
import HealthMirrorLogo from './HealthMirrorLogo';

interface DashboardProps {
  onBack: () => void;
}

const Dashboard = ({ onBack }: DashboardProps) => {
  const [scanComplete, setScanComplete] = useState(false);
  const [healthData, setHealthData] = useState<any>(null);

  const handleScanComplete = (data: any) => {
    setHealthData(data);
    setScanComplete(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-sky/20 via-health-mint/20 to-health-lavender/20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-2 xs:py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-7 xs:w-8 sm:w-10 h-7 xs:h-8 sm:h-10">
                <HealthMirrorLogo className="w-full h-full" />
              </div>
              <span className="text-sm xs:text-base sm:text-xl font-bold text-gray-800">HealthMirror Dashboard</span>
            </div>
            <Button 
              variant="outline" 
              onClick={onBack}
              className="hover:bg-health-sky hover:text-white transition-colors text-2xs xs:text-xs sm:text-base py-1 xs:py-1.5 sm:py-2 px-2 xs:px-2.5 sm:px-4"
            >
              <ArrowDown className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 mr-1 xs:mr-1.5 sm:mr-2 rotate-90" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 xs:px-4 sm:px-6 pt-14 xs:pt-16 sm:pt-20 pb-4 xs:pb-6 sm:pb-8 overflow-x-hidden">
        {!scanComplete ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-6">
            {/* Scanner Section */}
            <Card className="glass-effect border-0 health-shadow">
              <CardHeader className="p-2 xs:p-3 sm:p-4">
                <CardTitle className="flex items-center space-x-1.5 xs:space-x-2 text-xs xs:text-sm sm:text-base">
                  <Camera className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 text-health-sky" />
                  <span>AI Face Scanner</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 xs:p-3 sm:p-4 pt-0">
                <WebcamScanner onScanComplete={handleScanComplete} />
              </CardContent>
            </Card>

            {/* Instructions Section */}
            <Card className="glass-effect border-0 health-shadow">
              <CardHeader className="p-2 xs:p-3 sm:p-4">
                <CardTitle className="flex items-center space-x-1.5 xs:space-x-2 text-xs xs:text-sm sm:text-base">
                  <Monitor className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 text-health-mint" />
                  <span>Analysis Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 xs:p-3 sm:p-4 pt-0">
                <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                  <div className="text-center py-3 xs:py-4 sm:py-6">
                    <div className="w-8 xs:w-10 sm:w-16 h-8 xs:h-10 sm:h-16 mx-auto mb-2 xs:mb-3">
                      <HealthMirrorLogo className="w-full h-full" />
                    </div>
                    <h3 className="text-xs xs:text-sm sm:text-base font-semibold mb-1 xs:mb-2">Complete Advanced Health Analysis</h3>
                    <p className="text-2xs xs:text-xs sm:text-sm text-gray-600 mb-2 xs:mb-3">Our AI will analyze:</p>
                    <div className="grid grid-cols-2 gap-1 xs:gap-1.5 sm:gap-2 text-2xs xs:text-xs sm:text-sm">
                      <div className="bg-blue-50 p-1 xs:p-1.5 sm:p-2 rounded">Stress levels & indicators</div>
                      <div className="bg-green-50 p-1 xs:p-1.5 sm:p-2 rounded">Fatigue assessment</div>
                      <div className="bg-yellow-50 p-1 xs:p-1.5 sm:p-2 rounded">Skin condition analysis</div>
                      <div className="bg-purple-50 p-1 xs:p-1.5 sm:p-2 rounded">Facial symmetry</div>
                      <div className="bg-red-50 p-1 xs:p-1.5 sm:p-2 rounded">Circulation assessment</div>
                      <div className="bg-indigo-50 p-1 xs:p-1.5 sm:p-2 rounded">Lifestyle indicators</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-3 xs:space-y-4 sm:space-y-6">
            {/* Results Header */}
            <div className="text-center">
              <h1 className="text-lg xs:text-xl sm:text-3xl font-bold text-gray-800 mb-1 xs:mb-1.5 sm:mb-2">Your Comprehensive Health Analysis</h1>
              <p className="text-2xs xs:text-xs sm:text-sm text-gray-600">Comprehensive health assessment based on validated medical datasets</p>
            </div>

            {/* Detailed Results */}
            <DetailedHealthMetrics data={healthData} />

            {/* Action Buttons */}
            <div className="flex flex-col xs:flex-row justify-center gap-2 xs:gap-3">
              <Button 
                onClick={() => {
                  setScanComplete(false);
                  setHealthData(null);
                }}
                className="bg-health-sky hover:bg-health-sky/80 text-white w-full xs:w-auto text-xs xs:text-sm"
              >
                <Camera className="w-3 xs:w-3.5 h-3 xs:h-3.5 mr-1 xs:mr-1.5" />
                New Analysis
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.print()}
                className="hover:bg-health-mint hover:text-white w-full xs:w-auto text-xs xs:text-sm"
              >
                Save Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
