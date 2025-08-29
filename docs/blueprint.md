# **App Name**: WellNest

## Core Features:

- User Authentication: Implement Firebase Authentication with email/password signup and login. Store user profiles (name, age, wellnessGoal) in Firestore.
- Daily Wellness Log: Allow users to add, edit, and delete their daily wellness logs. Store logs in a Firestore collection (wellness_logs) with fields: sleepHours, waterIntake, meals, mood, steps.
- AI Wellness Suggestions: Provide AI-powered wellness suggestions based on the user's daily log. If sleepHours < 6: suggest 'Try to sleep earlier tonight.' If waterIntake < 8: suggest 'Drink at least 8 glasses of water daily.' If mood = stressed: suggest 'Do 5 minutes breathing exercise.' Use an AI tool
- Dashboard: Display user's past wellness logs in cards and simple charts. Show today's suggestion in a highlighted card.
- UI/UX Design: Create a minimal and clean user interface with wellness vibes using Tailwind CSS components. Incorporate English and Urdu mix (e.g., 'Aaj ki health tip').
- Deployment: Enable fully deployable project on Firebase Hosting. Include firebase.json and hosting setup instructions.

## Style Guidelines:

- Use soft, muted green and blue tones for a calming and wellness-focused aesthetic.
- Employ a clean and readable sans-serif font for body text and a slightly bolder font for headings.
- Emphasize a clean and spacious layout to promote clarity and reduce visual clutter. Use whitespace effectively.
- Utilize simple, line-based icons to represent various wellness activities and metrics.
- Incorporate subtle animations for transitions and feedback to enhance the user experience without being distracting.