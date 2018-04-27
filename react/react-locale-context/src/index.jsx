import React from "react";
import { render } from "react-dom";
import { withLocale, LocaleProvider } from "./components/Locale";
import { LocaleSwitcher } from "./components/LocaleSwitcher";
import { getTranslations, defaultLocale } from "./i18n";
import { AppContent } from "./AppContent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: defaultLocale,
      translations: getTranslations(props.locale)
    };
  }

  onLocaleSwitch({ target: { value } }) {
    this.setState({
      locale: value,
      translations: getTranslations(value)
    });
  }

  render() {
    const { translations, locale } = this.state;
    return (
      <div>
        <div>{translations.headline}!</div>
        <LocaleProvider value={locale}>
          <AppContent />
          <LocaleSwitcher
            defaultLocale={locale}
            onLocaleSwitch={e => this.onLocaleSwitch(e)}
          />
        </LocaleProvider>
      </div>
    );
  }
}

const LocalizedApp = withLocale(App);

const rootNode = document.getElementById("app");

render(<LocalizedApp />, rootNode);
