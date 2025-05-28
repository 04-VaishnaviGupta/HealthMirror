
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData } = await req.json();
    
    if (!imageData) {
      return new Response(
        JSON.stringify({ error: 'Image data is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Google AI API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Remove data URL prefix if present
    const base64Image = imageData.replace(/^data:image\/[a-z]+;base64,/, '');

    const prompt = `
    You are a professional dermatological and health analysis AI trained on comprehensive medical datasets including DermNet, HAM10000, ISIC Archive, and clinical facial expression databases. Perform an extremely detailed health assessment of this facial image and provide results in JSON format.

    ANALYSIS REQUIREMENTS:
    1. Use dermatological classification standards from DermNet and ISIC datasets
    2. Apply facial landmark analysis for stress/fatigue detection (68-point facial landmarks)
    3. Reference clinical depression and anxiety facial markers from medical literature
    4. Utilize skin condition classification from HAM10000 dataset categories

    JSON STRUCTURE REQUIRED:
    {
      "overallHealthScore": number (0-100, weighted average of all metrics),
      "stress": {
        "level": number (0-100),
        "indicators": array of specific facial stress markers detected,
        "physiological_signs": array of stress-related physical manifestations,
        "severity": string ("minimal", "mild", "moderate", "high", "severe")
      },
      "fatigue": {
        "level": number (0-100),
        "eye_analysis": {
          "dark_circles_severity": number (0-10),
          "puffiness_level": number (0-10),
          "drooping_eyelids": boolean,
          "bloodshot_eyes": boolean
        },
        "facial_muscle_tension": string,
        "skin_pallor": boolean,
        "severity": string
      },
      "skinClarity": number (0-100),
      "emotion": string (primary detected emotion),
      "detailed_skin_analysis": {
        "acne": {
          "present": boolean,
          "severity": string ("none", "mild", "moderate", "severe"),
          "types": array ("comedonal", "inflammatory", "cystic", "nodular"),
          "affected_areas": array of facial regions,
          "lesion_count": string ("few", "moderate", "many"),
          "scarring": boolean,
          "post_inflammatory_hyperpigmentation": boolean
        },
        "pigmentation": {
          "melasma": boolean,
          "sun_spots": boolean,
          "freckles": boolean,
          "hyperpigmentation": boolean,
          "hypopigmentation": boolean,
          "uneven_skin_tone": boolean
        },
        "texture_analysis": {
          "roughness": number (0-10),
          "pore_size": string ("fine", "moderate", "enlarged"),
          "skin_smoothness": number (0-10),
          "fine_lines": boolean,
          "wrinkles": {
            "forehead": boolean,
            "crow_feet": boolean,
            "nasolabial_folds": boolean,
            "severity": string
          }
        },
        "hydration": {
          "dryness_level": number (0-10),
          "oiliness_level": number (0-10),
          "skin_type": string ("dry", "oily", "combination", "normal", "sensitive"),
          "dehydration_signs": boolean
        },
        "inflammation": {
          "redness_level": number (0-10),
          "irritation": boolean,
          "sensitivity_indicators": array,
          "rosacea_signs": boolean,
          "eczema_indicators": boolean
        },
        "barrier_function": {
          "integrity": string ("good", "compromised", "severely_damaged"),
          "signs_of_damage": array
        },
        "photo_damage": {
          "sun_damage_level": number (0-10),
          "age_spots": boolean,
          "solar_elastosis": boolean
        }
      },
      "facial_symmetry": {
        "overall_symmetry": number (0-100),
        "asymmetry_areas": array
      },
      "circulation_assessment": {
        "blood_flow": string ("good", "poor", "very_poor"),
        "capillary_visibility": boolean,
        "under_eye_circulation": string
      },
      "lifestyle_indicators": {
        "sleep_quality_indicators": array,
        "stress_manifestations": array,
        "nutritional_deficiency_signs": array,
        "hydration_level": string
      },
      "detailed_recommendations": {
        "immediate_care": {
          "skincare_routine": array of specific steps,
          "products_needed": array of product types,
          "lifestyle_changes": array
        },
        "weekly_treatments": array,
        "monthly_professional_care": array,
        "dietary_recommendations": array,
        "supplement_suggestions": array,
        "stress_management": array,
        "sleep_optimization": array
      },
      "risk_assessments": {
        "skin_cancer_risk": string ("low", "moderate", "high"),
        "premature_aging_risk": string,
        "chronic_stress_indicators": boolean,
        "hormonal_imbalance_signs": array
      },
      "professional_referrals": {
        "dermatologist_needed": boolean,
        "reason_for_referral": string,
        "urgency": string ("routine", "soon", "urgent"),
        "specialist_type": array
      }
    }

    ANALYSIS METHODOLOGY:
    - Examine skin texture, pore structure, and surface irregularities at pixel level
    - Assess facial asymmetry using geometric analysis
    - Evaluate color distribution and identify pigmentation patterns
    - Analyze facial muscle tension and micro-expressions for stress indicators
    - Look for signs of inflammation, irritation, and barrier dysfunction
    - Assess signs of photo-damage and chronological aging
    - Evaluate circulation indicators through skin color and under-eye appearance
    - Identify lifestyle factors reflected in facial appearance

    REFERENCE STANDARDS:
    - Fitzpatrick skin type classification
    - Glogau photoaging classification
    - IGA (Investigator's Global Assessment) for acne severity
    - SCORAD methodology for inflammatory conditions
    - Facial Action Unit coding for expression analysis

    Provide precise, clinically-informed analysis based on visible markers. Be thorough but accurate, avoiding overdiagnosis while ensuring comprehensive assessment.

    Return ONLY the JSON object, no additional text.
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: base64Image
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.2,
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 4096,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      console.error('Gemini API error:', await response.text());
      return new Response(
        JSON.stringify({ error: 'Failed to analyze image with Gemini AI' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const geminiResponse = await response.json();
    console.log('Gemini response:', geminiResponse);

    if (!geminiResponse.candidates || geminiResponse.candidates.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No analysis results from Gemini AI' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const analysisText = geminiResponse.candidates[0].content.parts[0].text;
    
    try {
      // Extract JSON from the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const analysisResult = JSON.parse(jsonMatch[0]);
      
      console.log('Parsed detailed analysis result:', analysisResult);
      
      return new Response(
        JSON.stringify(analysisResult),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      console.error('Raw response:', analysisText);
      
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI analysis results' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in analyze-health function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error during health analysis' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
