// to format date that we will receive from server
export const formatDate = (value) => {
  return value.toString().replace(/\//g, '.');
};
