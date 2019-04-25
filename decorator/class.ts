/**
 * 对 class 的修饰案例
 * 执行 ts-node class.ts
 *
 * @author wujohns
 * @date 19/04/12
 */

/**
 * 修饰器工厂方法
 * @param paramA - 案例参数
 */
const dclass = (paramA: string) => {
  console.log('factory param:', paramA)
  /**
   * 修饰器
   * @param constructor - 被修饰的类的构造函数
   */
  return <T extends (new(...args: any[]) => any)>(constructor: T) => {
    console.log('constructor === Exc:', constructor === Exc)  // true

    // 当这里有返回值时则会认为是一个新的构造函数替代了老的
    return class extends constructor {
      ele = 'change_ele'
    }
  }
}

@dclass('Exc')
class Exc {
  private ele = 'ele'

  async run () {
    console.log(this.ele)
  }
}

const exc = new Exc()
exc.run().then()
