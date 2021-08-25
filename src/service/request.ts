import axios from "axios";
import { message } from "antd"; 
import config from "./env";

var instance = axios.create({
  baseURL: config.api,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 30000
});

var service = {
  async post(api:string, sendData:Object) {
    sendData = sendData || {};
    let promise = new Promise(function(resolve, reject) {
      instance
        .post(api, sendData)
        .then(response => {
          if (response && response.status === 200) {
            let data = response.data;
            resolve(data || true);
          } else if (!response) {
            message.error("请求超时，请稍后再试.");
            resolve(false);
          } else {
            message.error("请求失败");
            resolve(false);
          }
        })
        .catch(error => {
          console.log("error:", error);
          resolve(false);
        });
    });
    return promise;
  },
  async get(api:string, sendData:Object) {
    sendData = sendData || {};
    let promise = new Promise(function(resolve, reject) {
      instance
        .get(api, {
          params: sendData
        })
        .then(response => {
          if (response && response.status === 200) {
            let data = response.data;
            resolve(data || true);
          } else if (!response) {
            message.error("请求超时，请稍后再试.");
            resolve(false);
          } else {
            message.error("请求失败");
            resolve(false);
          }
        })
        .catch(error => {
          resolve(false);
        });
    });
    return promise;
  }
};

export default service;