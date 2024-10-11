
export interface IActivityVendorModel {
    id: string;
    activityType: string;
    date: string;
    vendorId: string;
    contractId: string;
    status: string;
    vendorName: string;
    location: string;
    department: string;
    division: string;
    branch: string;
    category: string;
    assignedTo: string;
  }
  
  export interface IFormInputImportActivityVendor {
    files: File;
  }
  
  export interface IFormImportActivityVendorProps {
    onFinish?: (values: IFormInputImportActivityVendor) => void;
    initialValues?: IFormInputImportActivityVendor;
    isLoading?: boolean;
    onReset?: () => void;
  }
  
  // You can add more interfaces or types related to activity vendor below if needed
  
  // Example of additional interfaces that might be useful:
  
  export interface IActivityVendorCreateRequest {
    activityType: string;
    date: string;
    vendorId: string;
    contractId: string;
    status: string;
    vendorName: string;
    location: string;
    department: string;
    division: string;
    branch: string;
    category: string;
    assignedTo: string;
  }
  
  export interface IActivityVendorUpdateRequest {
    activityType?: string;
    date?: string;
    vendorId?: string;
    contractId?: string;
    status?: string;
    vendorName?: string;
    location?: string;
    department?: string;
    division?: string;
    branch?: string;
    category?: string;
    assignedTo?: string;
  }
  
  export interface IActivityVendorFilterRequest {
    startDate?: string;
    endDate?: string;
    vendorId?: string;
    status?: string;
    category?: string;
  }
  