
import React from 'react';
import { Button, List, message } from 'antd';
import { ApproveItem } from '@smpm/models/approveModel';
import { approveService } from '@smpm/services/approveService';

interface ListNeedApprovalProps {
  data: ApproveItem[];
  onApprove: () => void;
}

const ListNeedApproval: React.FC<ListNeedApprovalProps> = ({ data, onApprove }) => {
  const handleApprove = async (id: number) => {
    try {
      await approveService.approveItem(id);
      message.success(`Item approved successfully`);
      onApprove();
    } catch (error) {
      message.error('Failed to approve item');
    }
  };

  const handleApproveAll = async () => {
    try {
      const pendingIds = pendingItems.map(item => item.id);
      const result = await approveService.bulkApprove(pendingIds);
      message.success(`${result.result.count} items approved`);
      onApprove();
    } catch (error) {
      message.error('Failed to approve all items');
    }
  };

  const pendingItems = data.filter(item => item.status === 'Waiting');

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Button 
        type="primary" 
        onClick={handleApproveAll}
        className="mb-4 w-full"
        disabled={pendingItems.length === 0}
      >
        Approve All
      </Button>
      <List
        itemLayout="vertical"
        dataSource={pendingItems}
        renderItem={(item) => (
          <List.Item className="bg-white shadow-sm rounded-lg mb-2 p-3">
            <div className="flex flex-col w-full">
              <div className="flex-grow mb-2">
                <div className="font-semibold">{item.jobOrder.type}</div>
                <div className="text-sm text-gray-600">{item.jobOrder.merchant_name}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                   {item.jobOrder.tid} | {item.jobOrder.mid}
                </div>
                <Button 
                  onClick={() => handleApprove(item.id)}
                  className="w-24"
                >
                  Approve
                </Button>
              </div>
            </div>
          </List.Item>
        )}
      />
      {pendingItems.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          No items left to approve
        </div>
      )}
    </div>
  );
};

export default ListNeedApproval;
