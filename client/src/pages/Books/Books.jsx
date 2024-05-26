import {  Table, Input, Button, Switch, Tag } from 'antd';
import { useState } from 'react';
import { useAllBooksQuery } from '../../api/fetchAllBooks';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
    width: 200,
  },
  {
    title: 'Publisher',
    dataIndex: 'publisher',
    key: 'publisher',
    width: 300,
  },
  {
    title: 'Issue Status',
    dataIndex: 'isIssued',
    key: 'isIssued',
    render: (issueStatus) => {
      return (
      <Tag color={issueStatus ? 'geekblue' : 'green'}>
          {issueStatus ? 'ISSUED' : 'AVAILABLE'}
      </Tag>
    )}
  },
  {
    title: 'Segment',
    dataIndex: 'segment',
    key: 'segment',
    width: 100,
  },
  {
    title: 'Language',
    dataIndex: 'language',
    key: 'language',
    width: 100,
  },
  {
    title: 'Pages',
    dataIndex: 'pages',
    key: 'pages',
    width: 100,
  },
  {
    title: 'Quantity',
    dataIndex: 'qty',
    key: 'qty',
    width: 100,
  },

  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    width: 100,
  },
  {
    title: 'Section',
    dataIndex: 'section',
    key: 'section',
    width: 100,
  },
  {
    title: 'New No.',
    dataIndex: 'newNo',
    key: 'newNo',
    width: 100,

  },
  {
    title: 'Old No.',
    dataIndex: 'oldNo',
    key: 'oldNo',
    width: 100,
  },
]

const Books = () => {
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(10)
  const [searchName, setSearchName] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchPublisher, setSearchPublisher] = useState('');
  const [filterIssued, setFilterIssued] = useState(false) 
  const navigate = useNavigate();
  
  const { data, isLoading } = useAllBooksQuery(tablePage, tablePageSize, searchName, searchAuthor, searchPublisher, filterIssued);

  return (
    <div className="p-5">
      <h1 className="text-2xl">View Books</h1>
      <div className="my-3 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Search
            placeholder="Filter By Book Name"
            allowClear
            enterButton="Search"
            size="small"
            onSearch={(val)=>setSearchName(val)}
          />
          <Search
            placeholder="Filter By Book Author"
            allowClear
            enterButton="Search"
            size="small"
            onSearch={(val)=>setSearchAuthor(val)}
          />
          <Search
            placeholder="Filter By Book Publisher"
            allowClear
            enterButton="Search"
            size="small"
            onSearch={(val)=>setSearchPublisher(val)}
          />
          <div className="bg-white text-gray-900 p-2 flex gap-2 text-sm rounded">
            <span>Issued</span>
            <Switch 
              value={filterIssued} 
              onChange={()=>setFilterIssued(!filterIssued)}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </div>
        </div>
      <Button type="primary" onClick={()=> navigate('add')}>Add Book</Button>
      </div>
      <Table 
        dataSource={data?.books} 
        className={"min-w-[1000px]"}
        columns={columns}     
        loading={isLoading}
        scroll={{ y: 600 }}
        showTotal
        pagination={{ 
          hideOnSinglePage: true,
          defaultPageSize: 10,
          defaultCurrent:1,
          current:tablePage, 
          onChange: (pg) => setTablePage(pg), 
          total: data?.totalCount,
          showSizeChanger: true,
          pageSize: tablePageSize,
          onShowSizeChange: (current, size) => setTablePageSize(size)
        }}
      />
    </div>
  )
}

export default Books