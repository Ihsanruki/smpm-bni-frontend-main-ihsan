import React, { useMemo, useState } from "react";  
import { Button, Space, Pagination, Typography } from "antd";  
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";  
import DataTable from "@smpm/components/DataTable";  
import { DocMerchantModel } from "@smpm/models/docmerchantModel";  
import { useDebounce } from "@smpm/utils/useDebounce";  
import useTableHelper from "@smpm/utils/useTableHelper";  
import { ColumnsType } from "antd/es/table";  

const { Text } = Typography;  

const TableMerchant: React.FC = () => {  
  const { tableFilter } = useTableHelper<DocMerchantModel>();  
  const [search, setSearch] = useState<string>("");  
  const searchValue = useDebounce(search, 500);  
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});  
  const [currentPage, setCurrentPage] = useState<number>(1);  
  const [pageSize, setPageSize] = useState<number>(10);  

  const onSearch = (value: string) => setSearch(value);  

  // Dummy data  
  const dummyData: DocMerchantModel[] = [  
    {  
      merchant_name: "KULINER KAMPOEN PULE",  
      file_1: "Perjanjian Kerja Sama.pdf",  
      file_2: "",  
      location: "Alam Sutera, Woodlake 05 No.07-08, Panunggangan, Kec. Pinang, Kota Tangerang, Banten 15143"  
    },  
    {  
      merchant_name: "FORTUNA PONSEL",  
      file_1: "",  
      file_2: "",  
      location: "Jl. Jalur Sutera Barat No. 17 Silkwood Residence Ground Floor, Oak Tower, RT.002/RW.003, Panunggangan, Kec. Cipondoh, Kota Tangerang, Banten 15143"  
    },  
    {  
      merchant_name: "HALOMART CHARSIER 1 MBL",  
      file_1: "",  
      file_2: "",  
      location: "Jl. Kyai Maja, RT.003/RW.003, Panunggangan, Kec. Cipondoh, Kota Tangerang, Banten 15143"  
    },  
    {  
      merchant_name: "ANUGRAH SHOP MBL",  
      file_1: "",  
      file_2: "",  
      location: "Jl. Kyai, RT.MajaRT.001/RW.003, Panunggangan, Kec. Pinang, Kota Tangerang, Banten 15143"  
    }  
  ];  

  const columns: ColumnsType<DocMerchantModel> = useMemo(  
    (): ColumnsType<DocMerchantModel> => [  
      {  
        title: "Merchant Name",  
        dataIndex: "merchant_name",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
        width: 200,  
      },  
      {  
        title: "File 1",  
        dataIndex: "file_1",  
        width: 500,  
        render: (text, record) => (  
          <Space>  
            {text ? (  
              <Button type="primary" icon={<DownloadOutlined />} className="min-w-[110px]" onClick={() => console.log(`Downloading ${text}`)}>  
                Download File  
              </Button>  
            ) : (  
              <>  
                <Button icon={<UploadOutlined />} className="min-w-[110px]">Choose File</Button>  
                <Text className={`min-w-[110px] ${uploadedFiles[`file_1_${record.merchant_name}`] ? 'font-bold' : ''}`}>  
                  {uploadedFiles[`file_1_${record.merchant_name}`] || "No Choose File"}  
                </Text>  
                <Button type="primary" className="min-w-[110px] h-[30px]">Save</Button>  
              </>  
            )}  
          </Space>  
        ),  
      },  
      {  
        title: "File 2",  
        dataIndex: "file_2",  
        width: 500,  
        render: (text, record) => (  
          <Space>  
            <Button icon={<UploadOutlined />} className="min-w-[110px]">Choose File</Button>  
            <Text className={`min-w-[110px] ${uploadedFiles[`file_2_${record.merchant_name}`] ? 'font-bold' : ''}`}>  
              {uploadedFiles[`file_2_${record.merchant_name}`] || "No Choose File"}  
            </Text>  
            <Button type="primary" className="min-w-[110px] h-[30px]">Save</Button>  
          </Space>  
        ),  
      },  
      {  
        title: "Location",  
        dataIndex: "location",  
        ellipsis: true,  
        width: 500,  
        render: (text) => (  
          <Text style={{ whiteSpace: 'pre-line' }} ellipsis={{ tooltip: text }}>  
            {text}  
          </Text>  
        ),  
      },  
    ],  
    []  
  );  

  const handleFileUpload = (fileIndex: string, fileName: string) => {  
    setUploadedFiles((prevState) => ({  
      ...prevState,  
      [fileIndex]: fileName,  
    }));  
  };  

  const handlePageChange = (page: number, pageSize?: number) => {  
    setCurrentPage(page);  
    if (pageSize) {  
      setPageSize(pageSize);  
    }  
  };  

  return (  
    <div>
      <div>
      <DataTable<DocMerchantModel>  
        dataSource={dummyData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}  
        pagination={false}  
        loading={false}  
        bordered  
        onGlobalSearch={onSearch}  
        columns={columns}  
        useGlobalSearchInput  
        className="overflow-x-auto"  
      />  
      </div>
      <div className="flex flex-col gap-4 mt-4"> 
      <Pagination  
        current={currentPage}  
        pageSize={pageSize}  
        total={dummyData.length}  
        onChange={handlePageChange}  
        className="self-end"  
      />  
    </div>  
    </div>
  );  
};  

export default TableMerchant;