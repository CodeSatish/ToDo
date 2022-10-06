import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { IntlProvider } from "react-intl";
import English from "./lang/en.json";
import Hindi from "./lang/hindi.json";

const locale = navigator.language.split(/[-_]/)[0];
let lang;
if (locale === "en") {
  lang = English;
} else if (locale === "hi") {
  lang = Hindi;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={lang} defaultLocale='en'>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
