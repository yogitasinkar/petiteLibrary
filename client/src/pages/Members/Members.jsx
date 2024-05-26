import { useAllMembersQuery } from '../../api/fetchAllMembers';
import { Button, Table } from 'antd';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const columns = [
  {
    title: 'FirstName',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'LastName',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
]

const Members = () => {
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(10)
  const { data, isLoading } = useAllMembersQuery(tablePage, tablePageSize);
  const navigate = useNavigate();

  return (
    <div className="p-5">
      <h1 className="text-2xl">View Members</h1>
      <div className="my-3 flex justify-between items-center">
        <div/>
        <Button type="primary" onClick={()=> navigate('add')}>Add Members</Button>
      </div>
      <Table 
        dataSource={data?.members} 
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

export default Members