import commonApi from "./commonApi";
import SERVER_URL from "./serverurl";

export const  registerApi=async (reqBody)=>{
  return await   commonApi("POST",`${SERVER_URL}/register`,reqBody)
}
export const   loginAPI=async(reqBody)=>{
  return await commonApi("POST",`${SERVER_URL}/login`,reqBody)
}
export const addApi = async(reqBody,reqHeader)=>{
  return await commonApi("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}
export const Homeprojectapi = async()=>{
  return await commonApi("GET",`${SERVER_URL}/get-home-projects`,"")
}
export const allprojectapi = async(Searchkey,reqHeader)=>{
  return await commonApi("GET",`${SERVER_URL}/get-all-projects?search=${Searchkey}`,"",reqHeader)
}
export const userprojectapi = async(reqHeader)=>{
  return await commonApi("GET",`${SERVER_URL}/get-user-projects`,"",reqHeader)
}
export const updateprojectapi = async(pid,reqBody,reqHeader)=>{
  return await commonApi("PUT",`${SERVER_URL}/edit/project/${pid}`,reqBody,reqHeader)
  }
 export const deleteprojectapi = async(id,reqHeader)=>{
  return await commonApi("DELETE",`${SERVER_URL}/remove/project/${id}`,{},reqHeader)
 } 
 export const updateprofileapi = async(reqBody,reqHeader)=>{
  return await commonApi("PUT" ,`${SERVER_URL}/update/profile`,reqBody,reqHeader)
 }