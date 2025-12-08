# Avatar System Documentation

## Overview

The Dynamic Health Avatar system provides a visual representation of the user's health status that adapts in real-time based on their health metrics, physical attributes, and lifestyle data. The avatar serves as an intuitive health indicator that changes appearance, size, color, and animation based on comprehensive health analysis.

## Features Implemented

### Core Avatar Calculations

#### Height-Based Sizing
- **Short Users** (Male: <170cm, Female: <160cm): Avatar scaled to 0.9x
- **Average Users** (Male: 170-185cm, Female: 160-175cm): Avatar at 1.0x scale
- **Tall Users** (Male: >185cm, Female: >175cm): Avatar scaled to 1.1x

#### Build Assessment
Based on BMI and physical condition scores:
- **Slim**: BMI < 18.5, subtle appearance with lighter borders
- **Average**: BMI 18.5-25, standard appearance
- **Athletic**: BMI with high physical condition (>70), enhanced glow effects
- **Heavy**: BMI > 30, adjusted styling

#### Energy Level Calculation
Combines data from multiple sources (weighted scoring):
- **Sleep Contribution (40%)**: Duration, quality, recovery score, sleep debt
- **Activity Contribution (30%)**: Physical condition, active minutes, HRV
- **Mindfulness Contribution (30%)**: Stress levels, energy ratings, mood patterns

Energy Levels:
- **Low**: Score < 40 - Dim appearance, no animations
- **Moderate**: Score 40-70 - Standard appearance
- **High**: Score > 70 - Bright colors, enhanced effects

#### Freshness Assessment
Based primarily on sleep data:
- **Tired**: Poor sleep quality, high sleep debt, low recovery
- **Rested**: Adequate sleep with good recovery
- **Energetic**: Excellent sleep quality, schedule adherence, low sleep debt

#### Fitness Classification
Multi-factor assessment:
- **Beginner**: Low physical condition, minimal activity
- **Moderate**: Average fitness metrics, some regular activity
- **Fit**: Good fitness scores, consistent activity
- **Athletic**: Excellent across all fitness metrics, high activity levels

#### Health Score (0-100)
Comprehensive score combining:
- BMI contribution (15%)
- Sleep quality (25%)
- Physical activity (25%)
- Nutrition health (20%)
- Mental wellness (15%)

### Avatar Appearance System

#### Emoji Selection
Base avatars by gender with context-aware variations:
- **Default**: 👨/👩/🧑
- **Athletic**: 🏋️‍♂️/🏋️‍♀️/🏋️ (for highly fit users)
- **Active**: 🏃‍♂️/🏃‍♀️/🏃 (for active, energetic users)
- **Relaxed**: 🧘‍♂️/🧘‍♀️/🧘 (for mindful, well-rested users)

#### Color Schemes
Health-based background gradients:
- **Excellent (80-100)**: Green gradient with strong glow
- **Good (60-79)**: Blue gradient with moderate glow
- **Fair (40-59)**: Yellow gradient with subtle glow
- **Poor (0-39)**: Red gradient with warning indicators

#### Animation Effects
- **Subtle Pulse**: For energetic users (3s cycle)
- **Energy Pulse**: For athletic users (4s cycle with scaling)
- **Health Glow**: For users with excellent health scores (5s breathing effect)

### Avatar Components

#### Main HealthAvatar Component
```tsx
<HealthAvatar
  userData={userHealthData}
  gender="male" | "female" | "neutral"
  size={128}
  context="profile" | "dashboard" | "mini"
  showStatus={true}
  showHealthScore={true}
  showInsights={true}
/>
```

**Props:**
- `userData`: User health data object
- `gender`: Avatar gender for appropriate emoji selection
- `size`: Base size in pixels (auto-scaled by height category)
- `context`: Display context affecting size and features
- `showStatus`: Display text status below avatar
- `showHealthScore`: Show numeric health score badge
- `showInsights`: Show personalized health insights

#### Specialized Avatar Variants

**DashboardAvatar**: Compact version for dashboard display
- 64px base size
- Shows health status and score
- Optimized for smaller spaces

**MiniAvatar**: Minimal version for navigation
- 40px base size
- No text or additional elements
- Maintains health-based styling

**AvatarWithMetrics**: Detailed version with metric breakdown
- Shows energy, fitness, freshness, and health scores
- Grid layout with avatar and metrics
- Perfect for health overview cards

### Integration Points

#### Profile Page
- Full-featured avatar with complete health insights
- Status text describing current health state
- Health score badge and recommendations
- Edit button overlay for settings access

#### Dashboard
- Compact avatar showing health status
- Quick health overview
- Clickable to navigate to profile

#### Navigation Bar
- Mini avatar in top navigation
- Subtle health indication through color/glow
- Consistent with user's current health state

### Data Sources

#### User Profile Data
- Height, weight for BMI calculation
- Gender for appropriate avatar selection
- Age for context-appropriate assessments

#### Sleep Module Integration
- Sleep duration and quality scores
- Sleep schedule adherence
- Recovery scores and sleep debt
- Chronotype for freshness calculation

#### Activity Module Integration
- Physical condition scores
- VO2 Max and fitness assessments
- Daily activity metrics (steps, calories, active minutes)
- Strength and flexibility measurements

#### Nutrition Module Integration
- Avatar health score from nutrition tracking
- Weight management progress
- Overall nutrition impact on health

#### Mindfulness Module Integration
- Stress level patterns
- Energy level tracking
- Mood pattern analysis
- Mental wellness contribution to overall health

### Avatar Status Messages

The system generates contextual status messages combining multiple metrics:

**Examples:**
- "Feeling energetic and ready for action • excellent physical condition • well-rested"
- "High energy levels • good fitness level • could use better sleep"
- "Low energy - needs rest and recovery • building fitness"

### Health Insights System

Personalized recommendations based on avatar metrics:

**Excellent Health (85+)**
- "🌟 Excellent overall health! Keep up the great work."

**Good Health (70-84)**
- "💪 Great health status with room for optimization."

**Moderate Health (50-69)**
- "📈 Good foundation - focus on consistent improvements."

**Needs Improvement (<50)**
- "🎯 Opportunity for significant health improvements."

**Specific Insights:**
- Sleep-focused: "😴 Prioritize sleep quality and duration for better energy."
- Activity-focused: "🏃‍♂️ Start with light exercise to boost energy and fitness."
- Peak performance: "🔥 Peak performance state - maintain this balance!"

### Technical Implementation

#### File Structure
```
components/
├── AvatarCalculations.tsx    # Core calculation logic
├── AvatarAppearance.tsx      # Appearance and styling system
└── HealthAvatar.tsx          # React components
```

#### CSS Animations
Custom keyframe animations for avatar effects:
- `subtle-pulse`: Gentle scaling for energetic users
- `energy-pulse`: Dynamic scaling and glow for athletic users
- `health-glow`: Breathing glow effect for excellent health

#### Performance Optimizations
- `useMemo` for expensive calculations
- CSS-in-JS for dynamic styling
- Lazy loading of animations
- Efficient re-rendering patterns

### Future Enhancements

#### Advanced Metrics
- Heart rate variability integration
- Detailed sleep stage analysis
- Advanced fitness assessments
- Nutritional micronutrient tracking

#### Enhanced Visuals
- 3D avatar representations
- Seasonal avatar variations
- Achievement-based avatar accessories
- Custom avatar customization options

#### Social Features
- Avatar comparison with friends
- Health challenge avatars
- Team-based avatar competitions
- Avatar evolution tracking

#### AI Integration
- Predictive health avatars
- Personalized avatar recommendations
- Adaptive learning from user behavior
- Smart health coaching through avatar changes

## Usage Guidelines

### Best Practices
1. Update avatar data regularly for accuracy
2. Consider user privacy when displaying health indicators
3. Provide clear explanations for avatar changes
4. Use avatars to motivate positive health behaviors

### Accessibility
- Ensure sufficient color contrast for all users
- Provide text alternatives for avatar status
- Support keyboard navigation for interactive elements
- Consider users with color blindness in design choices

### Performance Considerations
- Cache avatar calculations when possible
- Optimize animation performance on lower-end devices
- Implement graceful degradation for older browsers
- Monitor memory usage with multiple avatars displayed

## API Reference

### Core Functions

#### `calculateAvatarMetrics(userData: UserHealthData): AvatarMetrics`
Main calculation function that processes user health data and returns comprehensive avatar metrics.

#### `getAvatarAppearance(metrics: AvatarMetrics, gender, context): AvatarAppearance`
Determines visual appearance based on calculated metrics and display context.

#### `calculateBMI(height: string, weight: string): number | null`
Utility function for BMI calculation with input validation.

#### `calculateHealthScore(userData: UserHealthData): number`
Comprehensive health score calculation (0-100) from all available data sources.

### Component Props

#### HealthAvatar Props
- `userData: UserHealthData` - Required health data object
- `gender?: 'male' | 'female' | 'neutral'` - Avatar gender (default: 'neutral')
- `size?: number` - Base size in pixels (default: 128)
- `context?: 'profile' | 'dashboard' | 'mini'` - Display context (default: 'profile')
- `showStatus?: boolean` - Show status text (default: false)
- `showHealthScore?: boolean` - Show health score badge (default: false)
- `showInsights?: boolean` - Show health insights (default: false)
- `className?: string` - Additional CSS classes
- `onClick?: () => void` - Click handler

### Data Types

#### UserHealthData Interface
Complete type definition for user health data expected by the avatar system, including optional properties for all health modules.

#### AvatarMetrics Interface
Calculated metrics used for avatar appearance determination.

#### AvatarAppearance Interface
Visual styling properties for avatar rendering.

This avatar system creates a truly personalized health visualization that adapts and evolves with the user's health journey, providing immediate visual feedback and motivation for healthy lifestyle choices.