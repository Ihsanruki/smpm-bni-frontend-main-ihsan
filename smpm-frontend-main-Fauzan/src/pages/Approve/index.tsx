
import React from 'react';
import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/pageLabel";
import Page from "@smpm/components/pageTitle";
import { IconArrowDown } from "@tabler/icons-react";
import { Breadcrumb, Card, Col, Flex, Row, Typography } from "antd";
import TableApprove from "./components/TableApprove";
import ListNeedApproval from "./components/ListNeedApproval";

const { Title } = Typography;

const Approve: React.FC = () => {
  return (
    <Page title="Approve">
      <PageLabel
        title={<span className="font-semibold text-2xl">Approve</span>}
        subtitle={
          <Breadcrumb
            items={[
              {
                href: "",
                title: (
                  <Flex align="end">
                    <IconArrowDown/>
                    <span>Approve</span>
                  </Flex>
                ),
              },
            ]}
          />
        }
      />
      <PageContent>
        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Card>
              <Title level={5}>Need Approval</Title>
              <ListNeedApproval />
            </Card>
          </Col>
          <Col xs={24} md={18}>
            <Card>
              <Title level={5}>Approval History</Title>
              <TableApprove />
            </Card>
          </Col>
        </Row>
      </PageContent>
    </Page>
  );
};

export default Approve;
