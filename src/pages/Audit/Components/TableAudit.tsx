
import React, { useMemo, useState, useEffect } from 'react';
import { Table, Tag, message } from 'antd';
import { ColumnsType } from "antd/es/table";
import { getAuditTrails } from '@smpm/services/auditService';
import { IAuditTrail } from "@smpm/models/auditModel";

const AuditTrailTable: React.FC = () => {
  const [auditTrails, setAuditTrails] = useState<IAuditTrail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAuditTrails = async () => {
    setIsLoading(true);
    try {
      const data = await getAuditTrails();
      console.log('Audit Trails Data:', data);
      if (data && data.result && Array.isArray(data.result.result)) {
        setAuditTrails(data.result.result);
      } else {
        console.error('Unexpected data format:', data);
        message.error('Received unexpected data format');
      }
    } catch (error) {
      console.error('Error fetching audit trails:', error);
      message.error('Failed to fetch audit trails');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditTrails();
  }, []);

  const columns: ColumnsType<IAuditTrail> = useMemo((): ColumnsType<IAuditTrail> => {
    return [
      {
        title: "URL",
        dataIndex: "Url",
        key: "Url",
        ellipsis: true,
      },
      {
        title: "Action",
        dataIndex: "ActionName",
        key: "ActionName",
      },
      {
        title: "Menu",
        dataIndex: "MenuName",
        key: "MenuName",
      },
      {
        title: "User",
        dataIndex: "UserName",
        key: "UserName",
      },
      {
        title: "IP Address",
        dataIndex: "IpAddress",
        key: "IpAddress",
      },
      {
        title: "Date",
        dataIndex: "ActivityDate",
        key: "ActivityDate",
        render: (date: string) => {
          const d = new Date(date);
          return isNaN(d.getTime()) ? 'Invalid Date' : d.toLocaleString();
        },
      },
      {
        title: "Browser",
        dataIndex: "Browser",
        key: "Browser",
      },
      {
        title: "OS",
        dataIndex: "OS",
        key: "OS",
      },
      {
        title: "App Source",
        dataIndex: "AppSource",
        key: "AppSource",
        render: (source: string) => <Tag color="blue">{source}</Tag>,
      },
    ];
  }, []);

  return (
    <Table<IAuditTrail>
      dataSource={auditTrails}
      columns={columns}
      loading={isLoading}
      bordered
      rowKey={(record) => record.id.toString()}
      scroll={{ x: 'max-content' }}
    />
  );
};

export default AuditTrailTable;
