import { Button, Form, Input, Select, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCreateBook } from '../../api/createBook';


const AddBook = () => {
  
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {mutateAsync} = useCreateBook();

  const onFinish = async (values) => {
    await mutateAsync({
      ...values
    })
    form.resetFields();
  };
  
  return (
    <div className="p-5">
      <div className="flex gap-5">
        <h1 className="text-2xl">Add Book</h1>
        <Button type="link" onClick={()=> navigate(-1)}>Back To View All Books</Button>
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
          initialValues={{ segment: 'Assorted',
            status: 'Right Side',
            pages: 1,
            qty: 1,
            language: 'E'
          }}
        >
          <Form.Item
            name="name"
            label={<label className="text-white">Name</label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="author"
            label={<label className="text-white">Author</label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="publisher"
            label={<label className="text-white">Publisher</label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="language" label={<label className="text-white">Language</label>}>
            <Select>
              <Select.Option value="E">English</Select.Option>
              <Select.Option value="H">Hindi</Select.Option>
              <Select.Option value="G">Gujarati</Select.Option>
              <Select.Option value="M">Marathi</Select.Option>
              <Select.Option value="O">Other</Select.Option>
            </Select>
          </Form.Item>


          <Form.Item
            name="qty"
            label={<label className="text-white">Quantity</label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber  />
          </Form.Item>

          <Form.Item
            name="pages"
            label={<label className="text-white">Pages</label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>


          <Form.Item
            name="oldNo"
            label={<label className="text-white">Old No</label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="newNo"
            label={<label className="text-white">New No</label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="location"
            label={<label className="text-white">Location</label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="section"
            label={<label className="text-white">Section</label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="segment"
            label={<label className="text-white">Segment</label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label={<label className="text-white">Status</label>}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" >
              Add New Book
            </Button>
          </Form.Item>

        </Form>
      </div>
    </div>
  )
}

export default AddBook