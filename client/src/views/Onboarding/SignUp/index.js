import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import locale from "./locale.json";
import EmailRegistration from "./EmailRegistration";
import EmailVerification from "./EmailVerification";
import InitialAccountSetting from "./InitialAccountSetting";
import WithIntlProvider from "../../../hoc/WithIntlProvider";
import browserLanguage from "../../../helpers/browserLanguage";

const steps = [
  { content: EmailRegistration },
  { content: EmailVerification },
  { content: InitialAccountSetting },
];

function SignUp() {
  const history = useHistory();
  const [currentView, setCurrentView] = useState(0);

  const next = useCallback(
    (userData) => {
      setCurrentView(currentView + 1);
    },
    [currentView]
  );

  const pre = useCallback(() => {
    setCurrentView(currentView - 1);
  }, [currentView]);

  const gotoHomePage = useCallback(() => {
    history.push("/contacts/all");
  }, [history]);

  useEffect(() => {
    const signupData = Cookies.get("SIGN_UP_VIEW");
    if (signupData) {
      next(JSON.parse(signupData));
    }
  }, []);

  function getForm() {
    const Component = steps[currentView].content;
    return (
      <Component
        locale={locale}
        nextAction={next}
        preAction={pre}
        gotoHomePage={gotoHomePage}
      />
    );
  }

  return getForm();
}

export default WithIntlProvider(SignUp, locale, browserLanguage());
