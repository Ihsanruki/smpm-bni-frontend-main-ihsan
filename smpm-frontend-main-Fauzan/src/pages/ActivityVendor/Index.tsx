
import { HomeOutlined } from "@ant-design/icons";
import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/pageLabel";
import Page from "@smpm/components/pageTitle";
import TableErrorValidationInfo from "@smpm/components/tableErrorValidationInfo";
import {
    IErrorTable
} from "@smpm/models";
import { IconSortDescendingNumbers } from "@tabler/icons-react";
import { Breadcrumb, Card, Drawer, Space } from "antd";
import { useState } from 'react';
import FilterTableActivityVendor from "./Components/FilterTableActivityVendor";
import TableActivityVendor from "./Components/TableActivityVendor";

const ActivityVendor = () => {
  const [errorTableActivityVendor, _setErrorTableActivityVendor] = useState<IErrorTable[]>([]);
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();
  const [openDrawerImport, setOpenDrawerImport] = useState(false);
  const [filter, setFilter] = useState({});

  const onClose = () => {
    setOpenDrawerImport(false);
  };

//   const onResetActivityVendor = () => {
//     setErrorTableActivityVendor([]);
//   };

//   const uploadActivityVendorMutation = useMutation<
//     IBaseResponseService<any>,
//     AxiosError<IBaseResponseService<IErrorResponseService>>,
//     any
//   >({
//     mutationFn: uploadActivityVendor,
//   });

//   const onFinishImportActivityVendor = (values: IFormInputImportActivityVendor) => {
//     const formData = new FormData();
//     formData.append("files", values.files);
//     uploadActivityVendorMutation.mutate(formData, {
//       onSuccess: () => {
//         message.success("Data successfully uploaded");
//         queryClient.invalidateQueries({
//           queryKey: ["activities"],
//         });
//         onClose();
//         onResetActivityVendor();
//       },
//       onError: (err) => {
//         makeResponseServiceError(dispatch, "import-activity-vendor", err);

//         if (
//           err.response?.data.status.code == 400 &&
//           err.response.data.result.errors
//         ) {
//           setErrorTableActivityVendor(err.response.data.result.errors as any);
//         }
//       },
//     });
//   };

  return (
    <Page title="Vendor Activities">
      <PageLabel
        title={<span className="font-semibold text-2xl">Vendor Activities</span>}
        subtitle={
          <Breadcrumb
            items={[
              {
                href: "/",
                title: (
                  <>
                    <HomeOutlined />
                    <span>Home</span>
                  </>
                ),
              },
              {
                title: (
                  <div className="flex gap-1">
                    <IconSortDescendingNumbers size="1rem" />
                    <span>Job Order</span>
                  </div>
                ),
              },
              {
                title: "Activity List",
              },
            ]}
          />
        }
        endSection={
          <Space>
            {/* Add any buttons or actions here if needed */}
          </Space>
        }
      />
      <PageContent>
        <Card>
          <FilterTableActivityVendor
            onFinish={(values) => {
              setFilter(values);
            }}
          />
          <TableActivityVendor filter={filter} />
        </Card>
      </PageContent>
      <Drawer
        title="Import Vendor Activities"
        width={720}
        onClose={onClose}
        open={openDrawerImport}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        {/* <FormImportActivityVendor
          onFinish={onFinishImportActivityVendor}
          onReset={onResetActivityVendor}
          isLoading={uploadActivityVendorMutation.isPending}
        /> */}
        {errorTableActivityVendor.length > 0 && (
          <TableErrorValidationInfo
            title="There are invalid data in the uploaded file. Below are the details of the rows, columns, and error messages:"
            errors={errorTableActivityVendor}
          />
        )}
      </Drawer>
    </Page>
  );
};

export default ActivityVendor;
