// 实现 RequireExactlyOne 工具类型，用于满足以下功能。即只能包含 age 或 gender 属性，不能同时包含这两个属性。具体的使用示例如下所示：

namespace RequireExactlyOne {
  interface Person {
    name: string;
    age?: number;
    gender?: number;
  }
  
  // 只能包含Keys中唯一的一个Key
  type RequireExactlyOne<T, K extends keyof T, FullKey extends keyof T = K> = K extends any // 类型分发来自动实现后面的 1:1 联合类型
  ? Omit<T, K>
    & Required<Pick<T, K>>
    & Partial<Record<Exclude<FullKey, K>, never>>
  : never
  
  const p1: RequireExactlyOne<Person, 'age' | 'gender'> = {
    name: "lolo",
    age: 7,
  };
  
  const p2: RequireExactlyOne<Person, 'age' | 'gender'> = {
    name: "lolo",
    gender: 1
  };
  
  // Error
  const p3: RequireExactlyOne<Person, 'age' | 'gender'> = {
    name: "lolo",
    age: 7,
    gender: 1
  };
}
