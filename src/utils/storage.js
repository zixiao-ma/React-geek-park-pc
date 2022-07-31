/*
* set 封装储存的方法
*  */
const storage = window.sessionStorage
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  storage.setItem(key, value)
}
/*
* get 封装获取的方法
*  */
export const getItem = (key) => {
  const data = storage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
export const removeItem = (key) => {
  storage.removeItem(key)
}
export const removeAllItem = () => {
  storage.clear()
}
