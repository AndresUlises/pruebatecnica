import React, { useCallback } from "react";
import { PageWithHeader } from "../../../components";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, UserAddOutlined } from "@ant-design/icons";
import { contactService } from "../../../services";

function CreateContact({ history }) {
  const onFinish = useCallback(
    async (values) => {
      try {
        await contactService.addContact(values);
        history.goBack();
      } catch (error) {
        message.error(error.message);
      }
    },
    [history]
  );

  return (
    <PageWithHeader
      title="Create a contact"
      history={history}
      enabledBackButton
    >
      <section style={{ width: "500px", padding: "40px" }}>
        <Form name="create_contact" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
                whitespace: true,
              },
            ]}
          >
            <Input prefix={<UserAddOutlined />} placeholder="Name" />
          </Form.Item>
          <Form.Item>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Save Contact
            </Button>
          </Form.Item>
        </Form>
      </section>
    </PageWithHeader>
  );
}

export default CreateContact;
