import request from '@/utils/request'
import { CourseData } from './types'

export const defaultData: CourseData = {
    ShortName:"Test",
    FullName:"TEst TEst",
    StartDay:0,
    StartMonth:1,
    StartYear: 2020,
    StartMinute: 0,
    StartHour:0,
    EndDay:0,
    EndMonth:1,
    EndYear: 2020,
    EndMinute: 0,
    EndHour:0,
    Tags: "",
    Image:"",
    CategoryId:1,
    Description: "",
    NewPrice: 0.0,
    OldPrice: 0.0
}



export const searchCourses = (params: any) =>
  request({
    url: '/Courses/searchcourses',
    method: 'post',
    data: params
  })


export const addUpdateCourse= (data: any) =>
  request({
    url: '/Courses/addupdatecourse',
    method: 'post',
    data: data,
    headers:{
      'Content-Type': 'multipart/form-data'
    }
})

export const updateStatus = (id: number, data: any) =>
  request({
    url: `/Courses/updatestatus?courseId=${id}`,
    method: 'get',
    data: data
})

export const deleteCourse = (id: number) =>
  request({
    url: `/Courses/deletecourse?courseId=${id}`,
    method: 'delete'
})
