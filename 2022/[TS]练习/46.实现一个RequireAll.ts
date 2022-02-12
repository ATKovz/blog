// 实现 RequireAllOrNone 工具类型，用于满足以下功能。即当设置 age 属性时，gender 属性也会变成必填。具体的使用示例如下所示：

namespace RequireAllOrNone {

  interface Person {
    name: string;
    age?: number;
    gender?: number;
  }
  
  
  const p1: RequireAllOrNone<Person, 'age' | 'gender'> = {
    name: "lolo"
    age: 7
  };
  
  const p2: RequireAllOrNone<Person, 'age' | 'gender'> = {
    name: "lolo",
    age: 7,
    gender: 1
  };

  // 2选1， 要么全传要么全不传
  type RequireAllOrNone<T, K extends keyof T> = Omit<T, K> & (
    Partial<Record<K, never>> | Required<Pick<T, K>>
  )
}
