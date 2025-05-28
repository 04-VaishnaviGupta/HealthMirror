import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Monitor, Bell, Check, Clock, Sun, Droplets } from "lucide-react";

interface HealthData {
  stress: number;
  fatigue: number;
  skinClarity: number;
  emotion: string;
  skinConditions: {
    acne: boolean;
    dryness: boolean;
    oiliness: boolean;
    redness: boolean;
  };
  recommendations: string[];
}

interface HealthMetricsProps {
  data: HealthData;
}

const HealthMetrics = ({ data }: HealthMetricsProps) => {
  const getStressLevel = (stress: number) => {
    if (stress < 30) return { level: 'Low', color: 'bg-green-500', textColor: 'text-green-600' };
    if (stress < 60) return { level: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
    return { level: 'High', color: 'bg-red-500', textColor: 'text-red-600' };
  };

  const getFatigueLevel = (fatigue: number) => {
    if (fatigue < 30) return { level: 'Fresh', color: 'bg-green-500', textColor: 'text-green-600' };
    if (fatigue < 60) return { level: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
    return { level: 'Tired', color: 'bg-red-500', textColor: 'text-red-600' };
  };

  const getDetailedRecommendations = () => {
    const recommendations = [];

    // Stress-based recommendations
    if (data.stress > 60) {
      recommendations.push({
        category: "Stress Management",
        icon: Heart,
        title: "Immediate Stress Relief",
        actions: [
          "Practice 4-7-8 breathing: Inhale for 4 counts, hold for 7, exhale for 8",
          "Take a 5-minute walk outside or by a window",
          "Listen to calming music or nature sounds for 10 minutes",
          "Do progressive muscle relaxation starting from your toes"
        ],
        timeframe: "Now - 15 minutes"
      });
    } else if (data.stress > 30) {
      recommendations.push({
        category: "Stress Prevention",
        icon: Heart,
        title: "Daily Stress Management",
        actions: [
          "Schedule 15-minute meditation breaks between tasks",
          "Practice gratitude journaling before bed",
          "Limit caffeine intake after 2 PM",
          "Set boundaries with work notifications after hours"
        ],
        timeframe: "Daily routine"
      });
    }

    // Fatigue-based recommendations
    if (data.fatigue > 60) {
      recommendations.push({
        category: "Energy Restoration",
        icon: Clock,
        title: "Combat Fatigue",
        actions: [
          "Take a 20-minute power nap (not longer to avoid grogginess)",
          "Drink 16-20 oz of water immediately",
          "Eat a balanced snack with protein and complex carbs",
          "Step outside for 10 minutes of natural light exposure"
        ],
        timeframe: "Next 30 minutes"
      });
    } else if (data.fatigue > 30) {
      recommendations.push({
        category: "Energy Optimization",
        icon: Clock,
        title: "Maintain Energy Levels",
        actions: [
          "Maintain consistent sleep schedule (7-9 hours nightly)",
          "Eat small, frequent meals every 3-4 hours",
          "Take 2-minute movement breaks every hour",
          "Ensure your workspace has adequate lighting"
        ],
        timeframe: "This week"
      });
    }

    // Skin condition recommendations
    if (data.skinConditions.acne) {
      recommendations.push({
        category: "Acne Care",
        icon: Sun,
        title: "Acne Treatment Protocol",
        actions: [
          "Cleanse face twice daily with salicylic acid cleanser (0.5-2%)",
          "Apply benzoyl peroxide spot treatment (2.5%) only to affected areas",
          "Use non-comedogenic moisturizer after cleansing",
          "Change pillowcases every 2-3 days",
          "Avoid touching face throughout the day"
        ],
        timeframe: "Daily for 6-8 weeks"
      });
    }

    if (data.skinConditions.dryness) {
      recommendations.push({
        category: "Hydration Therapy",
        icon: Droplets,
        title: "Skin Moisture Restoration",
        actions: [
          "Apply hyaluronic acid serum to damp skin twice daily",
          "Use ceramide-based moisturizer within 3 minutes of showering",
          "Install a humidifier in your bedroom (40-60% humidity)",
          "Drink at least 8 glasses of water daily",
          "Avoid hot showers (use lukewarm water max 10 minutes)"
        ],
        timeframe: "Daily routine"
      });
    }

    if (data.skinConditions.oiliness) {
      recommendations.push({
        category: "Oil Control",
        icon: Sun,
        title: "Sebum Regulation",
        actions: [
          "Use oil-free gel cleanser with niacinamide twice daily",
          "Apply lightweight, oil-free moisturizer (still essential!)",
          "Use blotting papers instead of over-washing during day",
          "Consider zinc supplements (consult doctor first)",
          "Use clay mask 1-2 times per week"
        ],
        timeframe: "Daily routine"
      });
    }

    if (data.skinConditions.redness) {
      recommendations.push({
        category: "Inflammation Control",
        icon: Heart,
        title: "Redness Reduction",
        actions: [
          "Apply aloe vera gel or green tea compress for 10 minutes",
          "Use fragrance-free, gentle cleanser only once daily",
          "Apply mineral sunscreen (zinc oxide/titanium dioxide) daily",
          "Avoid alcohol-based products and harsh scrubs",
          "Consider anti-inflammatory foods: turmeric, omega-3 rich fish"
        ],
        timeframe: "Immediate and ongoing"
      });
    }

    // General wellness recommendations
    if (data.skinClarity < 70) {
      recommendations.push({
        category: "Skin Health",
        icon: Sun,
        title: "Overall Skin Improvement",
        actions: [
          "Take vitamin D3 (1000-2000 IU daily with doctor approval)",
          "Eat antioxidant-rich foods: berries, leafy greens, nuts",
          "Use broad-spectrum SPF 30+ sunscreen daily",
          "Get 7-9 hours of quality sleep for skin repair",
          "Consider weekly gentle exfoliation with AHA/BHA"
        ],
        timeframe: "Long-term (8-12 weeks)"
      });
    }

    return recommendations;
  };

  const stressInfo = getStressLevel(data.stress);
  const fatigueInfo = getFatigueLevel(data.fatigue);
  const detailedRecommendations = getDetailedRecommendations();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overall Health Score */}
      <Card className="border-health-sky/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-health-sky" />
            <span>Overall Wellness Score</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-health-sky">
              {Math.round((100 - data.stress + data.skinClarity + (100 - data.fatigue)) / 3)}%
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Based on current analysis</p>
              <p className="text-xs text-gray-500">Emotion detected: <span className="capitalize font-medium">{data.emotion}</span></p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Stress Level */}
        <Card className="border-0 bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white flex items-center justify-center">
              <Monitor className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Stress</h3>
            <div className="text-2xl font-bold text-red-600 mb-1">{data.stress}%</div>
            <Badge variant="secondary" className={`text-xs ${stressInfo.textColor} bg-white`}>
              {stressInfo.level}
            </Badge>
          </CardContent>
        </Card>

        {/* Fatigue Level */}
        <Card className="border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white flex items-center justify-center">
              <Bell className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Fatigue</h3>
            <div className="text-2xl font-bold text-yellow-600 mb-1">{data.fatigue}%</div>
            <Badge variant="secondary" className={`text-xs ${fatigueInfo.textColor} bg-white`}>
              {fatigueInfo.level}
            </Badge>
          </CardContent>
        </Card>

        {/* Skin Clarity */}
        <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white flex items-center justify-center">
              <Heart className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Skin Clarity</h3>
            <div className="text-2xl font-bold text-green-600 mb-1">{data.skinClarity}%</div>
            <Badge variant="secondary" className="text-xs text-green-600 bg-white">
              {data.skinClarity > 80 ? 'Excellent' : data.skinClarity > 60 ? 'Good' : 'Needs Care'}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Skin Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detected Skin Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(data.skinConditions).map(([condition, detected]) => (
              <div key={condition} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${detected ? 'bg-orange-400' : 'bg-green-400'}`} />
                <span className="text-sm capitalize">{condition}</span>
                {!detected && <Check className="w-4 h-4 text-green-500" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Recommendations */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Detailed Action Plan</h2>
        
        {detailedRecommendations.map((rec, index) => (
          <Card key={index} className="border-l-4 border-health-mint">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <div className="w-8 h-8 bg-health-mint rounded-full flex items-center justify-center">
                  <rec.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span>{rec.title}</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {rec.category}
                  </Badge>
                </div>
              </CardTitle>
              <p className="text-sm text-gray-600 font-medium">⏱️ {rec.timeframe}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {rec.actions.map((action, actionIndex) => (
                  <div key={actionIndex} className="flex items-start space-x-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-5 h-5 bg-health-sky rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{actionIndex + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700">{action}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Tips Section */}
      <Card className="bg-gradient-to-r from-health-sky/10 to-health-mint/10">
        <CardHeader>
          <CardTitle className="text-lg">💡 Quick Daily Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Morning Routine</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Drink 16oz water upon waking</li>
                <li>• 5-minute morning sunlight exposure</li>
                <li>• Gentle face wash with appropriate cleanser</li>
                <li>• Apply moisturizer + SPF</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Evening Routine</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Remove makeup/sunscreen thoroughly</li>
                <li>• Apply targeted treatments (serums)</li>
                <li>• Night moisturizer application</li>
                <li>• 10-minute relaxation practice</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMetrics;
