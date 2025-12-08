# 🍎 Nutrition Module - Features & Workflow

## Overview
The Nutrition module is a comprehensive food tracking and behavioral pattern analysis system that uses digital twin intelligence to provide personalized nutrition insights. It combines real-time tracking with cross-feature analysis from Sleep and Mindfulness modules.

---

## ✅ Implemented Features

### 1. **Weekly Pattern Tracking**
- **Fast Food Logging**: Track weekly fast food consumption vs. limit (default: 2/week)
- **Sugary Drinks Monitoring**: Log sugary beverage intake with visual progress bars
- **Late Night Eating**: Monitor late-night meals (after 10 PM) with health impact warnings
- **Color-Coded Status System**:
  - 🟢 Green: Below limit (good progress)
  - 🟡 Yellow: At limit (warning)
  - 🔴 Red: Over limit (requires attention)
- **Quick Log Buttons**: One-click "+1" buttons for instant logging
- **Progress Bars**: Visual feedback showing logged vs. limit ratios

### 2. **Micro-Habits System** 🎯
- **Daily Tracking Grid**: 7-day calendar (S-M-T-W-T-F-S) with toggle buttons
- **Habit Categories**:
  - 🔴 **Reduce**: Cut out unhealthy foods (e.g., "No Soda This Week")
  - 🟢 **Add**: Introduce healthy foods (e.g., "Daily Salad")
  - 🔵 **Replace**: Swap unhealthy for healthy (e.g., "Water Before Coffee")
- **Progress Tracking**: Percentage-based completion (completed days / target days)
- **Preset Habits Library**: Pre-configured habits with icons, descriptions, and categories
- **Active/Inactive States**: Manage multiple habits, show only active ones
- **Add Habit Modal**: Clean UI for selecting from preset habits

### 3. **Challenges System** 🏆
- **Solo Challenges**: Individual goals (e.g., "7-Day Water Challenge")
- **Social Challenges**: Group competitions with mock participants
  - Avatar badges showing participant initials
  - "With: Sarah, Mike, Alex" display
  - Days remaining countdown
- **Progress Tracking**: Visual progress bars with current/target display
- **Challenge Types**:
  - Water intake challenges
  - Fast food avoidance
  - Vegetable consumption goals
- **Log Progress Button**: Increment progress with single click

### 4. **Cross-Feature Intelligence** 🔗
**Real-time insights generated from other modules:**

- **Sleep → Nutrition Correlation**:
  - Detects poor sleep (<6h) → Warns about 30% increased sugar cravings
  - Identifies late-night eating (3+ times) + low sleep (<7h avg) → Suggests finishing meals 3h before bed
  
- **Mindfulness → Nutrition Correlation**:
  - Detects high stress (2+ stressed/anxious moods in last 3 logs) → Warns about emotional eating risk
  - Suggests meditation before snacking
  
- **Positive Feedback Loop**:
  - Recognizes good patterns (low fast food + low sugary drinks) → Provides encouragement

- **Dynamic Badges**: Shows source module (sleep/mindfulness/activity) on each insight
- **Color-Coded Cards**: Red (warning), Green (positive), Blue (correlation)

### 5. **Weight Management & Projections** ⚖️
- **Current Weight Display**: Shows user's starting weight from onboarding
- **8-Week Projection**: Calculates future weight based on calorie patterns
- **Goal Weight**: Displays target weight (default: current - 3kg)
- **Calorie Range Tracking**: Ideal range display (default: 1800-2200 cal)
- **Weekly Calorie Array**: 7-day calorie tracking (Sun-Sat)

### 6. **Avatar Health Score** 🎮
- **Health Percentage**: 0-100 score based on nutrition patterns
- **Visual Progress Bar**: Gradient bar (green → primary color)
- **Status Messages**:
  - 80-100: "🌟 Thriving!"
  - 60-79: "💪 Doing well"
  - <60: "⚠️ Needs attention"
- **Dynamic Updates**: Changes based on pattern logging

### 7. **Onboarding Integration** 📋
- **6 Nutrition Questions**:
  1. Allergies/Sensitivities (dairy, gluten, nuts, shellfish, eggs, soy)
  2. Diet Style (high-protein, low-carb, vegetarian, Mediterranean, intermittent fasting)
  3. Fast Food Frequency (rarely, 1-2, 3-4, 5+ times/week)
  4. Sugary Drinks Frequency (never, 1-2, 3-5, daily)
  5. Hydration Level (water intake: <4, 4-6, 6-8, 8+ glasses)
  6. Meal Frequency (1-2, 3, 4+, varies)

- **Allergy Display**: Shows allergy badges in header (🚫 badge with allergen name)
- **Edit Preferences Modal**: Full onboarding questionnaire accessible from settings button
- **Real-time Updates**: Changes reflect immediately in UI

### 8. **Pro Tips System** 💡
**Context-aware suggestions based on current behavior:**

- **Fast Food Alert**: Triggers when limit reached → Suggests meal prepping on Sundays
- **Hydration Hack**: Shows when 2+ sugary drinks logged → Recommends sparkling water + lemon
- **Late Night Snacking**: Appears with 2+ late meals → Suggests eating 3h before bed + herbal tea
- **Default Pro Tip**: Shows when user is doing well → General health advice (water before meals)

- **Color-Coded Tips**: Red (warning), Yellow (caution), Purple (night-related), Blue (general)
- **Icon-Based Design**: Quick visual recognition
- **Actionable Messages**: Specific, implementable advice

### 9. **Food Photo Recognition** 📸
**AI-powered meal analysis (UI placeholder):**

- **Upload Interface**: Dashed border "Take Photo" button with camera icon
- **AI Powered Badge**: Shows feature uses computer vision
- **Recent Analysis Card**: Displays last scanned meal (e.g., "Pizza - 850 cal")
- **Timestamp Display**: Shows when photo was taken ("2 hours ago")
- **View Full History Button**: Placeholder for photo log navigation
- **Hover Effects**: Interactive animations on upload area

### 10. **Time & Place Pattern Insights** 🕐
**Behavioral pattern detection (hardcoded examples):**

- **Friday Pattern Card**:
  - Identifies 40% more eating on Fridays
  - Location tag: "📍 Usually near work"
  - Time tag: "🕐 6-8 PM"
  - Suggestion: "Have a high-protein snack at 5 PM"
  - Orange/red gradient theme

- **Stress Period Pattern**:
  - Detects 60% coffee increase during busy weeks
  - Location: "📍 Office area"
  - Time: "🕐 Morning"
  - Suggestion: "Try green tea - same energy, less crash"
  - Purple/pink gradient theme

- **Location Analysis**:
  - 45% Home meals
  - 35% Work area
  - 20% Restaurants
  - Visual percentage breakdown

### 11. **Privacy & Data Control** 🔒
**Security and transparency features:**

- **Data Protection Status**: Green "Data Protected" banner with encryption notice
- **4 Control Options**:
  1. 📥 **Export Data**: Download nutrition data
  2. 👁️ **Data Sharing**: Control visibility settings
  3. 🗑️ **Delete Data**: Permanent data removal
  4. 📋 **Privacy Policy**: View protection details

- **Data Usage Transparency**:
  - "Stored locally on your device"
  - "Used only for personalization"
  - "Never shared with third parties"
  - "You can export/delete anytime"

### 12. **Navigation & Layout** 🗺️
- **Tab System**: Overview, Micro-Habits, Challenges
- **Header Actions**: Settings button (⚙️) + Reset button (🔄)
- **Reset Functionality**: 
  - Confirmation modal before reset
  - Resets tracking data only (preserves onboarding preferences)
  - Success toast notification
- **Responsive Design**: Mobile-first with desktop optimization
- **Scroll Lock**: Prevents background scroll when modals open

### 13. **Data Persistence** 💾
- **localStorage Architecture**: Single "user" key with all data
- **No sessionStorage**: Clean, localStorage-only approach
- **Real-time Sync**: Instant save on every action
- **Data Structure**:
  ```javascript
  user: {
    nutritionData: {
      weeklyPattern: { fastFood, sugaryDrinks, lateNight },
      weeklyCalories: [Sun, Mon, Tue, Wed, Thu, Fri, Sat],
      idealRange: { min, max },
      goalWeight, currentWeight, avatarHealth,
      allergies: [],
      microHabits: [],
      challenges: [],
      crossFeatureInsights: [],
      lastUpdated: ISO timestamp
    }
  }
  ```

---

## 🚀 Future Features (Not Yet Implemented)

### 1. **Advanced Allergies/Sensitivities Management**
- Multi-select allergy picker (currently single selection)
- Severity levels (mild, moderate, severe)
- Food substitution suggestions based on allergies
- Allergen scanner for packaged foods (barcode scanning)
- Restaurant menu filtering by allergies
- Cross-contamination warnings

### 2. **Real Computer Vision Implementation**
- Actual camera integration (device camera access)
- ML model for food recognition (TensorFlow.js or API)
- Calorie estimation from photos
- Portion size detection
- Nutrition breakdown (protein, carbs, fats)
- Food photo gallery with history
- Edit/correct AI predictions
- Share meal photos with nutritionist

### 3. **Learning Time & Place Patterns (Real ML)**
- GPS integration for location tracking
- Time-based behavior clustering
- Machine learning pattern detection:
  - Day-of-week trends
  - Time-of-day patterns
  - Location-based eating habits
- Context-aware predictions:
  - "You usually eat fast food on Fridays at 6 PM near work"
  - "During exam periods, your coffee intake increases"
- Proactive suggestions before patterns occur

### 4. **Advanced Behavioral Patterns & Micro-Habits**
- Custom habit creation (user-defined)
- Habit streaks and rewards system
- Habit chaining (e.g., "After coffee, drink water")
- Reminder notifications for habits
- Habit difficulty levels (easy, medium, hard)
- Habit success rate analytics
- Habit templates for specific goals (weight loss, muscle gain, etc.)
- Integration with calendar events (e.g., no soda during workout days)

### 5. **Enhanced Challenges System**
- Real multiplayer challenges (Firebase/WebSocket)
- Challenge creation (users can create custom challenges)
- Leaderboards with rankings
- Challenge rewards and achievements
- Private vs. public challenges
- Challenge chat/comments
- Challenge photos (proof of completion)
- Team challenges (groups of 3-5 people)
- Challenge categories (weight loss, hydration, clean eating, etc.)

### 6. **Deep Personalization**
**Cultural & Religious Considerations:**
- Ramadan mode (suhoor/iftar timing suggestions)
- Kosher/Halal food filtering
- Cultural food database (traditional foods by region)
- Fasting day support (religious/health fasts)
- Cultural holiday meal planning

**Economic Considerations:**
- Budget-friendly alternatives
- "If fish is expensive, try legumes instead"
- Meal cost calculator
- Grocery budget tracking
- Price comparison for healthy vs. unhealthy options

**Location-Based Personalization:**
- Local food availability database
- Regional traditional foods
- Seasonal food suggestions
- Local restaurant recommendations
- Farmers market integration

### 7. **Professional Dashboard (Nutritionist View)**
- Specialist portal login
- Patient meal monitoring
- Meal plan creation and assignment
- Patient progress tracking
- Annotation and feedback on meals
- Video consultation integration
- Meal plan adherence reports
- Export patient data for analysis
- Professional credentials verification

### 8. **Advanced Analytics & Reporting**
- Weekly/monthly nutrition reports
- Nutrient breakdown charts (vitamins, minerals)
- Meal timing analysis
- Macro/micronutrient tracking
- Hydration tracking with reminders
- Compare week-over-week progress
- Goal achievement predictions
- Export reports as PDF
- Share reports with healthcare providers

### 9. **Meal Planning & Recipes**
- AI-powered meal plan generator
- Recipe database with nutrition info
- Grocery list generation
- Meal prep guides
- Recipe substitution suggestions (based on allergies)
- Cook time estimates
- Difficulty ratings
- User recipe uploads
- Favorite recipes collection
- Meal planning calendar

### 10. **Integration with External Services**
- Fitness tracker sync (Fitbit, Apple Health, Google Fit)
- Restaurant menu API (nutritional info from restaurants)
- Grocery delivery integration (order ingredients)
- Food diary export to other apps
- Calendar integration (plan meals around events)
- Smart scale integration (weight sync)
- Barcode scanner for packaged foods

### 11. **Gamification & Rewards**
- Achievement badges
- Level-up system based on consistency
- Daily login streaks
- XP points for healthy choices
- Unlockable content (recipes, tips)
- Avatar customization based on health score
- Virtual rewards (stars, trophies)
- Social sharing of achievements
- Monthly challenges with prizes

### 12. **Smart Notifications & Reminders**
- Meal logging reminders
- Water intake reminders
- Habit completion reminders
- Pattern alerts ("You usually crave sugar at 3 PM")
- Proactive suggestions ("Friday approaching - remember your goal!")
- Weekly summary notifications
- Celebration notifications (goal achieved!)
- Customizable notification times

---

## 🔄 Nutrition Module Workflow

### **User Journey Flow**

```
1. ONBOARDING
   ├─ User answers 6 nutrition questions
   ├─ Allergies are saved → Display in header
   ├─ Diet preferences stored
   └─ Hydration/meal habits recorded

2. INITIALIZATION
   ├─ Load user.nutritionData from localStorage
   ├─ If no data exists:
   │  ├─ Create default structure
   │  ├─ Initialize weekly patterns (limits: 2, 3, 2)
   │  ├─ Generate default micro-habit (No Soda)
   │  ├─ Generate 3 default challenges
   │  └─ Save to localStorage
   └─ If data exists → Load and display

3. CROSS-FEATURE ANALYSIS (Background Process)
   ├─ Read user.sleepData
   │  ├─ If sleep < 6h → Generate "Sleep Deprivation" warning
   │  └─ If late-night eating + low sleep → Generate correlation insight
   ├─ Read user.mindfulnessData
   │  ├─ If 2+ stressed moods → Generate "Stress Eating" warning
   │  └─ If good patterns detected → Generate positive feedback
   └─ Update crossFeatureInsights array

4. WEEKLY PATTERN TRACKING
   ├─ User clicks "Log +1" on pattern item
   ├─ Increment logged count
   ├─ Update progress bar color (green/yellow/red)
   ├─ Recalculate avatar health score
   ├─ Save to localStorage
   └─ Show success toast

5. MICRO-HABITS
   ├─ User toggles day button (S-M-T-W-T-F-S)
   ├─ Add/remove day from completedDays array
   ├─ Recalculate progress percentage
   ├─ Update progress bar
   ├─ Save to localStorage
   └─ Visual feedback (button color change)

6. CHALLENGES
   ├─ User clicks "Log Progress +1"
   ├─ Increment challenge.progress
   ├─ Update progress bar (progress/target * 100)
   ├─ Check if challenge completed (progress === target)
   ├─ Save to localStorage
   └─ Visual feedback

7. PRO TIPS GENERATION (Dynamic)
   ├─ Check weeklyPattern.fastFood.logged >= limit → Show fast food tip
   ├─ Check weeklyPattern.sugaryDrinks.logged >= 2 → Show hydration tip
   ├─ Check weeklyPattern.lateNight.logged >= 2 → Show late night tip
   └─ If all good → Show default pro tip

8. SETTINGS & PREFERENCES
   ├─ User clicks Settings button (⚙️)
   ├─ Open onboarding modal with current answers
   ├─ User updates preferences
   ├─ Save to user.optionalAnswers.nutrition
   ├─ Update allergies display in real-time
   ├─ Save to localStorage
   └─ Show success toast

9. RESET FUNCTIONALITY
   ├─ User clicks Reset button (🔄)
   ├─ Show confirmation modal
   ├─ User confirms
   ├─ Reset weeklyPattern (logged counts → 0)
   ├─ Reset microHabits to defaults
   ├─ Reset challenges to defaults
   ├─ Preserve onboarding preferences (allergies, diet, etc.)
   ├─ Reset avatar health to 85
   ├─ Save to localStorage
   └─ Show success toast

10. WEIGHT PROJECTION
    ├─ Calculate average weekly calories
    ├─ Compare to ideal range (1800-2200)
    ├─ Calculate calorie deficit
    ├─ Project weight 8 weeks ahead
    │  Formula: currentWeight + (calorieDeficit / 7700) * 8
    └─ Display projected weight

11. DATA PERSISTENCE FLOW
    ├─ Every action triggers localStorage update
    ├─ Read: JSON.parse(localStorage.getItem("user"))
    ├─ Update: localStorage.setItem("user", JSON.stringify(updatedUser))
    ├─ No sessionStorage (removed for simplicity)
    └─ Single source of truth: localStorage "user" key
```

---

## 🔗 Cross-Module Dependencies

### **Nutrition Reads From:**
1. **Sleep Module** (`user.sleepData`):
   - `weeklyHours[]` - Array of sleep hours (Sun-Sat)
   - Used to detect sleep deprivation and correlations

2. **Mindfulness Module** (`user.mindfulnessData`):
   - `moodLogs[]` - Recent mood entries
   - Used to detect stress patterns

3. **Onboarding** (`user.optionalAnswers.nutrition`):
   - All 6 nutrition questions
   - Used for allergies display and personalization

4. **User Profile** (`user` object):
   - `weight` - For weight projections
   - `session` - For authentication check

### **Nutrition Writes To:**
1. **localStorage** (`user.nutritionData`):
   - Entire nutrition tracking state
   - Updates on every action

### **Nutrition Affects:**
1. **Avatar Health** (shared across modules):
   - Nutrition patterns impact overall avatar score
   - Can decrease avatar health if limits exceeded

2. **Dashboard** (potential):
   - Weekly summary data
   - Recent activity logs

---

## 🎨 UI/UX Design Patterns

### **Color System**
- **Primary Actions**: Blue (`bg-primary`)
- **Warnings**: Red (`bg-red-500/20`)
- **Success**: Green (`bg-green-500/20`)
- **Info**: Blue (`bg-blue-500/20`)
- **Patterns**: Orange, Purple (gradients)

### **Interactive Elements**
- **Hover Effects**: `hover:scale-105`, `hover:bg-primary/30`
- **Transitions**: `duration-300`, `duration-500` for smooth animations
- **Borders**: `border-white/5` for subtle separation
- **Backdrop**: `backdrop-blur-lg` for modal overlays

### **Responsive Breakpoints**
- **Mobile**: Default (< 768px) - Single column, stacked layout
- **Tablet**: `md:` (768px+) - 2-column grids
- **Desktop**: `lg:` (1024px+) - Multi-column layouts

### **Typography**
- **Headers**: `text-2xl md:text-4xl` - Responsive sizing
- **Body**: `text-sm md:text-base` - Readable on all devices
- **Labels**: `text-xs` - Compact information

---

## 📊 Data Flow Architecture

```
┌─────────────────────────────────────────────────────┐
│                   localStorage                      │
│                    "user" key                       │
└───────────────────┬─────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
   ┌────▼────┐            ┌─────▼─────┐
   │ Session │            │ Profile   │
   │ Check   │            │ Data      │
   └────┬────┘            └─────┬─────┘
        │                       │
        └───────────┬───────────┘
                    │
        ┌───────────▼────────────┐
        │   Nutrition Module     │
        │   (page.tsx)           │
        └───┬────────────────┬───┘
            │                │
    ┌───────▼──────┐  ┌──────▼───────┐
    │ Cross-Feature│  │ User Actions │
    │ Analysis     │  │ (Log, Toggle)│
    └───────┬──────┘  └──────┬───────┘
            │                │
            └────────┬───────┘
                     │
        ┌────────────▼──────────────┐
        │  Update localStorage      │
        │  + UI State (setData)     │
        └───────────────────────────┘
```

---

## 🔧 Technical Implementation Notes

### **State Management**
- React `useState` for component state
- `useEffect` for initialization and side effects
- No external state library (Redux, Zustand) - kept simple
- Direct localStorage reads/writes on every action

### **Performance Considerations**
- Lazy loading for modals (conditional rendering)
- Minimal re-renders (targeted state updates)
- No API calls (fully client-side)
- Efficient array operations (map, filter, find)

### **Accessibility**
- Semantic HTML (`<button>`, `<section>`)
- Keyboard navigation support (default browser behavior)
- Color contrast ratios for text
- Icon + text labels for clarity

### **Browser Compatibility**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- localStorage support required
- ES6+ JavaScript features
- Flexbox and Grid layouts

---

## 📝 Key Design Decisions

1. **localStorage over sessionStorage**: Single source of truth, no dual-storage confusion
2. **Single "user" key**: Simplified data structure, easier debugging
3. **Hardcoded patterns**: MVP-friendly, showcases features without complexity
4. **Cross-feature insights**: Demonstrates "digital twin" intelligence uniquely
5. **Tab navigation**: Clean organization of dense feature set
6. **Modal-based settings**: Non-destructive, cancellable preference editing
7. **Preset habits/challenges**: Lower barrier to entry, faster onboarding
8. **Visual progress indicators**: Immediate feedback, gamification elements
9. **Pro tips system**: Context-aware help without being intrusive
10. **Phase 2/3 placeholders**: Shows future capabilities for demo purposes

---

## 🎯 Success Metrics (Future)

### **Engagement Metrics**
- Daily active users (DAU)
- Average logs per user per week
- Habit completion rate
- Challenge participation rate

### **Health Metrics**
- Average avatar health score
- Users staying under pattern limits
- Weight goal achievement rate
- Micro-habit streak lengths

### **Feature Adoption**
- % users using micro-habits
- % users joining challenges
- % users editing preferences
- Food photo upload frequency

### **Cross-Feature Impact**
- Correlation between sleep quality and nutrition choices
- Stress levels and emotional eating patterns
- Activity levels and calorie intake

---

## 🛠️ Development Notes

### **File Structure**
```
app/
├── nutrition/
│   └── page.tsx (1654 lines)
├── onboarding/
│   └── optional/
│       └── page.tsx (includes nutrition questions)
components/
├── Sidebar.tsx (nutrition icon updated)
└── AppLayout.tsx (wrapper)
```

### **Key Functions**
- `generateDefaultHabits()` - Creates initial micro-habit
- `generateDefaultChallenges()` - Creates 3 starter challenges
- `generateProTips()` - Context-aware tip generation
- `getPatternStatus()` - Color-coded status (green/yellow/red)
- `calculateProjectedWeight()` - 8-week weight forecast
- `handleResetNutritionData()` - Reset with confirmation
- `handleUpdateOnboardingAnswers()` - Settings update

### **Component Hierarchy**
```
Nutrition (Main Component)
├── Header (Title + Action Buttons)
├── Tab Navigation (Overview, Habits, Challenges)
├── Allergies Badge (Conditional)
├── Pro Tips Section
├── Overview Tab
│   ├── Cross-Feature Insights
│   ├── Food Photo Recognition
│   ├── Time & Place Patterns
│   ├── Privacy & Data Control
│   ├── Weekly Patterns
│   └── Weight & Avatar
├── Micro-Habits Tab
│   ├── Habit Cards (with day toggles)
│   └── Add Habit Button
├── Challenges Tab
│   └── Challenge Cards
├── Habit Modal (Preset selection)
├── Reset Confirmation Modal
└── Onboarding Settings Modal
```

---

## 📚 Related Documentation
- `README.md` - Project overview
- Onboarding flow documentation (to be created)
- Sleep module integration (to be documented)
- Mindfulness module integration (to be documented)

---

**Last Updated**: December 8, 2025  
**Version**: 1.0 (Phase 1-3 Complete)  
**Status**: Production-Ready MVP
