import React, { useCallback, useEffect, useState } from "react";
import { message } from "antd";
import Cookies from "js-cookie";
import { FormattedMessage } from "react-intl";
import { CodeVerification } from "../../../../../components";
import { signupService } from "../../../../../services";

function VerificationForm({ theme, nextAction }) {
  const handleChange = useCallback(
    async (codeValue) => {
      try {
        const { data } = await signupService.verificationCode(codeValue);
        Cookies.set("SIGN_UP_USER_ID", `${data.id}`);
        Cookies.set("SIGN_UP_VIEW", "2");
        nextAction();
      } catch (error) {
        message.error(error.message);
      }
    },
    [nextAction]
  );

  return (
    <React.Fragment>
      <CodeVerification handleChangeField={handleChange} />
      <span style={{ color: theme.fontColor }}>
        <FormattedMessage id="verification.form.message" />
      </span>
    </React.Fragment>
  );
}

export default VerificationForm;
