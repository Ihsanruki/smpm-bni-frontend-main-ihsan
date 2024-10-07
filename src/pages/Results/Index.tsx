
import { useState } from 'react';
import { HomeOutlined } from "@ant-design/icons";
import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/pageLabel";
import Page from "@smpm/components/pageTitle";
import { IconSortDescendingNumbers } from "@tabler/icons-react";
import { Breadcrumb, Card } from "antd";
import FilterTableResults from './Components/FilterTableResults';
import TableResults from './Components/TableResults';

const Results = () => {
  const [filter, setFilter] = useState({});
 
  return (
    <Page title="Results">
      <PageLabel
        title={<span className="font-semibold text-2xl">Results</span>}
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
                    <span>Results</span>
                  </div>
                ),
              },
              {
                title: "Results List",
              },
            ]}
          />
        }
      />
      <PageContent>
        <Card>
          <FilterTableResults
            onFinish={(values) => {
              setFilter(values);
            }}
          />
          <TableResults filter={filter} />
        </Card>
      </PageContent>
    </Page>
  );
};

export default Results;