/**
 * 对方法的修饰案例
 * 执行: ts-node func.ts
 *
 * @author wujohns
 * @date 19/04/12
 */

/**
 * 修饰器工厂方法
 * @param paramA - 案例参数
 */
const dfunc = (paramA: string) => {
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
     * _target: 在该案例中为 Exf 实例化的对象 of
     * _propertyKey: 在该案例中为执行的修饰后的函数名 'run'
     * descriptor: {
     *  value: [Function: run], // 具体修饰的函数，这里为 Exf.run
     *  writable: true,     // 对象元素的 writable 属性，是否可以修改
     *  enumerable: false,  // 对象元素的 enumrable 属性，是否可以枚举(for-in)
     *  configurable: true  // 对象元素的 configurable 属性，是否可以delete
     * }
     */
    const originFunc = descriptor.value

    // 复写该函数
    descriptor.value = async function (...args) {
      const ele = this.ele
      console.log('export ele:', ele)
      await originFunc.apply(this, args)
    }
  }
}

class Exf {
  private ele = 'ele'

  @dfunc('run')
  async run (kk: string) {
    console.log(kk)
  }
}

const of = new Exf()
of.run('-------').then()
