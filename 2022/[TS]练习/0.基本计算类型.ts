namespace Calc {
  export type CreateArray<M extends number, R extends any[] = []> = R['length'] extends M
    ? R
    : CreateArray<M, [...R, '']>

  type Push<Arr extends any[], Times extends number> = [...Arr, ...CreateArray<Times>]

  type Pop<Arr extends any[], Times extends number> = Arr extends [infer Head, ...infer Tail]
  ? Times extends 0
    ? Arr
    : Pop<Tail, Times>
  : 0

  // 加法
  export type Add<N extends number, M extends number> = Push<CreateArray<N>, M>['length'] extends number
    ? Push<CreateArray<N>, M>['length']
    : never

  export type IndexOf<T extends any[], Target extends string, I extends number = 0> = T extends [infer Head, ...infer Rest]
    ? Head extends Target
      ? I
      : I extends number
      ? IndexOf<Rest, Target, Calc.Add<I, 1>>
      : never
    : -1

  export type Minus<T extends number, Base extends number> = CreateArray<T> extends [...CreateArray<Base>, ...infer K]
    ? K['length']
    : 0

 
  // 乘法，连加
  export type Multply<
    Base extends number,
    Rate extends number,
    Result extends number = 0
  > = Rate extends 0
    ? Result
    :  Multply<Base, Minus<Rate, 1>, Add<Result, Base>>

  // 除法，连减
  export type Divide<
    Base extends number,
    Rate extends number,
    Result extends number = 0
  > = Base extends 0
    ? Result
    : Divide<Minus<Base, Rate>, Rate, Add<Result, 1>>
    

}