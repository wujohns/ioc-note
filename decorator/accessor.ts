/**
 * 对 get/set 方法修饰的案例
 * 执行: ts-node accessor.ts
 *
 * @author wujohns
 * @date 19/04/12
 */

/**
 * 修饰器工厂方法
 * @param paramA - 案例参数
 */
const daccess = (paramA: string) => {
  console.log('factory param:', paramA)
  /**
   * 修饰器
   * @param _target - 相应的对象实例
   * @param _propertyKey - 被调用的属性名称
   * @param descriptor - 相关函数的其他属性
   */
  return (
    _target: any, _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    /**
     * 输出:
     * { get: [Function: get str],
     *   set: [Function: set str],
     *   enumerable: false,
     *   configurable: true }
     */
    console.log(descriptor)
  }
}

class Exa {
  private ele = 'ele'

  @daccess('get')
  get str () {
    return this.ele
  }

  set str (param) {
    this.ele = param
  }
}

const oa = new Exa()

// 不同于对普通函数的 decorator, get/set 在函数初始化时即已经被处理，而不是执行时处理
// console.log(oa.str)
// oa.str = 'kk'
