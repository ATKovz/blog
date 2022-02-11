// 完善 Chainable 类型的定义，使得 TS 能成功推断出 result 变量的类型。调用 option 方法之后会不断扩展当前对象的类型，使得调用 get 方法后能获取正确的类型。

namespace Chainable {

  declare const config: Chainable
  
  const result = config
    .option('age', 7)
    .option('name', 'lolo')
    .option('address', { value: 'XiaMen' })
    .get()
  
  type ResultType = typeof result  
  // 期望 ResultType 的类型是：
  // {
  //   age: number
  //   name: string
  //   address: {
  //     value: string
  //   }
  // }
  
  type Chainable<O extends {} = {}> = {
    // 类似于 return this 的操作
    option<K extends string, V extends any>(key: K, value: V): Chainable<{
      [Key in keyof O]: O[Key]
    } & {
      [Key in K as `${K}`]: V
    }>
    get(): { [Key in keyof O]: O[Key] }
  }
}
