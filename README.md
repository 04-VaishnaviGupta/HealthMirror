# 🏥 HealthMirror - AI-Powered Health Analysis Platform

## 🌟 Overview

HealthMirror is a cutting-edge web application that provides comprehensive health analysis using AI-powered facial recognition and computer vision. The platform leverages Google's Gemini AI 2.0 Flash to analyze facial features, skin conditions, stress levels, and overall wellness indicators to provide personalized health insights and recommendations.

## 📑 Table of Contents

- [🌟 Overview](#overview)
- [✨ Features](#features)
- [🛠️ Technology Stack](#technology-stack)
- [🏗️ Architecture](#architecture)
- [📡 API Documentation](#api-documentation)
- [📊 Data Models](#data-models)
- [🎨 UI Components](#ui-components)
- [🎯 Color Palette & Design System](#color-palette--design-system)
- [🔍 Health Analysis Categories](#health-analysis-categories)
- [🤝 Professional Referral System](#professional-referral-system)
- [⚙️ Setup & Installation](#setup--installation)
- [📚 Usage Guide](#usage-guide)
- [🔒 Security & Privacy](#security--privacy)
- [⚡ Performance Considerations](#performance-considerations)
- [❓ Troubleshooting](#troubleshooting)

## ✨ Features

### 🔮 Core Health Analysis
- **Stress Level Assessment**: Analyzes facial muscle tension, forehead furrows, and emotional indicators
- **Fatigue Detection**: Evaluates eye analysis (dark circles, puffiness, drooping), skin pallor, and energy levels
- **Skin Health Evaluation**: Comprehensive skin analysis including clarity, texture, hydration, and conditions
- **Emotion Recognition**: Real-time emotion detection from facial expressions
- **Overall Wellness Score**: Composite health metric based on multiple analysis factors

### 🔬 Advanced Skin Analysis
- **Acne Assessment**: Detection, severity classification, type identification, and affected area mapping
- **Pigmentation Analysis**: Melasma, sun spots, freckles, hyperpigmentation detection
- **Texture Analysis**: Roughness, pore size, smoothness, fine lines, and wrinkle detection
- **Hydration Monitoring**: Dryness/oiliness levels, skin type classification, dehydration signs
- **Inflammation Detection**: Redness levels, irritation, sensitivity, rosacea, and eczema indicators
- **Barrier Function Assessment**: Skin integrity evaluation and damage detection
- **Photo Damage Analysis**: Sun damage assessment and age spot detection

### 👥 Facial Analysis
- **Symmetry Assessment**: Overall facial symmetry evaluation with asymmetry area identification
- **Circulation Assessment**: Blood flow evaluation, capillary visibility, under-eye circulation
- **Structural Analysis**: Facial landmark detection and proportional analysis

### 🌿 Lifestyle Impact Analysis
- **Sleep Quality Indicators**: Dark circles, puffiness, and fatigue markers
- **Stress Manifestations**: Physical stress indicators in facial features
- **Nutritional Assessment**: Signs of nutritional deficiencies
- **Hydration Level**: Overall hydration status evaluation

### ⚠️ Risk Assessment
- **Skin Cancer Risk**: Early warning system for potential skin cancer indicators
- **Premature Aging Risk**: Assessment of factors contributing to accelerated aging
- **Chronic Stress Indicators**: Long-term stress impact evaluation
- **Hormonal Balance Assessment**: Signs of hormonal imbalances

## 🛠️ Technology Stack

### 🎨 Frontend
- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development environment
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: High-quality React component library
- **React Router DOM**: Client-side routing
- **React Webcam**: Camera integration for real-time capture

### 🔧 Backend & AI
- **Supabase**: Backend-as-a-Service platform
- **Supabase Edge Functions**: Serverless function execution
- **Google Gemini AI 2.0 Flash**: Advanced AI model for image analysis
- **Deno**: Runtime for edge functions

### 📚 UI Libraries & Icons
- **Lucide React**: Beautiful, customizable icons
- **Recharts**: Data visualization and charting
- **React Query (TanStack)**: Data fetching and state management
- **Sonner**: Toast notifications

### 🔨 Development Tools
- **ESLint**: Code linting and quality enforcement
- **PostCSS**: CSS processing and optimization
- **Class Variance Authority**: Utility for creating variant-based component APIs

## 🏗️ Architecture

### 📊 High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │  Supabase Edge  │    │   Gemini AI     │
│                 │    │   Functions     │    │                 │
│ ┌─────────────┐ │    │                 │    │                 │
│ │  Webcam     │ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │  Scanner    │ │───▶│ │ analyze-    │ │───▶│ │  Image      │ │
│ │             │ │    │ │ health      │ │    │ │  Analysis   │ │
│ └─────────────┘ │    │ │             │ │    │ │             │ │
│                 │    │ └─────────────┘ │    │ └─────────────┘ │
│ ┌─────────────┐ │    │                 │    │                 │
│ │  Health     │ │◀───│ ┌─────────────┐ │◀───│ ┌─────────────┐ │
│ │  Metrics    │ │    │ │ Response    │ │    │ │  Structured │ │
│ │  Display    │ │    │ │ Processing  │ │    │ │  Response   │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 📂 Component Architecture

```
src/
├── components/
│   ├── WebcamScanner.tsx          # Camera interface & AI analysis trigger
│   ├── HealthMetrics.tsx          # Basic health metrics display
│   ├── DetailedHealthMetrics.tsx  # Comprehensive analysis results
│   └── ui/                        # Shadcn/UI components
├── pages/
│   ├── Index.tsx                  # Main application page
│   └── NotFound.tsx              # 404 error page
├── integrations/
│   └── supabase/
│       ├── client.ts             # Supabase client configuration
│       └── types.ts              # Auto-generated type definitions
├── types/
│   └── health-analysis.ts        # Health data type definitions
├── utils/
│   └── health-analysis-validator.ts # Data validation and normalization
└── hooks/
    └── use-toast.ts              # Toast notification hook
```

## 🎨 Color Palette & Design System

### 🌈 Primary Colors
- **Primary Blue**: `#2563EB` - Professional medical blue
- **Secondary Green**: `#059669` - Medical/health green
- **Accent Purple**: `#7C3AED` - Modern accent color

### 🚦 Status Colors
- **Warning**: `#D97706` - Amber for caution
- **Danger**: `#DC2626` - Red for critical issues
- **Success**: `#16A34A` - Green for positive results
- **Info**: `#0EA5E9` - Sky blue for informational content

### ⚫ Neutral Colors
- **Neutral**: `#6B7280` - Gray for text and borders
- **Light Background**: `#F8FAFC` - Very light gray for backgrounds

### 🌅 Gradient System
```css
/* Primary Gradient */
background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #2563EB 100%);

/* Medical Gradient */
background: linear-gradient(135deg, #2563EB 0%, #059669 100%);

/* Stress Gradient */
background: linear-gradient(135deg, #DC2626 0%, #F59E0B 100%);

/* Wellness Gradient */
background: linear-gradient(135deg, #059669 0%, #16A34A 100%);
```

## 🎯 Color Palette & Design System

### 🌈 Primary Colors
- **Primary Blue**: `#2563EB` - Professional medical blue
- **Secondary Green**: `#059669` - Medical/health green
- **Accent Purple**: `#7C3AED` - Modern accent color

### 🚦 Status Colors
- **Warning**: `#D97706` - Amber for caution
- **Danger**: `#DC2626` - Red for critical issues
- **Success**: `#16A34A` - Green for positive results
- **Info**: `#0EA5E9` - Sky blue for informational content

### ⚫ Neutral Colors
- **Neutral**: `#6B7280` - Gray for text and borders
- **Light Background**: `#F8FAFC` - Very light gray for backgrounds

### 🌅 Gradient System
```css
/* Primary Gradient */
background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #2563EB 100%);

/* Medical Gradient */
background: linear-gradient(135deg, #2563EB 0%, #059669 100%);

/* Stress Gradient */
background: linear-gradient(135deg, #DC2626 0%, #F59E0B 100%);

/* Wellness Gradient */
background: linear-gradient(135deg, #059669 0%, #16A34A 100%);
```

## 🔍 Health Analysis Categories

### 1. Stress Level Assessment

**Indicators Analyzed**:
- Forehead muscle tension
- Brow furrowing patterns
- Jaw muscle tension (bruxism indicators)
- Facial expression patterns
- Eye strain indicators

**Severity Levels**:
- **Minimal** (0-20): Relaxed state, minimal stress indicators
- **Mild** (21-40): Some tension, manageable stress levels
- **Moderate** (41-60): Noticeable stress signs, intervention recommended
- **High** (61-80): Significant stress markers, immediate attention needed
- **Severe** (81-100): Critical stress levels, professional help required

### 2. Fatigue Detection

**Analysis Components**:
- **Dark Circles**: Severity rated 0-10
- **Eye Puffiness**: Level rated 0-10
- **Eyelid Drooping**: Boolean indicator
- **Bloodshot Eyes**: Boolean indicator
- **Facial Muscle Tension**: Descriptive assessment
- **Skin Pallor**: Boolean indicator

### 3. Comprehensive Skin Analysis

#### Acne Assessment
- **Detection**: Present/absent classification
- **Severity**: Mild, moderate, severe
- **Types**: Comedonal, inflammatory, cystic
- **Affected Areas**: Forehead, cheeks, chin, nose
- **Lesion Count**: Quantitative assessment
- **Scarring**: Detection of acne scarring
- **PIH**: Post-inflammatory hyperpigmentation

#### Pigmentation Analysis
- Melasma detection
- Sun spot identification
- Freckle mapping
- Hyperpigmentation assessment
- Hypopigmentation detection
- Overall skin tone evenness

#### Texture Assessment
- Surface roughness (0-10 scale)
- Pore size classification (small/moderate/large)
- Skin smoothness (0-10 scale)
- Fine line detection
- Wrinkle analysis by area (forehead, crow's feet, nasolabial folds)

### 4. Hydration & Barrier Function

**Hydration Metrics**:
- Dryness level (0-10 scale)
- Oiliness level (0-10 scale)
- Skin type classification (dry, oily, combination, normal)
- Dehydration sign detection

**Barrier Function**:
- Integrity assessment (good, compromised, damaged)
- Damage sign identification
- Sensitivity indicator analysis

### 5. Inflammation Assessment

**Parameters**:
- Redness level (0-10 scale)
- General irritation indicators
- Rosacea sign detection
- Eczema indicator assessment
- Sensitivity manifestation analysis

## 🤝 Professional Referral System

### Dermatologist Referral Criteria

**Automatic Referral Triggers**:
- Suspicious mole or lesion detection
- Severe acne with scarring potential
- Signs of skin cancer
- Chronic inflammatory conditions
- Unusual pigmentation changes

**Urgency Classifications**:
- **Routine**: Standard follow-up within 3-6 months
- **Priority**: Appointment within 2-4 weeks
- **Urgent**: Immediate consultation within 1 week
- **Emergency**: Same-day or next-day consultation

### Specialist Types

**Dermatology Subspecialties**:
- General dermatology
- Dermatopathology
- Pediatric dermatology
- Dermatologic surgery
- Cosmetic dermatology

**Related Specialists**:
- Endocrinology (hormonal issues)
- Rheumatology (autoimmune conditions)
- Mental health professionals (stress-related issues)
- Nutritionists (dietary factors)

## ⚙️ Setup & Installation

### 📋 Prerequisites
- Node.js 18+ or Bun runtime
- Git version control
- Modern web browser with camera support
- Supabase account
- Google AI API key

### 🔧 Environment Setup

1. **Clone Repository**
```bash
git clone <repository-url>
cd healthmirror
```

2. **Install Dependencies**
```bash
bun install
# or
npm install
```

3. **Environment Configuration**
```bash
# Create .env.local file
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
GOOGLE_AI_API_KEY=your-google-ai-key
```

4. **Start Development Server**
```bash
bun run dev
# or
npm run dev
```

Visit `http://localhost:5173` 🚀

## 🔒 Security & Privacy

### 🛡️ Data Protection
- Real-time image processing
- No permanent storage of facial images
- Encrypted transmission
- GDPR compliant

### 🔐 Privacy Features
- Explicit user consent required
- Data minimization practices
- Temporary processing only
- User-controlled data sharing

## ❓ Troubleshooting

### 🚫 Common Issues

**Camera Access**
```
Error: Camera access denied
Fix: Enable camera permissions in browser settings
```

**Analysis Errors**
```
Error: Analysis failed
Fixes:
- Check internet connection
- Verify lighting conditions
- Ensure clear face visibility
- Try recapturing
```



<div align="center">

**Made with ❤️ by HealthMirror Team**

[Website](https://healthmirror.ai) • [GitHub](https://github.com/healthmirror)

</div>
