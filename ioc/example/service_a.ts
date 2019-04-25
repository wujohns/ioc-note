/**
 * serviceA
 *
 * @author wujohns
 * @date 19/04/25
 */
import { provide, inject } from '../lib'
import { ServiceB } from './service_b'

@provide('serviceA')
export class ServiceA {
  @inject()
  public serviceB: ServiceB

  public echoA () {
    console.log('aaa')
  }

  public runB () {
    this.serviceB.echoB()
  }
}
