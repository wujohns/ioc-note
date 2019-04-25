/**
 * module a
 *
 * @author wujohns
 * @date 19/04/19
 */
'use strict'

class A {
  constructor (GG) {
    this.GG = GG
  }

  echoA () {
    console.log('aaa')
  }

  runB () {
    this.GG.b.echoB()
  }
}

module.exports = A
