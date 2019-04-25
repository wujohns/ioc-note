/**
 * 简易版 ioc
 *
 * @author wujohns
 * @date 19/04/25
 */

import 'reflect-metadata'

export class Container {
  private insMap

  constructor (providers) {
    const insMap = {}
    const serviceNameList = []

    // 初始化 service (单例模式)
    for (const provider of providers) {
      // 从 metadata 中获取 service 的名称
      const serviceName = Reflect.getMetadata('serviceName', provider)
      if (insMap[serviceName]) continue

      // 实例化相应的 service 并写入到列表中
      insMap[serviceName] = new provider()
      serviceNameList.push(serviceName)
    }

    // 向所有实例化的 service 中注入依赖
    for (const key in insMap) {
      const ins = insMap[key]

      // 遍历 service 列表进行注入
      for (const serviceName of serviceNameList) {
        const isInject = Reflect.getMetadata('serviceInject', ins, serviceName)
        if (isInject) {
          ins[serviceName] = insMap[serviceName]
        }
      }
    }

    this.insMap = insMap
  }

  /**
   * 依据 serviceName 获取对应的 service 实例
   * @param serviceName - service 名称
   */
  public getService (serviceName: string) {
    return this.insMap[serviceName]
  }
}

/**
 * service 的修饰器, 用于给相应的 service 增加 metaData
 * @param serviceName - service 名称
 */
export const provide = (serviceName: string) => {
  return (target) => {
    Reflect.defineMetadata('serviceName', serviceName, target)
  }
}

/**
 * 注入参数时的修饰器, 用于标记需要注入的变量
 */
export const inject = () => {
  return (target, key) => {
    Reflect.defineMetadata('serviceInject', true, target, key)
  }
}
