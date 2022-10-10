/* eslint-disable react/display-name */
import React from 'react';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, PageHeader, Divider,Row, Checkbox, Col, Select, DatePicker, Upload } from "antd";

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 10,
    },
};

const { Option } = Select;
const { RangePicker } = DatePicker;

const normFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
  
    return e?.fileList;
  };

const rangeConfig = {
    rules: [
      {
        type: 'array',
        message: 'Please select time',
      },
    ],
  };
  

const ResourceAdd = () => {
    return (
      <Form {...layout} name="nest-messages">
        <PageHeader title="Add Project" />
        <Divider />
        <Form.Item
          name={["user", "resource"]}
          label="Domain"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "resource"]}
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="checkbox-group" label="Phases">
          <Checkbox.Group>
            <Row>
              <Col span={8}>
                <Checkbox
                  value="A"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  Market study
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="B"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  Conception
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="C"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  Realisation
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="D"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  Planification
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="E"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  Validation
                </Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox
                  value="F"
                  style={{
                    lineHeight: "32px",
                  }}
                >
                  Commissioning
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item
          name={["user", "resource"]}
          label="Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="Sponsor"
          label="Sponsor"
          rules={[
            {
              message: "Please select the sponsor",
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="">
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Project Manager"
          label="projectManager"
          rules={[
            {
              message: "Please select the projectManager",
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="">
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Responsible"
          label="Responsible"
          rules={[
            {
              message: "Please select the Responsible",
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="">
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Coordinator"
          label="Coordinator"
          rules={[
            {
              message: "Please select the Coordinator",
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="">
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Team"
          label="Team"
          rules={[
            {
              message: "Please select the team",
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="">
            <Option value="Ahmed Ben Ali">Ahmed Ben Ali</Option>
            <Option value="Mourad Trabelsi">Mourad Trabelsi</Option>
            <Option value="Hakim Fahmi">Hakim Fahmi</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Allowed Actions By"
          label="Allowed Actions By"
          rules={[
            {
              message: "Please select the Allowed Actions By",
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="">
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="For Information"
          label="For Information"
          rules={[
            {
              message: "Please select the For Information",
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="">
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name={["user", "resource"]}
          label="External Participant"
        >
          <Input />
        </Form.Item>

        <Form.Item name="plannedDates" label="Planned Dates" {...rangeConfig}>
        <RangePicker />
      </Form.Item>

      <Form.Item label="Files">
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>



        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
};

export default ResourceAdd;
