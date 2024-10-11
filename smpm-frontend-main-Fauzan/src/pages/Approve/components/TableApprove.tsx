import React, { useMemo, useState } from 'react';  
import DataTable from "@smpm/components/DataTable";  
import { ColumnsType } from "antd/es/table";  
import { Tag, Pagination } from 'antd';  

interface ApproveItem {  
  no_jo: string;  
  jenis_jo: string;  
  petugas: string;  
  wilayah: string;  
  vendor: string;  
  mid: string;  
  tid: string;  
  nama_merchant: string;  
  kategori_merchant: string;  
  kategori_sewa: string;  
  status: 'waiting' | 'approve';  
}  

const initialData: ApproveItem[] = [  
  {  
    no_jo: "JO001",  
    jenis_jo: "Installation",  
    petugas: "John Doe",  
    wilayah: "Jakarta",  
    vendor: "Vendor A",  
    mid: "MID001",  
    tid: "TID001",  
    nama_merchant: "Merchant A",  
    kategori_merchant: "Retail",  
    kategori_sewa: "Sewa",  
    status: "waiting",  
  },  
  {  
    no_jo: "JO002",  
    jenis_jo: "Maintenance",  
    petugas: "Jane Smith",  
    wilayah: "Surabaya",  
    vendor: "Vendor B",  
    mid: "MID002",  
    tid: "TID002",  
    nama_merchant: "Merchant B",  
    kategori_merchant: "F&B",  
    kategori_sewa: "Milik",  
    status: "approve",  
  },  
];  

const TableApprove: React.FC = () => {  
  const [data] = useState<ApproveItem[]>(initialData);  
  const [currentPage, setCurrentPage] = useState(1);  
  const [pageSize, setPageSize] = useState(10);  

  const columns = useMemo((): ColumnsType<ApproveItem> => {  
    return [  
      {  
        title: "No. JO",  
        dataIndex: "no_jo",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
      },  
      {  
        title: "Jenis JO",  
        dataIndex: "jenis_jo",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
      },  
      {  
        title: "Petugas",  
        dataIndex: "petugas",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
      },  
      {  
        title: "Wilayah",  
        dataIndex: "wilayah",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
      },  
      {  
        title: "Vendor",  
        dataIndex: "vendor",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
      },  
      {  
        title: "MID",  
        dataIndex: "mid",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
      },  
      {  
        title: "TID",  
        dataIndex: "tid",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
      },  
      {  
        title: "Nama Merchant",  
        dataIndex: "nama_merchant",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
      },  
      {  
        title: "Kategori Merchant",  
        dataIndex: "kategori_merchant",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
      },  
      {  
        title: "Kategori Sewa / Milik",  
        dataIndex: "kategori_sewa",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
      },  
      {  
        title: "Status",  
        dataIndex: "status",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
        render: (status: string) => {  
          const color = status === 'waiting' ? 'yellow' : 'green';  
          return (  
            <Tag color={color} className={`bg-${color} text-${color}`}>  
              {status.toUpperCase()}  
            </Tag>  
          );  
        },  
      },  
    ];  
  }, []);  

  const handleSearch = (value: string) => {  
    // Implement search functionality here  
    console.log("Searching for:", value);  
  };  

  const handlePageChange = (page: number, pageSize?: number) => {  
    setCurrentPage(page);  
    if (pageSize) setPageSize(pageSize);  
  };  

  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);  

  return (  
    <div className="flex flex-col h-full">  
      <div className="flex-grow overflow-auto">  
        <DataTable<ApproveItem>  
          dataSource={paginatedData}  
          columns={columns}  
          useGlobalSearchInput  
          onGlobalSearch={handleSearch}  
          bordered  
          pagination={false}  
        />  
      </div>  
      <div className="mt-4 flex justify-end">  
        <Pagination  
          current={currentPage}  
          total={data.length}  
          pageSize={pageSize}  
          onChange={handlePageChange}  
          showSizeChanger  
          showQuickJumper  
        />  
      </div>  
    </div>  
  );  
};  

export default TableApprove;