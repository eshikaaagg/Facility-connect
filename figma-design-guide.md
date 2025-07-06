# FacilityConnect - Figma Design Guide

## 🎨 Design System

### Color Palette

#### Primary Colors
- **Blue Primary**: #2563EB (rgb(37, 99, 235))
- **Blue Secondary**: #3B82F6 (rgb(59, 130, 246))
- **Blue Light**: #DBEAFE (rgb(219, 234, 254))
- **Blue Dark**: #1E40AF (rgb(30, 64, 175))

#### Staff Colors
- **Green Primary**: #059669 (rgb(5, 150, 105))
- **Green Secondary**: #10B981 (rgb(16, 185, 129))
- **Green Light**: #D1FAE5 (rgb(209, 250, 229))

#### Accent Colors
- **Purple**: #7C3AED (rgb(124, 58, 237))
- **Yellow**: #F59E0B (rgb(245, 158, 11))
- **Orange**: #EA580C (rgb(234, 88, 12))
- **Red**: #DC2626 (rgb(220, 38, 38))

#### Neutral Colors
- **Gray 50**: #F9FAFB
- **Gray 100**: #F3F4F6
- **Gray 200**: #E5E7EB
- **Gray 300**: #D1D5DB
- **Gray 400**: #9CA3AF
- **Gray 500**: #6B7280
- **Gray 600**: #4B5563
- **Gray 700**: #374151
- **Gray 800**: #1F2937
- **Gray 900**: #111827

### Typography

#### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

#### Font Sizes
- **Heading 1**: 48px (3rem) - Bold
- **Heading 2**: 36px (2.25rem) - Bold
- **Heading 3**: 30px (1.875rem) - Semibold
- **Heading 4**: 24px (1.5rem) - Semibold
- **Heading 5**: 20px (1.25rem) - Medium
- **Body Large**: 18px (1.125rem) - Regular
- **Body**: 16px (1rem) - Regular
- **Body Small**: 14px (0.875rem) - Regular
- **Caption**: 12px (0.75rem) - Medium

### Spacing System
- **4px**: 0.25rem
- **8px**: 0.5rem
- **12px**: 0.75rem
- **16px**: 1rem
- **20px**: 1.25rem
- **24px**: 1.5rem
- **32px**: 2rem
- **40px**: 2.5rem
- **48px**: 3rem
- **64px**: 4rem

### Border Radius
- **Small**: 4px
- **Medium**: 8px
- **Large**: 12px
- **XL**: 16px
- **Full**: 9999px (circular)

### Shadows
- **Small**: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- **Medium**: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- **Large**: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
- **XL**: 0 20px 25px -5px rgba(0, 0, 0, 0.1)

## 📱 Screen Layouts

### 1. Login Screen (1440x900)

#### Layout Structure
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    Background Gradient                       │
│              (Blue 50 → Indigo 50 → Purple 50)             │
│                                                             │
│    ┌─────────────────────────────────────────────────┐     │
│    │                Login Card                        │     │
│    │  ┌─────┐                                        │     │
│    │  │ ⚡  │  FacilityConnect                       │     │
│    │  └─────┘                                        │     │
│    │                                                 │     │
│    │  Email: [________________]                      │     │
│    │  Password: [________________]                   │     │
│    │                                                 │     │
│    │  [        Sign In Button        ]               │     │
│    │                                                 │     │
│    │  Demo Accounts:                                 │     │
│    │  👤 User: arjun@example.com                    │     │
│    │  👨‍💼 Staff: priya@example.com                   │     │
│    └─────────────────────────────────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

#### Components
- **Logo Container**: 64x64px, gradient background, centered lightning icon
- **Card**: 400px width, white background, shadow-2xl
- **Input Fields**: Full width, 48px height, border radius 8px
- **Button**: Full width, 48px height, gradient background
- **Demo Cards**: Light background, rounded corners, small text

### 2. Dashboard Header (1440x64)

#### Layout Structure
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│ ⚡ FacilityConnect    🌿💰💬 ⭐1250 👑L5 🛡️Staff 🔔3 👤 ↗️ │
└─────────────────────────────────────────────────────────────┘
\`\`\`

#### Components
- **Logo**: 40x40px gradient circle with lightning icon
- **Action Buttons**: 40x40px, ghost style, hover effects
- **Points Display**: Rounded pill, gradient background
- **Badges**: Small rounded rectangles with icons
- **Avatar**: 40x40px circle with initials
- **Notification Badge**: Red circle with count

### 3. Main Dashboard (1440x900)

#### Tab Navigation
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│ [Dashboard] [Services] [Food] [Booking] [Analytics] [Staff] │
└─────────────────────────────────────────────────────────────┘
\`\`\`

#### Welcome Card
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    Gradient Background                       │
│  Welcome back, Arjun! 👋                    1250           │
│  You're making a real impact...              Total Points   │
│  🔥 7 day streak! 🏆 Rank #3                [Progress Bar] │
└─────────────────────────────────────────────────────────────┘
\`\`\`

#### Stats Grid (4 columns)
\`\`\`
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│   🔧    │ │   ☕    │ │   📅    │ │   🏆    │
│    2    │ │    1    │ │    1    │ │    3    │
│Requests │ │ Orders  │ │Bookings │ │ Badges  │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
\`\`\`

### 4. Service Request Form

#### Layout Structure
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│ 🔧 Maintenance Request                                      │
│                                                             │
│ Issue Description *     Location *                          │
│ [________________]      [________________]                  │
│                                                             │
│ Priority Level          Additional Details                  │
│ [Medium ▼]             [________________]                   │
│                                                             │
│ [        Submit Maintenance Request        ]                │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### 5. Food Menu Grid

#### Layout Structure
\`\`\`
┌─────────┐ ┌─────────┐ ┌─────────┐
│   🥗    │ │   🍗    │ │   🍽️    │
│ Paneer  │ │Chicken  │ │  Dal    │
│ Butter  │ │Biryani  │ │ Tadka   │
│ Masala  │ │         │ │         │
│ ₹899    │ │ ₹1099   │ │ ₹749    │
│[Add Cart]│ │[Add Cart]│ │[Add Cart]│
└─────────┘ └─────────┘ └─────────┘
\`\`\`

### 6. Chat Interface

#### Layout Structure
\`\`\`
┌─────────────────────────────────────┐
│ 🛡️ Staff Support Chat        ─ ✕   │
│ ● Connected  👥 2 online  🎧 1 staff│
├─────────────────────────────────────┤
│                                     │
│ System: Welcome to support!         │
│                                     │
│     You: Hi, need help with AC 💬  │
│                                     │
│ Staff: I'll help you right away! 🛡️│
│                                     │
├─────────────────────────────────────┤
│ [Type your message...] [Send]       │
└─────────────────────────────────────┘
\`\`\`

### 7. Notification Panel

#### Layout Structure
\`\`\`
┌─────────────────────────────────────┐
│ 🔔 Notifications           3    ✕   │
│ [Mark All as Read]                  │
├─────────────────────────────────────┤
│ ✅ Request Completed         5m ago │
│ Your AC maintenance completed       │
│                                     │
│ ☕ Food Order Ready         15m ago │
│ Paneer Butter Masala ready         │
│                                     │
│ 🎁 Points Earned           30m ago  │
│ You earned 25 points               │
└─────────────────────────────────────┘
\`\`\`

### 8. Points & Benefits Modal

#### Layout Structure
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│ 💰 Points & Benefits                                    ✕   │
│ Redeem your points for amazing rewards                      │
├─────────────────────────────────────────────────────────────┤
│ Your Current Status                              1250       │
│ Level 5 • 1250 Points Available                Total Points │
│ Progress to Level 6: [████████░░] 250/500                  │
│                                                             │
│ Available to Redeem Now                                     │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│ │ ☕ Coffee   │ │ 📅 Priority │ │ 🎁 Lunch    │           │
│ │ Voucher     │ │ Booking     │ │ Voucher     │           │
│ │ 100 pts     │ │ 250 pts     │ │ 500 pts     │           │
│ │[Redeem Now] │ │[Redeem Now] │ │[Redeem Now] │           │
│ └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## 🎯 Interactive Elements

### Buttons

#### Primary Button
- Background: Gradient (Blue Primary → Blue Secondary)
- Text: White, 16px, Medium weight
- Padding: 12px 24px
- Border Radius: 8px
- Hover: Slightly darker gradient
- Active: Scale 0.95

#### Secondary Button
- Background: Transparent
- Border: 1px solid Gray 300
- Text: Gray 700, 16px, Medium weight
- Padding: 12px 24px
- Border Radius: 8px
- Hover: Gray 50 background

#### Ghost Button
- Background: Transparent
- Text: Gray 600, 16px, Medium weight
- Padding: 8px 12px
- Border Radius: 6px
- Hover: Gray 100 background

### Cards

#### Standard Card
- Background: White
- Border: 1px solid Gray 200
- Border Radius: 12px
- Shadow: Medium shadow
- Padding: 24px

#### Gradient Card
- Background: Linear gradient
- Border: None
- Border Radius: 12px
- Shadow: Large shadow
- Text: White

### Form Elements

#### Input Field
- Background: White
- Border: 1px solid Gray 300
- Border Radius: 8px
- Padding: 12px 16px
- Height: 48px
- Focus: Blue Primary border, shadow

#### Select Dropdown
- Same as input field
- Arrow icon on right
- Dropdown: White background, shadow

### Badges

#### Status Badge
- Small rounded rectangle
- Padding: 4px 8px
- Text: 12px, Medium weight
- Colors based on status:
  - Success: Green background
  - Warning: Yellow background
  - Error: Red background
  - Info: Blue background

#### Points Badge
- Rounded pill shape
- Gradient background
- White text
- Icon + number

## 📐 Component Specifications

### Avatar Component
- Size: 40x40px (default)
- Border Radius: Full (circular)
- Border: 2px solid (color based on role)
- Fallback: Initials with gradient background

### Progress Bar
- Height: 8px
- Background: Gray 200
- Fill: Gradient based on context
- Border Radius: Full

### Tab Navigation
- Background: White with 50% opacity
- Backdrop blur effect
- Active tab: White background
- Tab padding: 12px 16px
- Icons: 16x16px

### Modal/Popup
- Background: White
- Border Radius: 16px
- Shadow: XL shadow
- Max width: Based on content
- Backdrop: Black with 50% opacity

## 🎨 Figma Setup Instructions

### 1. Create New File
- File name: "FacilityConnect Design System"
- Canvas size: 1440x900 (Desktop)

### 2. Set up Color Styles
1. Create color styles for all colors listed above
2. Name them systematically (e.g., "Primary/Blue/500")
3. Organize in folders: Primary, Secondary, Neutral, Status

### 3. Set up Text Styles
1. Create text styles for all typography sizes
2. Name them: "Heading/H1", "Body/Large", etc.
3. Set line heights: 1.2 for headings, 1.5 for body text

### 4. Create Components
1. **Button Component**: Create variants for Primary, Secondary, Ghost
2. **Card Component**: Create variants for Standard, Gradient
3. **Input Component**: Create variants for different states
4. **Badge Component**: Create variants for different types
5. **Avatar Component**: Create with placeholder and variants

### 5. Build Layouts
1. Start with the login screen
2. Create the main dashboard layout
3. Build each tab content area
4. Create modal overlays
5. Design mobile responsive versions

### 6. Add Interactions
1. Button hover states
2. Tab switching
3. Modal open/close
4. Form interactions
5. Notification animations

### 7. Create Prototype Flow
1. Login → Dashboard
2. Navigation between tabs
3. Form submissions
4. Modal interactions
5. Chat interface

## 📱 Responsive Breakpoints

### Desktop (1440px+)
- Full layout as described
- 6-column tab navigation for staff
- Side-by-side layouts

### Tablet (768px - 1439px)
- Stacked layouts
- Reduced padding
- Simplified navigation

### Mobile (320px - 767px)
- Single column layouts
- Bottom navigation
- Simplified cards
- Collapsible sections

## 🎭 Animation Guidelines

### Micro-interactions
- Button press: Scale 0.95, 100ms ease-out
- Card hover: Lift shadow, 200ms ease-out
- Modal open: Scale from 0.9 to 1, 300ms ease-out
- Notification: Slide in from right, 400ms ease-out

### Page Transitions
- Tab switching: Fade transition, 200ms
- Modal backdrop: Fade in, 300ms
- Loading states: Pulse animation

## 🔧 Figma Plugins Recommended

1. **Iconify**: For consistent icons (Lucide React set)
2. **Content Reel**: For realistic content
3. **Unsplash**: For placeholder images
4. **Auto Layout**: For responsive components
5. **Component Replacer**: For quick updates

This comprehensive guide will help you recreate the entire FacilityConnect interface in Figma with pixel-perfect accuracy and proper design system organization!
