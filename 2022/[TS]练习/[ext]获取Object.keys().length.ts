namespace GetObjectLength {
  type ToUnionList<
    T extends Record<string, any>,
    R extends any[] = [],
    K extends (string | number | symbol) = keyof T,
    M extends (string | number | symbol) = K,
  > = [K] extends [never]
    ? R
      // 触发 union type dispatch
    : K extends any 
     ? [K, ...ToUnionList<T, [], Exclude<M, K>>]
     : never

  type GetObjectLength<T extends object> = ToUnionList<T>['length']

  type Result = GetObjectLength<{
    a: 1,
    b: 2,
    c: 3
  }>
}