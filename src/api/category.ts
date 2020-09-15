import request from '@/utils/request'
import { IArticleData } from './types'

export const defaultCategoryData: IArticleData = {
  id: 0,
  status: 'draft',
  title: '',
  fullContent: '',
  abstractContent: '',
  sourceURL: '',
  imageURL: '',
  timestamp: '',
  platforms: ['a-platform'],
  disableComment: false,
  importance: 0,
  author: '',
  reviewer: '',
  type: '',
  pageviews: 0
}

export const getCategories = (params: any) =>
  request({
    url: '/Categories/searchcategories',
    method: 'post',
    data: params
  })

export const getActiveCategories = () =>
  request({
    url: '/Categories/activeCategories',
    method: 'get',
  })

export const addUpdateCategory= (data: any) =>
  request({
    url: 'Categories/addupdatecategory',
    method: 'post',
    data: data
  })

export const updateStatus = (id: number, data: any) =>
  request({
    url: `/Categories/updatestatus?categoryId=${id}`,
    method: 'get',
    data: data
  })

export const deleteCategory = (id: number) =>
  request({
    url: `/Categories/deletecategory?categoryId=${id}`,
    method: 'delete'
  })

export const getPageviews = (params: any) =>
  request({
    url: '/pageviews',
    method: 'get',
    params
  })
