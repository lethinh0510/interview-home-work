/**
 * @param   {[type]} err
 * @returns {[type]}
 */
export const handlerError = error => {
  let result = {};
  if (error.data) {
    result = error;
  } else if (error.response) {
    result = error.response;
  } else if (error.request && error.request.status > 0) {
    result = error.request;
  } else {
    result = {
      status: 503
    };
  }
  return Promise.reject(result);
};
/**
 * @param   {[type]} res
 * @returns {[type]}
 */
export const handlerSuccess = res => {
  return res.data;
};
