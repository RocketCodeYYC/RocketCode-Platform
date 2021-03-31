import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Card } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, PageHeaderWrapper, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { enUSIntl, ConfigProvider } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import { queryRule, updateRule, addRule, removeRule } from './service';

import _ from 'underscore';


import { queryGenericObjectsForProTable } from '../../services/common';




const ContactsPage = () => {

  const actionRef = useRef();

  //const intl = useIntl();

  /**
   * ProTable columns
   */
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      copyable: true
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: pageSize, // <- get value from state
    //count: 10,
    //total: 50,
    current: currentPage, // <- get value from state
    onChange: (page, pageSize) => {
      //console.log('here: ' + page + ', ' + pageSize);
      setCurrentPage(page); // <- store this in state
      setPageSize(pageSize); // <- store this in state
      //actionRef.current.reload();
      fetchData({ current: page, pageSize: pageSize }, {}, {});
    },
  };

  const [contactData, setContactData] = useState();

  const fetchData = async (params, sorter, filter) => {

    console.log('fetchData resource: ' + JSON.stringify(params.resource));
    console.log('fetchData params: ' + JSON.stringify(params));
    console.log('fetchData sorter: ' + JSON.stringify(sorter));
    console.log('fetchData filter: ' + JSON.stringify(filter));

    let sort = sorter;

    if (_.isEmpty(sort)) {
      sort = { 'date': 'descend' };
      console.log('sort is empty, defaults to: ' + JSON.stringify(sort));
    }

    let data = await queryGenericObjectsForProTable(params, sort, filter);

    console.log('fetchData Contacts: ' + JSON.stringify(data));

    setContactData(data.results);

    console.log('total: ' + data.count);

    return {
      data: data.results,
      total: data.count,
      success: true
    }
  }


  return (
    <PageHeaderWrapper
      title="Show Contacts">
      <Card title="Contact Administration">
        <ConfigProvider value={{ intl: enUSIntl, }}>
          <ProTable
            headerTitle="Manage Contacts"
            actionRef={actionRef}
            rowKey="id"
            toolBarRender={() => [
              <Button type="primary" onClick={() => handleModalVisible(true)}>
                <PlusOutlined /> Add New
              </Button>,
            ]}
            request={(params, sorter, filter) => fetchData({resource: 'Contact', ...params}, sorter, filter)}
            columns={columns}
            /*
            pagination={{
              defaultCurrent: 1
            }}*/
            pagination={paginationProps}
            dateFormatter="string"
          />
        </ConfigProvider>
      </Card>
    </PageHeaderWrapper>
  );
};

export default ContactsPage;
