/**
 * serviceB
 *
 * @author wujohns
 * @date 19/04/25
 */
import { provide, inject } from '../lib'
import { ServiceA } from './service_a'

@provide('serviceB')
export class ServiceB {
  @inject()
  public serviceA: ServiceA

  public echoB () {
    console.log('bbb')
  }

  public runA () {
    this.serviceA.echoA()
  }
}
