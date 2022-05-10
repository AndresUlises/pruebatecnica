import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { OnboardPage } from "../../../components";
import WithoutPasswordForm from "./WithoutPasswordForm";
import locale from "./locale.json";
import WithIntlProvider from "../../../hoc/WithIntlProvider";
import browserLanguage from "../../../helpers/browserLanguage";

const theme = {
  fontColor: "#989eb5",
};

function SignInWithoutPassword() {
  const intl = useIntl();
  return (
    <OnboardPage
      header={{
        title: intl.formatMessage({ id: "login-without-password.title" }),
      }}
      form={<WithoutPasswordForm theme={theme} />}
      footer={
        <Link to="/singing">
          <FormattedMessage id="login-without-password.footer.link" />
        </Link>
      }
    />
  );
}

export default WithIntlProvider(
  SignInWithoutPassword,
  locale,
  browserLanguage()
);
