import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { useCreateMember } from '../../api/createMember';


const AddMember = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {mutateAsync} = useCreateMember();


  const onFinish = async (values) => {
    console.log(values);
    await mutateAsync({
      ...values
    })
    form.resetFields();
  };
  


  return (
    <div className="p-5">
      <div className="flex gap-5">
        <h1 className="text-2xl">Add Member</h1>
        <Button type="link" onClick={()=> navigate(-1)}>Back To View All Members</Button>
      </div>
      <div className="flex justify-center mt-3 ">
      <Form
          className="p-3 border rounded"
          form={form}
          onFinish={onFinish}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          layout="horizontal"
          style={{
            width: 600,
          }}
        >
          <Form.Item
            name="firstName"
            label={<label className="text-white">First Name</label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label={<label className="text-white">Last Name</label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label={<label className="text-white">Email</label>}
            rules={[
              { type: 'email' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label={<label className="text-white">Phone</label>}
            rules={[
              {
                required: true,
              },
              {
                max: 10,
                min: 10,
                message: 'Phone number must be 10 digits',
              }
            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" >
              Add New Member
            </Button>
          </Form.Item>

        </Form>
      </div>
    </div>
  )
}

export default AddMember