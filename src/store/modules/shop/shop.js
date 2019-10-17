
import {
  getDeviceTypeInfo,
  deviceDeleteDeviceType,
  deviceAddDeviceType,
  deviceEditDeviceType
} from '@/api/device/type'

const deviceType = {
  state: {
    accounts: []
  },
  mutations: {
  },
  actions: {
    // 分页查询厂商信息
    getDeviceTypeInfo({ commit }, data) {
      return new Promise((resolve, reject) => {
        getDeviceTypeInfo(data).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新增类型
    deviceAddDeviceType({ commit }, obj) {
      return new Promise((resolve, reject) => {
        deviceAddDeviceType(obj).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // // 修改厂商
    deviceEditDeviceType({ commit }, obj) {
      return new Promise((resolve, reject) => {
        deviceEditDeviceType(obj).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除厂商
    deviceDeleteDeviceType({ commit }, typeId) {
      return new Promise((resolve, reject) => {
        deviceDeleteDeviceType(typeId).then(res => {
          resolve(res)
        }).catch(
          error => {
            reject(error)
          }
        )
      })
    }
  }
}

export default shop
