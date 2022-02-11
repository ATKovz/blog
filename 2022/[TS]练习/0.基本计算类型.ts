namespace Calc {
  export type CreateArray<M extends number, R extends any[] = []> = R['length'] extends M
    ? R
    : CreateArray<M, [...R, '']>

  type Push<Arr extends any[], Times extends number> = [...Arr, ...CreateArray<Times>]

  // 加法
  export type Add<N extends number, M extends number> = Push<CreateArray<N>, M>['length'] extends number
    ? Push<CreateArray<N>, M>['length']
    : never

  export type IndexOf<T extends any[], Target extends string, I extends number = 0> = T extends [infer Head, ...infer Rest]
    ? Head extends Target
      ? I
      : I extends number
      ? GetIdx<Rest, Target, Calc.Add<I, 1>>
      : never
    : -1
  
}