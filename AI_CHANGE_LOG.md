# AI Change Log

A running log of changes made by the AI assistant during the session.

---

## Session: 2026-07-19

### Summary

Built the core screens, components, routing, and theming for the Car Sound Diagnosis mobile app. Wired splash → home, home → history, home → sign-in, and splash → sign-in/sign-up flows. Removed redundant per-screen font loading by moving font initialization into the root layout.

---

## Files Created

### Routes

| File              | Purpose                                   |
| ----------------- | ----------------------------------------- |
| `app/history.tsx` | Route entry point for the history screen. |
| `app/sign-in.tsx` | Route entry point for the sign-in screen. |
| `app/sign-up.tsx` | Route entry point for the sign-up screen. |

### Screens

| File                            | Purpose                                                    |
| ------------------------------- | ---------------------------------------------------------- |
| `src/screens/History/index.tsx` | Past recordings list with mock data.                       |
| `src/screens/SignIn/index.tsx`  | Sign-in form (email/phone + password).                     |
| `src/screens/SignUp/index.tsx`  | Sign-up form (full name, email, phone, password, confirm). |

### Components

| File                             | Purpose                                                |
| -------------------------------- | ------------------------------------------------------ |
| `src/components/Input/index.tsx` | Reusable labeled text input with optional error state. |

### Documentation

| File                 | Purpose                                                        |
| -------------------- | -------------------------------------------------------------- |
| `PROJECT_SUMMARY.md` | Initial project overview (created by mistake, now kept as-is). |

---

## Files Modified

### `app/_layout.tsx`

- Replaced hard-coded `useFonts` calls with the shared `fontSources` from `src/theme/fonts.ts`.
- Added `history`, `sign-in`, and `sign-up` screens to the `Stack`.
- Centralized splash screen hiding so fonts load before the first screen appears.

```tsx
import { fontSources } from "@/src/theme";

const [fontsLoaded, fontError] = useFonts(fontSources);

useEffect(() => {
  if (fontsLoaded || fontError) {
    SplashScreen.hideAsync();
  }
}, [fontsLoaded, fontError]);
```

### `src/theme/colors.ts`

- Added `backgroundGolden` (`#FFFBEB`) for the home screen background.
- Added `primaryLight` (`#48BCCA`) for welcome/guide text.
- Added `golden` and `goldenLight` accent colors.
- Added `overlay` and `backdrop` helpers.
- Added gradient definitions for the splash screen.

### `src/theme/fonts.ts`

- Defined `fontSources` and `fontFamilies` for Inter (regular, bold, italic).
- Exported them from `src/theme/index.ts` so the root layout can load them in one place.

### `src/screens/Splash/index.tsx`

- Added the `Get Started` CTA that navigates to `/(tabs)`.
- Added the `Sign In` link that navigates to `/sign-in`.
- Added overlay and typography styling to match the calm/trustworthy design direction.

### `src/screens/Home/index.tsx`

- Switched the background to `colors.backgroundGolden`.
- Added a centered car illustration and a lighter-teal instruction text.
- Integrated `HomeHeader` and `HomeBottomBar`.

```tsx
<Text style={styles.instruction}>
  Click on record so we can{"\n"}
  diagnose what could be{"\n"}
  wrong with your car.
</Text>
```

### `src/components/HomeHeader/index.tsx`

- Added a greeting and avatar placeholder for the logged-in home screen.

### `src/components/HomeBottomBar/index.tsx`

- Added a custom bottom dock with three actions:
  - **History** → `/history`
  - **Record** → `onRecord` prop (placeholder for recording logic)
  - **Logout** → `/sign-in`

```tsx
const handleHistory = () => {
  router.push("/history");
};

const handleLogout = () => {
  router.push("/sign-in");
};
```

### `src/components/RecordButton/index.tsx`

- Added the centered floating record button used in the home bottom bar.
- Later resized to 80×80 px so it fits cleanly inside the new floating pill dock.

### `src/components/Button/index.tsx`

- Added variants (`primary`, `secondary`, `outline`, `ghost`), loading state, icons, and full-width support.

### `src/components/AppText/index.tsx`

- Added a reusable text wrapper that consumes the theme fonts.

### `src/theme/index.ts` (barrel export)

- Confirmed all theme modules are exported from a single entry point.

---

## Subsequent Changes: History Screen Redesign & Floating Dock

### Files Created

| File | Purpose |
|------|---------|
| `src/components/Waveform/index.tsx` | Fake audio waveform visualization using colored bars. |

### Files Modified

#### `src/components/HomeBottomBar/index.tsx`

- Converted the full-width dock into a floating pill.
- Centered it, added full border radius, stronger shadow, and reduced internal padding.

```tsx
dock: {
  width: "100%",
  maxWidth: 360,
  backgroundColor: "#FFFFFF",
  borderRadius: 32,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.12,
  shadowRadius: 24,
  elevation: 10,
}
```

#### `src/components/RecordButton/index.tsx`

- Reduced outer circle from 88×88 to 80×80 and inner circle from 72×72 to 64×64.
- Slightly increased shadow elevation to match the new dock.

#### `src/screens/Home/index.tsx`

- Reduced bottom wrapper padding so the new floating dock sits correctly.

#### `src/screens/History/index.tsx`

- Full redesign to match the provided reference:
  - New header: large “History” title + “Your past sound diagnoses” subtitle.
  - Search bar with filter icon button.
  - Visually selectable filter chips: `All`, `Healthy`, `Needs Attention`, `Critical`.
  - Recordings grouped by month using `SectionList`.
  - New card layout with colored status border, date block, status icon, title, likely diagnosis, confidence badge, waveform, duration, and chevron.
  - Added `status` and `confidence` fields to mock data.
- Added the floating `HomeBottomBar` at the bottom of the history screen.

```tsx
<SectionList
  sections={sections}
  keyExtractor={(item) => item.id}
  renderSectionHeader={renderSectionHeader}
  renderItem={renderItem}
  contentContainerStyle={styles.listContent}
  showsVerticalScrollIndicator={false}
/>
```

---

## Subsequent Changes: Analysis Page

### Files Created

| File | Purpose |
|------|---------|
| `app/analysis.tsx` | Route entry point for the analysis screen. |
| `src/screens/Analysis/index.tsx` | Detailed analysis screen for a single recording. |
| `src/components/Spectrogram/index.tsx` | Fake spectrogram visualization using `react-native-svg`. |

### Files Modified

#### `app/_layout.tsx`

- Registered the new `analysis` screen in the root stack.

#### `src/screens/History/index.tsx`

- Added `onPress` to history cards so tapping navigates to `/analysis`.

### Analysis Screen Structure

- Header with back button, title, and upload/share icon.
- Recorded card with play button, date/time, and duration badge.
- Toggle tabs: `Waveform` / `Spectrogram` (default: Spectrogram).
- Fake spectrogram visualization with Y-axis and X-axis labels.
- `Most Likely Cause` section with confidence progress bar.
- `Explanation` section.
- `Other Possibilities` list with chevrons.
- `What You Can Do` actionable section.
- Sticky footer with `Save Report` and `Share` buttons.

---

## Subsequent Fix: System UI Visibility

### Problem
The app was drawing edge-to-edge, covering the system status bar and navigation bar on Android.

### Fix
In `app.json`, disabled edge-to-edge mode:

```json
"android": {
  "edgeToEdgeEnabled": false
}
```

### Verification
Confirmed all screens already use `SafeAreaView` from `react-native-safe-area-context`, so content avoids notches and system insets without breaking layout.

---

## Subsequent Change: Background Color

### What changed
- Removed the golden yellow background.
- Replaced the page background color with a light teal/aqua shade.

### Files modified

#### `src/theme/colors.ts`
- Changed `background` from `#F7F8FA` to `#E8F7F8`.
- Added `backgroundTeal: "#E8F7F8"` as an alias for clarity.
- Removed `backgroundGolden` since it is no longer used.

#### `src/screens/Home/index.tsx`
- Changed `SafeAreaView` background from `colors.backgroundGolden` to `colors.background`.

#### `src/screens/History/index.tsx`
- Changed `SafeAreaView` background from `colors.backgroundGolden` to `colors.background`.

#### `src/screens/Analysis/index.tsx`
- Already used `colors.background`, so it automatically adopted the new light teal/aqua.

### Notes
- Splash, Sign In, and Sign Up screens keep their background images, so they are unaffected.
- The analysis page reference you shared uses a similar light cool background, so the app now has a consistent page background across Home, History, and Analysis.

---

## Subsequent Revert: Back to Golden Yellow Background

### What changed
- Reverted the page background back to the original golden yellow.

### Files modified

#### `src/theme/colors.ts`
- Restored `background` to `#F7F8FA`.
- Restored `backgroundGolden: "#FFFBEB"`.
- Kept `backgroundTeal: "#E8F7F8"` as a leftover alias for potential future use.

#### `src/screens/Home/index.tsx`
- Changed `SafeAreaView` background back to `colors.backgroundGolden`.

#### `src/screens/History/index.tsx`
- Changed `SafeAreaView` background back to `colors.backgroundGolden`.

#### `src/screens/Analysis/index.tsx`
- Changed `SafeAreaView` and footer background from `colors.background` to `colors.backgroundGolden` so all pages share the same background.

---

## Subsequent UI Polish: History & Analysis

### Feedback addressed
1. Consistent page content height/padding across Home, History, Splash, and Analysis.
2. History title should use Inter in aqua shade; no italics; add a back button.
3. Remove waveform and timestamp from History cards.
4. Filter chips should not truncate; wrap to multiple lines.
5. Remove confidence badges from History cards; move navigation chevron to the top-right.

### Files modified

#### `src/screens/History/index.tsx`
- Header: changed to horizontal layout with plain `ChevronLeft` back button on the left and stacked title/subtitle on the right.
- Header: changed title font to match the Home greeting format (`fontFamily: regular`, size 32, lineHeight 40, `colors.primaryLight`), without italics.
- Header: matched Home/Splash header padding (`paddingTop: spacing.xl`, `paddingBottom: spacing.lg`).
- Container: changed `paddingHorizontal` from `spacing.lg` to `spacing.xl` to match Home.
- Removed `Waveform` import and usage.
- Removed `time`, `duration`, and `confidence` from card UI and mock data.
- Removed confidence badge from cards.
- Moved `ChevronRight` to the top-right corner of the card.
- Changed `chipRow` to `flexWrap: "wrap"` so all chips are visible.

#### `src/screens/Analysis/index.tsx`
- Header: replicated the History header layout with a plain `ChevronLeft` back button and stacked title/subtitle.
- Header: changed title color to `colors.primaryLight` and matched Home greeting font format (`fontFamily: regular`, size 32, lineHeight 40).
- Header: matched Home/Splash padding (`paddingTop: spacing.xl`, `paddingBottom: spacing.lg`, `paddingHorizontal: spacing.xl`).
- Removed the top-right upload icon from the header to match the History header style.
- Added subtitle "Detailed diagnosis report".
- Scroll content: changed `paddingHorizontal` from `spacing.lg` to `spacing.xl`.
- Footer: changed `paddingVertical` from `spacing.md` to `spacing.sm` and `paddingHorizontal` to `spacing.xl`.

#### `src/components/HomeBottomBar/index.tsx`
- Reduced wrapper `paddingBottom` from `spacing.md` to `spacing.sm` to align the dock with the Analysis footer height.

---

## Subsequent Layout Fix: Responsive Spectrogram + Consistent Screen Heights + Smaller Dock

### Problems addressed
1. Spectrogram on Analysis was overflowing its container on narrow screens.
2. Content area height differed across Home, History, and Analysis because header and footer heights were not standardized.
3. Dock was too large; user wanted a smaller, cuter dock.

### Files modified

#### `src/components/Spectrogram/index.tsx`
- No change to the component itself; it still accepts `width` and `height` props.

#### `src/screens/Analysis/index.tsx`
- Added `useWindowDimensions` to compute spectrogram size from screen width.
- Spectrogram width = `screenWidth - spacing.xl * 2 - spacing.md * 2`.
- Spectrogram height = `spectrogramWidth * 0.5` (scales with width).
- Passed computed dimensions into `<Spectrogram width={...} height={...} />`.
- Set header `minHeight: 164` to match Home header.
- Reduced footer height to 64 px (padding 4 top + 4 bottom around the 56 px buttons) to match the new dock.

#### `src/components/HomeHeader/index.tsx`
- Set `minHeight: 164` on the header container to create a fixed header height.

#### `src/screens/History/index.tsx`
- Set header `minHeight: 164` to match Home header.

#### `src/components/HomeBottomBar/index.tsx`
- Reduced dock `maxWidth` from `360` to `300`.
- Reduced dock `borderRadius` from `32` to `28`.
- Reduced content padding from `spacing.md` to `spacing.sm`.
- Reduced side icon size from `24` to `20`.
- Reduced label font size from `12` to `11`.
- Reduced side button `minWidth` from `64` to `52`.
- Reduced `RecordButton` size from 80×80 to 68×68 (inner from 64×64 to 56×56) and mic icon from `32` to `24`.
- Set wrapper `height: 64` to standardize the bottom bar footprint.

#### `src/screens/Home/index.tsx`
- Removed extra bottom wrapper padding so the Home bottom bar footprint is exactly the dock’s `64 px` height.

### Result
- All three screens now have the same header height (164 px) and bottom bar height (64 px).
- The content area between header and footer is the same height on every screen.
- Spectrogram no longer overflows.
- Dock is smaller and visually lighter.

---

## Subsequent Fix: System UI Visibility in Expo Go

### Problem
Even with `edgeToEdgeEnabled: false` in `app.json`, the app still covered the status bar and navigation bar inside **Expo Go**. This is because Expo Go's own native shell runs edge-to-edge and the `app.json` flag has limited effect inside it.

### Fix

#### New dependency
- Installed `expo-navigation-bar` (`~5.0.10`) for controlling the Android navigation bar at runtime.

#### `app/_layout.tsx`
- Added `SystemUI.setBackgroundColorAsync("#FFFBEB")` on mount — this sets the root view background color, which shows behind the system bars when the app is edge-to-edge.
- Added `NavigationBar.setHidden(false)` on Android to ensure the bottom nav bar is not hidden.
- Changed `StatusBar` style from `"auto"` to `"dark"` (dark icons for the light golden background).

```tsx
useEffect(() => {
  SystemUI.setBackgroundColorAsync("#FFFBEB");

  if (Platform.OS === 'android') {
    NavigationBar.setHidden(false);
  }
}, []);
```

#### `app.json`
- Added explicit `android.statusBar` config (dark-content, golden background, non-translucent).
- Added explicit `android.navigationBar` config (dark-content, golden background).

```json
"statusBar": {
  "barStyle": "dark-content",
  "backgroundColor": "#FFFBEB",
  "translucent": false
},
"navigationBar": {
  "barStyle": "dark-content",
  "backgroundColor": "#FFFBEB"
}
```

---

## Decisions Made

1. **Fonts load once at the root.** `expo-splash-screen` keeps the native splash visible until `useFonts` resolves, so every screen can assume fonts are ready.
2. **Home and History use golden yellow background.** `backgroundGolden` (`#FFFBEB`) is back as the page background for these screens.
3. **No auth state yet.** The app currently treats the user as already logged in on the home screen. Logout just navigates to `/sign-in`.
4. **Icons come from `lucide-react-native` and `@expo/vector-icons`.** Lucide handles UI icons; MaterialIcons handles the splash CTA car icon.
5. **Route wrappers are thin.** Each route file (`app/history.tsx`, etc.) only imports and renders the screen component.

---

## Known Issues Left

1. **`Button` component has TypeScript errors.** The `style` array can receive `false` from short-circuit conditions like `fullWidth && styles.fullWidth`, and it uses dynamic indexing `styles[variant]` which is not type-safe. Intentionally deferred so you can focus on learning the core UI first.

2. **No real recording logic.** The `RecordButton` and `HomeBottomBar` only accept an `onRecord` prop; no `expo-av` or `expo-audio` integration is in place yet.

3. **History data is mocked.** `MOCK_RECORDINGS` in `src/screens/History/index.tsx` is hard-coded.

---

_Last updated: 2026-07-19_
