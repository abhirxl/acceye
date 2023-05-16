
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

// delete
export const destroy = (url, entity) => new Promise((resolve, reject) => {
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

// update
export const put = (url, entity) => new Promise((resolve, reject) => {
  customAxiosInterceptor.put(url, entity).then((response) => {
    if (response && response.data) {
      resolve(response.data);
    }
  }).catch((ex) => {
    console.log(ex);
  });
});