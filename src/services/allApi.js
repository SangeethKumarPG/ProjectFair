import {commonApi} from "./commonApi"
import {BASE_URL} from "./baseurl"

//register api
export const registerApi = async (userDetails) => {
  return await commonApi("POST",`${BASE_URL}/user/register`, userDetails,"")
}

//login api
export const loginApi = async (userDetails)=>{
  return await commonApi("POST",`${BASE_URL}/user/login`, userDetails,"")
}

// all api
export const addProjectApi = async (projectDetails, reqHeader)=>{
  return await commonApi('POST',`${BASE_URL}/project/addproject`,projectDetails,reqHeader);
}

//get home projects 
export const getHomeProjects = async ()=>{
  return await commonApi('GET', `${BASE_URL}/project/homeproject`,"","");
}

//get all projects 
export const getAllProjects = async (reqHeader, searchKey)=>{
  return await commonApi('GET',`${BASE_URL}/project/allProjects?search=${searchKey}`,"", reqHeader);
}

//get user projects 
export const getUserProjects = async (reqHeader)=>{
  return await commonApi('GET',`${BASE_URL}/project/userProjects`,"",reqHeader);
}

//update project
export const editUserProjects = async (projectId, reqBody, reqHeader)=>{
  
  return await commonApi('PUT',`${BASE_URL}/project/editProject/${projectId}`,reqBody, reqHeader);
}

//delete project
export const deleteUserProject = async (projectId, reqHeader) => {
  return await commonApi('DELETE', `${BASE_URL}/project/remove/${projectId}`,{}, reqHeader);
}
