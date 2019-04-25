/**
 * module b
 *
 * @author wujohns
 * @date 19/04/19
 */
'use strict'

class B {
  constructor (GG) {
    this.GG = GG
  }

  echoB () {
    console.log('bbb')
  }

  runA () {
    this.GG.a.echoA()
  }
}

module.exports = B
