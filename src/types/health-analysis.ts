
export interface HealthMetrics {
  stress: number;
  fatigue: number;
  skinClarity: number;
  overallScore: number;
}

export interface EyeAnalysis {
  dark_circles_severity: number;
  puffiness_level: number;
  drooping_eyelids: boolean;
  bloodshot_eyes: boolean;
}

export interface StressData {
  level: number;
  indicators: string[];
  physiological_signs: string[];
  severity: 'minimal' | 'mild' | 'moderate' | 'high' | 'severe';
}

export interface FatigueData {
  level: number;
  eye_analysis: EyeAnalysis;
  facial_muscle_tension: string;
  skin_pallor: boolean;
  severity: 'minimal' | 'mild' | 'moderate' | 'high' | 'severe';
}

export interface AcneAnalysis {
  present: boolean;
  severity: 'none' | 'minimal' | 'mild' | 'moderate' | 'severe';
  types: string[];
  affected_areas: string[];
  lesion_count: string;
  scarring: boolean;
  post_inflammatory_hyperpigmentation: boolean;
}

export interface PigmentationAnalysis {
  melasma: boolean;
  sun_spots: boolean;
  freckles: boolean;
  hyperpigmentation: boolean;
  hypopigmentation: boolean;
  uneven_skin_tone: boolean;
}

export interface TextureAnalysis {
  roughness: number;
  pore_size: 'small' | 'moderate' | 'large';
  skin_smoothness: number;
  fine_lines: boolean;
  wrinkles: {
    forehead: boolean;
    crow_feet: boolean;
    nasolabial_folds: boolean;
    severity: 'none' | 'minimal' | 'mild' | 'moderate' | 'severe';
  };
}

export interface HydrationAnalysis {
  dryness_level: number;
  oiliness_level: number;
  skin_type: 'dry' | 'oily' | 'combination' | 'normal' | 'sensitive';
  dehydration_signs: boolean;
}

export interface InflammationAnalysis {
  redness_level: number;
  irritation: boolean;
  sensitivity_indicators: string[];
  rosacea_signs: boolean;
  eczema_indicators: boolean;
}

export interface SkinAnalysis {
  acne: AcneAnalysis;
  pigmentation: PigmentationAnalysis;
  texture_analysis: TextureAnalysis;
  hydration: HydrationAnalysis;
  inflammation: InflammationAnalysis;
  barrier_function: {
    integrity: 'good' | 'compromised' | 'damaged';
    signs_of_damage: string[];
  };
  photo_damage: {
    sun_damage_level: number;
    age_spots: boolean;
    solar_elastosis: boolean;
  };
}

export interface FacialSymmetry {
  overall_symmetry: number;
  asymmetry_areas: string[];
}

export interface CirculationAssessment {
  blood_flow: 'poor' | 'good' | 'excellent';
  capillary_visibility: boolean;
  under_eye_circulation: string;
}

export interface LifestyleIndicators {
  sleep_quality_indicators: string[];
  stress_manifestations: string[];
  nutritional_deficiency_signs: string[];
  hydration_level: 'poor' | 'adequate' | 'good' | 'excellent';
}

export interface TreatmentRecommendations {
  immediate_care: {
    skincare_routine: string[];
    products_needed: string[];
    lifestyle_changes: string[];
  };
  weekly_treatments: string[];
  monthly_professional_care: string[];
  dietary_recommendations: string[];
  supplement_suggestions: string[];
  stress_management: string[];
  sleep_optimization: string[];
}

export interface RiskAssessments {
  skin_cancer_risk: 'low' | 'moderate' | 'high';
  premature_aging_risk: 'low' | 'moderate' | 'high';
  chronic_stress_indicators: boolean;
  hormonal_imbalance_signs: string[];
}

export interface ProfessionalReferrals {
  dermatologist_needed: boolean;
  reason_for_referral: string | null;
  urgency: 'routine' | 'moderate' | 'urgent';
  specialist_type: string[];
}

export interface DetailedHealthData {
  overallHealthScore: number;
  stress: StressData;
  fatigue: FatigueData;
  skinClarity: number;
  emotion: string;
  detailed_skin_analysis: SkinAnalysis;
  facial_symmetry: FacialSymmetry;
  circulation_assessment: CirculationAssessment;
  lifestyle_indicators: LifestyleIndicators;
  detailed_recommendations: TreatmentRecommendations;
  risk_assessments: RiskAssessments;
  professional_referrals: ProfessionalReferrals;
}
