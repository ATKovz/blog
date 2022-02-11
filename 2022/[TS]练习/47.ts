// 实现 RequireExactlyOne 工具类型，用于满足以下功能。即只能包含 age 或 gender 属性，不能同时包含这两个属性。具体的使用示例如下所示：

namespace RequireExactlyOne {
  interface Person {
    name: string;
    age?: number;
    gender?: number;
  }
  
  // 只能包含Keys中唯一的一个Key
  type RequireExactlyOne<T, Keys extends keyof T> = any 
  
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