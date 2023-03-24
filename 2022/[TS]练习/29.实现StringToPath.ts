// 实现一个 ToPath 工具类型，用于把属性访问（. 或 []）路径转换为元组的形式。具体的使用示例如下所示：

namespace ToPath {
  
  type A = ToPath<'foo.bar.baz'> //=> ['foo', 'bar', 'baz']
  type B = ToPath<'foo.bar[0].baz'> //=> ['foo', 'bar', '0', 'baz']

  type ToPath<S extends string, Stack extends any[] = []> = S extends `${infer Head}[${infer N}]${infer Rest}`
  // []后带 '.' 需要移除点再继续
    ? [...Stack, ...ToPath<Head>, N, ...ToPath<Rest>]
    : S extends `${infer Head}.${infer Rest}`
      // 移除完 [] 后有可能会是 '.a.b' 这种形式，需要判断非空
      ? Head extends ''
       ?  [...Stack, ...ToPath<Rest>]
       : [...Stack, Head, ...ToPath<Rest>]
      // 结束标识，直接插入最后一个
      : S extends `${infer End}.`
        ? [...Stack, End]
        : [...Stack, S]


    type Merge<A extends Object, B extends Object> = {
      [K in (keyof A | keyof B)]: K extends keyof B
      ? K extends keyof A
        ? A[K] | B[K]
        : B[K]
      : K extends keyof A
        ? A[K]
        : never
    }


    type R = Merge<{ dsd: 'teo' }, { name: 'tiny teo', gender: 'unknown' }>
} 

