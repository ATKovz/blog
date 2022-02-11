// 实现 RequireAllOrNone 工具类型，用于满足以下功能。即当设置 age 属性时，gender 属性也会变成必填。具体的使用示例如下所示：

namespace RequireAllOrNone {

  interface Person {
    name: string;
    age?: number;
    gender?: number;
  }
  
  type RequireAllOrNone<T, K extends keyof T> = any
  
  const p1: RequireAllOrNone<Person, 'age' | 'gender'> = {
    name: "lolo"
  };
  
  const p2: RequireAllOrNone<Person, 'age' | 'gender'> = {
    name: "lolo",
    age: 7,
    gender: 1
  };
}
