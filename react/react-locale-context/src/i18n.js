const translations = {
  en: {
    headline: "Hello, World",
    currentTime: "The current time is"
  },
  de: {
    headline: "Hallo, Welt",
    currentTime: "Die aktuelle Uhrzeit:"
  }
};

export const getTranslations = locale => translations[locale];
