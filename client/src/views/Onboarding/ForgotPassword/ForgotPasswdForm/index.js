import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useIntl, FormattedMessage } from "react-intl";

function ForgotPasswdForm({ theme }) {
  const intl = useIntl();
  const onFinish = useCallback((values) => {}, []);

  return (
    <Form name="forgot_password" className="container-form" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: intl.formatMessage({
              id: "forgot-password.form.email.valid-message",
            }),
          },
          {
            required: true,
            message: intl.formatMessage({
              id: "forgot-password.form.email.required-message",
            }),
          },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder={intl.formatMessage({
            id: "forgot-password.form.email.placehorder",
          })}
        />
      </Form.Item>
      <Form.Item>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          <FormattedMessage id="forgot-password.form.button.label" />
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ForgotPasswdForm;
