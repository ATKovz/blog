
const a: NonEmptyArray<string> = [, 123] // 将出现编译错误
const b: NonEmptyArray<string> = ['Hello TS'] // 非空数据，正常使用

const aa: NonEmptyArray1<string> = [, 1234] // 将出现编译错误
const bb: NonEmptyArray1<string> = ['Hello TS'] // 非空数据，正常使用


type NonEmptyArray<T> = [T, ...T[]]

type NonEmptyArray1<T> = {
  [key: number]: T
} & {
  0: T
}