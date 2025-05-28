import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Heart, Clock, Sun, Eye, Zap, AlertTriangle, 
  Target, Brain, Stethoscope, Microscope, 
  Activity, Droplets, Check
} from "lucide-react";
import { DetailedHealthData } from '@/types/health-analysis';

interface DetailedHealthMetricsProps {
  data: DetailedHealthData;
}

const DetailedHealthMetrics = ({ data }: DetailedHealthMetricsProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minimal': case 'none': return 'text-white bg-green-500';
      case 'mild': return 'text-white bg-yellow-500';
      case 'moderate': return 'text-white bg-orange-500';
      case 'high': case 'severe': return 'text-white bg-red-500';
      default: return 'text-white bg-gray-500';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-white bg-green-500 hover:bg-green-600';
      case 'moderate': return 'text-white bg-yellow-500 hover:bg-yellow-600';
      case 'high': return 'text-white bg-red-500 hover:bg-red-600';
      default: return 'text-white bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overall Health Score */}
      <Card className="border-health-sky/20 bg-gradient-to-br from-blue-50/50 to-cyan-50/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-health-sky" />
            <span>Comprehensive Health Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="text-5xl font-bold text-health-sky">
              {data.overallHealthScore}%
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-700">Overall Wellness Score</p>
              <p className="text-sm text-gray-600">Emotion: <span className="capitalize font-medium text-health-sky">{data.emotion}</span></p>
              <p className="text-xs text-gray-500 mt-1">Based on medical datasets & AI analysis</p>
            </div>
          </div>
          <Progress value={data.overallHealthScore} className="h-4" />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </CardContent>
      </Card>

      {/* Professional Referrals Alert */}
      {data.professional_referrals.dermatologist_needed && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Professional Consultation Recommended:</strong> {data.professional_referrals.reason_for_referral}
            <br />
            <span className="text-sm">Urgency: <span className="font-medium">{data.professional_referrals.urgency}</span> | Specialists: {data.professional_referrals.specialist_type.join(', ')}</span>
          </AlertDescription>
        </Alert>
      )}

      {/* Core Health Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Stress Analysis */}
        <Card className="border-red-200 bg-gradient-to-br from-red-50/50 to-pink-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Brain className="w-5 h-5 text-red-500" />
              <span>Stress Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-600">{data.stress.level}%</span>
                <Badge className={getSeverityColor(data.stress.severity)}>
                  {data.stress.severity}
                </Badge>
              </div>
              <Progress value={data.stress.level} className="h-2" />
              
              {data.stress.indicators.length > 0 && (
                <div>
                  <h5 className="font-medium mb-2 text-sm">Key Indicators:</h5>
                  <ul className="text-sm space-y-1">
                    {data.stress.indicators.slice(0, 3).map((indicator, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                        <span>{indicator}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Fatigue Assessment */}
        <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50/50 to-amber-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span>Fatigue Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-yellow-600">{data.fatigue.level}%</span>
                <Badge className={getSeverityColor(data.fatigue.severity)}>
                  {data.fatigue.severity}
                </Badge>
              </div>
              <Progress value={data.fatigue.level} className="h-2" />

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <h6 className="font-medium text-xs mb-1">Eye Analysis:</h6>
                  <p>Dark circles: {data.fatigue.eye_analysis.dark_circles_severity}/10</p>
                  <p>Puffiness: {data.fatigue.eye_analysis.puffiness_level}/10</p>
                </div>
                <div>
                  <h6 className="font-medium text-xs mb-1">Other Signs:</h6>
                  <p>Drooping: {data.fatigue.eye_analysis.drooping_eyelids ? 'Yes' : 'No'}</p>
                  <p>Bloodshot: {data.fatigue.eye_analysis.bloodshot_eyes ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skin Clarity */}
        <Card className="border-green-200 bg-gradient-to-br from-green-50/50 to-emerald-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Sun className="w-5 h-5 text-green-500" />
              <span>Skin Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">{data.skinClarity}%</span>
                <Badge className={data.skinClarity > 80 ? 'text-white bg-green-500' : data.skinClarity > 60 ? 'text-white bg-yellow-500' : 'text-white bg-red-500'}>
                  {data.skinClarity > 80 ? 'Excellent' : data.skinClarity > 60 ? 'Good' : 'Needs Care'}
                </Badge>
              </div>
              <Progress value={data.skinClarity} className="h-2" />
              
              <div className="text-sm">
                <p className="font-medium mb-1">Skin Type: <span className="capitalize">{data.detailed_skin_analysis.hydration.skin_type}</span></p>
                <p>Hydration: {data.lifestyle_indicators.hydration_level}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Skin Analysis - Organized in tabs/sections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Microscope className="w-5 h-5 text-health-mint" />
            <span>Comprehensive Skin Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Acne Analysis */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Acne Assessment</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Present:</span>
                  <Badge variant={data.detailed_skin_analysis.acne.present ? "destructive" : "secondary"}>
                    {data.detailed_skin_analysis.acne.present ? 'Yes' : 'No'}
                  </Badge>
                </div>
                {data.detailed_skin_analysis.acne.present && (
                  <>
                    <div className="flex justify-between">
                      <span>Severity:</span>
                      <Badge className={getSeverityColor(data.detailed_skin_analysis.acne.severity)}>
                        {data.detailed_skin_analysis.acne.severity}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Types:</span>
                      <ul className="ml-2 mt-1">
                        {data.detailed_skin_analysis.acne.types.map((type, i) => (
                          <li key={i}>• {type}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium">Affected areas:</span>
                      <ul className="ml-2 mt-1">
                        {data.detailed_skin_analysis.acne.affected_areas.map((area, i) => (
                          <li key={i}>• {area}</li>
                        ))}
                      </ul>
                    </div>
                    <p>Lesion count: {data.detailed_skin_analysis.acne.lesion_count}</p>
                    <p>Scarring: {data.detailed_skin_analysis.acne.scarring ? 'Present' : 'None'}</p>
                    <p>PIH: {data.detailed_skin_analysis.acne.post_inflammatory_hyperpigmentation ? 'Present' : 'None'}</p>
                  </>
                )}
              </div>
            </div>

            {/* Pigmentation Analysis */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <Sun className="w-4 h-4" />
                <span>Pigmentation</span>
              </h4>
              <div className="space-y-2 text-sm">
                {Object.entries(data.detailed_skin_analysis.pigmentation).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="capitalize">{key.replace('_', ' ')}:</span>
                    <Badge variant={value ? "destructive" : "secondary"}>
                      {value ? 'Present' : 'None'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Texture Analysis */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Texture & Aging</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Roughness:</span>
                  <span>{data.detailed_skin_analysis.texture_analysis.roughness}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Smoothness:</span>
                  <span>{data.detailed_skin_analysis.texture_analysis.skin_smoothness}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Pore size:</span>
                  <Badge variant="outline">
                    {data.detailed_skin_analysis.texture_analysis.pore_size}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Fine lines:</span>
                  <Badge variant={data.detailed_skin_analysis.texture_analysis.fine_lines ? "destructive" : "secondary"}>
                    {data.detailed_skin_analysis.texture_analysis.fine_lines ? 'Present' : 'None'}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Wrinkles:</span>
                  <ul className="ml-2 mt-1">
                    <li>Forehead: {data.detailed_skin_analysis.texture_analysis.wrinkles.forehead ? 'Yes' : 'No'}</li>
                    <li>Crow's feet: {data.detailed_skin_analysis.texture_analysis.wrinkles.crow_feet ? 'Yes' : 'No'}</li>
                    <li>Nasolabial: {data.detailed_skin_analysis.texture_analysis.wrinkles.nasolabial_folds ? 'Yes' : 'No'}</li>
                  </ul>
                  <p className="mt-1">Severity: {data.detailed_skin_analysis.texture_analysis.wrinkles.severity}</p>
                </div>
              </div>
            </div>

            {/* Hydration Analysis */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <Droplets className="w-4 h-4" />
                <span>Hydration Status</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Dryness:</span>
                  <span>{data.detailed_skin_analysis.hydration.dryness_level}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Oiliness:</span>
                  <span>{data.detailed_skin_analysis.hydration.oiliness_level}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Skin type:</span>
                  <Badge variant="outline" className="capitalize">
                    {data.detailed_skin_analysis.hydration.skin_type}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Dehydration:</span>
                  <Badge variant={data.detailed_skin_analysis.hydration.dehydration_signs ? "destructive" : "secondary"}>
                    {data.detailed_skin_analysis.hydration.dehydration_signs ? 'Present' : 'None'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Inflammation Analysis */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Inflammation</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Redness level:</span>
                  <span>{data.detailed_skin_analysis.inflammation.redness_level}/10</span>
                </div>
                <div className="flex justify-between">
                  <span>Irritation:</span>
                  <Badge variant={data.detailed_skin_analysis.inflammation.irritation ? "destructive" : "secondary"}>
                    {data.detailed_skin_analysis.inflammation.irritation ? 'Present' : 'None'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Rosacea signs:</span>
                  <Badge variant={data.detailed_skin_analysis.inflammation.rosacea_signs ? "destructive" : "secondary"}>
                    {data.detailed_skin_analysis.inflammation.rosacea_signs ? 'Present' : 'None'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Eczema indicators:</span>
                  <Badge variant={data.detailed_skin_analysis.inflammation.eczema_indicators ? "destructive" : "secondary"}>
                    {data.detailed_skin_analysis.inflammation.eczema_indicators ? 'Present' : 'None'}
                  </Badge>
                </div>
                {data.detailed_skin_analysis.inflammation.sensitivity_indicators.length > 0 && (
                  <div>
                    <span className="font-medium">Sensitivity signs:</span>
                    <ul className="ml-2 mt-1">
                      {data.detailed_skin_analysis.inflammation.sensitivity_indicators.map((indicator, i) => (
                        <li key={i}>• {indicator}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Barrier Function */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Barrier Function</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Integrity:</span>
                  <Badge className={getSeverityColor(data.detailed_skin_analysis.barrier_function.integrity === 'good' ? 'minimal' : data.detailed_skin_analysis.barrier_function.integrity === 'compromised' ? 'moderate' : 'severe')}>
                    {data.detailed_skin_analysis.barrier_function.integrity}
                  </Badge>
                </div>
                {data.detailed_skin_analysis.barrier_function.signs_of_damage.length > 0 && (
                  <div>
                    <span className="font-medium">Damage signs:</span>
                    <ul className="ml-2 mt-1">
                      {data.detailed_skin_analysis.barrier_function.signs_of_damage.map((sign, i) => (
                        <li key={i}>• {sign}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Assessments */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Facial Symmetry & Circulation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-blue-500" />
              <span>Structural Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Facial Symmetry</h4>
                <div className="flex items-center justify-between mb-2">
                  <span>Overall symmetry:</span>
                  <span className="font-semibold">{data.facial_symmetry.overall_symmetry}%</span>
                </div>
                <Progress value={data.facial_symmetry.overall_symmetry} className="h-2 mb-2" />
                {data.facial_symmetry.asymmetry_areas.length > 0 && (
                  <div>
                    <span className="text-sm font-medium">Asymmetry areas:</span>
                    <ul className="text-sm ml-2 mt-1">
                      {data.facial_symmetry.asymmetry_areas.map((area, i) => (
                        <li key={i}>• {area}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-medium mb-2">Circulation Assessment</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Blood flow:</span>
                    <Badge className={getRiskColor(data.circulation_assessment.blood_flow === 'good' ? 'low' : data.circulation_assessment.blood_flow === 'poor' ? 'moderate' : 'high')}>
                      {data.circulation_assessment.blood_flow}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Capillary visibility:</span>
                    <span>{data.circulation_assessment.capillary_visibility ? 'Visible' : 'Normal'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Under-eye circulation:</span>
                    <span>{data.circulation_assessment.under_eye_circulation}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Assessments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span>Risk Assessment Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <h4 className="font-semibold mb-2">Skin Cancer Risk</h4>
                <Badge className={`${getRiskColor(data.risk_assessments.skin_cancer_risk)} text-lg px-3 py-1`}>
                  {data.risk_assessments.skin_cancer_risk}
                </Badge>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <h4 className="font-semibold mb-2">Aging Risk</h4>
                <Badge className={`${getRiskColor(data.risk_assessments.premature_aging_risk)} text-lg px-3 py-1`}>
                  {data.risk_assessments.premature_aging_risk}
                </Badge>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <h4 className="font-semibold mb-2">Chronic Stress</h4>
                <Badge variant={data.risk_assessments.chronic_stress_indicators ? "destructive" : "secondary"} className="text-lg px-3 py-1">
                  {data.risk_assessments.chronic_stress_indicators ? 'Present' : 'None'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lifestyle Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Stethoscope className="w-5 h-5 text-purple-500" />
            <span>Lifestyle Impact Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <h4 className="font-medium mb-2">Sleep Quality</h4>
              <ul className="text-sm space-y-1">
                {data.lifestyle_indicators.sleep_quality_indicators.map((indicator, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <Clock className="w-3 h-3 text-blue-400" />
                    <span>{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Stress Manifestations</h4>
              <ul className="text-sm space-y-1">
                {data.lifestyle_indicators.stress_manifestations.map((manifestation, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <Zap className="w-3 h-3 text-red-400" />
                    <span>{manifestation}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Nutritional Signs</h4>
              <ul className="text-sm space-y-1">
                {data.lifestyle_indicators.nutritional_deficiency_signs.map((sign, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <Target className="w-3 h-3 text-green-400" />
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Hydration</h4>
              <div className="flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <Badge variant="outline" className="capitalize">
                  {data.lifestyle_indicators.hydration_level}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comprehensive Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-health-mint" />
            <span>Comprehensive Treatment Plan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Immediate Care */}
            <div>
              <h4 className="font-semibold text-lg mb-3 text-red-600 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                Immediate Actions (Start Today)
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Skincare Routine:</h5>
                  <ul className="text-sm space-y-1">
                    {data.detailed_recommendations.immediate_care.skincare_routine.map((step, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-4 h-4 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Products Needed:</h5>
                  <ul className="text-sm space-y-1">
                    {data.detailed_recommendations.immediate_care.products_needed.map((product, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <span>{product}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Lifestyle Changes:</h5>
                  <ul className="text-sm space-y-1">
                    {data.detailed_recommendations.immediate_care.lifestyle_changes.map((change, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Activity className="w-3 h-3 text-blue-500" />
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Weekly & Monthly Care */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3 text-orange-600 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Weekly Treatments
                </h4>
                <div className="space-y-2">
                  {data.detailed_recommendations.weekly_treatments.map((treatment, i) => (
                    <div key={i} className="p-3 bg-orange-50 rounded-lg text-sm">
                      <span>{treatment}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3 text-purple-600 flex items-center">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Monthly Professional Care
                </h4>
                <div className="space-y-2">
                  {data.detailed_recommendations.monthly_professional_care.length > 0 ? (
                    data.detailed_recommendations.monthly_professional_care.map((care, i) => (
                      <div key={i} className="p-3 bg-purple-50 rounded-lg text-sm">
                        <span>{care}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                      No professional treatments needed at this time
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Holistic Recommendations */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h5 className="font-medium mb-2 text-green-600">🥗 Dietary</h5>
                <ul className="text-sm space-y-1">
                  {data.detailed_recommendations.dietary_recommendations.map((rec, i) => (
                    <li key={i}>• {rec}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium mb-2 text-blue-600">💊 Supplements</h5>
                <ul className="text-sm space-y-1">
                  {data.detailed_recommendations.supplement_suggestions.map((supp, i) => (
                    <li key={i}>• {supp}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium mb-2 text-purple-600">🧘 Stress Management</h5>
                <ul className="text-sm space-y-1">
                  {data.detailed_recommendations.stress_management.map((method, i) => (
                    <li key={i}>• {method}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-medium mb-2 text-indigo-600">😴 Sleep Optimization</h5>
                <ul className="text-sm space-y-1">
                  {data.detailed_recommendations.sleep_optimization.map((tip, i) => (
                    <li key={i}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedHealthMetrics;
