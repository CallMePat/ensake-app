# Ensake Rewards Mobile App

This mobile app was built for the Ensake developer assessment using **React Native**, **Expo Router**, and **TypeScript**. It allows users to log in, view their current reward points, browse claimable rewards, and redeem them if eligible. The UI is responsive and optimized for both phones and tablets.

---

## How to Test the App

### Option 1: Test Live via Expo Go

If you want to test the live app without cloning or setting it up locally:

1. Download **Expo Go** from the [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [App Store](https://apps.apple.com/app/expo-go/id982107779).
2. Open **Expo Go**, tap “Profile” at the bottom and **log in** with the Expo account credentials below.

#### Expo Account Credentials
Username: callmepat
Password: EmaikuOmolola123


3. After login, go to the **Projects** tab and select the `ensake` app to launch it instantly.

---

### Option 2: Clone and Run Locally

If you’d prefer to clone the app and run it in your own environment:

#### Prerequisites

- Node.js ≥ 16.x
- npm or yarn
- Expo CLI: Install globally using:

```npm install -g expo-cli```

Steps

1. Clone the project:

```git clone https://github.com/your-username/ensake.git```
```cd ensake```

2. Install dependencies:

```npm install```

3. Create a .env file in the root with the following:

```BASE_URL=https://staging-core.ensake.com/assessment-docs```

4. Run the development server:
```npx expo start```


###Key Features
- Email/password login

- Points tracking and display

- Claimable rewards list with brand info and required points

- Claim reward functionality with:

- Client-side validation (ensures you have enough points)

- API integration to update reward and points

- Visual feedback on success/failure

- Responsive layout (phone/tablet optimized)

- Pull-to-refresh support

- EAS (Expo Application Services) Update ready

###Architecture Overview
##Component-Driven Design
Screens are composed of small, focused components:

PointsCard, UserHeader, RewardsList, RewardItem, StatusModal, etc.

##Hooks
useRewardsData handles login state, rewards fetching, and reward claiming.

useDevice detects screen size/orientation to render appropriately on tablets.

##API Layer
All API calls are managed via:

MakeDryApiCall and MakeDryApiCallForReward – ensure clean response structure and error handling.

##Deployment
OTA updates are enabled via EAS Update.

To push updates:

###Project Structure
ensake/
├── app/                     # Screens and routing
├── components/              # UI components
├── hooks/                   # Reusable logic (e.g. useRewardsData)
├── services/                # API interactions
├── types/                   # TypeScript types
├── utils/                   # Auth utilities
├── assets/                  # Fonts and images
├── .env                     # Environment config
├── app.json                 # Expo config
└── README.md

