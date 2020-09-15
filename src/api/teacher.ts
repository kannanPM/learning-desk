import request from '@/utils/request'
import { TeacherData } from './types'

export const defaultData: TeacherData ={

   TeacherId: 0,
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



export const searchTeachers = (params: any) =>
  request({
    url: '/Teachers/searchteacher',
    method: 'post',
    data: params
  })


export const addUpdateTeacher= (data: any) =>
  request({
    url: '/Teachers/AddEditTeacher',
    method: 'post',
    data: data
  })

export const getTeachersDetails = (id: number) =>
  request({
    url: `/Teachers/GetTeacherDetails?teacherId=${id}`,
    method: 'get',
  })
