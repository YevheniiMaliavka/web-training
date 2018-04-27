import React, { createContext } from "react";
import { defaultLocale } from "../i18n";

const LocaleContext = createContext(defaultLocale);

export const LocaleProvider = LocaleContext.Provider;

export const LocaleConsumer = LocaleContext.Consumer;

export const withLocale = Component => props => (
  <LocaleConsumer>
    {locale => <Component {...props} locale={locale} />}
  </LocaleConsumer>
);
