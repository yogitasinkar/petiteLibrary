import { Button, Form,  DatePicker, AutoComplete } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCreateIssue } from '../../api/createIssue';
import { useSearchedBooksQuery } from '../../api/fetchAllBooks';
import { useSearchedMembersQuery } from '../../api/fetchAllMembers';
import {useState} from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { debounce } from '../../utils/helper';
dayjs.extend(customParseFormat);

const dateFormat = 'DD/MM/YYYY';


const AddIssue = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [searchBookName, setSearchBookName] = useState('');
  const [searchMemberName, setSearchMemberName] = useState('');
  
  const {data: options} = useSearchedBooksQuery(searchBookName, searchBookName.length>2);
  const {data: membersOptions} = useSearchedMembersQuery(searchMemberName, searchMemberName.length>2);

  const { mutateAsync } = useCreateIssue();

  const onFinish = async (values) => {
    console.log(values, values.bookId.split("id:")[1], values.memberId.split("id:")[1]);
    await mutateAsync({
      ...values,
      bookId: values.bookId.split("id:")[1],
      memberId: values.memberId.split("id:")[1],
    })
    form.resetFields();
  };



  return (
    <div className="p-5">
      <div className="flex gap-5">
        <h1 className="text-2xl">Add Book Issue</h1>
        <Button type="link" onClick={()=> navigate(-1)}>Back To View All Issues</Button>
      </div>
      <div className="flex justify-center mt-3">
      <Form
          className="p-3 border rounded"
          form={form}
          onFinish={onFinish}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
          style={{
            width: 700,
          }}
          initialValues={{ 
            issueDate: dayjs(dayjs().format('DD-MM-YYYY'), dateFormat),
            dueDate: dayjs(dayjs().add(1, 'month').format('DD-MM-YYYY'), dateFormat),
          }}
        >

          <Form.Item
            name="bookId"
            label={<label className="text-white">Book Id </label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoComplete
              value={searchBookName}
              options={options}
              onChange={debounce((value) => setSearchBookName(value), 500)}
              placeholder="Search Book Name"
              notFoundContent={<p>No Book Found</p>}
            />
          </Form.Item>



          <Form.Item
            name="memberId"
            label={<label className="text-white">Member Id </label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoComplete
              value={searchMemberName}
              options={membersOptions}
              onSearch={(value) => console.log(value)}
              onChange={debounce((value) => setSearchMemberName(value), 500)}
              placeholder="Search Member Name"
              notFoundContent={<p>No Member Found</p>}
            />
          </Form.Item>

          <Form.Item
            name="issueDate"
            label={<label className="text-white">Issue Date</label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker format={dateFormat}/>
          </Form.Item>

          <Form.Item
            name="dueDate"
            label={<label className="text-white">Due Date</label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker format={dateFormat}/>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" >
              Issue Book
            </Button>
          </Form.Item>

        </Form>
      </div>
    </div>
  )
}

export default AddIssue