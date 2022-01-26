namespace Test17 {
  // 实现一个 Includes 工具类型，用于判断指定的类型 E 是否包含在 T 数组类型中。具体的使用示例如下所示：

  
  type I0 = Includes<[], 1> // false
  type I1 = Includes<[2, 2, 3, 1], 2> // true
  type I2 = Includes<[2, 3, 3, 1], 1> // true
  type I3 = Includes<[2, 2, 3, 1], 7> // false

  type Equal<A, B> = A extends B
    ? B extends A
      ? true
      : false
    : false

  type Includes<T extends Array<any>, E> = T extends [infer Head, ...infer Tail]
    ? Equal<Head, E> extends true
      ? true
      : Includes<Tail, E>
    : false
}

