/**
 * 对属性进行修饰
 * 执行 ts-node property.ts
 *
 * @author wujohns
 * @date 19/04/12
 */

/**
 * 修饰器工厂方法
 * @param paramA - 案例参数
 */
const dproperty = (paramA: string) => {
  console.log('factory param:', paramA)
  /**
   * 修饰器
   * _target: 在该案例中为 Exp 实例化的对象 op
   * _propertyKey: 在该案例中为执行的修饰的属性 ele
   */
  return (_target: any, _propertyKey: string) => {
    _target[_propertyKey] = '---------'
  }
}

class Exp {
  @dproperty('dproperty')
  private ele

  run () {
    console.log(this.ele)
  }
}

const op = new Exp()
op.run()
