// 核心是利用 infer 和 array length 实现计算



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
    Concat<Result, Calc.Add<GetLast<Result>, GetPrev<Result>>>
  >

type Result = Fib<9> // [0, 1, 1, 2, 3, 5, 8, 13, 21]