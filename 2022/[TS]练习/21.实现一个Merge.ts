// 实现一个 Merge 工具类型，用于把两个类型合并成一个新的类型。第二种类型（SecondType）的 Keys 将会覆盖第一种类型（FirstType）的 Keys。具体的使用示例如下所示：

namespace Test21 {

  type Foo = { 
    a: number;
    b: string;
  };
  
  type Bar = {
    b: number;
  };
  
  type Merge<FirstType, SecondType> = {
    [K in keyof (FirstType & SecondType)]: K extends keyof SecondType
      ? SecondType[K]
      : K extends keyof FirstType
        ? FirstType[K]
        : never
  }

  type AB = Merge<Foo, Bar>
  
  const ab: AB = { a: 1, b: 2 };
}