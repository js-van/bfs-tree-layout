"use strict"

var bits = require("bit-twiddle")

function bfsRoot(n) {
  return 0
}
exports.root = bfsRoot

function bfsBegin(n) {
  return bfsLo(n, 0)
}
exports.begin = bfsBegin

function bfsEnd(n) {
  return bfsHi(n, 0)
}
exports.end = bfsEnd

function bfsHeight(n, x) {
  var lgn = bits.log2(bits.nextPow2(n+1))
  var lgx = bits.log2(bits.nextPow2(x+1))
  var h = lgn - lgx
  if((x+1)<<h > n) {
    --h
  }
  return h
}
exports.height = bfsHeight

function bfsNext(n, x) {
  var r = bfsRight(n, x)
  if(r < n) {
    return bfsLo(n, r)
  } else {
    while(x > 0 && (x&1)===0) {
      x = (x-1)>>1
    }
    x = (x-1)>>1
    if(x < 0) {
      return bfsEnd(n)
    }
    return x
  }
}
exports.next = bfsNext

function bfsPrev(n, x) {
  var l = bfsLeft(n, x)
  if(l < n) {
    return bfsHi(n, l)
  } else {
    while(x > 0 && (x&1) !== 0) {
      x = (x-1) >> 1
    }
    x = (x-1) >> 1
    if(x < 0) {
      return bfsBegin(n)
    }
    return x
  }
}
exports.prev = bfsPrev

function bfsLo(n, x) {
  var h = bfsHeight(n,x)
  return ((x+1)<<h) - 1
}
exports.lo = bfsLo

function bfsHi(n, x) {
  var h = bfsHeight(n, x)
  var a = ((x+2)<<h) - 2
  if(a < n) {
    return a
  }
  return ((x+2)<<(h-1)) - 2
}
exports.hi = bfsHi

function bfsParent(n, x) {
  return (x-1) >>> 1
}
exports.parent = bfsParent

function bfsLeft(n, x) {
  return (x*2) + 1
}
exports.left = bfsLeft

function bfsRight(n, x) {
  return (x+1)*2
}
exports.right = bfsRight

function bfsLeaf(n, x) {
  return (x*2 + 1) >= n
}
exports.leaf = bfsLeaf
