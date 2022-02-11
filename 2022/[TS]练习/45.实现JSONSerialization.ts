// 实现 JsonifiedObject 工具类型，用于对 object 对象类型进行序列化操作。具体的使用示例如下所示：

namespace JsonifiedObject {

  type Jsonified<T extends object> = {
    [K in keyof T]: T[K] extends Function
      ? never
      : T[K] extends { toJSON: () => infer K }
        ? K
        : T[K] extends Date
          ? string
          : T[K] extends {}
              ? Jsonified<T[K]>
            : T[K]
  }
  
  type MyObject = {
    str: "literalstring",
    fn: () => void,
    date: Date,
    customClass: MyClass,
    obj: {
      prop: "property",
      clz: MyClass,
      nested: { attr: Date }
    },
  }
  
  declare class MyClass {
    toJSON(): "MyClasses";
  }
  
  /**
   * type JsonifiedMyObject = {
   *  str: "literalstring";
   *  fn: never;
   *  date: string;
   *  customClass: "MyClass";
   *  obj: JsonifiedObject<{
   *    prop: "property";
   *    clz: MyClass;
   *    nested: {
   *      attr: Date;
   *    };
   *   }>;
   * }
  */
  type JsonifiedMyObject = Jsonified<MyObject>;
  declare let ex: JsonifiedMyObject;
  const z1: "MyClasses" = ex.customClass;
  const z2: string = ex.obj.nested.attr;
}