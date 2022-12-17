
import customAxiosInterceptor from './custom-axios-interceptor';
export const post = (url, entity) => new Promise((resolve, reject) => {
  customAxiosInterceptor.post(url, entity).then((response) => {
    if (response && response.data) {
      resolve(response.data);
    }
  }).catch((ex) => {
    reject(ex);
  });
});

export const get = (url) => new Promise((resolve, reject) => {
  customAxiosInterceptor.get(url).then((response) => {
    if (response && response.data) {
      resolve(response.data);
    }
  }).catch((ex) => {
    reject(ex);
  });
});

export const detroy = (url, entity) => new Promise((resolve, reject) => {
  customAxiosInterceptor.delete(url, {
    data: entity
  }).then((response) => {
    if (response && response.data) {
      resolve(response.data);
    }
  }).catch((ex) => {
    reject(ex);
  });
});

export const put = (url, entity) => new Promise((resolve, reject) => {
  customAxiosInterceptor.put(url, entity).then((response) => {
    if (response && response.data) {
      resolve(response.data);
    }
  }).catch((ex) => {
    reject(ex);
  });
});