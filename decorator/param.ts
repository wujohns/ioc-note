/**
 * 对函数参数进行修饰
 * 执行 ts-node param.ts
 *
 * @author wujohns
 * @date 19/04/12
 */

/**
 * 修饰器工厂方法
 * @param paramA - 案例参数
 */
const dparam = (paramA: string) => {
  console.log('factory param:', paramA)
  /**
   * 修饰器
   * @param _target - 相应的对象实例
   * @param _propertyKey - 被调用的属性名称
   * @param parameterIndex - 参数在函数中的顺序
   */
  return (
    _target: any, _propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    console.log(_target, _propertyKey, parameterIndex)
  }
}

class Expa {
  run (@dparam('pam')kk: string) {
    console.log(kk)
  }
}

const opa = new Expa()
opa.run('kkkk')
