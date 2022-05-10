import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useIntl, FormattedMessage } from "react-intl";

function WithoutPasswordForm({ theme }) {
  const intl = useIntl();
  const onFinish = useCallback((values) => {}, []);

  return (
    <Form
      name="without_password"
      className="container-form"
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: intl.formatMessage({
              id: "login-without-password.form.email.valid-message",
            }),
          },
          {
            required: true,
            message: intl.formatMessage({
              id: "login-without-password.form.email.required-message",
            }),
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder={intl.formatMessage({
            id: "login-without-password.form.email.placehorder",
          })}
        />
      </Form.Item>
      <Form.Item>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          <FormattedMessage id="login-without-password.form.button.label" />
        </Button>
      </Form.Item>
    </Form>
  );
}

export default WithoutPasswordForm;
