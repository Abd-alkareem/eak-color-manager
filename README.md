# eak-color-manager

🎨 A lightweight, beginner-friendly utility for dynamic theme switching and automatic HSL shade generation from a single HEX color. Zero-config, with built-in `localStorage` persistence.

---

## 💡 The Story Behind the Project

While I was working on a personal frontend project, I found myself constantly writing repetitive code to handle light/dark modes and calculate matching color shades for active buttons and accents. I realized how frustrating and confusing this could be for beginner developers who are just learning to build their own frontend projects from scratch.

So, I decided to pack that logic into this neat, simple, and dependency-free library to save you time and help you build beautiful, dynamic web apps with ease!

---

## 🚀 Features

- 🛡️ **Beginner Friendly:** Pure JavaScript logic with absolute zero external dependencies.
- 🎨 **Dynamic Shades:** Instantly derives 5 harmonious HSL shades from just one HEX code.
- 💾 **Smart Storage:** Automatically remembers your active theme and custom colors across page refreshes.
- ⚡ **Framework Agnostic:** Works perfectly in Vanilla JS, React, Vue, or any modern setup.

---

## 🛠️ API Reference (The 3 Core Functions)

The library exposes three main functions to control your website's visual identity:

### 1. `EAKsetInitColor(defaultTheme)`

This function acts as the **bootstrap** for your application's styling. It should be called as early as possible when the page loads.

- **What it does:** It checks your browser's `localStorage` to see if the user previously selected a theme or custom color. If found, it applies it instantly. If not, it falls back to your specified `defaultTheme` (e.g., `'light'`).
- **Usage:**
  
  ```javascript
  EAKsetInitColor("light");
  ```

### 2. `EAKsetTheme(themeName)`

Use this function to toggle between pre-defined layout presets (like swapping completely between standard light and dark designs).

- **What it does:** It injects the appropriate utility classes/attributes into the root element (<html>) and saves the preference to localStorage.
- **Usage:**
  
  ```javascript
  EAKsetTheme("dark");
  ```

### 3. `EAKGetColorDegrees(hexColor)`

The core magic of this package! This is perfect for custom user profiles or dynamic color pickers.

- **What it does:** You feed it a single HEX color (e.g., #0077b6). It automatically translates it into HSL, computes 5 responsive contrast shades, and injects them directly into your CSS variables (:root) under names like --eak-primary-10, --eak-primary-20, etc. It also locks this color into memory so it persists.
- **Usage:**
  
  ```javascript
  EAKGetColorDegrees("#ff4d4d");
  ```

## 🎨 How Themes Work & CSS Setup

The library automatically generates **5 dynamic HSL shades** for your primary color, and you can add as many custom themes as you like inside your configuration object.

### 1. The 5 Auto-Generated CSS Variables

Whenever you call `EAKGetColorDegrees(hexColor)`, the library translates that color and injects exactly 5 responsive variables into your `:root`:

- `--eak-bg` (Lightest shade)
- `--eak-surface`
- `--eak-primary` (Base shade)
- `--eak-border`
- `--eak-text` (Darkest shade)

### 2. Structuring Your Custom Themes Object

To add pre-defined style presets (like a Professional Dark Theme), you just add them as structured objects. The library will look for these keys and apply them to the `<html>` element dynamically:

```javascript
const presets = {
  // Professional Dark Theme Preset
  dark: {
    "--eak-bg": "#121212",
    "--eak-surface": "#1e1e1e",
    "--eak-primary": "#bb86fc",
    "--eak-border": "#333333",
    "--eak-text": "#ffffff",
  },
  // You can add more custom themes here (e.g., forest, ocean, cyber)
};
```

## 📦 Quick Start with [Vanilla JS]

### 1. `Set Up Your HTML Layout`
```html

<div class="panel">
  <h2>EAK Color Manager Dashboard</h2>
  <button id="lightBtn">Light Theme</button>
  <button id="darkBtn">Dark Theme</button>
  
  <hr>
  <label>Choose a base color to derive shades:</label>
  <input type="color" id="themePicker" value="#0077b6">
</div>

<script type="module" src="./app.js"></script>

### 2. `Connect the Logic`
```
### 2. `Connect the Logic`

  ```javascript

// app.js
import { EAKsetInitColor, EAKsetTheme, EAKGetColorDegrees } from 'eak-color-manager';

// Initialize the manager on page load
EAKsetInitColor('light');

// Handle theme switching buttons
document.getElementById('lightBtn').addEventListener('click', () => EAKsetTheme('light'));
document.getElementById('darkBtn').addEventListener('click', () => EAKsetTheme('dark'));

// Handle live dynamic color pickers safely
document.getElementById('themePicker').addEventListener('input', (event) => {
const selectedHex = event.target.value;
EAKGetColorDegrees(selectedHex);
});
```

## 📦 Quick Start with [React]

### 1. `Initialize inside App Component`

Call the initializer inside a useEffect hook to bootstrap your theme when the React application mounts.

  ```javascript
// App.jsx
import React, { useEffect } from 'react';
import { EAKsetInitColor, EAKsetTheme, EAKGetColorDegrees } from 'eak-color-manager';

function App() {
  useEffect(() => {
    // Initialize defaults on mount
    EAKsetInitColor('light');
  }, []);

  return (
    <div className="panel">
      <h2>EAK Color Manager Dashboard (React)</h2>
      <button onClick={() => EAKsetTheme('light')}>Light Theme</button>
      <button onClick={() => EAKsetTheme('dark')}>Dark Theme</button>

      <hr>
      <label>Choose a base color:</label>
      <input
        type="color"
        defaultValue="#0077b6"
        onChange={(e) => EAKGetColorDegrees(e.target.value)}
      />
    </div>
  );
}

export default App;

```
