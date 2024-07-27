import { Button, Table, Modal, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAllIssuesQuery } from '../../api/featchAllIssues';
import { useCreateReturn } from '../../api/createReturn';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import utc from "dayjs/plugin/utc";
dayjs.extend(utc)
const dateFormat = 'DD/MM/YYYY';


const Issues = () => {
  const [tablePage, setTablePage] = useState(1)
  const [tablePageSize, setTablePageSize] = useState(10)
  const [returnDate, setReturnDate] = useState(dayjs(dayjs().utc().local().format('DD-MM-YYYY'), dateFormat));
  const [returnIssueInfo, setReturnIssueInfo] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const navigate = useNavigate();

  const { data, isLoading } = useAllIssuesQuery(tablePage, tablePageSize);

  const { mutateAsync } = useCreateReturn();

  const handleOk = async () => {
    setConfirmLoading(true);
    console.log(returnIssueInfo)
    const resp = await mutateAsync({id:returnIssueInfo?._id, returnDate: dayjs(returnDate).local().format()})
    if(resp) {
      setConfirmLoading(false)
    }
  }


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
      title: 'Action',
      key: 'action',
      render: (data) => {
        return <Button type="primary" disabled={data.returnDate} onClick={()=>setReturnIssueInfo(data)}>Return</Button>
      },
    }
  ]


  return (
    <div className="p-5">
      <h1 className="text-2xl">View Book Issues</h1>
      <div className="my-3 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          Search
        </div>
        <Button type="primary" onClick={()=> navigate('add')}>Add Book Issue</Button>
      </div>
      <Modal
        title="Return Book"
        open={returnIssueInfo}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setReturnIssueInfo(null)}
      >
       {returnIssueInfo &&  <div className="grid  grid-cols-[100px,1fr]">
          <p> Book: </p>
          <p className="font-medium pb-2"> {returnIssueInfo.book}</p>
          <p> Member: </p>
          <p className="font-medium	pb-2">{returnIssueInfo.member}</p>
          <p> Issue Date: </p>
          <p className="font-medium	pb-2">{returnIssueInfo.issueDate} </p>
          <p > Due Date: </p>
          <p className="font-medium	pb-2">{returnIssueInfo.dueDate} </p> 
          <p > Return Date: </p>
          <DatePicker format={dateFormat} value={returnDate} onChange={(val)=>setReturnDate(val)} />
        </div>}
       
      </Modal>
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