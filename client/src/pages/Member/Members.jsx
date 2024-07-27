import { useAllMembersQuery } from '../../api/fetchAllMembers';
import { Button, Table, Input } from 'antd';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Joining Date',
    dataIndex: 'joiningDate',
    key: 'joiningDate',
  },
  {
    title: 'Address Line 1',
    dataIndex: 'addressLine1',
    key: 'addressLine1',
  },
  {
    title: 'Address Line 2',
    dataIndex: 'addressLine2',
    key: 'addressLine2',
  },
  {
    title: 'Address Line 3',
    dataIndex: 'addressLine3',
    key: 'addressLine3',
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'Pin Code',
    dataIndex: 'pinCode',
    key: 'pinCode',
  },
  {
    title: 'Alt Phone',
    dataIndex: 'altPhone',
    key: 'altPhone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Id',
    dataIndex: '_id',
    key: '_id',
  },
]

const Members = () => {
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(10)
  const [searchName, setSearchName] = useState("")
  const [searchPhone, setSearchPhone] = useState("")

  const { data, isLoading } = useAllMembersQuery(tablePage, tablePageSize, searchName, searchPhone);
  const navigate = useNavigate();

  return (
    <div className="p-5">
      <h1 className="text-2xl">View Members</h1>
      <div className="my-3 flex justify-between items-center">
      <div className="flex gap-3 items-center">
          <Search
            placeholder="Filter By Name"
            allowClear
            enterButton="Search"
            size="small"
            onSearch={(val)=>setSearchName(val)}
          />
          <Search
            placeholder="Filter By Phone"
            allowClear
            enterButton="Search"
            size="small"
            onSearch={(val)=>setSearchPhone(val)}
          />

        </div>
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