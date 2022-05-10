import React, { memo } from "react";
import propTypes from "prop-types";
import { IntlProvider } from "react-intl";

function WithIntlProvider(WrappedComponent, locale, language) {
  return memo((props) => {
    return (
      <IntlProvider locale={language} messages={locale[language]}>
        <WrappedComponent {...props} />
      </IntlProvider>
    );
  });
}

export default WithIntlProvider;

WithIntlProvider.propTypes = {
  children: propTypes.element,
  locale: propTypes.object,
  language: propTypes.string,
};
