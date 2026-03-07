# Login Component System

This is a scalable login component system with 2 variants that can be easily integrated into any project.

## Usage

### Basic Usage

```tsx
import { Login } from '@/shared/login';

// Use Variant 1 (Original Design)
<Login.V1 />

// Use Variant 2 (Modern Card Design)
<Login.V2 />
```

### With Custom Props

```tsx
import { Login } from '@/shared/login';

// Custom Variant 1
<Login.V1
  title="Welcome to Our Platform"
  subtitle="Please sign in to continue"
  showGuestLogin={false}
  onLogin={async (data) => {
    // Custom login logic
    console.log('Login data:', data);
  }}
/>

// Custom Variant 2
<Login.V2
  title="Sign In"
  subtitle="Access your account"
  backgroundColor="bg-gradient-to-r from-purple-400 to-pink-400"
  customStyles={{
    container: "min-h-screen",
    form: "shadow-xl",
    button: "bg-purple-600 hover:bg-purple-700"
  }}
/>
```

### With Custom Handlers

```tsx
import { Login } from '@/shared/login';

const handleLogin = async (data) => {
  // Custom authentication logic
  await authenticateUser(data);
};

const handleGuestLogin = async () => {
  // Custom guest login logic
  await loginAsGuest();
};

const handleForgotPassword = () => {
  // Custom forgot password logic
  navigate('/forgot-password');
};

<Login.V1
  onLogin={handleLogin}
  onGuestLogin={handleGuestLogin}
  onForgotPassword={handleForgotPassword}
/>;
```

## Props

Both variants accept the same props:

- `title`: Login form title
- `subtitle`: Login form subtitle
- `showGuestLogin`: Show guest login option
- `showForgotPassword`: Show forgot password option
- `forgotPasswordText`: Forgot password link text
- `guestLoginText`: Guest login link text
- `submitButtonText`: Submit button text
- `logoMode`: Logo color mode ('white' | 'dark' | 'light')
- `backgroundColor`: Background color class
- `formBackgroundColor`: Form background color class
- `onLogin`: Custom login handler
- `onGuestLogin`: Custom guest login handler
- `onForgotPassword`: Custom forgot password handler
- `className`: Additional CSS classes
- `customStyles`: Custom style overrides

## Variants

### V1 - Original Design

- Split layout with banner and form
- Green theme
- Includes footer
- Based on the original login design

### V2 - Modern Card Design

- Centered card layout
- Blue theme
- Minimal design
- Modern UI with shadows and gradients

## File Structure

```
src/shared/login/
├── components/
│   ├── variant-1.tsx    # Original design variant
│   └── variant-2.tsx    # Modern card variant
├── hooks/
│   └── use-login.tsx    # Login functionality hook
├── utils/
│   ├── model.ts         # TypeScript interfaces
│   ├── variant.ts       # Variant configurations
│   └── index.ts         # Utility functions
└── index.tsx            # Main export file
```
