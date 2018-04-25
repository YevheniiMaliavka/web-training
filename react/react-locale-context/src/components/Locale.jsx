import React, { createContext } from "react";

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

const defaultLocale = "en";

const LocaleContext = createContext({
  locale: defaultLocale,
  translations: translations[defaultLocale]
});

export const LocaleProvider = LocaleContext.Provider;

export const LocaleConsumer = LocaleContext.Consumer;

export const withLocale = Component => (props) => (
  <LocaleConsumer>{locale => <Component {...props} locale={locale} />}</LocaleConsumer>
);
