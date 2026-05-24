import {
  EAKsetInitColor,
  EAKsetTheme,
  EAKGetColorDegrees,
} from "../../src/index.js";

// 1. Run the administrative function immediately upon opening the page
// (it will fetch the saved theme or apply the default).
EAKsetInitColor("light");

// 2.Linking the buttons of pre-made themes
document.getElementById("lightBtn").addEventListener("click", () => {
  EAKsetTheme("light");
});

document.getElementById("darkBtn").addEventListener("click", () => {
  EAKsetTheme("dark");
});

// 3. Linking the dynamic custom color field
document.getElementById("colorPicker").addEventListener("input", (event) => {
  const selectedHex = event.target.value;
  //The subordinate will automatically generate, save to LocalStorage, and inject into the root.
  EAKGetColorDegrees(selectedHex);
});
