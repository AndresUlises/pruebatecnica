import React, { useState, useCallback } from "react";
import { Button } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { OnboardPage } from "../../../../components";
import ValidationForm from "./VerificationForm";

const theme = {
  fontColor: "#989eb5",
};

function EmailVerification({ userRegistered, nextAction, locale }) {
  const intl = useIntl();
  const [verifying, setVerifying] = useState(false);
  const [messageSpin, setMessageSpin] = useState(
    intl.formatMessage({ id: "verification.spin2" })
  );

  const sendCodeAgain = useCallback(async (e) => {}, [intl, userRegistered]);

  return (
    <OnboardPage
      spinning={verifying}
      messageSpin={messageSpin}
      header={{
        title: intl.formatMessage({ id: "verification.title" }),
        content: (
          <p style={{ margin: "0px" }}>
            <FormattedMessage
              id="verification.content"
              values={{ userMail: <b>{userRegistered}</b> }}
            />
          </p>
        ),
      }}
      form={
        <ValidationForm
          setVerifying={setVerifying}
          userEmail={userRegistered}
          theme={theme}
          nextAction={nextAction}
        />
      }
      footer={
        <div>
          <span style={{ color: theme.fontColor }}>
            <FormattedMessage id="verification.footer.text" />
          </span>
          <Button
            type="link"
            style={{ paddingLeft: "5px" }}
            onClick={sendCodeAgain}
          >
            <FormattedMessage id="verification.footer.link" />
          </Button>
        </div>
      }
    />
  );
}

export default EmailVerification;
