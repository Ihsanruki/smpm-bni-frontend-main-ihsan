
import {
    IBaseResponseService,
    IPaginationRequest,
    IPaginationResponse,
  } from "@smpm/models"
  import { IActivityVendorModel } from "@smpm/models/activityvendorModel"
  import axios from "@smpm/services/axios"
  
  export interface IActivityVendorCreateRequest {
    type: string;
    region_id: number;
    vendor_id: number;
    date: string;
    device_id: string;
    location: string;
    description: string;
    status: string;
  }
  
  export interface IActivityVendorUpdateRequest {
    type?: string;
    region_id?: number;
    vendor_id?: number;
    date?: string;
    device_id?: string;
    location?: string;
    description?: string;
    status?: string;
  }
  
  export const getActivityVendor = async (
    param: IPaginationRequest
  ): Promise<IBaseResponseService<IPaginationResponse<IActivityVendorModel>>> => {
    const response = await axios.get("/activity-vendor", {
      params: param,
    })
    return response.data
  }
  
  export const getAllVendor = async (): Promise<
    IBaseResponseService<IActivityVendorModel[]>
  > => {
    const response = await axios.get("/activity-vendor/get/all")
    return response.data
  }
  
  export const getActivityVendorById = async (
    id: number
  ): Promise<IBaseResponseService<IActivityVendorModel>> => {
    const response = await axios.get(`/activity-vendor/${id}`)
    return response.data
  }
  
  export const createActivityVendor = async (
    data: IActivityVendorCreateRequest
  ): Promise<IBaseResponseService<IActivityVendorModel>> => {
    const response = await axios.post("/activity-vendor", data)
    return response.data
  }
  
  export const updateActivityVendor = async (
    id: number,
    data: IActivityVendorUpdateRequest
  ): Promise<IBaseResponseService<IActivityVendorModel>> => {
    const response = await axios.patch(`/activity-vendor/${id}`, data)
    return response.data
  }
  
  export const deleteActivityVendor = async (
    id: number
  ): Promise<IBaseResponseService<void>> => {
    const response = await axios.delete(`/activity-vendor/${id}`)
    return response.data
  }
  
  export const uploadActivityVendor = async (
    formData: FormData
  ): Promise<IBaseResponseService<void>> => {
    const response = await axios.post("/activity-vendor/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  }
  