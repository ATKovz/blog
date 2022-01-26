
namespace Test22 {

  // 实现一个 RequireAtLeastOne 工具类型，它将创建至少含有一个给定 Keys 的类型，其余的 Keys 保持原样。具体的使用示例如下所示：
  
  type Responder = {
    text?: () => string;
    json?: () => string;
    secure?: boolean;
  };
  
  
  // 表示当前类型至少包含 'text' 或 'json' 键
  const responder: RequireAtLeastOne<Responder, 'text' | 'json'> = {
    json: () => '{"message": "ok"}',
    secure: true
  };
  
  type RequireAtLeastOne<
    ObjectType,
    KeysType extends keyof ObjectType,
  > = KeysType extends unknown ?
    // 后面的至少得有一个
    Responder & { [K in KeysType]-?: ObjectType[KeysType] }
    : never
}
