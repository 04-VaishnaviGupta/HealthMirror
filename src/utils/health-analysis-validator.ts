
import { DetailedHealthData } from '@/types/health-analysis';

export const validateAndNormalizeHealthData = (data: any): DetailedHealthData => {
  console.log('Validating and normalizing health data:', data);

  // Ensure all required fields exist with defaults
  const normalized: DetailedHealthData = {
    overallHealthScore: Math.max(0, Math.min(100, data.overallHealthScore || 50)),
    
    stress: {
      level: Math.max(0, Math.min(100, data.stress?.level || 0)),
      indicators: Array.isArray(data.stress?.indicators) ? data.stress.indicators : [],
      physiological_signs: Array.isArray(data.stress?.physiological_signs) ? data.stress.physiological_signs : [],
      severity: ['minimal', 'mild', 'moderate', 'high', 'severe'].includes(data.stress?.severity) 
        ? data.stress.severity : 'mild'
    },
    
    fatigue: {
      level: Math.max(0, Math.min(100, data.fatigue?.level || 0)),
      eye_analysis: {
        dark_circles_severity: Math.max(0, Math.min(10, data.fatigue?.eye_analysis?.dark_circles_severity || 0)),
        puffiness_level: Math.max(0, Math.min(10, data.fatigue?.eye_analysis?.puffiness_level || 0)),
        drooping_eyelids: Boolean(data.fatigue?.eye_analysis?.drooping_eyelids),
        bloodshot_eyes: Boolean(data.fatigue?.eye_analysis?.bloodshot_eyes)
      },
      facial_muscle_tension: data.fatigue?.facial_muscle_tension || 'None detected',
      skin_pallor: Boolean(data.fatigue?.skin_pallor),
      severity: ['minimal', 'mild', 'moderate', 'high', 'severe'].includes(data.fatigue?.severity) 
        ? data.fatigue.severity : 'mild'
    },
    
    skinClarity: Math.max(0, Math.min(100, data.skinClarity || 70)),
    emotion: data.emotion || 'Neutral',
    
    detailed_skin_analysis: {
      acne: {
        present: Boolean(data.detailed_skin_analysis?.acne?.present),
        severity: ['none', 'minimal', 'mild', 'moderate', 'severe'].includes(data.detailed_skin_analysis?.acne?.severity) 
          ? data.detailed_skin_analysis.acne.severity : 'none',
        types: Array.isArray(data.detailed_skin_analysis?.acne?.types) ? data.detailed_skin_analysis.acne.types : [],
        affected_areas: Array.isArray(data.detailed_skin_analysis?.acne?.affected_areas) ? data.detailed_skin_analysis.acne.affected_areas : [],
        lesion_count: data.detailed_skin_analysis?.acne?.lesion_count || 'none',
        scarring: Boolean(data.detailed_skin_analysis?.acne?.scarring),
        post_inflammatory_hyperpigmentation: Boolean(data.detailed_skin_analysis?.acne?.post_inflammatory_hyperpigmentation)
      },
      
      pigmentation: {
        melasma: Boolean(data.detailed_skin_analysis?.pigmentation?.melasma),
        sun_spots: Boolean(data.detailed_skin_analysis?.pigmentation?.sun_spots),
        freckles: Boolean(data.detailed_skin_analysis?.pigmentation?.freckles),
        hyperpigmentation: Boolean(data.detailed_skin_analysis?.pigmentation?.hyperpigmentation),
        hypopigmentation: Boolean(data.detailed_skin_analysis?.pigmentation?.hypopigmentation),
        uneven_skin_tone: Boolean(data.detailed_skin_analysis?.pigmentation?.uneven_skin_tone)
      },
      
      texture_analysis: {
        roughness: Math.max(0, Math.min(10, data.detailed_skin_analysis?.texture_analysis?.roughness || 0)),
        pore_size: ['small', 'moderate', 'large'].includes(data.detailed_skin_analysis?.texture_analysis?.pore_size) 
          ? data.detailed_skin_analysis.texture_analysis.pore_size : 'moderate',
        skin_smoothness: Math.max(0, Math.min(10, data.detailed_skin_analysis?.texture_analysis?.skin_smoothness || 5)),
        fine_lines: Boolean(data.detailed_skin_analysis?.texture_analysis?.fine_lines),
        wrinkles: {
          forehead: Boolean(data.detailed_skin_analysis?.texture_analysis?.wrinkles?.forehead),
          crow_feet: Boolean(data.detailed_skin_analysis?.texture_analysis?.wrinkles?.crow_feet),
          nasolabial_folds: Boolean(data.detailed_skin_analysis?.texture_analysis?.wrinkles?.nasolabial_folds),
          severity: ['none', 'minimal', 'mild', 'moderate', 'severe'].includes(data.detailed_skin_analysis?.texture_analysis?.wrinkles?.severity) 
            ? data.detailed_skin_analysis.texture_analysis.wrinkles.severity : 'none'
        }
      },
      
      hydration: {
        dryness_level: Math.max(0, Math.min(10, data.detailed_skin_analysis?.hydration?.dryness_level || 0)),
        oiliness_level: Math.max(0, Math.min(10, data.detailed_skin_analysis?.hydration?.oiliness_level || 0)),
        skin_type: ['dry', 'oily', 'combination', 'normal', 'sensitive'].includes(data.detailed_skin_analysis?.hydration?.skin_type) 
          ? data.detailed_skin_analysis.hydration.skin_type : 'normal',
        dehydration_signs: Boolean(data.detailed_skin_analysis?.hydration?.dehydration_signs)
      },
      
      inflammation: {
        redness_level: Math.max(0, Math.min(10, data.detailed_skin_analysis?.inflammation?.redness_level || 0)),
        irritation: Boolean(data.detailed_skin_analysis?.inflammation?.irritation),
        sensitivity_indicators: Array.isArray(data.detailed_skin_analysis?.inflammation?.sensitivity_indicators) 
          ? data.detailed_skin_analysis.inflammation.sensitivity_indicators : [],
        rosacea_signs: Boolean(data.detailed_skin_analysis?.inflammation?.rosacea_signs),
        eczema_indicators: Boolean(data.detailed_skin_analysis?.inflammation?.eczema_indicators)
      },
      
      barrier_function: {
        integrity: ['good', 'compromised', 'damaged'].includes(data.detailed_skin_analysis?.barrier_function?.integrity) 
          ? data.detailed_skin_analysis.barrier_function.integrity : 'good',
        signs_of_damage: Array.isArray(data.detailed_skin_analysis?.barrier_function?.signs_of_damage) 
          ? data.detailed_skin_analysis.barrier_function.signs_of_damage : []
      },
      
      photo_damage: {
        sun_damage_level: Math.max(0, Math.min(10, data.detailed_skin_analysis?.photo_damage?.sun_damage_level || 0)),
        age_spots: Boolean(data.detailed_skin_analysis?.photo_damage?.age_spots),
        solar_elastosis: Boolean(data.detailed_skin_analysis?.photo_damage?.solar_elastosis)
      }
    },
    
    facial_symmetry: {
      overall_symmetry: Math.max(0, Math.min(100, data.facial_symmetry?.overall_symmetry || 90)),
      asymmetry_areas: Array.isArray(data.facial_symmetry?.asymmetry_areas) ? data.facial_symmetry.asymmetry_areas : []
    },
    
    circulation_assessment: {
      blood_flow: ['poor', 'good', 'excellent'].includes(data.circulation_assessment?.blood_flow) 
        ? data.circulation_assessment.blood_flow : 'good',
      capillary_visibility: Boolean(data.circulation_assessment?.capillary_visibility),
      under_eye_circulation: data.circulation_assessment?.under_eye_circulation || 'Normal'
    },
    
    lifestyle_indicators: {
      sleep_quality_indicators: Array.isArray(data.lifestyle_indicators?.sleep_quality_indicators) 
        ? data.lifestyle_indicators.sleep_quality_indicators : [],
      stress_manifestations: Array.isArray(data.lifestyle_indicators?.stress_manifestations) 
        ? data.lifestyle_indicators.stress_manifestations : [],
      nutritional_deficiency_signs: Array.isArray(data.lifestyle_indicators?.nutritional_deficiency_signs) 
        ? data.lifestyle_indicators.nutritional_deficiency_signs : [],
      hydration_level: ['poor', 'adequate', 'good', 'excellent'].includes(data.lifestyle_indicators?.hydration_level) 
        ? data.lifestyle_indicators.hydration_level : 'adequate'
    },
    
    detailed_recommendations: {
      immediate_care: {
        skincare_routine: Array.isArray(data.detailed_recommendations?.immediate_care?.skincare_routine) 
          ? data.detailed_recommendations.immediate_care.skincare_routine : ['Gentle cleanser', 'Moisturizer', 'Sunscreen'],
        products_needed: Array.isArray(data.detailed_recommendations?.immediate_care?.products_needed) 
          ? data.detailed_recommendations.immediate_care.products_needed : ['Basic skincare essentials'],
        lifestyle_changes: Array.isArray(data.detailed_recommendations?.immediate_care?.lifestyle_changes) 
          ? data.detailed_recommendations.immediate_care.lifestyle_changes : ['Maintain healthy habits']
      },
      weekly_treatments: Array.isArray(data.detailed_recommendations?.weekly_treatments) 
        ? data.detailed_recommendations.weekly_treatments : [],
      monthly_professional_care: Array.isArray(data.detailed_recommendations?.monthly_professional_care) 
        ? data.detailed_recommendations.monthly_professional_care : [],
      dietary_recommendations: Array.isArray(data.detailed_recommendations?.dietary_recommendations) 
        ? data.detailed_recommendations.dietary_recommendations : ['Balanced nutrition'],
      supplement_suggestions: Array.isArray(data.detailed_recommendations?.supplement_suggestions) 
        ? data.detailed_recommendations.supplement_suggestions : [],
      stress_management: Array.isArray(data.detailed_recommendations?.stress_management) 
        ? data.detailed_recommendations.stress_management : ['Regular exercise', 'Adequate sleep'],
      sleep_optimization: Array.isArray(data.detailed_recommendations?.sleep_optimization) 
        ? data.detailed_recommendations.sleep_optimization : ['Consistent sleep schedule']
    },
    
    risk_assessments: {
      skin_cancer_risk: ['low', 'moderate', 'high'].includes(data.risk_assessments?.skin_cancer_risk) 
        ? data.risk_assessments.skin_cancer_risk : 'low',
      premature_aging_risk: ['low', 'moderate', 'high'].includes(data.risk_assessments?.premature_aging_risk) 
        ? data.risk_assessments.premature_aging_risk : 'low',
      chronic_stress_indicators: Boolean(data.risk_assessments?.chronic_stress_indicators),
      hormonal_imbalance_signs: Array.isArray(data.risk_assessments?.hormonal_imbalance_signs) 
        ? data.risk_assessments.hormonal_imbalance_signs : []
    },
    
    professional_referrals: {
      dermatologist_needed: Boolean(data.professional_referrals?.dermatologist_needed),
      reason_for_referral: data.professional_referrals?.reason_for_referral || null,
      urgency: ['routine', 'moderate', 'urgent'].includes(data.professional_referrals?.urgency) 
        ? data.professional_referrals.urgency : 'routine',
      specialist_type: Array.isArray(data.professional_referrals?.specialist_type) 
        ? data.professional_referrals.specialist_type : []
    }
  };

  console.log('Normalized health data:', normalized);
  return normalized;
};

export const calculateOverallScore = (data: DetailedHealthData): number => {
  const stressScore = 100 - data.stress.level;
  const fatigueScore = 100 - data.fatigue.level;
  const skinScore = data.skinClarity;
  const symmetryScore = data.facial_symmetry.overall_symmetry;
  
  return Math.round((stressScore + fatigueScore + skinScore + symmetryScore) / 4);
};
