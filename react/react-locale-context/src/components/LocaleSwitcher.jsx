import React from "react";

export const LocaleSwitcher = ({ defaultLocale, onLocaleSwitch }) => (
  <select name="Locale" defaultValue={defaultLocale} onChange={onLocaleSwitch}>
    <option value="en">English</option>
    <option value="de">Deutsch</option>
  </select>
);
