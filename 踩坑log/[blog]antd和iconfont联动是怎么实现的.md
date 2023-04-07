```
// icon.js
// 1. 挂载全局svg，里面有一堆 <symbol id="icon_xxx"> 定义
window._iconfont_svg_string_xxxxxxx = '<svg>....</svg>';
function (l) {
  var a = (a = document.getElementsByTagName("script"))[a.length - 1],

  h = a.getAttribute("data-injectcss"),
  a = a.getAttribute("data-disable-injectsvg");
  if (!a) {
    var c, i, v, z, o, m = function (a, h) { h.parentNode.insertBefore(a, h) };
    if (h && !l.__iconfont__svg__cssinject__) {
      l.__iconfont__svg__cssinject__ = !0; try {
        document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
      } catch (a) { console && console.log(a) }
    }
    // 2. 挂载开头声明的 svg
    c = function () {
      var a, h = document.createElement("div");
      h.innerHTML = l._iconfont_svg_string_xxxxxxx, (h = h.getElementsByTagName("svg")[0]) && (h.setAttribute("aria-hidden", "true"), h.style.position = "absolute", h.style.width = 0, h.style.height = 0, h.style.overflow = "hidden", h = h, (a = document.body).firstChild ? m(h, a.firstChild) : a.appendChild(h))
    },
      document.addEventListener
        ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
          ? setTimeout(c, 0)
          : (i = function () { document.removeEventListener("DOMContentLoaded", i, !1), c() },
            document.addEventListener("DOMContentLoaded", i, !1))
        : document.attachEvent && (
          // 重命名
          v = c
          , z = l.document, o = !1, p(),
          z.onreadystatechange = function () { "complete" == z.readyState && (z.onreadystatechange = null, t()) })
  }
  // 执行
  function t() { o || (o = !0, v()) }
  function p() {
    try { z.documentElement.doScroll("left") } catch (a) { return void setTimeout(p, 50)
    } t()
    }
}
a(window);
```

可以看到 iconfont 生成的 icon.js 本质上就是一个 umd module，主要内容是定义了一堆 symbol (svg tag, 用于定义svg组，可以理解成一个symbol 包裹一个svg icon)[1.]

然后挂载到全局后创建一个 div 然后添加到 html 中[2.]

// ant/icon

```

function createScriptUrlElements(scriptUrls: string[], index: number = 0): void {
  const currentScriptUrl = scriptUrls[index];
  if (isValidCustomScriptUrl(currentScriptUrl)) {
    const script = document.createElement('script');
    script.setAttribute('src', currentScriptUrl);
    script.setAttribute('data-namespace', currentScriptUrl);
    if (scriptUrls.length > index + 1) {
      script.onload = () => {
        createScriptUrlElements(scriptUrls, index + 1);
      };
      script.onerror = () => {
        createScriptUrlElements(scriptUrls, index + 1);
      };
    }
    customCache.add(currentScriptUrl);
    document.body.appendChild(script);
  }
}

// [3.]antd 导出的 createFromIconfontCN 实现
export default function create<T extends string = string>(
  options: CustomIconOptions = {}
): React.FC<IconFontProps<T>> {
  const { scriptUrl, extraCommonProps = {} } = options;

  /**
   * DOM API required.
   * Make sure in browser environment.
   * The Custom Icon will create a <script/>
   * that loads SVG symbols and insert the SVG Element into the document body.
   */
  if (
    scriptUrl &&
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    typeof document.createElement === 'function'
  ) {
    if (Array.isArray(scriptUrl)) {
      // 因为iconfont资源会把svg插入before，所以前加载相同type会覆盖后加载，为了数组覆盖顺序，倒叙插入
      createScriptUrlElements(scriptUrl.reverse());
    } else {
      createScriptUrlElements([scriptUrl]);
    }
  }

  const Iconfont = React.forwardRef<HTMLSpanElement, IconFontProps<T>>((props, ref) => {
    const { type, children, ...restProps } = props;

    // children > type
    let content: React.ReactNode = null;
    if (props.type) {
      content = <use xlinkHref={`#${type}`} />;
    }
    if (children) {
      content = children;
    }
    return (
      <Icon {...extraCommonProps} {...restProps} ref={ref}>
        {content}
      </Icon>
    );
  });

  Iconfont.displayName = 'Iconfont';

  return Iconfont;
}

```

再看 antd 依赖到的 anticon 包
我们用到的 const IconFont = createFromIconfontCN(...) 就是这个 create [3.]

create 主要用于创建一个 script 标签然后加载我们指定的 icon.js 文件随后插入页面，

可以看出是否由使用该方法创建的 Icon 无关紧要，因为本质上该方法返回的Icon 只是包裹了 <use xlinkHref="#id"> 而已

本质上就是 利用 use 从 svg > symbol 里检索对应的 svg 模版

以上就是 anticon 和 iconfont.js svg实现上的关系了