import Vue from "vue"
export function getCookie(key) {
  let reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`)
  let result = document.cookie.match(reg)
  return result ? result[2] : null
}
export function getRepeatElementArray(arr, times) {
  const tmp = [...arr]
  for (let i = 0; i < times - 1; i++) {
    tmp.forEach(e => {
      arr.push(e)
    })
  }
}
export function autoLoadingGlobalComponent() {
  const requireComponent = require.context(
    // 其组件目录的相对路径
    "../components",
    // 是否查询其子目录
    false,
    // 匹配vue后缀文件名的文件
    /\.vue$/
  )
  // 遍历获取到的文件名，依次进行全局注册
  requireComponent.keys().forEach(fileName => {
    // 获取组件配置(实例)
    const componentConfig = requireComponent(fileName)
    // 获取组件的 PascalCase 命名(eg: MYHeader)
    // eslint-disable-next-line
    const componentName = _.upperFirst(
      // 获取驼峰式命名
      // eslint-disable-next-line
      _.camelCase(
        // 剥去文件名开头的 `./` 和结尾的扩展名 eg: ./food-header.vue -> foodHeader
        fileName.replace(/^\.\/(.*)\.\w+$/, "$1")
      )
    )
    // 全局注册组件
    Vue.component(
      componentName,
      // 如果这个组件选项是通过 `export default` 导出的，
      // 那么就会优先使用 `.default`，
      // 否则回退到使用模块的根。
      componentConfig.default || componentConfig
    )
  })
}
export async function asyncPromise(...rest) {
  let result = await Promise.all(rest)
  return result
}
export function filterObjProp(obj, filterType) {
  for (let [k, v] of Object.entries(obj)) {
    if (v === filterType) {
      delete obj[k]
    }
  }
}
export function isEmptyObj(obj) {
  return JSON.stringify(obj) === "{}"
}
