import {  Table, Input, Button,  Tag } from 'antd';
import { useState, useEffect } from 'react';
import { useAllBooksQuery } from '../../api/fetchAllBooks';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;

const columns = [
  {
    title: 'Id',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Publisher',
    dataIndex: 'publisher',
    key: 'publisher',
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
  },
  {
    title: 'Language',
    dataIndex: 'language',
    key: 'language',
  },
  {
    title: 'Pages',
    dataIndex: 'pages',
    key: 'pages',
  },
  {
    title: 'Quantity',
    dataIndex: 'qty',
    key: 'qty',
  },

  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Section',
    dataIndex: 'section',
    key: 'section',
  },
  {
    title: 'New No.',
    dataIndex: 'newNo',
    key: 'newNo',

  },
  {
    title: 'Old No.',
    dataIndex: 'oldNo',
    key: 'oldNo',
  },
]

const Books = () => {
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(10)
  const [searchName, setSearchName] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchPublisher, setSearchPublisher] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if(tablePage > 1) {
      setTablePage(1);
    }
  }, [searchName, searchAuthor, searchPublisher, tablePage])
  
  
  const { data, isLoading } = useAllBooksQuery(tablePage, tablePageSize, searchName, searchAuthor, searchPublisher);

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