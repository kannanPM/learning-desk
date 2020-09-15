import request from '@/utils/request'
import { EventData } from './types'
export const defaultData: EventData ={
   title:"Test",
   startDay:0,
   startMonth:1,
   startYear: 2020,
   startMinute: 0,
   startHour:0,
   withDuration: true,
   endDay:0,
   endMonth:1,
   endYear: 2020,
   endMinute: 0,
   endHour:0,
   description: "",
   eventType: 0,
   tags: "",
}

export const searchEvents = (params: any) =>
  request({
    url: '/Events/searchevents',
    method: 'post',
    data: params
  })


export const addUpdateEvent= (data: any) =>
  request({
    url: '/Events/addupdateevent',
    method: 'post',
    data: data
  })

export const updateStatus = (id: number, data: any) =>
  request({
    url: `/Events/updatestatus?eventId=${id}`,
    method: 'get',
    data
  })

export const deleteEvent = (id: number) =>
  request({
    url: `/Events/deleteevent?eventId=${id}`,
    method: 'delete'
  })

