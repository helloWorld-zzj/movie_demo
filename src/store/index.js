import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityId: 110100,
    cityName: '北京',
    cityList: [],
    cinemaList: [],
    // 保存一个旧的城市id，用于检测是否更换城市
    oldCityId: -1,
    oldCityId_2: -1,
    // 电影日程的缓存列表
    scheduleList: [],
    // 离我最近列表
    nearestCinemasList: []
  },
  getters: {
  },
  mutations: {
    cityData (state, cityList) {
      state.cityList = cityList
    },
    cinemaData (state, cinemaList) {
      state.cinemaList = cinemaList
    },
    // 同步城市id
    sycId (state, newId) {
      state.oldCityId = newId
    },
    sycId_2 (state, newId) {
      state.oldCityId_2 = newId
    },
    changeCity (state, cityName) {
      state.cityName = cityName
      state.cityId = this.state.cityList.find(item => item.name === cityName).cityId
    },
    pushSchedule (state, item) {
      state.scheduleList.push(item)
      // console.log(state.scheduleList)
    },

    // 获取离我最近的列表
    getNearest (state, list) {
      state.nearestCinemasList = list
      // console.log(state.nearestCinemasList)
    }
  },
  actions: {
    getCityData () {
      // 如果未获取过则发请求
      if (this.state.cityList.length === 0) {
        // 获取城市列表
        return axios({
          url: 'https://m.maizuo.com/gateway?cityId=110100&ticketF',
          headers: {
            'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.2.1","e":"16855398796191680688488449","bc":"${this.state.cityId}"}`,
            'X-Host': 'mall.film-ticket.city.list'
          }
        }).then(res => {
          this.commit('cityData', res.data.data.cities)
        }).catch(err => {
          console.log(err)
        })
      }
    },

    getCinemaData () {
      if (this.state.cinemaList.length === 0 || this.state.cityId !== this.state.oldCityId) {
        // 获取影院数据
        return axios({
          url: `https://m.maizuo.com/gateway?cityId=${this.state.cityId}&ticketF`,
          headers: {
            'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.2.1","e":"16855398796191680688488449","bc":${this.state.cityId}}`,
            'X-Host': 'mall.film-ticket.cinema.list'
          }
        }).then(res => {
          this.commit('cinemaData', res.data.data.cinemas)
          this.commit('sycId', this.state.cityId)
          // console.log(this.state.cinemaList)
        }).catch(err => {
          console.log(err)
        })
      }
    },

    // 获取日期信息
    getSchedule (value, ids) {
      // 判断日程是否存在，不存在则ajax请求
      const result = this.state.scheduleList.find(obj => obj.cinemaid === ids.cinemaid && obj.filmid === ids.filmid && obj.date === ids.date)
      if (!result) {
        // 由三个id通过ajax获取日程表信息
        axios({
          url: `https://m.maizuo.com/gateway/?filmId=${ids.filmid}&cinemaId=${ids.cinemaid}&date=${ids.date}&k=7745771`,
          headers: {
            'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.2.1","e":"16855398796191680688488449","bc":"${this.state.cityId}"}`,
            'X-Host': 'mall.film-ticket.schedule.list'
          }
        }).then(res => {
          if (res.data.data) {
            // 创建一个新日程表
            const scheduleItem = { ...ids, ...res.data.data }
            this.commit('pushSchedule', scheduleItem)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },

    // 获取离我最近影城信息
    getNearest () {
      // 如果城市信息改变或无缓存则请求数据
      if (this.state.nearestCinemasList.length === 0 || this.state.cityId !== this.state.oldCityId_2) {
        axios({
          url: `https://m.maizuo.com/gateway?cityId=${this.state.cityId}&k=7930554`,
          headers: {
            'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.2.1","e":"16855398796191680688488449","bc":"${this.state.cityId}","lo":"0","la":"0"}`,
            'X-Host': 'mall.film-ticket.cinema.recommend'
          }
        }).then(res => {
          this.commit('getNearest', res.data.data.cinemas)
          this.commit('sycId_2', this.state.cityId)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  modules: {
  }
})
