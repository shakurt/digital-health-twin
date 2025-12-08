# 💪 Activity Module - Features & Workflow

## Overview
The Activity module is a comprehensive fitness tracking and workout planning system that creates personalized movement profiles, designs adaptive workout plans, and provides injury prevention insights. It integrates with connected devices (smartwatches) to automatically track activity data and provide intelligent recommendations.

---

## ✅ Implemented Features

### 1. **Movement Profile Assessment** 🏃
Complete fitness baseline evaluation with key health metrics:

- **VO2 Max Estimation**
  - Current value display (e.g., "42 ml/kg/min")
  - Category classification (Poor, Fair, Good, Excellent, Superior)
  - Visual card with lung icon
  - Blue gradient theme

- **Physical Condition Score**
  - 0-100 rating system
  - Progress bar visualization
  - Real-time status indicator
  - Green gradient theme

- **Relative Strength Metrics**
  - Push-ups count (upper body strength)
  - Squats count (lower body strength)
  - Pull-ups count (back/arm strength)
  - Individual metric tracking
  - Purple gradient card

- **Flexibility Score**
  - 0-100 flexibility rating
  - Progress bar with percentage
  - Orange gradient theme
  - Stretching recommendations

- **Postural Analysis**
  - Issue detection badges (Rounded shoulders, Forward head, etc.)
  - Visual warning indicators
  - Corrective exercise suggestions
  - Integrated into movement profile

### 2. **Connected Device Integration** ⌚
Seamless smartwatch/wearable device connection:

- **Device Status Display**
  - Connected device name (e.g., "Apple Watch")
  - Connection status indicator (green dot)
  - Battery level (if available)
  - Last sync timestamp

- **Real-time Activity Metrics**
  - **Steps Counter**: Daily step count with goal progress (10,000 target)
  - **Calories Burned**: Total daily calories from all activities
  - **Active Minutes**: Time spent in light/moderate/vigorous activity
  - **HRV (Heart Rate Variability)**: Recovery indicator (ms)
  
- **Exercise Intensity Zones**
  - Light intensity minutes (green bar)
  - Moderate intensity minutes (yellow bar)
  - Vigorous intensity minutes (red bar)
  - Visual progress bars for each zone
  - Percentage completion display

### 3. **Activity Type Breakdown** 📊
Detailed calorie burn analysis by activity type:

- **Activity Cards**
  - Running: Calories + Duration + Icon 🏃
  - Cycling: Calories + Duration + Icon 🚴
  - Gym: Calories + Duration + Icon 🏋️
  - Walking: Calories + Duration + Icon 🚶

- **Visual Representation**
  - Progress bar for each activity (relative to highest)
  - Total calories burned per type
  - Duration tracking
  - Hover effects for interactivity

- **Smart Insight**
  - Identifies most efficient calorie-burning activity
  - "Running burns the most calories for you!" type messages
  - Activity optimization suggestions

### 4. **Smart Insights & Recommendations** 💡
AI-powered contextual guidance system:

- **Recovery Status Insights**
  - HRV-based recovery assessment
  - "Recovery Status: Good" with green indicator
  - Readiness for workout intensity
  - Icon: 💚

- **Posture Warnings**
  - Detected postural issues alerts
  - "Watch Your Posture - Rounded shoulders detected"
  - Corrective exercises automatically added to plan
  - Icon: ⚠️ (warning)

- **Social Motivation**
  - Friend activity notifications
  - "Sarah completed a 10K run today!"
  - Challenge suggestions
  - Icon: 🔥

- **Progress Celebrations**
  - Achievement recognition
  - "You've increased push-ups by 15% this month!"
  - Milestone notifications
  - Icon: 🎉

- **Color-Coded Cards**
  - Green: Recovery/positive status
  - Yellow/Orange: Warnings/cautions
  - Blue: Progress/success
  - Red: Urgent/critical (overtraining)

### 5. **7-Day Workout Plan** 📅
Personalized weekly workout schedule:

- **Weekly Calendar View**
  - 7-day grid (Mon-Sun)
  - Each day shows:
    * Day abbreviation
    * Date
    * Workout type (Upper Body, Cardio, Rest, etc.)
    * Intensity level (Rest, Light, Moderate, High)
    * Completion status (✓ or 💪)
  - Color-coded borders:
    * Green: Completed
    * White: Scheduled
    * Gray: Unscheduled/Rest

- **Workout Day Structure**
  - Monday: Upper Body (Moderate)
  - Tuesday: Cardio (Light)
  - Wednesday: Rest Day
  - Thursday: Lower Body (High)
  - Friday: Core & Flexibility (Light)
  - Saturday: Full Body (Moderate)
  - Sunday: Active Recovery (Light)

- **Week Statistics**
  - Total workouts: 6
  - Estimated calories: 2,400
  - Rest days: 1

### 6. **Exercise Cards with Full Details** 🏋️
Comprehensive workout information for each day:

- **Exercise Information**
  - Exercise name (Push-ups, Squats, etc.)
  - Emoji icon for quick recognition
  - Sets × Reps (e.g., "3 × 12-15")
  - Rest time between sets (e.g., "60s")
  - Equipment required (None, Dumbbells, Barbell, etc.)

- **Interactive Features**
  - Checkbox to mark exercise complete
  - Individual exercise completion tracking
  - Green highlight when completed
  - Expandable exercise cards
  - Exercise detail modal

- **Example Workouts**
  - **Upper Body**: Push-ups, Dumbbell Rows, Shoulder Press, Bicep Curls
  - **Lower Body**: Squats, Lunges, Leg Press, Calf Raises
  - **Core**: Plank, Russian Twists, Stretching
  - **Full Body**: Burpees, Pull-ups, Deadlifts
  - **Recovery**: Yoga, Light Walk

### 7. **Dynamic Workout Intelligence** 🧠
Adaptive plan adjustments based on user status:

- **Load Management**
  - "Yesterday was heavy workout → Today: Light stretching recommended"
  - Intensity balancing across the week
  - Recovery day insertion when needed

- **Progressive Overload**
  - Weekly intensity progression indicator
  - ~10% increase per week (gradual)
  - Prevents plateaus and overtraining

- **Low Activity Detection**
  - "3 low-activity days detected → Let's start with a 15min walk!"
  - Motivational nudges
  - Easy re-entry suggestions

- **Friend Motivation Integration**
  - "Sarah completed 5 workouts this week! 🔥"
  - Social comparison (non-competitive)
  - Challenge creation suggestions

- **Goal Alignment**
  - Workout plan matches user's goal (weight loss, muscle gain, etc.)
  - Exercise selection based on objectives
  - Calorie targets adjusted

### 8. **Injury Prevention System** 🛡️
Proactive injury risk detection and prevention:

- **Overtraining Detection**
  - Monitors consecutive high-intensity days
  - "3 hard days in a row → Rest day recommended"
  - Recovery score tracking

- **Recovery Status Monitoring**
  - Green: Ready for hard workout
  - Yellow: Moderate workout only
  - Red: Rest or light activity recommended
  - Based on HRV and recent activity load

- **Movement Pattern Corrections**
  - Postural issue identification
  - "Knees under stress → Added mobility work"
  - Form correction tips (static suggestions)
  - Preventive exercises added to plan

- **Rest Day Recommendations**
  - Smart rest day placement
  - "Your body needs recovery - rest today"
  - Active recovery suggestions (light walk, yoga)

### 9. **Lifestyle Adaptation** 🏠
Personalized workout customization based on user context:

- **Job Type Consideration**
  - Office worker → More movement breaks
  - Manual labor → Focus on flexibility/recovery
  - Shift worker → Flexible timing options
  - Student → Quick efficient workouts

- **Equipment Availability**
  - Gym access: Full equipment workouts
  - Home: Dumbbell-based exercises
  - No equipment: Bodyweight-only plans
  - Toggle between modes

- **Workout Location Settings**
  - Home workouts
  - Gym sessions
  - Outdoor activities
  - Hybrid plans (Home + Gym)

- **Equipment Tags**
  - Each exercise labeled with required equipment
  - Filter exercises by available equipment
  - Equipment-free alternatives suggested

### 10. **Progress Tracking & Analytics** 📈
Comprehensive progress visualization and insights:

- **Strength Progress Charts**
  - Push-ups over time (mini bar chart)
  - Squats progress with % increase
  - Pull-ups improvement tracking
  - Month-over-month comparison
  - Percentage gains displayed (e.g., "+15% this month")

- **Weekly Activity Graphs**
  - 7-day calorie burn bar chart
  - Active minutes per day
  - Height-based visual comparison
  - Hover for detailed stats

- **Activity Distribution**
  - Pie/bar chart of activity types
  - Calorie breakdown by exercise type
  - Most efficient exercises highlighted

- **Trend Analysis**
  - Weekly/monthly progress summaries
  - Improvement velocity tracking
  - Plateau detection

### 11. **Achievement & Gamification System** 🏆
Motivational reward system for consistency and milestones:

- **Achievement Badges**
  - **First Workout** 🎯: Complete your first workout (Unlocked)
  - **Week Warrior** 🔥: Complete 5 workouts in a week (Unlocked)
  - **Month Master** 👑: Train for 30 consecutive days (Progress: 8/30)
  - **Push-up Pro** 💪: Do 50 push-ups in one session (Progress: 25/50)
  - **Cardio King** 🏃: Burn 3000 calories in a week (Unlocked)
  - **Strength Beast** 🏋️: Lift 1000kg total volume (Progress: 650/1000)

- **Visual Design**
  - Unlocked: Gold gradient with checkmark
  - Locked: Grayscale with progress bar
  - Large emoji icons for each achievement
  - Progress percentage display

- **Streak Tracking**
  - Current streak counter (e.g., "8 days in a row")
  - Fire emoji 🔥 for active streaks
  - Record streak display
  - "2 more days for a new record!" motivational messages

### 12. **Settings & Data Management** ⚙️
User control over activity preferences and data:

- **Activity Settings Modal**
  - Access via settings button (⚙️) in header
  - Sticky header with title and close button
  - Scrollable question interface
  - Save/cancel buttons at bottom

- **Customizable Preferences** (8 Questions):
  1. **Exercise Frequency**: 0 days → 5+ days per week
  2. **Workout Duration**: <20min → 60+ minutes per session
  3. **Activity Type**: Walking/running, Gym, Sports, Home workouts, Cycling, Yoga, Other
  4. **Workout Intensity**: Light (easy pace) → Intense (difficult to talk) → Varies
  5. **Fitness Tracker**: Yes regularly / Sometimes / No
  6. **Fitness Goals**: Weight loss, Build muscle, Endurance, Flexibility, General health, Sports performance
  7. **Equipment Access**: None/bodyweight → Basic → Full gym → Home gym
  8. **Injuries/Limitations**: None, Back issues, Knee problems, Shoulder problems, Other

- **Visual Feedback**
  - Selected options highlighted with primary color
  - Button hover effects
  - Smooth transitions
  - Success toast on save

- **Data Reset Functionality**
  - Reset button (🔄) in header
  - Confirmation modal with warning
  - Resets all workout progress to default state
  - Cannot be undone warning
  - Clears completion checkmarks
  - Resets to fresh 7-day workout plan
  - Success notification after reset

- **Persistent Storage**
  - Settings saved to localStorage under `optionalAnswers.activity`
  - Preferences persist across sessions
  - Integrated with user profile data
  - Synced with onboarding data

- **User Experience**
  - Modal backdrop blur effect
  - Prevents body scroll when modal open
  - Click outside to close (via cancel button)
  - Keyboard accessible (ESC to close)
  - Mobile-responsive design

- **Milestones**
  - 100 Workouts ✓ (Completed Nov 15)
  - 50,000 Calories Burned ✓ (Completed Nov 28)
  - 150 Workouts 🔒 (42 more to unlock)
  - Date-stamped completion

### 12. **Three-Tab Navigation** 📑
Organized information architecture:

- **Overview Tab**
  - Movement profile summary
  - Today's activity stats
  - Activity breakdown chart
  - Smart insights grid
  - Quick access to key metrics

- **Workout Plan Tab**
  - 7-day calendar view
  - Daily workout cards
  - Exercise lists with details
  - Mark complete functionality
  - Equipment & location settings

- **Progress Tab**
  - Strength progress charts
  - Weekly activity graphs
  - Achievement badges
  - Streaks & milestones
  - Historical data visualization

### 13. **Interactive UI Elements** 🎨
Smooth, responsive user interactions:

- **Completion Checkboxes**
  - Individual exercise checkboxes
  - Day-level completion toggle
  - Green highlight on completion
  - Instant visual feedback

- **Expandable Cards**
  - Click day to see exercises
  - Exercise detail modal
  - Smooth open/close animations
  - Body scroll lock when modal open

- **Hover Effects**
  - Card scaling on hover
  - Color transitions
  - Icon animations
  - Button state changes

- **Progress Bars**
  - Animated fill on load
  - Gradient colors
  - Percentage indicators
  - Smooth transitions

### 14. **Color-Coded Intensity System** 🎨
Visual intensity indicators:

- **Rest Day**: Gray (bg-gray-500/20)
- **Light Intensity**: Green (bg-green-500/20)
- **Moderate Intensity**: Yellow (bg-yellow-500/20)
- **High Intensity**: Red (bg-red-500/20)
- Applied to: Day badges, workout cards, intensity bars

### 15. **Responsive Design** 📱
Mobile-first, adaptive layouts:

- Mobile: Single column, stacked cards
- Tablet: 2-column grids
- Desktop: 3-4 column layouts
- Tab navigation: Equal width on mobile
- Calendar: Scrollable on small screens
- Touch-optimized buttons

### 16. **Data Persistence** 💾
Local storage architecture:

- Connected to localStorage "user" key
- Workout completion status saved
- Exercise progress tracked
- Settings stored (equipment, location)
- No sessionStorage usage
- Real-time sync on every action

---

## 🚀 Future Features (Not Yet Implemented)

### 1. **Advanced VO2 Max Calculation**
- Real fitness test integration (Cooper test, Rockport walk)
- Heart rate-based VO2 max estimation during workouts
- Age, sex, weight-adjusted calculations
- Beep test / step test protocols
- Integration with treadmill/cardio equipment
- Periodic reassessment reminders

### 2. **Real-Time Posture Detection**
- Camera-based pose estimation (TensorFlow.js, MediaPipe)
- Joint angle analysis during exercises
- Real-time form feedback
  - "Lower your hips in the squat"
  - "Keep your back straight during deadlifts"
  - "Elbows at 90 degrees for push-ups"
- 3D skeleton overlay on video
- Rep counting with form validation
- Exercise library with correct form videos

### 3. **Advanced Injury Prediction AI**
- Machine learning model trained on injury patterns
- Biomechanical risk scoring
- Muscle imbalance detection
- Load vs. recovery ratio analysis
- Training load spikes detection
- Historical injury correlation
- Preventive intervention suggestions
- Physical therapist-validated algorithms

### 4. **Gym Equipment Integration**
- Bluetooth connection to smart gym machines
- Automatic weight/rep/set logging
- Treadmill speed/incline sync
- Bike resistance tracking
- Rowing machine metrics
- Cable machine load detection
- NFC tap-to-log systems

### 5. **Enhanced HRV Analysis**
- Morning HRV readings for daily readiness
- HRV trend analysis over weeks/months
- Stress vs. recovery correlation
- Parasympathetic/sympathetic balance
- HRV-based training recommendations
- Integration with Oura Ring, Whoop, Apple Watch
- Chronic stress detection

### 6. **Advanced Activity Recognition**
- AI-powered automatic activity detection
  - Running, cycling, swimming, gym, yoga, sports
- GPS-based route mapping
- Elevation gain tracking
- Outdoor vs. indoor classification
- Sport-specific metrics (pace, cadence, stroke rate)
- Multi-sport session handling (triathlon mode)

### 7. **Comprehensive Calorie Burn Tracking**
- MET (Metabolic Equivalent) calculation
- Basal metabolic rate integration
- Activity-specific calorie formulas
- Heart rate-based calorie estimation
- Afterburn effect (EPOC) tracking
- Net vs. total calories burned
- Calorie goal progress (deficit/surplus for weight goals)

### 8. **Dynamic Workout Plan Generation**
- AI-generated workouts based on:
  - Recovery status (HRV, sleep, soreness)
  - Recent training history
  - Equipment availability
  - Time constraints
  - Fitness level progression
- Auto-adjustment of volume and intensity
- Deload week scheduling
- Periodization (linear, undulating, block)
- Event-based training (preparing for a 5K, marathon, competition)

### 9. **Progressive Overload Automation**
- Automatic weight/rep increase suggestions
- "Last time: 3×10 @ 50kg → Try: 3×10 @ 52.5kg"
- Reps-in-reserve (RIR) tracking
- 1RM (one-rep max) calculator
- Strength standards comparison (beginner, intermediate, advanced)
- Training max adjustments
- Plateau detection and deload recommendations

### 10. **Overtraining Detection & Prevention**
- Multi-factor overtraining analysis:
  - Training volume spikes
  - Insufficient recovery time
  - Declining performance metrics
  - Sleep quality deterioration
  - Mood/stress level changes
- Acute:Chronic Workload Ratio (ACWR)
- Fatigue index calculation
- Forced rest day insertion
- Taper recommendations before events

### 11. **Movement Pattern Analysis**
- Video upload for form analysis
- AI-powered pose estimation
- Joint angle measurement
- Range of motion assessment
- Asymmetry detection (left vs. right side)
- Comparison to ideal form templates
- Exercise-specific feedback
- Injury risk scoring per movement

### 12. **Lifestyle-Based Workout Customization**
- Shift worker schedules (night shifts, rotating)
- Travel-friendly workouts (hotel room exercises)
- Parent-friendly (quick 15-min sessions)
- Seasonal adjustments (outdoor in summer, indoor in winter)
- Climate considerations (humidity, temperature)
- Altitude training adjustments
- Time zone adaptation (jet lag recovery)

### 13. **Occupation-Specific Activity Recognition**
- Manual labor: Track occupational physical activity
  - Construction worker: Heavy lifting, standing
  - Farmer: Walking, lifting, bending
  - Nurse: Constant movement, patient transfers
- Sedentary jobs: Encourage movement breaks
- Differentiate "work activity" from "exercise"
- Adjust calorie targets based on job activity level

### 14. **Equipment Availability Optimizer**
- Home gym setup suggestions based on budget
- Minimal equipment workouts (resistance bands only)
- No-equipment calisthenics programs
- Park/outdoor workout plans (pull-up bars, benches)
- Improvised equipment ideas (backpack with books for weight)
- Equipment-free progressions (beginner → advanced)

### 15. **Coach/Trainer Integration**
- Coach dashboard for trainers
- Assign workouts to clients
- Monitor client compliance and progress
- Chat/feedback system
- Video form review by coach
- Macro/calorie target setting
- Payment integration for online coaching
- Group coaching features

### 16. **Client Management for Trainers**
- Client roster with activity summaries
- Workout completion tracking
- Progress photos comparison
- Body composition tracking
- Client performance leaderboards
- Program templates library
- Bulk workout assignment
- Automated check-ins

### 17. **Exercise Library & Video Demonstrations**
- 500+ exercises with HD videos
- Step-by-step instructions
- Muscle group targeting
- Equipment filter
- Difficulty levels
- User ratings and reviews
- Custom exercise creation
- Form cues and common mistakes

### 18. **Rest & Recovery Tools**
- Foam rolling routines
- Stretching sequences (static, dynamic, PNF)
- Mobility drills
- Active recovery workouts
- Ice bath/heat therapy tracking
- Massage appointment reminders
- Muscle soreness logging
- Recovery score calculation

### 19. **Workout Sharing & Social Features**
- Share workouts with friends
- Create group challenges
- Leaderboards (steps, calories, workouts)
- Workout comments and reactions
- Training partner matching
- Community workout programs
- Social feed of friends' activity
- Virtual races and competitions

### 20. **Cross-Feature Intelligence (Advanced)**
- **Sleep ↔ Activity**
  - Poor sleep (5h) → Reduce workout intensity by 30%
  - Great sleep (8.5h) → Increase workout difficulty
  - Sleep debt calculation → Recovery workouts

- **Nutrition ↔ Activity**
  - Calorie deficit → Light workout + preserve muscle
  - High-carb day → Intense workout scheduled
  - Protein intake vs. strength gains correlation
  - Pre-workout meal timing suggestions

- **Stress ↔ Activity**
  - High stress → Add yoga/meditation instead of HIIT
  - Low stress week → Push harder in gym
  - Cortisol management through exercise type

- **Weight ↔ Activity**
  - Weight loss goal → Higher calorie burn workouts
  - Muscle gain goal → Strength-focused + surplus days
  - Plateau detection → Change workout structure

### 21. **Wearable Device Ecosystem**
- Multi-device support
  - Apple Watch, Fitbit, Garmin, Whoop, Oura Ring
  - Polar heart rate monitors
  - Smart scales (body composition)
  - Smart jump ropes, resistance bands
- Automatic data sync from all devices
- Device-specific features (ECG, SpO2, skin temperature)
- Device comparison and recommendations

### 22. **GPS & Route Mapping**
- Real-time route tracking for outdoor activities
- Elevation profile visualization
- Pace zones by mile/km
- Route sharing with friends
- Popular routes in your area
- Safety features (share live location)
- Route challenges (fastest time on a segment)

### 23. **Sports-Specific Training**
- Running programs (5K, 10K, half marathon, marathon)
- Cycling training plans
- Swimming stroke analysis
- Triathlon preparation
- Sport-specific drills (basketball, soccer, tennis)
- Skill development tracking

### 24. **Body Composition Tracking**
- Body fat percentage
- Muscle mass
- Bone density
- Water weight
- Visceral fat
- Body measurements (chest, waist, arms, legs)
- Progress photos with comparison overlays
- 3D body scanning integration

### 25. **Advanced Analytics Dashboard**
- Training load (acute vs. chronic)
- Fitness vs. fatigue graph
- Performance trends (strength, endurance, power)
- Volume load tracking (sets × reps × weight)
- Training distribution pie chart (upper/lower/cardio)
- Time-of-day performance analysis
- Export data to CSV/Excel

### 26. **AI Personal Trainer**
- Conversational workout guidance
- "What should I train today?" → AI suggests based on recovery, goals, schedule
- Natural language exercise logging
- Voice-activated workout timer
- Motivational messages during workouts
- Adaptive rest timer (based on heart rate recovery)

### 27. **Competition & Events**
- Local race/event discovery
- Virtual races (run anywhere, submit time)
- Training plan for specific event date
- Countdown to event
- Event performance prediction
- Post-event recovery protocol

### 28. **Medical & Health Condition Integration**
- Chronic condition management (diabetes, arthritis, heart disease)
- Physical therapy protocol adherence
- Post-surgery recovery programs
- Pregnancy and postpartum workouts
- Senior fitness programs
- Disability-friendly exercises

### 29. **Nutrition Timing Integration**
- Pre-workout meal suggestions (timing + macros)
- Post-workout recovery nutrition
- Intra-workout hydration reminders
- Carb cycling aligned with workout intensity
- Fasting-compatible workout schedules
- Supplement timing (creatine, protein, etc.)

### 30. **Habit Stacking & Behavioral Science**
- Link workouts to existing habits ("After morning coffee, do 10 push-ups")
- Micro-commitments (start with 5 min, build to 30 min)
- Implementation intentions ("If Monday 6PM, then gym")
- Friction reduction (pack gym bag the night before)
- Environmental design (workout clothes visible)
- Identity-based habits ("I am an athlete")

---

## 🔄 Activity Page Workflow

### **User Journey Flow**

```
1. DEVICE CONNECTION
   ├─ User connects smartwatch via Devices page
   ├─ Activity page shows "Connected: Apple Watch"
   ├─ Real-time sync enabled
   └─ Metrics start flowing (steps, HRV, calories)

2. MOVEMENT PROFILE INITIALIZATION
   ├─ On first visit, default profile created:
   │  ├─ VO2 Max: Estimated from age/sex/weight
   │  ├─ Physical Condition: Set to 50 (neutral)
   │  ├─ Strength: All metrics set to 0 (user needs to test)
   │  ├─ Flexibility: Set to 50 (neutral)
   │  └─ Postural Issues: Empty array (no issues detected yet)
   └─ User can manually update metrics or complete fitness tests

3. WORKOUT PLAN GENERATION
   ├─ Read user.goal (weight loss, muscle gain, etc.)
   ├─ Read user.activityLevel (sedentary, active, etc.)
   ├─ Read user.job (office worker, manual labor, etc.)
   ├─ Generate 7-day plan:
   │  ├─ Balance intensity (not all hard days)
   │  ├─ Include rest/recovery days
   │  ├─ Match exercises to goal
   │  └─ Consider equipment availability
   ├─ Save to user.activityData.weekPlan[]
   └─ Display in Workout Plan tab

4. DAILY WORKOUT EXECUTION
   ├─ User navigates to Workout Plan tab
   ├─ Clicks on today's workout card
   ├─ Exercise modal opens with full details
   ├─ User checks off exercises as completed
   ├─ Progress saved to localStorage
   ├─ Completion percentage updates
   └─ Day marked complete when all exercises done

5. ACTIVITY TRACKING (Automatic via Device)
   ├─ Throughout day, watch sends data:
   │  ├─ Steps (updated continuously)
   │  ├─ Calories (accumulated)
   │  ├─ Active minutes (light/moderate/vigorous)
   │  └─ HRV (morning reading)
   ├─ Activity page reads from device data
   ├─ Today's Activity section updates in real-time
   └─ Activity breakdown chart populated

6. SMART INSIGHTS GENERATION (Background)
   ├─ Check HRV → Recovery status insight
   ├─ Check movementProfile.posturalIssues → Posture warnings
   ├─ Read user.friendsData → Friend activity motivation
   ├─ Compare current month to last month → Progress insights
   ├─ Check weekPlan for 3+ consecutive hard days → Overtraining warning
   └─ Display in Smart Insights section

7. PROGRESS TRACKING
   ├─ User completes workouts → Strength metrics updated
   │  ├─ If push-up workout done → pushUps count increases
   │  ├─ If squat workout done → squats count increases
   │  └─ Compare to previous values → Calculate % improvement
   ├─ Weekly activity data stored:
   │  ├─ Mon-Sun calories array
   │  ├─ Mon-Sun active minutes array
   │  └─ Display in Progress tab charts
   └─ Achievement progress calculated

8. ACHIEVEMENT UNLOCKING
   ├─ After each workout completion:
   │  ├─ Check workout count → Unlock "First Workout" at 1
   │  ├─ Check weekly workouts → Unlock "Week Warrior" at 5
   │  ├─ Check consecutive days → Progress toward "Month Master"
   │  ├─ Check push-up max → Progress toward "Push-up Pro"
   │  └─ Check weekly calories → Unlock "Cardio King" at 3000
   ├─ Display unlocked badge with checkmark
   ├─ Show toast notification: "Achievement Unlocked! 🎉"
   └─ Update Progress tab

9. STREAK TRACKING
   ├─ Every day user completes a workout:
   │  ├─ Increment streak counter
   │  ├─ If missed a day → Reset streak to 0
   │  └─ Save longest streak separately
   ├─ Display current streak in Progress tab
   ├─ "8 days in a row! 🔥"
   └─ Motivational message: "2 more days for a new record!"

10. ADAPTIVE PLAN ADJUSTMENT
    ├─ Check yesterday's workout intensity
    │  ├─ If "High" → Today should be "Light" or "Rest"
    │  ├─ If "Light" → Today can be "Moderate" or "High"
    │  └─ If "Rest" → Today can be "Moderate"
    ├─ Check recovery status (HRV)
    │  ├─ If HRV < 50 → Force rest day or light workout
    │  ├─ If HRV > 70 → Can do hard workout
    │  └─ Display recovery recommendation
    ├─ Check activity streak
    │  ├─ If 0 workouts in last 3 days → Easy re-entry workout
    │  └─ Display motivational message
    └─ Save adjusted plan to localStorage

11. CROSS-FEATURE INTEGRATION
    ├─ Read user.sleepData:
    │  ├─ If lastNight < 6h → Reduce intensity by 30%
    │  └─ Insight: "Poor sleep detected → Light workout recommended"
    ├─ Read user.nutritionData:
    │  ├─ If calorie deficit → Add muscle-preserving exercises
    │  └─ Insight: "Low calorie intake → Focus on strength, not cardio"
    ├─ Read user.mindfulnessData:
    │  ├─ If highStress → Replace HIIT with yoga
    │  └─ Insight: "Stress detected → Added recovery session"
    └─ Display insights in Overview tab

12. DATA PERSISTENCE
    ├─ Every action triggers localStorage update:
    │  ├─ Exercise completed → Save to weekPlan[dayIndex].exercises[exIdx].completed
    │  ├─ Day completed → Save to weekPlan[dayIndex].completed
    │  ├─ Strength metric improved → Save to movementProfile.strength
    │  └─ Achievement unlocked → Save to achievements[]
    ├─ Structure: user.activityData = {
    │    movementProfile: {...},
    │    todayActivity: {...},
    │    weekPlan: [...],
    │    activityBreakdown: [...],
    │    achievements: [...],
    │    streak: number,
    │    lastUpdated: timestamp
    │  }
    └─ No sessionStorage usage (consistency with other modules)
```

---

## 🔗 Cross-Module Dependencies

### **Activity Reads From:**

1. **Devices Module** (`user.connectedDevices`):
   - Device name (e.g., "Apple Watch")
   - Connection status
   - Battery level
   - Last sync time
   - Real-time metrics (steps, HRV, calories)

2. **Sleep Module** (`user.sleepData`):
   - Last night's sleep hours
   - Sleep quality score
   - Used for recovery status calculation
   - Workout intensity adjustment

3. **Nutrition Module** (`user.nutritionData`):
   - Daily calorie intake
   - Calorie deficit/surplus
   - Protein intake
   - Hydration level
   - Used for workout intensity and recovery

4. **Mindfulness Module** (`user.mindfulnessData`):
   - Recent stress levels
   - Mood logs
   - Meditation sessions
   - Used for workout type selection (HIIT vs. yoga)

5. **Onboarding** (`user` object):
   - Goal (weight loss, muscle gain, etc.)
   - Activity level (sedentary, active, etc.)
   - Job type (office, manual labor, etc.)
   - Age, sex, weight (for VO2 max estimation)

6. **Friends Module** (`user.friendsData`):
   - Friends' workout activity
   - Used for social motivation insights

### **Activity Writes To:**

1. **localStorage** (`user.activityData`):
   - Movement profile metrics
   - Workout completion status
   - Exercise progress
   - Achievements unlocked
   - Streak counter
   - Weekly activity data

### **Activity Affects:**

1. **Dashboard** (potential):
   - Weekly activity summary
   - Recent workout logs
   - Quick access to today's workout

2. **Avatar Health** (shared metric):
   - Activity level impacts overall avatar score
   - Regular workouts increase health
   - Inactivity decreases health

3. **Nutrition Module** (bidirectional):
   - Calories burned → Adjust nutrition targets
   - Activity level → Calorie goal adjustment

---

## 🎨 UI/UX Design Patterns

### **Color System**
- **Cardio Activities**: Blue/Cyan (`bg-blue-500/20`)
- **Strength Training**: Purple (`bg-purple-500/20`)
- **Flexibility/Recovery**: Green (`bg-green-500/20`)
- **Warnings/Cautions**: Yellow/Orange (`bg-yellow-500/20`)
- **Errors/Overtraining**: Red (`bg-red-500/20`)
- **Achievements**: Gold/Yellow (`bg-yellow-500/40`)

### **Intensity Levels**
- **Rest**: Gray
- **Light**: Green
- **Moderate**: Yellow
- **High**: Red

### **Interactive Elements**
- **Hover Effects**: Scale 1.05, border glow
- **Transitions**: 300ms duration for smooth feel
- **Borders**: `border-white/5` for subtle separation
- **Gradients**: `from-primary to-secondary` for CTAs

### **Typography**
- **Headers**: `text-2xl md:text-4xl` gradient text
- **Subheaders**: `text-xl font-bold`
- **Body**: `text-sm md:text-base`
- **Labels**: `text-xs text-gray-400`

### **Layout Structure**
- Sticky header with tabs
- 3-stat bar (device, steps, calories)
- Tab content area (scrollable)
- Mobile: Single column
- Desktop: Multi-column grids

---

## 📊 Data Structure

```javascript
user: {
  activityData: {
    movementProfile: {
      vo2Max: 42,
      vo2MaxCategory: "Good",
      physicalCondition: 78,
      strength: {
        pushUps: 25,
        squats: 40,
        pullUps: 8
      },
      flexibility: 65,
      posturalIssues: ["Rounded shoulders", "Forward head"]
    },
    
    todayActivity: {
      steps: 12547,
      calories: 1250,
      activeMinutes: 45,
      hrv: 68,
      exerciseIntensity: {
        light: 15,
        moderate: 25,
        vigorous: 5
      }
    },
    
    activityBreakdown: [
      { type: "Running", calories: 450, duration: 30, icon: "🏃" },
      { type: "Cycling", calories: 320, duration: 25, icon: "🚴" },
      ...
    ],
    
    weekPlan: [
      {
        day: "Mon",
        date: "Dec 8",
        type: "Upper Body",
        intensity: "Moderate",
        completed: true,
        scheduled: true,
        exercises: [
          {
            name: "Push-ups",
            sets: 3,
            reps: "12-15",
            rest: "60s",
            equipment: "None",
            completed: true,
            icon: "💪"
          },
          ...
        ]
      },
      ...
    ],
    
    achievements: [
      {
        id: "1",
        title: "First Workout",
        description: "Complete your first workout",
        icon: "🎯",
        unlocked: true
      },
      ...
    ],
    
    streak: 8,
    longestStreak: 10,
    lastUpdated: "2025-12-08T10:30:00Z"
  }
}
```

---

## 🔧 Technical Implementation Notes

### **State Management**
- React `useState` for component state
- `useEffect` for initialization and side effects
- Direct localStorage operations
- Body scroll lock for modals

### **Performance Considerations**
- Lazy rendering of exercise cards
- Memoization for chart calculations
- Efficient array operations
- Minimal re-renders

### **Accessibility**
- Semantic HTML elements
- Keyboard navigation
- Color contrast compliance
- Icon + text labels

### **Browser Compatibility**
- Modern browsers (ES6+)
- localStorage required
- Flexbox and Grid layouts
- Touch-friendly buttons

---

## 📝 Key Design Decisions

1. **3-Tab Structure**: Organized by use case (overview, plan, progress) rather than data type
2. **7-Day Calendar**: Visual week view for quick planning and completion tracking
3. **Exercise Checkboxes**: Granular completion tracking for accountability
4. **Smart Insights Cards**: Contextual recommendations without being intrusive
5. **Movement Profile First**: Establish baseline before workout recommendations
6. **Device Integration Emphasis**: Highlight connected device for automatic tracking
7. **Gamification Layer**: Achievements and streaks for motivation
8. **Adaptive Planning**: Show intelligence through plan adjustments
9. **Cross-Feature Insights**: Demonstrate holistic health approach
10. **Progress Visualization**: Charts and graphs for tangible results

---

## 🎯 Success Metrics (Future)

### **Engagement**
- Daily active users
- Workout completion rate
- Exercise check-off rate
- Tab usage distribution

### **Health Outcomes**
- Strength improvement velocity
- Workout consistency (streak length)
- Injury rate (should be near 0)
- Goal achievement rate

### **Feature Adoption**
- % users with connected devices
- Achievement unlock rate
- Plan customization frequency
- Progress tab views

### **Cross-Feature Impact**
- Sleep quality vs. workout intensity correlation
- Nutrition balance vs. energy levels
- Stress levels vs. workout type selection

---

## 🛠️ Development Notes

### **File Structure**
```
app/
├── activity/
│   └── page.tsx (1,000+ lines - full implementation)
```

### **Key Functions**
- `getIntensityColor()` - Returns color class based on intensity
- `getInsightColor()` - Returns gradient class for insight cards
- `handleCompleteExercise()` - Marks individual exercise done
- `handleCompleteDay()` - Marks entire day complete
- Movement profile calculation functions
- Chart data generation

### **Component Hierarchy**
```
Activity (Main Component)
├── Header (Title + Log Workout Button)
├── Top Stats Bar (Device, Steps, Calories)
├── Tab Navigation (Overview, Plan, Progress)
├── Overview Tab
│   ├── Movement Profile Card
│   ├── Today's Activity Details
│   ├── Activity Breakdown Chart
│   └── Smart Insights Grid
├── Workout Plan Tab
│   ├── Week Overview (7-day calendar)
│   ├── Daily Workout Cards (expandable)
│   └── Equipment/Location Settings
├── Progress Tab
│   ├── Strength Progress Charts
│   ├── Weekly Activity Graph
│   ├── Achievements Grid
│   └── Streaks & Milestones
└── Exercise Detail Modal (conditional)
```

---

## 📚 Related Documentation
- `README.md` - Project overview
- `NUTRITION_FEATURES.md` - Nutrition module details
- Device connection guide (to be created)
- Cross-feature integration spec (to be documented)

---

**Last Updated**: December 8, 2025  
**Version**: 1.0 (Phase 1 Complete)  
**Status**: Production-Ready MVP  
**Lines of Code**: ~1,000
