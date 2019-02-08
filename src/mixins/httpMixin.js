export default {
  methods: {
    async apiGet(url, pdata) {
      // eslint-disable-next-line
      let { status, data } = await axios.get(url, { params: { ...pdata }})
      return status === 200 ? data : Promise.reject()
    },
    async apiPost(url, pdata) {
      // eslint-disable-next-line
      let { status, data } = await axios.post(url, pdata)
      return status === 200 ? data : Promise.reject()
    }
  }
}
