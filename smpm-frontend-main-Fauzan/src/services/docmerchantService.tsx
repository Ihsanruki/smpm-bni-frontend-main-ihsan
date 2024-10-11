import {  
    IBaseResponseService,  
    IPaginationRequest,  
    IPaginationResponse,  
  } from "@smpm/models";  
  import { DocMerchantModel } from "@smpm/models/docmerchantModel";  
  import axios from "@smpm/services/axios";  
  
  export const createDataMerchant = async (data: any): Promise<any> => {  
    const response = await axios.post("/merchant", data);  
    return response.data;  
  };  
  
  export const getDataMerchant = async (  
    param: IPaginationRequest  
  ): Promise<  
    IBaseResponseService<IPaginationResponse<DocMerchantModel>>  
  > => {  
    const response = await axios.get("/merchant", {  
      params: param,  
    });  
    return response.data;  
  };  
  
  export const getMerchantFiles = async () => {  
    const response = await axios.get("/merchant/files");  
    return response.data;  
  };  
  
  export const getMerchantLocations = async () => {  
    const response = await axios.get("/merchant/locations");  
    return response.data;  
  };