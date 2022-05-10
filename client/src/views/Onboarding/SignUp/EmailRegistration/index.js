import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { OnboardPage } from "../../../../components";
import RegistrationForm from "./RegistrationForm";

const theme = {
  fontColor: "#989eb5",
};

function EmailRegistration({ nextAction, locale }) {
  const [sending, setSending] = useState(false);
  const intl = useIntl();

  return (
    <OnboardPage
      spinning={sending}
      messageSpin={intl.formatMessage({ id: "registration.spin" })}
      header={{
        title: intl.formatMessage({ id: "registration.title" }),
        content: (
          <p style={{ color: theme.fontColor }}>
            <FormattedMessage id="registration.content" />
          </p>
        ),
      }}
      form={<RegistrationForm nextAction={nextAction} />}
      footer={
        <section>
          <span style={{ color: theme.fontColor, paddingRight: "5px" }}>
            <FormattedMessage id="registration.footer.text" />
          </span>
          <Link to="/singing">
            <FormattedMessage id="registration.footer.link" />
          </Link>
        </section>
      }
    />
  );
}

export default EmailRegistration;
