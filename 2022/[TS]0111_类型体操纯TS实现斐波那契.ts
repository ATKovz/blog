// 核心是利用 infer 和 array length 实现计算

type _GetCount<Length extends number, T extends unknown[] = []> = 
  T['length'] extends Length
    ? T
    : _GetCount<Length, [...T, '']>

type Add<A extends number, B extends number, J extends unknown[] = [..._GetCount<A>, ..._GetCount<B>]> = 

  J['length'] extends number
    ? J['length']
    : never

type GetLast<T extends number[]> = T extends [...infer J, infer Last]
  ? Last
  : 0

type GetPrev<T extends number[]> = T extends [...infer J, infer Last, infer P]
  ? Last
  : 0

type Concat<A extends unknown[], B extends unknown> = [...A, B]

type Fib<
  Length,
  Result extends number[] = [0, 1],
> = Result['length'] extends Length
  ? Result
  : Fib<
    Length,
    Concat<Result, Add<GetLast<Result>, GetPrev<Result>>>
  >

type Result = Fib<9> // [0, 1, 1, 2, 3, 5, 8, 13, 21]