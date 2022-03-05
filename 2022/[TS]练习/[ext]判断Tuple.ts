namespace IsTuple {
  // 严格比对，具体原理会开一个补充
  type Equal<A, B> = (<T>() => T extends A ? 1: 2) extends (<T>() => T extends B ? 1: 2)
  ? true
  : false


  // 主要利用的是 Tuple.length 是具体数字实例，而 list 是泛 numbber
  type IsTuple<T extends any[]> = Equal<T['length'],  number> extends true
    ? false
    : true


  type TupleisTuple = IsTuple<[1, 2, 3]>

  type ListIsTuple = IsTuple<any[]>  
}