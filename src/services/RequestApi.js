// import RequestError  from '../error/RequestError';
// import axiosInstance from '../axiosConfig';
import axios from 'axios'

/**
 * @desc Enables make http request with actions to an specific endpoint or
 * to the base endpoint.
 * @see BaseApi
 */
class RequestApi {
  constructor (baseURL) {
    // const {
    //     REACT_APP_API_URL: baseURL
    // } = process.env
    this.axios = axios.create({
      baseURL
    })
  }

  /**
     * Allows to make a get request to any endpoint and the specified resource
     * with optional headers param.
     * @param { string } endpoint url of endpoint
     * @param { string } resource string of resource
     * @param { Object } headers object with the headers in single request
     * @returns
  */
  async get (resource, params, data) {
    let config = {
      params
    }
    try {
      return await this.axios.get(`${resource}`, config)
    } catch (error) {
      console.warn(error)
      // throw new RequestError(error);
    }
  }

  /**
   * Allows to make a post request to any endpoint and the specified resource
   * with optional headers param.
   *
   * @param { string } endpoint url of endpoint
   * @param { string } resource string of resource
   * @param { Object } headers object with the headers in single request
   *
   * @returns
  */
  async post ({ resource, data, headers = {} }) {
    let config = {
      headers
    }
    try {
      return await this.axios.post(`${resource}`, data, config)
    } catch (error) {
      console.warn(error)
      // throw new RequestError(error);
    }
  }

  /**
   * Allows to make a put request to any endpoint and the specified resource
   * with optional headers param.
   *
   * @param { string } resource string of resource
   * @param { Object } headers object with the headers in single request
   *
   * @returns
  */
  async put ({ resource, data, headers = {} }) {
    let config = {
      headers
    }
    try {
      return await axios.put(`${resource}`, data, config)
    } catch (error) {
      console.warn(error)
      // throw new RequestError(error)
    }
  }

  /**
   * Allows to make a delete request to any endpoint and the specified resource
   * with optional headers param.
   *
   * @param { string } resource string of resource
   * @param { Object } headers object with the headers in single request
   *
   * @returns
  */
  async delete ({ resource, headers = {} }) {
    let config = {
      headers
    }
    try {
      return await axios.delete(`${resource}`, config)
    } catch (error) {
      console.warn(error)
      // throw new RequestError(error);
    }
  }
}

export default RequestApi
