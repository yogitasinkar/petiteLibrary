import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAllIssuesQuery } from '../../api/featchAllIssues';

const columns = [
  {
    title: 'Book',
    dataIndex: 'book',
    key: 'book',
  },
  {
    title: 'Member',
    dataIndex: 'member',
    key: 'member',
  },
  {
    title: 'Issue Date',
    dataIndex: 'issueDate',
    key: 'issueDate',
  },
  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    key: 'dueDate',
  },
  {
    title: 'Return Date',
    dataIndex: 'returnDate',
    key: 'returnDate',
  },
  {
    title: 'Return Status',
    dataIndex: 'isLateReturn',
    key: 'isLateReturn',
  }
];

const Issues = () => {
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(10)
  const navigate = useNavigate();

  const { data, isLoading } = useAllIssuesQuery(tablePage, tablePageSize)

  return (
    <div className="p-5">
      <h1 className="text-2xl">View Book Issues</h1>
      <div className="my-3 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          Search
        </div>
        <Button type="primary" onClick={()=> navigate('add')}>Add Book Issue</Button>
      </div>
      <Table 
        dataSource={data?.issues} 
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

export default Issues