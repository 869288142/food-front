/* eslint-disable */
export default {
  methods: {
    async apiGet(url, pdata) {
      // eslint-disable-next-line
      try{
        let { data } = await axios.get(url, { params: pdata })
        return data
      } catch (e) {
        console.log(e)
      }
    },
    async apiPost(url, pdata) {
      // eslint-disable-next-line
      try{
        let { data } = await axios.post(url, pdata)
        return data
      } catch (e) {
        console.log(e)
      }
    },
    async apiPut(url, pdata) {
      // eslint-disable-next-line
      try{
        let { data } = await axios.put(url, pdata)
        return data
      } catch (e) {
        console.log(e)
      }
    },
    async apiDelete(url, pdata) {
      // eslint-disable-next-line
      try{
        let { data } = await axios.delete(url, {data: pdata})
        return data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
