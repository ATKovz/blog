// 实现一个 Head 工具类型，用于获取数组类型的第一个类型。具体的使用示例如下所示：


// 测试用例
type H0 = Head<[]> // never
type H1 = Head<[1]> // 1
type H2 = Head<[3, 2]> // 3

// A:
type Head<T extends Array<any>> = T extends [infer Head, ...infer Tail]
  ? Head
  : never

// 测试用例2
type H_0 = Head1<[]> // never
type H_1 = Head1<[1]> // 1
type H_2 = Head1<[3, 2]> // 3

type Head1<T extends Array<any>> = T[0] extends undefined
  ? never
  : T[0]