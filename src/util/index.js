// Cookie管理类
export class Cookie {
  static get(key) {
    let reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`)
    let result = document.cookie.match(reg)
    return result[2]
  }
}
export class ArrayHelper {
  static getRepeatElementArray(item, size) {
    return Array(size).fill(item)
  }
}
