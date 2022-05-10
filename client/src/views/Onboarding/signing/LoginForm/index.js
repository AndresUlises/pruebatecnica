import React, { useCallback } from "react";
import Cookies from "js-cookie";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { singingService } from "../../../../services";

function LoginForm({ history, theme, homePath }) {
  const intl = useIntl();
  const onFinish = useCallback(
    async (values) => {
      try {
        await singingService.userSigning(values);
        Cookies.set("AUTH_TOKEN", "A123456a");
        history.push(homePath);
      } catch (error) {
        message.error(error.message);
      }
    },
    [history, homePath]
  );

  return (
    <Form
      name="normal_login"
      className="container-form"
      initialValues={{ rememberMe: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "authentication.form.email.required-message",
            }),
          },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder={intl.formatMessage({
            id: "authentication.form.email.placehorder",
          })}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "authentication.form.password.required-message",
            }),
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder={intl.formatMessage({
            id: "authentication.form.password.placehorder",
          })}
        />
      </Form.Item>
      <Form.Item name="rememberMe" valuePropName="checked">
        <Checkbox style={{ color: theme.fontColor, width: "100%" }}>
          <FormattedMessage id="authentication.form.check.label" />
          <Link style={{ float: "right" }} to="/forgotpassword">
            <FormattedMessage id="authentication.form.link.forgot-label" />
          </Link>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          <FormattedMessage id="authentication.form.button.label" />
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
