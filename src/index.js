import { presets } from "./themes.js";

// The key that we will use to store the attribute in local Storage
const STORAGE_KEY = "eak-selected-theme";
// The key that we will use  it if we lost the generated hsl

const HEX_STORAGE_KEY = "eak-hex-theme";

// function to tranform the color from HEX to HSL
function hexToHsl(hex) {
  // 1. clear the color from # char
  hex = hex.replace(/^#/, "");

  // 2. handle short hex codes (e.g. "f00" to "ff0000")
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // 3. extract the values for red ,green ,blue
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  // 4. calc the Hue, Saturation ,Lightness from the rgb values
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2; // First : calc the lightness

  if (max === min) {
    h = s = 0; // if max = mix then the hue is quite gray and there is no saturation
  } else {
    let d = max - min; // the deferance between max and min ,we will use it to calc saturation in case max != min

    // seccound : calc the saturation
    if (l > 0.5) {
      s = d / (2 - max - min);
    } else {
      s = d / (max + min);
    }
    // third : calc the hue
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6; // trans hue to ratio
  }

  // 5. (H: 0-360, S: %, L: %) transform the values to right ratio
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// main function that will set the theme into root variable
export function EAKsetTheme(themeNameOrConfig) {
  // Security requirement 1: Verify the working environment (ensure the server does not crash)
  if (
    typeof window === "undefined" ||
    typeof document === "undefined" ||
    !document.documentElement
  ) {
    return; // Exit without causing any server errors.
  }
  // get the object of the theme
  let themeConfig = themeNameOrConfig;
  if (typeof themeNameOrConfig === "string") {
    themeConfig = presets[themeNameOrConfig];
  }
  // Security condition 2: Input validation (ensuring that no null or incorrect values ​​are passed)
  if (
    !themeConfig ||
    typeof themeConfig !== "object" ||
    Array.isArray(themeConfig)
  ) {
    console.warn(
      "[EAK Color Manager]: The setTheme function expects to receive an object containing the variables and their values.",
    );
    return; // Exit to protect the app from crashing.
  }

  // If the data meets the security requirements, we begin the standardized injection process.
  try {
    Object.keys(themeConfig).forEach((variableName) => {
      const colorValue = themeConfig[variableName];

      // Inject the variable and its value directly into the document root (:root).
      document.documentElement.style.setProperty(variableName, colorValue);
    });

    // set the theme into local Storage
    if (typeof themeNameOrConfig === "string") {
      localStorage.setItem(STORAGE_KEY, themeNameOrConfig);
    }
  } catch (error) {
    //  catch any unexpected error during the injection process
    console.error(
      "[EAK Color Manager]: An error occurred while injecting colors into the root directory:",
      error,
    );
  }
}

// funtion to create five Degrees  of color from the main color
export function EAKGetColorDegrees(baseHexColor) {
  // Save the inserted hex to reuse it if we lost the generated hsl
  localStorage.setItem(HEX_STORAGE_KEY, baseHexColor);

  // 1. get the HSL color useing our function
  const { h, s, l } = hexToHsl(baseHexColor);

  // 2. return five Degrees of color by editing the lightness
  const generatedTheme = {
    "--eak-bg": `hsl(${h}, ${s}%, 96%)`, // main background
    "--eak-surface": `hsl(${h}, ${s}%, 88%)`, // Surfaces, cards, and menus
    "--eak-primary": `hsl(${h}, ${s}%, ${l}%)`, // Original base color
    "--eak-border": `hsl(${h}, ${s}%, 35%)`, // Buttons, borders, and shadows
    "--eak-text": `hsl(${h}, ${s}%, 12%)`, // Texts and titles
  };

  // set the new theme in themes object
  presets.generated = generatedTheme;

  // Set the new theme
  EAKsetTheme("generated");

  return generatedTheme;
}

export function EAKsetInitColor(defaultTheme = "light") {
  // Security conditoin
  if (typeof window === "undefined" || typeof localStorage === "undefined")
    return;
  // 1. get the theme from local storage
  const savedTheme = localStorage.getItem(STORAGE_KEY);

  // 2. chose theme to applay
  const themeToApply = savedTheme || defaultTheme;

  // In case we lost the generated hsl and teh theme is generated
  if (themeToApply === "generated") {
    // get the last hex form local strage
    const savedHex = localStorage.getItem(HEX_STORAGE_KEY);

    if (savedHex) {
      EAKGetColorDegrees(savedHex);
    } else {
      EAKsetTheme(defaultTheme);
    }
  } else if (presets[themeToApply]) {
    EAKsetTheme(themeToApply);
  } else {
    EAKsetTheme(defaultTheme);
  }
}
