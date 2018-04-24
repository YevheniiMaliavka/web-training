import React from "react";
import { render } from "react-dom";
import { withLocale } from "./components/Locale";


class App extends React.Component {
  render() {
    const { translations } = this.props.locale.translations;
    return (
      <div>
        <div>{translations.headline}!</div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

const rootNode = document.getElementById("app");

const LocalizedApp = withLocale(App);

render(<LocalizedApp />, rootNode);
