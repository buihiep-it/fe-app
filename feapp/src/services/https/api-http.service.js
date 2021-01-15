// this service use for api on
// https://d39tddlu62kxna.cloudfront.net/swagger-ui/dist/index.html?url=https%3A%2F%2Fd39tddlu62kxna.cloudfront.net%2Fswagger-ui%2FCMN.yaml
// https://d39tddlu62kxna.cloudfront.net/swagger-ui/dist/index.html?url=https%3A%2F%2Fd39tddlu62kxna.cloudfront.net%2Fswagger-ui%2FWEB.yaml

import axios from '../axios/axios.service'
import DialogService from '../dialog.service'
// import WebStorageService from '../web-storage.service'
// import routes from '../../router'
import { errorMessage } from '@/globals/errorMessage'
const baseDomain = process.env.VUE_APP_API_BASE_URL
const dialogService = new DialogService()
const options = {
  headers: {
    'Content-Type': 'application/json'
  }
}

/**
 * Http GET
 */
export async function get (url, params = {}, autoHandleError = true) {
  const newOptions = {
    ...options,
    params
  }

  try {
    let requestURL = ''
    requestURL = `${baseDomain}${url}`
    const result = await axios.get(requestURL, newOptions)
    return result.data
  } catch (error) {
      throw errorWrapper(error, autoHandleError)
  }
}

/**
 * Http POST
 */
export async function post (url, params = {}, autoHandleError = true) {
  const newOptions = {
    ...options
  }

  try {
    let requestURL = ''
    requestURL = `${baseDomain}${url}`
    const result = await axios.post(requestURL, params, newOptions)
    return result.data
  } catch (error) {
    throw errorWrapper(error, autoHandleError)
  }
}

/**
 * Http PUT
 */
export async function put (url, params = {}, autoHandleError = true) {
  const newOptions = {
    ...options
  }

  try {
    let requestURL = ''
    requestURL = `${baseDomain}${url}`
    const result = await axios.put(requestURL, params, newOptions)
    return result.data
  } catch (error) {
    throw errorWrapper(error, autoHandleError)
  }
}

/**
 * Http DELETE
 */
export async function del (url, params = {}, autoHandleError = true) {
  const newOptions = {
    ...options,
    data: params
  }

  try {
    let requestURL = ''
    requestURL = `${baseDomain}${url}`
    const result = await axios.delete(requestURL, newOptions)
    return result.data
  } catch (error) {
    throw errorWrapper(error, autoHandleError)
  }
}

/**
 * Http Post by token id
 */
export function errorWrapper (error, autoHandleError = true) {
  let errorData = { code: 'HttpService/WrongSetting', message: 'Error happened!' }

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log({ response: error.response })
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
    errorData = error.response
    if (autoHandleError) {
      dialogService.showComfirmDialog(
        {
          title: errorMessage['ERROR_' + error.response.status + '_TITLE'] || '通知',
          content: errorMessage['ERROR_' + error.response.status] || 'ERROR_CODE: ' + error.response.status,
          cancel: false,
          textOK: errorMessage['ERROR_' + error.response.status + '_BTN'] || 'O K'
        },
        {},
        (confirm) => {
          if (confirm) {
            // dialogService.closeAll()
            // if (process.env.VUE_APP_BASE_FOLDER === 'admin') {
            //   routes.push({ name: 'signin' })
            // }
          }
        }
      )
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)

    errorData.code = 'HttpService/postWithoutAuth/NoResponse'
    errorData.message = `
      The request was made but no response was received
      error.request is an instance of XMLHttpRequest in the browser and an instance of
      http.ClientRequest in node.js
    `
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
    errorData.code = 'HttpService/postWithoutAuth/WrongSetting'
    errorData.message = `
      Something happened in setting up the request that triggered an Error
    `
  }
  console.log(error.config)
  return errorData
}
