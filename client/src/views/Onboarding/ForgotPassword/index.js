import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { OnboardPage } from "../../../components";
import locale from "./locale.json";
import ForgotPasswdForm from "./ForgotPasswdForm";
import WithIntlProvider from "../../../hoc/WithIntlProvider";
import browserLanguage from "../../../helpers/browserLanguage";

const theme = {
  fontColor: "#989eb5",
};

function ForgotPassword() {
  const intl = useIntl();
  return (
    <OnboardPage
      header={{
        title: intl.formatMessage({ id: "forgot-password.title" }),
        content: (
          <p>
            <FormattedMessage id="forgot-password.content" />
          </p>
        ),
      }}
      form={<ForgotPasswdForm theme={theme} />}
      footer={
        <Link to="/singing">
          <FormattedMessage id="forgot-password.footer.link" />
        </Link>
      }
    />
  );
}

export default WithIntlProvider(ForgotPassword, locale, browserLanguage());
