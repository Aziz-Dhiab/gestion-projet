/* eslint-disable react/display-name */
import React from 'react';
import { useState, useEffect } from "react";
import { Table, Tag, Space, Divider, DatePicker, Input } from "antd";
import { Link } from "react-router-dom";
import { getUsers } from "../../services/httpService";

const columns = [
    {
        title: "Registration Number",
        dataIndex: 'registrationNumber',
        key: "registrationNumber",
        displayName: 'registrationNumber',
        render: (obj) =>  <Link to={`/users/list/${obj}`}>{obj}</Link>,
    },
    {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
    },
    {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
    },

    {
        title: "Action",
        key: "action",
        render: (obj) => (
            <Space size="middle">
                <Link to={`/users/edit/${obj.key}`}>Edit</Link>
                <a href="/#">Delete</a>
            </Space>
        ),
    },
];

const UserList = () => {
    const { Search } = Input;
    const { RangePicker } = DatePicker;
    const [data, setData] = useState([]);
    useEffect(() => {
        async function getData() {
            try {
                const response = await getUsers();
                console.log("response", response);
                setData(response);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);
    const users = [
        {
            "firstName": "Ahmed",
            "lastName": "Ben Ali",
            "registrationNumber": "Wkf8q5d4",
            "email": "Ahmen.Benali@mail.com",
            "role": "Admin",
        },
        {
            "firstName": "Mourad",
            "lastName": "Trabelsi",
            "registrationNumber": "Xk8s5k7g",
            "email": "Mourad.Trabelsi@mail.com",
            "role": "User",
        },
        {
            "firstName": "Hakim",
            "lastName": "Fahmi",
            "registrationNumber": "g8K4d77r",
            "email": "Hakim.Fahmi@mail.com",
            "role": "User",
        },
    ]
    return (
        <div>
            <Space direction="vertical">
                <Space
                    direction="horizontal"
                    wrap
                    split={<Divider type="vertical" />}
                >
                    <RangePicker />
                    <Search
                        placeholder="Search text"
                        loading={false}
                        allowClear
                        style={{ width: "15vw" }}
                    />
                </Space>
                <Divider />
            </Space>
            <Table columns={columns} dataSource={users}></Table>
        </div>
    );
};

export default UserList;
