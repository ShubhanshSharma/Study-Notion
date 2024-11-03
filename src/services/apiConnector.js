import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    // console.log('apiConnector call url-', url)
    // console.log('apiConnector call method-', method)
    // console.log('apiConnector call bodyData-', bodyData)
    // console.log('apiConnector call headers-', method)
    // console.log('apiConnector call params-', method)
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}