import request from '@/utils/request'
import { StudentData } from './types'

export const defaultData: StudentData ={

   StudentId: 0,
   Email:"",
   FirstName:"",
   LastName:"",
   Password:"",
   ConfirmPassword:"",
   PhoneNumber: "",
   Notes: "",
   Address:"",
   Description:"",
   WebPage:"",
   SkypeId: "",
   MobilePhone: "",
   Image:"",

}

export const searchStudents = (params: any) =>
  request({
    url: '/Student/searchstudents',
    method: 'post',
    data: params
  })


export const addUpdateStudent= (data: any) =>
  request({
    url: '/Student/AddEditStudent',
    method: 'post',
    data: data
  })

export const getStudentDetails = (id: number) =>
  request({
    url: `/Student/GetStudentDetails?studentId=${id}`,
    method: 'get',
  })
