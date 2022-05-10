import React, { useCallback } from "react";
import Cookies from "js-cookie";
import { Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import { signupService } from "../../../../../services";

function RegistrationForm({ nextAction }) {
  const intl = useIntl();
  const onFinish = useCallback(
    async (values) => {
      try {
        await signupService.registerEmail(values);
        nextAction({ useEmail: values.username });
        Cookies.set("SIGN_UP_VIEW", "1");
        Cookies.set("SIGN_UP_EMAIL", values.username);
      } catch (error) {
        message.error(error.message);
      }
    },
    [nextAction]
  );

  return (
    <Form name="signup_form" className="container-form" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            type: "email",
            message: intl.formatMessage({
              id: "registration.form.email.invalid-message",
            }),
          },
          {
            required: true,
            message: intl.formatMessage({
              id: "registration.form.email.required-message",
            }),
          },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder={intl.formatMessage({
            id: "registration.form.email.placeholder",
          })}
        />
      </Form.Item>
      <Form.Item>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          <FormattedMessage id="registration.form.button.label" />
        </Button>
      </Form.Item>
    </Form>
  );
}

export default RegistrationForm;
