## 事件

React 事件不会绑在具体的元素上，而是在最外层有一个事件监听系统

onXXX 本质上是把这东西挂到最外层的事件监听器然后通过冒泡去调用，这就是React的合成事件

同时由于合成事件是在原生事件上层的，所以合成事件里无法用 stopPropagation 拦截原生事件

而原生事件反而可以通过阻止冒泡来拦截合成事件

所以类似于 menu 这种点击空白处消除的，挂在body上的事件请用 e.target 来判断是否为空白部分，避免混用

React 没有实现捕获，因为事件捕获比起冒泡有很大的兼容性问题（< ie9） 


## CSS module


### bem

Block：对应模块名，如 Dialog。 
Element：对应模块中的节点名 Confirm Button。 
Modifier：对应节点相关的状态，如 disabled 和 highlight。

## 组件高级应用

### HOC

用于形成类似 mixin 的效果，主要缺陷是复杂场景嵌套过多导致的可读性问题

主要在类组件里使用，函数组件一般使用 Hook 来代替

HOC 分为两种 一种是属性代理（正向继承），一种是反向继承

1. 正向继承

比较常见的用法，举例

```

const Inputable = (WrappedComponent, key) => (
  class extends Component {
    state = {
      [key]: ''
    }
    onChange = (e) => {
      this.setState({
        [key]: e.target.value
      })
    }
    render () {
      const newProps = {
        [key]: {
          onChange: this.onChange,
          value: this.state[key],
        }
      }
      return (
        <WrappedComponent
          {...this.props}
          {...newProps}
        />
      )
    }
  } 
)

class Input extends Component {
  render () {
    return <input {...this.props.username} />
  }
}

export default Inputable(Input, 'username')
```

2. 反向继承

```
const MyContainer = (WrappedComponent) => (
  class extends WrappedComponent {
      render() {
        return (
          <div>
            <h2>HOC Debugger Component</h2>
            <p>Props</p>
            <pre>{JSON.stringify(this.props, null, 2)}</pre>
              <p>State</p>
            <pre>{JSON.stringify(this.state, null, 2)}</pre> {super.render()}
          </div> 
        )
    }
  }
)
```

从例子可以看出，反向继承实际上就是继承了被包裹组件，同时可以操作被包裹组件内部属性，这样容易导致逻辑混乱一般不太建议使用

