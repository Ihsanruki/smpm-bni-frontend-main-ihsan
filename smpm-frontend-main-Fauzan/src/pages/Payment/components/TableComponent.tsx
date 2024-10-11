import React from "react";
import { Button, Table, Tag } from "antd";

// Define the data structure
interface VendorData {
  key: string;
  vendorName: string;
  vendorCode: string;
  date: string;
  status: string;
}

// Define the props for the table component
interface TableComponentProps {
  data: VendorData[];
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
  // Define the columns for the table
  const columns = [
    {
      title: "Nama Vendor",
      dataIndex: "vendorName",
      key: "vendorName",
    },
    {
      title: "Kode Vendor",
      dataIndex: "vendorCode",
      key: "vendorCode",
    },
    {
      title: "Tanggal",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status: string) => {
        let color = "";
        let text = "";
        switch (status) {
          case "Edit":
            color = "orange";
            text = "Edit";
            break;
          case "Submit":
            color = "blue";
            text = "Submit";
            break;
          case "Success":
            color = "green";
            text = "Success";
            break;
        }
        return (
          <Tag color={color} key={status}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: VendorData) => (
        <Button type="primary">
          {record.status === "Edit" ? "Edit" : "Submit"}
        </Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />;
};

export default TableComponent;
