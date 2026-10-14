# IT313_Pahunang_JohnSimon_ComponentsAndJSX
### Student Roster Card Renderer

An Expo (React Native) mobile screen that renders currently enrolled students as reusable, styled card components, in the style of an official registrar / class roster application.

---

## 📌 Problem Overview

The IT313 registrar provided a dataset of enrolled students containing their unique IDs, names, course codes, unit counts, and full-load enrollment statuses:

```javascript
const students = [
  { id: "s1", name: "Ana Cruz", course: "IT313", units: 21, isFullLoad: true },
  { id: "s2", name: "Bea Santos", course: "IT313", units: 15, isFullLoad: false },
  { id: "s3", name: "Cid Ramos", course: "IT313", units: 18, isFullLoad: true },
  { id: "s4", name: "Dex Alonzo", course: "IT313", units: 12, isFullLoad: false },
];
```

The objective is to:
1. Render each student in an individual, reusable card component.
2. Conditionally display a **Full Load** badge only when `isFullLoad` is `true`.
3. Compute dynamic roster statistics in the header using JSX expressions and template literals.
4. Wrap all elements within a single root element in the parent component.
5. Demonstrate React list reconciliation by comparing stable keys (`student.id`) against unstable index keys (`index`) when the roster order is reversed.

---

## 🏗️ Component Architecture: `StudentRoster` vs. `StudentCard`

The solution follows clean React separation of concerns with a container/parent component and a presentational child component:

```
App.js
 └── SafeAreaView
      └── StudentRoster (Parent / Container)
           ├── Header & Stats Section (Computed from array)
           ├── Roster Controls & Key Experiment Bar
           └── .map() List
                ├── StudentCard (Child: Ana Cruz)
                ├── StudentCard (Child: Bea Santos)
                ├── StudentCard (Child: Cid Ramos)
                └── StudentCard (Child: Dex Alonzo)
```

### 1. `StudentCard` (`src/components/StudentCard.js`)
- **Role**: Functional presentational component.
- **Props Destructuring**: Directly destructures `{ name, course, units, isFullLoad }` in its function signature.
- **Conditional Rendering**: Uses the JSX logical AND operator to render the badge only when `isFullLoad` is true:
  ```jsx
  {isFullLoad && (
    <View style={styles.fullLoadBadge}>
      <Text style={styles.fullLoadText}>Full Load</Text>
    </View>
  )}
  ```
- **Local State (`isPresent`)**: Includes an interactive attendance toggle (`[isPresent, setIsPresent]`) which provides immediate visual feedback for React key reconciliation experiments.

### 2. `StudentRoster` (`src/components/StudentRoster.js`)
- **Role**: State and list coordinator (Parent / Container).
- **Single Root Element**: Returns a single `<View style={styles.container}>` wrapping the header, interactive controls, and card list.
- **Array Transformations & Computed JSX**: Computes roster statistics directly from the array using template literals and expressions:
  - Total Students: `{`${totalStudents}`}` (using `students.length`)
  - Full Load Count: `{`${fullLoadCount}`}` (using `.filter()`)
  - Total Units: `{`${totalUnits}`}` (using `.reduce()`)
  - Dynamic summary banner: `{`Displaying ${totalStudents} enrolled student${totalStudents === 1 ? '' : 's'} for Term 1`}`
- **List Rendering**: Uses `.map()` over the students array and supplies a stable `key={student.id}`.

---

## 🔬 Key Prop Observation: `student.id` vs. Array `index`

### What happens when `key={index}` is used:
1. When list items are rendered using their array index (`key={0}`, `key={1}`, etc.), React associates component instances with their **numerical positions** rather than their **data identities**.
2. If you mark **Ana Cruz** (at index `0`) as **"Present"**, her card's local state (`isPresent = true`) is bound to the component instance mounted at index `0`.
3. When you press the **"Reverse Roster"** button:
   - The array reverses: Dex Alonzo is now at index `0`, and Ana Cruz is now at index `3`.
   - React inspects key `0`, sees that key `0` still exists, and **reuses the existing component instance at index 0 without resetting its local state**.
   - **Bug / Visible Glitch**: **Dex Alonzo is now incorrectly marked as "Present"**, while Ana Cruz (now at index `3`) is marked as absent!

### What happens when `key={student.id}` is used (Restored Solution):
1. With `key={student.id}` (e.g. `key="s1"`), React links the component instance and its internal state directly to the student's unique ID.
2. When the roster is reversed:
   - React recognizes that the item with key `"s1"` moved from the first position to the last position.
   - React moves the existing DOM / native tree node and preserves Ana Cruz's **"Present"** state with her card at the bottom of the list.
   - Dex Alonzo remains unchecked.

> **Interactive Demo**: The app includes an active toggle button in the control panel to switch between `key={student.id}` (recommended stable key) and `key={index}` so you can test this behavior live.

---

## 🚀 How to Run the App

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Steps

1. **Navigate to the project directory**:
   ```bash
   cd "C:\Users\School Activity 3RD YEAR\IT313_Pahunang_JohnSimon_ComponentsAndJSX"
   ```

2. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

3. **Start the Expo development server**:
   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**:
   - **Physical Device**: Install the **Expo Go** app on your phone (iOS or Android) and scan the QR code displayed in the terminal.
   - **Web Browser**: Press `w` in the terminal (or run `npx expo start --web`).
   - **Android Emulator**: Press `a` in the terminal (requires Android Studio / emulator).
   - **iOS Simulator**: Press `i` in the terminal (requires macOS and Xcode).

---

## 📂 Project Structure

```text
IT313_Pahunang_JohnSimon_ComponentsAndJSX/
├── App.js                          # Main application entry wrapping StudentRoster
├── app.json                        # Expo configuration
├── package.json                    # Project dependencies and scripts
├── README.md                       # Documentation, architecture, and instructions
└── src/
    ├── data/
    │   └── students.js             # Initial IT313 student dataset
    └── components/
        ├── StudentCard.js          # Reusable card component with destructuring & conditional badge
        └── StudentRoster.js        # Parent roster component with stats header & .map()
```
