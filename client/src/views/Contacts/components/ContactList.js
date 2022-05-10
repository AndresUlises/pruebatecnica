import React, { useState, useEffect } from 'react'
import { Button, Input, Select, Table, Tabs, Popconfirm } from 'antd'
import { SortAscendingOutlined, FilterOutlined, StarOutlined } from '@ant-design/icons'
import { EmptyContainer, PageWithHeader } from '../../../components'
import { contactService } from '../../../services'

function ContactList({ history }) {
  const [contacts, setContacts] = useState([])
  const [pagination, setPagination] = useState({
    current: 20,
    pageSize: 50,
  })

  const columns = [
    {
      title: 'User id',
      dataIndex: 'id',
      width: '20%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name) => name,
      width: '20%',
    },
    {
      title: 'User Email',
      dataIndex: 'email',
      width: '20%',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm title="Delete forever?" onConfirm={() => deleteContact(record.id)}>
          <a>Delete</a>
        </Popconfirm>
      ),
      width: '20%',
    },
  ]

  async function fetchContacts() {
    const recoveredContacts = await contactService.getContacts()
    setContacts(recoveredContacts.data)
  }

  async function deleteContact(id) {
    await contactService.deleteContact(id)
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  function handleTableChange(pagination, filters) {}
  function onTabChange(key) {}
  function onSearch(value) {}
  function onSelectChange(value) {}

  function onAddContact() {
    history.push('/contacts/new')
  }
  return contacts.length ? (
    <PageWithHeader
      history={history}
      title="Contacts"
      actions={[
        <Button onClick={onAddContact} type="primary">
          Add Contacts
        </Button>,
      ]}
    >
      <Tabs
        defaultActiveKey="1"
        onChange={onTabChange}
        style={{
          width: '100%',
          backgroundColor: '#fff',
          paddingRight: '24px',
          paddingLeft: '24px',
        }}
      >
        <Tabs.TabPane tab="All" key="all">
          <section
            style={{
              display: 'flex',
              flexDirection: 'row',
              paddingBottom: '12px',
            }}
          >
            <Input.Search
              placeholder="Search contacts..."
              onSearch={onSearch}
            ></Input.Search>
            <section style={{ display: 'flex', flexDirection: 'row' }}>
              <Select
                placeholder="Domain"
                style={{ width: 120 }}
                onChange={onSelectChange}
              >
                <Select.Option value="gmail">@gmail.com</Select.Option>
                <Select.Option value="tech">@tech.com</Select.Option>
                <Select.Option value="jala">@jala.com</Select.Option>
              </Select>
              <Select
                placeholder="Status"
                style={{ width: 120 }}
                onChange={onSelectChange}
              >
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Archive">Archive</Select.Option>
              </Select>
              <Button icon={<FilterOutlined />}>More Filters</Button>
              <Button icon={<StarOutlined />}>Save Filters</Button>
              <Button icon={<SortAscendingOutlined />}>Sort</Button>
            </section>
          </section>
          <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={contacts}
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Tabs.TabPane>
      </Tabs>
    </PageWithHeader>
  ) : (
    <EmptyContainer description={<span>Add and manage your contacts</span>}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>
          This is where you’ll add contacts, can also import and export your contacts.
        </span>
        <div style={{ padding: '24px' }}>
          <Button onClick={onAddContact} type="primary">
            Add Contacts
          </Button>
          <Button>Import Contacts</Button>
        </div>
      </div>
    </EmptyContainer>
  )
}

ContactList.propTypes = {}

export default ContactList
