import React, { useCallback, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Form, Input, Button, Checkbox, message } from "antd";
import { LockOutlined, UserAddOutlined } from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import { signupService } from "../../../../../services";

function AccountForm({ theme, gotoHomePage }) {
  const intl = useIntl();
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const email = Cookies.get("SIGN_UP_EMAIL");
    const userId = Cookies.get("SIGN_UP_USER_ID");
    debugger;
    if (email) {
      setUserEmail(email);
    }
    if (userId) {
      setUserId(userId);
    }
  }, []);

  const onFinish = useCallback(
    async (values) => {
      try {
        await signupService.userInitialAccountSettings({
          ...values,
          id: parseInt(userId),
          email: userEmail,
        });
        Cookies.set("AUTH_TOKEN", "A123456a");
        Cookies.remove("SIGN_UP_VIEW");
        Cookies.remove("SIGN_UP_USER_ID");
        Cookies.remove("SIGN_UP_EMAIL");
        gotoHomePage();
      } catch (error) {
        message.error(error.message);
      }
    },
    [gotoHomePage, userId, userEmail]
  );

  return (
    <Form
      name="account_form"
      className="container-form"
      initialValues={{ sendMeEmails: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your name!",
            whitespace: true,
          },
        ]}
      >
        <Input prefix={<UserAddOutlined />} placeholder="User Name" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              id: "account-settings.form.password.required-message",
            }),
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder={intl.formatMessage({
            id: "account-settings.form.password.placehorder",
          })}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="sendMeEmails" valuePropName="checked" noStyle>
          <Checkbox style={{ color: theme.fontColor }}>
            <FormattedMessage
              id="account-settings.form.check.label"
              values={{ companyName: <b>Jala</b> }}
            />
          </Checkbox>
        </Form.Item>
      </Form.Item>
      <Form.Item>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          <FormattedMessage id="account-settings.form.button.label" />
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AccountForm;
