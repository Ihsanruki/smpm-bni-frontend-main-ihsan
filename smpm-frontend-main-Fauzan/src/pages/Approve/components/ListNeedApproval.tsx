
import React, { useState } from 'react';
import { Button, List, message } from 'antd';

interface ApprovalItem {
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

const initialData: ApprovalItem[] = [
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
    status: "waiting",
  },
];

const ListNeedApproval: React.FC = () => {
  const [data, setData] = useState<ApprovalItem[]>(initialData);

  const handleApprove = (tid: string) => {
    setData(prevData => prevData.map(item =>
      item.tid === tid ? { ...item, status: 'approve' } : item
    ));
    message.success(`Item with TID ${tid} approved`);
  };

  const handleApproveAll = () => {
    setData(prevData => prevData.map(item => ({ ...item, status: 'approve' })));
    message.success('All items approved');
  };

  const pendingItems = data.filter(item => item.status === 'waiting');

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
                <div className="font-semibold">{item.jenis_jo}</div>
                <div className="text-sm text-gray-600">{item.nama_merchant}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  TID: {item.tid} | MID: {item.mid}
                </div>
                <Button 
                  onClick={() => handleApprove(item.tid)}
                  className="w-24 mr-2"
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
