// the list of colors objects , if the user have his one theme he can add it as a object to
//  const presets, and he will be able to use it directly
export const presets = {
  // ثيم فاتح افتراضي (Light Theme)
  light: {
    "--eak-bg": "#f8f9fa",
    "--eak-surface": "#ffffff",
    "--eak-primary": "#0077b6",
    "--eak-border": "#dee2e6",
    "--eak-text": "#212529",
  },

  // ثيم مظلم احترافي (Dark Theme)
  dark: {
    "--eak-bg": "#121212",
    "--eak-surface": "#1e1e1e",
    "--eak-primary": "#bb86fc",
    "--eak-border": "#333333",
    "--eak-text": "#ffffff",
  },

  // ثيم زمردي (Emerald Theme) كمثال ملون جاهز
  emerald: {
    "--eak-bg": "#f0fdf4",
    "--eak-surface": "#ffffff",
    "--eak-primary": "#10b981",
    "--eak-border": "#bbf7d0",
    "--eak-text": "#064e3b",
  },
  generated: {
    "--eak-bg": "",
    "--eak-surface": "",
    "--eak-primary": "",
    "--eak-border": "",
    "--eak-text": "",
  },
};
