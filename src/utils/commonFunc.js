export function getTime (date) {
  const seperator1 = '-'
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  let hour = date.getHours()
  let min = date.getMinutes()
  const currentdate = year + seperator1 + month + seperator1 + strDate + '  ' + hour + ':' + min
  return currentdate
}
