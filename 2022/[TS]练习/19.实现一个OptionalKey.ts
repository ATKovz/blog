// 实现一个 OptionalKeys 工具类型，用来获取对象类型中声明的可选属性。具体的使用示例如下所示：

type Person = {
  id: string;
  name: string;
  age: number;
  from?: string;
  speak?: string;
};

type PersonOptionalKeys = OptionalKeys<Person> // "from" | "speak"

type isEqual<A, B> = A extends B ? B extends A ? true : false : false

type OptionalKeys<T> = {
  // 这里不能直接用T[K]拿，因为拿不到 Optional 状态
  [K in keyof T]: isEqual<Pick<T, K>, Partial<Pick<T, K>>> extends true
    ? K
    : never
}[keyof T]
