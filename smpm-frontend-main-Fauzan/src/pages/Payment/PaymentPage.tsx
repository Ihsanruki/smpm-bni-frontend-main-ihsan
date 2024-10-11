import React from "react";
import TableComponent from "./components/TableComponent";  // Pastikan path benar
import { Breadcrumb, Typography } from "antd";
import { HomeOutlined, FileTextOutlined } from "@ant-design/icons";

const { Title } = Typography;

const PaymentPage: React.FC = () => {
  const vendorData = [
    {
      key: "1",
      vendorName: "PT BAHANA SYSFO UTAMA",
      vendorCode: "BS",
      date: "10 Jun, 2023",
      status: "Edit",
    },
    // Data lainnya
  ];

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item href="/">
          <HomeOutlined />
          <span>Home</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <FileTextOutlined />
          <span>Payment</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2}>Payment</Title>

      <TableComponent data={vendorData} />
    </div>
  );
};

export default PaymentPage;
