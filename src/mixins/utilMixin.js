export default {
  methods: {
    isNotEmptyArray(arr) {
      return Array.isArray(arr) && arr.length !== 0
    },
    assign(...obj) {
      return Object.assign({}, ...obj)
    }
  }
}
