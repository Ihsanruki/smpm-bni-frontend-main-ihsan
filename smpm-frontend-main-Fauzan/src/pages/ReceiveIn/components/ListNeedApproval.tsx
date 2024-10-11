import { Button, List } from "antd";
import React from "react";

const data = [
  {
    tid: "FM332432",
    brand: "INGENICO",
    brand_type: "MOVE 200",
    source: "WILAYAH 1",
  },
  {
    tid: "FM37756",
    brand: "INGENICO",
    brand_type: "MOVE 200",
    source: "WILAYAH 2",
  },
];

const ListNeedApproval = () => {
  return (
    <>
      <Button type={"primary"}>Approve All</Button>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item actions={[<Button>Approve</Button>]}>
            <List.Item.Meta
              title={`(${item.tid}) ${item.brand}`}
              description={<div>{item.source}</div>}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ListNeedApproval;
