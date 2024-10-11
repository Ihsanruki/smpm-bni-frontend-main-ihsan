
import React, { useMemo, useState } from 'react';
import { DatePicker, Flex, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import DataTable from '@smpm/components/DataTable';
import useTableHelper from '@smpm/utils/useTableHelper';
import FilterTable, { TOptions } from './FilterTable';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportPDF from './ReportPDF';

interface DataType {
  key: string;
  no_activity: string;
  jenis_activity: string;
  tanggal_activity: string;
  vendor_name: string;
  status: string;
  description: string;
}

const data: DataType[] = [
  {
    key: '1',
    no_activity: 'ACT-001',
    jenis_activity: 'Installation',
    tanggal_activity: '15-Nov-23',
    vendor_name: 'PT SWADHARMA SARANA INFORMATIKA',
    status: 'Completed',
    description: 'New EDC installation at Merchant A',
  },
];

const optionStatus: TOptions[] = [
  { label: 'All Status', value: 'All Status' },
  { label: 'Completed', value: 'Completed' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Pending', value: 'Pending' },
];

const optionVendor: TOptions[] = [
  { label: 'All Vendor', value: 'All Vendor' },
  { label: 'PT SWADHARMA SARANA INFORMATIKA', value: 'SSI' },
  { label: 'PT INGENICO INTERNATIONAL INDONESIA', value: 'III' },
  { label: 'PT PRIMA VISTA SOLUSI', value: 'PVS' },
];

const optionActivity: TOptions[] = [
  { label: 'All Activity', value: 'All Activity' },
  { label: 'Installation', value: 'Installation' },
  { label: 'Maintenance', value: 'Maintenance' },
  { label: 'Repair', value: 'Repair' },
];

function ActivityVendor() {
  const [valueStatus, setValueStatus] = useState<string>('All Status');
  const [valueVendor, setValueVendor] = useState<string>('All Vendor');
  const [valueActivity, setValueActivity] = useState<string>('All Activity');
  const { Title } = Typography;
  const { RangePicker } = DatePicker;
  const { onChangeTable } = useTableHelper<DataType>();

  const handleChangeFilterStatus = (key: string) => {
    setValueStatus(key);
  };

  const handleChangeFilterVendor = (key: string) => {
    setValueVendor(key);
  };

  const handleChangeFilterActivity = (key: string) => {
    setValueActivity(key);
  };

  const columns: ColumnsType<DataType> = useMemo(() => {
    return [
      {
        title: 'No. Activity',
        dataIndex: 'no_activity',
        key: 'no_activity',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
        render: (row) => <div className="w-40">{row || '-'}</div>,
      },
      {
        title: 'Jenis Activity',
        dataIndex: 'jenis_activity',
        key: 'jenis_activity',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
        render: (row) => row || '-',
      },
      {
        title: 'Tanggal Activity',
        dataIndex: 'tanggal_activity',
        key: 'tanggal_activity',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
        render: (row) => row || '-',
      },
      {
        title: 'Vendor Name',
        dataIndex: 'vendor_name',
        key: 'vendor_name',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
        render: (row) => row || '-',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
        render: (row) => row || '-',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        sorter: true,
        sortDirections: ['descend', 'ascend'],
        render: (row) => row || '-',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <PDFDownloadLink
            document={<ReportPDF data={record} />}
            fileName={`Activity_Report_${record.no_activity}.pdf`}
          >
            {({ loading }) =>
              loading ? 'Loading document...' : 'Download Report'
            }
          </PDFDownloadLink>
        ),
      },
    ];
  }, []);

  return (
    <>
      <Flex justify="space-between" align="flex-end">
        <Title level={3}>Vendor Activity Report</Title>
        <Space direction="vertical" size={12}>
          <RangePicker />
        </Space>
      </Flex>
      <FilterTable
        optionStatus={optionStatus}
        valueStatus={valueStatus}
        handleChangeFilterStatus={handleChangeFilterStatus}
        optionVendor={optionVendor}
        valueVendor={valueVendor}
        handleChangeFilterVendor={handleChangeFilterVendor}
        optionActivity={optionActivity}
        valueActivity={valueActivity}
        handleChangeFilterActivity={handleChangeFilterActivity}
        handleChangeFilterWilayah={() => {}}
        valueWilayah=""
        optionWilayah={[]}
        handleChangeFilterMerchant={() => {}}
        valueMerchant=""
        optionMerchant={[]}
      />
      <DataTable<DataType>
        style={{
          overflowX: 'auto',
        }}
        columns={columns}
        bordered
        useGlobalSearchInput
        dataSource={data}
        pagination={{
          current: 1,
          pageSize: 10,
          total: data.length,
        }}
        onChange={onChangeTable}
      />
    </>
  );
}

export default ActivityVendor;
