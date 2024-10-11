
import React, { useMemo, useState } from 'react';
import DataTable from "@smpm/components/DataTable";
import { IActivityVendorModel } from "@smpm/models/activityvendorModel";
import { getActivityVendor } from "@smpm/services/activityvendorService";
import { useDebounce } from "@smpm/utils/useDebounce";
import useTableHelper from "@smpm/utils/useTableHelper";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "antd";
import { ColumnsType } from "antd/es/table";
import * as dayjs from "dayjs";

interface ITableActivityVendorProps {
  filter?: any;
}

const TableActivityVendor: React.FC<ITableActivityVendorProps> = ({ filter }) => {
  const { tableFilter, onChangeTable, onChangeSearchBy } = useTableHelper<IActivityVendorModel>();

  const [search, setSearch] = useState<string>("");

  const searchValue = useDebounce(search, 500);

  const onSearch = (value: string) => setSearch(value);

  const {
    data: activities,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["activities", { ...tableFilter, searchValue, ...filter }],
    queryFn: () =>
      getActivityVendor({
        order: tableFilter.sort.order,
        order_by: tableFilter.sort.order_by,
        search: searchValue,
        search_by: tableFilter.searchBy,
        page: parseInt(tableFilter.pagination.current),
        take: parseInt(tableFilter.pagination.pageSize),
        ...filter,
      }),
  });

  const columns: ColumnsType<IActivityVendorModel> = useMemo(
    (): ColumnsType<IActivityVendorModel> => {
      return [
        {
          title: "ACTIVITY ID",
          dataIndex: "id",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          width: 300,
        },
        {
          title: "ACTIVITY TYPE",
          dataIndex: "type",
          sorter: true,
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "REGION",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (record) => {
            return record.region.name;
          },
        },
        {
          title: "VENDOR",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (record) => {
            return record.vendor.name;
          },
        },
        {
          title: "DATE",
          dataIndex: "date",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (date) => {
            return dayjs(date).format("DD-MMM-YYYY");
          },
        },
        {
          title: "DEVICE ID",
          dataIndex: "device_id",
          sorter: true,
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "LOCATION",
          dataIndex: "location",
          sorter: true,
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "DESCRIPTION",
          dataIndex: "description",
          sorter: true,
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "STATUS",
          dataIndex: "status",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (status) => {
            return status === "Completed" ? (
              <Badge color="green" text={status} />
            ) : status === "In Progress" ? (
              <Badge color="blue" text={status} />
            ) : (
              <Badge color="orange" text={status} />
            );
          },
        },
      ];
    },
    []
  );

  return (
    <DataTable<IActivityVendorModel>
      dataSource={activities?.result.data}
      pagination={{
        current: activities?.result.meta.page,
        pageSize: activities?.result.meta.take,
        total: activities?.result.meta.item_count,
      }}
      loading={isLoading}
      bordered
      onChangeSearchBy={onChangeSearchBy}
      searchByOptions={[
        { name: "ACTIVITY ID", value: "id" },
        { name: "Activity Type", value: "type" },
        { name: "Region", value: "region.name" },
        { name: "Vendor", value: "vendor.name" },
        { name: "Device ID", value: "device_id" },
        { name: "Location", value: "location" },
        { name: "Status", value: "status" },
      ]}
      onGlobalSearch={onSearch}
      columns={columns}
      useGlobalSearchInput
      onChange={onChangeTable}
      scroll={{
        x: 2000,
      }}
    />
  );
};

export default TableActivityVendor;
