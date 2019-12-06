import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {IntlProvider} from 'react-intl'

// import en from './i18n/en.js';
// import zh_cn from './i18n/zh-CN';
// import zh_tw from './i18n/zh-TW';

// if (!Intl.PluralRules) {
//   import '@formatjs/intl-pluralrules/polyfill';
//   import '@formatjs/intl-pluralrules/polyfill-locales'; 
// }

// if (!Intl.RelativeTimeFormat) {
//   import '@formatjs/intl-relativetimeformat/polyfill';
//   import '@formatjs/intl-relativetimeformat/polyfill-locales'; 
// }

const Root = () => {
  // const locale = navigator.language;
  // console.log(locale)
  const [locale, setLocale] = useState(navigator.language);
  return (
    <IntlProvider locale={locale} key={locale} defaultLocale="en">
      <App setLocale={setLocale} />
    </IntlProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
