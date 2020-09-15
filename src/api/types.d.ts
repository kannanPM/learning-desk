export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}


export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface ITransactionData {
  orderId: string
  timestamp: string | number
  username: string
  price: number
  status: string
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}






export interface CourseData {

   ShortName: string,
   FullName: string,
   StartDay: number,
   StartMonth: number,
   StartYear: number,
   StartMinute: number,
   StartHour: number,
   EndDay: number,
   EndMonth: number,
   EndYear: number,
   EndMinute: number,
   EndHour: number,
   Tags: string,
   Image: string,
   CategoryId: number,
   Description: string,
   NewPrice: number,
   OldPrice: number
  
}

export interface StudentData {

   StudentId: number,
   Email: string,
   FirstName: string,
   LastName: string,
   Password: string,
   ConfirmPassword: string,
   PhoneNumber: string,
   Notes: string,
   Address: string,
   Description: string,
   WebPage: string,
   SkypeId: string,
   MobilePhone: string,
   Image: string,
}


export interface TeacherData {

   TeacherId: number,
   Email: string,
   FirstName: string,
   LastName: string,
   Password: string,
   ConfirmPassword: string,
   PhoneNumber: string,
   Notes: string,
   Address: string,
   Description: string,
   WebPage: string,
   SkypeId: string,
   MobilePhone: string,
   Image: string,
}

export interface EventData {

   title:string,
   startDay: number,
   startMonth: number,
   startYear: number,
   startMinute: number,
   startHour: number,
   withDuration: boolean,
   endDay: number,
   endMonth: number,
   endYear: number,
   endMinute: number,
   endHour: number,
   description: string,
   eventType: number,
   tags: string,

}
