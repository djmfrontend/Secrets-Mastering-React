前端开发经常会涉及表单的处理，或者其他一些用于输入的组件，比如日历组件。

涉及到输入，就绕不开受控模式和非受控模式的概念。

什么是受控，什么是非受控呢？

想一下，改变表单值只有两种情况：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/deaf7e807955438f806c5e8cc406fdf1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=598&h=372&s=22264&e=png&b=ffffff)

用户去改变 value 或者代码去改变 value。

如果不能通过代码改表单值 value，那就是非受控，也就是不受我们控制。

但是代码可以给表单设置初始值 defaultValue。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22b0cd387ff14add97e38232e59365e7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=862&h=404&s=42877&e=png&b=ffffff)

代码设置表单的初始 value，但是能改变 value 的只有用户，代码通过监听 onChange 来拿到最新的值，或者通过 ref 拿到 dom 之后读取 value。

这种就是非受控模式。

反过来，代码可以改变表单的 value，就是受控模式。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84aa56a2d78f4150b5256c0aa474b238~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=832&h=410&s=43835&e=png&b=ffffff)

注意，value 和 defaultValue 不一样：

defaultValue 会作为 value 的初始值，后面用户改变的是 value。

而一旦你给 input 设置了 value，那用户就不能修改它了，可以输入触发 onChange 事件，但是表单的值不会变。

用户输入之后在 onChange 事件里拿到输入，然后通过代码去设置 value。

这就是受控模式。

其实绝大多数情况下，非受控就可以了，因为我们只是要拿到用户的输入，不需要手动去修改表单值。

但有的时候，你需要根据用户的输入做一些处理，然后设置为表单的值，这种就需要受控模式。

或者你想同步表单的值到另一个地方的时候，类似 Form 组件，也可以用受控模式。

**value 由用户控制就是非受控模式，由代码控制就是受控模式**。

我们写代码试一下：

```
npx create-vite
```

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/350cb963b6fc46db91f38bda0be781a1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=794&h=436&s=81617&e=png&b=000000)

创建 vite + react 的项目。

去掉 main.tsx 的 index.css 和 StrictMode：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aace438514924c16848e6b433f486f03~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=988&h=382&s=75846&e=png&b=1f1f1f)

改下 App.tsx

```javascript
import { ChangeEvent } from "react";

function App() {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }

  return <input defaultValue={"guang"} onChange={onChange} />;
}

export default App;
```

跑一下开发服务：

```
npm install
npm run dev
```

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35fb3becc54b40aba0ce43da3f2ae8cf~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=746&h=264&s=36280&e=png&b=191919)

看下效果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/732f5f2af5304b0baaabe8c7a7993401~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=778&s=61819&e=gif&f=20&b=fefefe)

defaultValue 作为 value 的初始值，然后用户输入触发 onChange 事件，通过 event.target 拿到了 value。

当然，非受控模式也不一定通过 onChange 拿到最新 value，通过 ref 也可以。

```javascript
import { useEffect, useRef } from "react";

function App() {
  const inputRef = useRef < HTMLInputElement > null;

  useEffect(() => {
    setTimeout(() => {
      console.log(inputRef.current?.value);
    }, 2000);
  }, []);

  return <input defaultValue={"guang"} ref={inputRef} />;
}

export default App;
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b8fb77677ba46eaba953f628ecf5d17~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=778&s=74953&e=gif&f=27&b=fdfdfd)

接下来看下受控模式的写法：

```javascript
import { ChangeEvent, useState } from "react";

function App() {
  const [value, setValue] = useState("guang");

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    // setValue(event.target.value);
  }

  return <input value={value} onChange={onChange} />;
}

export default App;
```

我们先把 setValue 注释掉，看下用户可不可以改：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a2631409725478ab80384e1ad99753f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=778&s=62606&e=gif&f=23&b=fefefe)

可以看到，用户可以输入，onChange 也可以拿到输入后的表单值，但是 value 并没有变。

把 setValue 那一行注释去掉就可以了。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/58d241a28c854a53bad86953cd46c779~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=778&s=80015&e=gif&f=26&b=fdfdfd)

虽然功能上差不多，但这种写法并不推荐：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/daf7021034c04d07acf64e2d9505eae7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1002&h=624&s=113981&e=png&b=1f1f1f)

你不让用户自己控制，而是通过代码控制，绕了一圈结果也没改 value 的值，还是原封不动的，图啥呢？

而且受控模式每次 setValue 都会导致组件重新渲染。

试一下：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/07b6bd96301642fa884ef5c69d7eb8c0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=990&h=658&s=112560&e=png&b=1f1f1f)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10bf4aa8a6f44270a8410ba01cc51b74~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=778&s=66973&e=gif&f=20&b=fdfdfd)

每次输入都会 setValue，然后触发组件重新渲染：

而非受控模式下只会渲染一次：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac956a61f55344e788ddffd025fa15bd~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=994&h=576&s=95194&e=png&b=1f1f1f)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed86df9d6fe344c0863c0fa9984dc6d5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=778&s=65892&e=gif&f=19&b=fdfdfd)

绕了一圈啥也没改，还导致很多组件的重新渲染，那你用受控模式图啥呢？

那什么情况用受控模式呢？

当然是你**需要对输入的值做处理之后设置到表单的时候，或者是你想实时同步状态值到父组件。**

比如把用户输入改为大写：

```javascript
import { ChangeEvent, useState } from "react";

function App() {
  const [value, setValue] = useState("guang");

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    setValue(event.target.value.toUpperCase());
  }

  return <input value={value} onChange={onChange} />;
}

export default App;
```

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd0875b4986e4b2581e1a25fcd9bffa4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=778&s=73818&e=gif&f=22&b=fdfdfd)

这种，需要把用户的输入修改一下再设置 value 的。

但这种场景其实很少。

有的同学可能会说 Form 组件，确实，用 Form.Item 包裹的表单项都是受控组件：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/708597ee7c644c19bbd9c49b321126e2~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1324&h=1174&s=163982&e=png&b=ffffff)

确实，那是因为 Form 组件内有一个 Store，会把表单值同步过去，然后集中管理和设置值：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7858591d4e674e9a86dab3494f21344c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=912&h=1116&s=210459&e=png&b=1f1f1f)

但也因为都是受控组件，随着用户的输入，表单重新渲染很多次，性能会不好。

如果是单独用的组件，比如 Calendar，那就没必要用受控模式了，用非受控模式，设置 defaultValue 就可以了。

很多人上来就设置 value，然后监听 onChange，但是绕了一圈又原封不动的把用户输入转为 value。

没啥意义，还平白导致组件的很多次重新渲染。

除了原生表单元素外，组件也需要考虑受控和非受控的情况。

比如日历组件：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d183d04d6e3c4909a18f621533e4b79f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=716&h=704&s=50761&e=png&b=fefefe)

它的参数就要考虑是支持非受控模式的 defaultValue，还是用受控模式的 value + onChange。

如果这是一个业务组件，那基本就是用非受控模式的 defaultValue 了，调用方只要拿到用户的输入就行。

用受控模式的 value 还要 setValue 触发额外的渲染。

但是基础组件不能这样，你得都支持，让调用者自己去选择。

ant design 的 Calendar 组件就是这样的：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1312dd03a10434098d9303a319bce17~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1694&h=522&s=101535&e=png&b=ffffff)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a45ee586bea040488ff163d8a683435d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1718&h=384&s=66968&e=png&b=fefefe)

ColorPicker 组件也是：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c485989dcf764f84b7999e0b322505e0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1464&h=386&s=68933&e=png&b=fefefe)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a13ca68971a143658361a53f67f50a5b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1488&h=412&s=64966&e=png&b=fefefe)

它同时支持了受控组件和非受控组件。

咋做到的呢？

我们来试试：

首先写下非受控组件的写法：

```javascript
import { ChangeEvent, useState } from "react";

interface CalendarProps {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}
function Calendar(props: CalendarProps) {
  const { defaultValue = new Date(), onChange } = props;

  const [value, setValue] = useState(defaultValue);

  function changeValue(date: Date) {
    setValue(date);
    onChange?.(date);
  }

  return (
    <div>
      {value.toLocaleDateString()}
      <div
        onClick={() => {
          changeValue(new Date("2024-5-1"));
        }}
      >
        2023-5-1
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2024-5-2"));
        }}
      >
        2023-5-2
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2024-5-3"));
        }}
      >
        2023-5-3
      </div>
    </div>
  );
}

function App() {
  return (
    <Calendar
      defaultValue={new Date("2024-5-1")}
      onChange={(date) => {
        console.log(date.toLocaleDateString());
      }}
    />
  );
}

export default App;
```

这里 Calendar 组件传入 defaultValue 和 onChange 参数。

defaultValue 会作为 value 的初始值，然后用户点击不同日期会修改 value，然后回调 onChange 函数。

这种情况，调用者只能设置 defaultValue 初始值，不能直接传入 value 来控制，所以是非受控模式。

试一下；

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3653ceff89c148709b886bfe53646240~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=778&s=81671&e=gif&f=20&b=fefefe)

然后再来写下受控模式的版本：

```javascript
import { ChangeEvent, useEffect, useState } from "react";

interface CalendarProps {
  value: Date;
  onChange?: (date: Date) => void;
}
function Calendar(props: CalendarProps) {
  const { value, onChange } = props;

  function changeValue(date: Date) {
    onChange?.(date);
  }

  return (
    <div>
      {value.toLocaleDateString()}
      <div
        onClick={() => {
          changeValue(new Date("2024-5-1"));
        }}
      >
        2023-5-1
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2024-5-2"));
        }}
      >
        2023-5-2
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2024-5-3"));
        }}
      >
        2023-5-3
      </div>
    </div>
  );
}

function App() {
  const [value, setValue] = useState(new Date("2024-5-1"));

  return (
    <Calendar
      value={value}
      onChange={(date) => {
        console.log(date.toLocaleDateString());
        setValue(date);
      }}
    />
  );
}

export default App;
```

直接用 props 传入的 value，然后切换日期的时候回调 onChange 函数：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/768bf3edbad24b7194004751d30b3164~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1146&h=1098&s=210826&e=png&b=1f1f1f)

value 的值的维护在调用方。

这就是受控组件的写法：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6360bf7cb5c42ab9953a28242878389~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=778&s=96316&e=gif&f=25&b=fefefe)

那能不能同时支持受控和非受控模式呢？

可以的，组件库基本都是这么做的：

```javascript
import { useEffect, useRef, useState } from "react";

interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  const { value: propsValue, defaultValue, onChange } = props;

  const [value, setValue] = useState(() => {
    if (propsValue !== undefined) {
      return propsValue;
    } else {
      return defaultValue;
    }
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (propsValue === undefined && !isFirstRender.current) {
      setValue(propsValue);
    }
    isFirstRender.current = false;
  }, [propsValue]);

  const mergedValue = propsValue === undefined ? value : propsValue;

  function changeValue(date: Date) {
    if (propsValue === undefined) {
      setValue(date);
    }
    onChange?.(date);
  }

  return (
    <div>
      {mergedValue?.toLocaleDateString()}
      <div
        onClick={() => {
          changeValue(new Date("2024-5-1"));
        }}
      >
        2023-5-1
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2024-5-2"));
        }}
      >
        2023-5-2
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2024-5-3"));
        }}
      >
        2023-5-3
      </div>
    </div>
  );
}

function App() {
  return (
    <Calendar
      defaultValue={new Date("2024-5-1")}
      onChange={(date) => {
        console.log(date.toLocaleDateString());
      }}
    />
  );
}

export default App;
```

参数同时支持 value 和 defaultValue，通过判断 value 是不是 undefined 来区分受控模式和非受控模式。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3684eda35c4641e18ef1e2a5f0ce2aec~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1026&h=1224&s=193393&e=png&b=1f1f1f)

如果是受控模式，useState 的初始值设置 props.value，然后渲染用 props.value。

如果是非受控模式，那渲染用内部 state 的 value，然后 changeValue 里 setValue。

当不是首次渲染，但 value 变为 undefined 的情况，也就是从受控模式切换到了非受控模式，要同步设置 state 为 propsValue。

这样，组件就同时支持了受控和非受控模式。

测试下：

非受控模式：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/459c2177c2db44e48a2417f9a5c6be60~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1190&h=280&s=52422&e=png&b=1f1f1f)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/095da794a8ae424484bbb26f95360f40~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=778&s=100027&e=gif&f=21&b=fdfdfd)

受控模式：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d75265a6e4c49fab7f87940845d3183~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=904&h=334&s=59645&e=png&b=1f1f1f)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/095da794a8ae424484bbb26f95360f40~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=778&s=100027&e=gif&f=21&b=fdfdfd)

其实组件库也都是这么做的。

比如 [arco design 的 useMergeValue 的 hook](https://github.com/arco-design/arco-design/blob/1e677c3c5bba72728668c40d78faea6536c480a8/components/_util/hooks/useMergeValue.ts)：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63a909b127b147ad88ee0b8be26f9589~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1426&h=1074&s=217212&e=png&b=1f1f1f)

代码差不多，它也是 useState 根据 value 是不是 undefined 来设置 value 或者 defaultValue。

不过它这里又加了一个默认值，没有 defaultValue 的时候用它哪个 defaultStateValue。

然后渲染用的 state 根据 value 是不是 undefind 来判断受控非受控从而决定用 props 的 value 还是 state 的 value。

它也处理了 value 从别的值变为 undefined 的情况：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3581f21e298e4de8aca513f53f38f7c4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1010&h=664&s=130045&e=png&b=1f1f1f)

保存了之前的 value，判断是从 props.value 别的值变为 undefined 的情况再修改内部 state 为这个 value。

这里保存之前的值是用的 useRef：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9429cfb5de44b2dbe4a156858ada997~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1208&h=344&s=72809&e=png&b=1f1f1f)

ref 的特点是修改了 current 属性不会导致渲染。

我们是判断非首次渲染，但是 props.value 变为了 undefined，效果一样。

再比如 ant design 的工具包 rc-util 里的 [useMergedValue](https://github.com/react-component/util/blob/master/src/hooks/useMergedState.ts) 的 hook：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c1c58f26cfc4de1a7db2bafdbf8cbfc~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1204&h=1200&s=230091&e=png&b=ffffff)

它也是 useState 根据 value 是不是 undefined 来设置 value 或者 defaultValue

然后又加了一个默认值，没有 defaultValue 的时候用它那个 defaultStateValue。

渲染的时候也是判断 value 是不是 undefind 来决定用 props.value 还是 state 的 value：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/669a7c79f02e41cb8576d1d250228f35~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1204&h=1198&s=212563&e=png&b=fffefe)

并且也做了别的值变为 undefined 的处理。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/654214f3e5894931ac199ae7964e7f4e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1238&h=1262&s=228520&e=png&b=fffefe)

大家都这么搞，我们也来封装个 hook：

```javascript
function useMergeState<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T,
    value?: T
  }
): [T, React.Dispatch<React.SetStateAction<T>>,] {
  const { defaultValue, value: propsValue } = props || {};

  const isFirstRender = useRef(true);

  const [stateValue, setStateValue] = useState<T>(() => {
    if (propsValue !== undefined) {
      return propsValue!;
    } else if(defaultValue !== undefined){
      return defaultValue!;
    } else {
      return defaultStateValue;
    }
  });

  useEffect(() => {
    if(propsValue === undefined && !isFirstRender.current) {
      setStateValue(propsValue!);
    }

    isFirstRender.current = false;
  }, [propsValue]);

  const mergedValue = propsValue === undefined ? stateValue : propsValue;

  return [mergedValue, setStateValue]
}
```

用一下：

```javascript
interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  const { value: propsValue, defaultValue, onChange } = props;

  const [mergedValue, setValue] = useMergeState(new Date(), {
    value: propsValue,
    defaultValue,
  });

  function changeValue(date: Date) {
    if (propsValue === undefined) {
      setValue(date);
    }
    onChange?.(date);
  }

  return (
    <div>
      {mergedValue?.toLocaleDateString()}
      <div
        onClick={() => {
          changeValue(new Date("2024-5-1"));
        }}
      >
        2023-5-1
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2024-5-2"));
        }}
      >
        2023-5-2
      </div>
      <div
        onClick={() => {
          changeValue(new Date("2024-5-3"));
        }}
      >
        2023-5-3
      </div>
    </div>
  );
}
```

试试效果：

非受控模式：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/459c2177c2db44e48a2417f9a5c6be60~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1190&h=280&s=52422&e=png&b=1f1f1f)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/095da794a8ae424484bbb26f95360f40~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=778&s=100027&e=gif&f=21&b=fdfdfd)

受控模式：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d75265a6e4c49fab7f87940845d3183~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=904&h=334&s=59645&e=png&b=1f1f1f)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/095da794a8ae424484bbb26f95360f40~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=778&s=100027&e=gif&f=21&b=fdfdfd)

再就是这个 onChange 部分，也应该封装进来：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5335034426b4e85bbc7e43f5034eaec~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1002&h=652&s=100372&e=png&b=1f1f1f)

不然用户用的时候还要想着去处理非受控组件的情况。

我看 arco design 里是没封装进去：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef4f3332a81342adb15a8dbb30dc4b2d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1290&h=780&s=212176&e=png&b=1f1f1f)

但是 ahooks 的 useControllableValue 就封装进去了：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd1ec6bbce6944b7a64b432ff06e6ca8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=618&s=110268&e=png&b=ffffff)

我们也加一下：

```javascript
import {  SetStateAction, useCallback, useEffect, useRef, useState } from "react"

function useMergeState<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T,
    value?: T,
    onChange?: (value: T) => void;
  },
): [T, React.Dispatch<React.SetStateAction<T>>,] {
  const { defaultValue, value: propsValue, onChange } = props || {};

  const isFirstRender = useRef(true);

  const [stateValue, setStateValue] = useState<T>(() => {
    if (propsValue !== undefined) {
      return propsValue!;
    } else if(defaultValue !== undefined){
      return defaultValue!;
    } else {
      return defaultStateValue;
    }
  });

  useEffect(() => {
    if(propsValue === undefined && !isFirstRender.current) {
      setStateValue(propsValue!);
    }

    isFirstRender.current = false;
  }, [propsValue]);

  const mergedValue = propsValue === undefined ? stateValue : propsValue;

  function isFunction(value: unknown): value is Function {
    return typeof value === 'function';
  }

  const setState = useCallback((value: SetStateAction<T>) => {
    let res = isFunction(value) ? value(stateValue) : value

    if (propsValue === undefined) {
      setStateValue(res);
    }
    onChange?.(res);
  }, [stateValue]);

  return [mergedValue, setState]
}

interface CalendarProps{
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  const {
    value: propsValue,
    defaultValue,
    onChange
  } = props;

  const [mergedValue, setValue] = useMergeState(new Date(), {
    value: propsValue,
    defaultValue,
    onChange
  });

  return <div>
    {mergedValue?.toLocaleDateString()}
    <div onClick={()=> {setValue(new Date('2024-5-1'))}}>2023-5-1</div>
    <div onClick={()=> {setValue(new Date('2024-5-2'))}}>2023-5-2</div>
    <div onClick={()=> {setValue(new Date('2024-5-3'))}}>2023-5-3</div>
  </div>
}

function App() {
  const [value, setValue] = useState(new Date('2024-5-1'));

  return <Calendar value={value} onChange={(date) => {
    console.log(date.toLocaleDateString());
    setValue(date);
  }}/>
  // return <Calendar defaultValue={new Date('2024-5-1')} onChange={(date) => {
  //   console.log(date.toLocaleDateString());
  // }}/>
}

export default App
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ba526f7f22e4354be1b383ef4d5f699~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1114&h=1162&s=211245&e=png&b=1f1f1f)

这里把 onChange 传入了，然后 setState 的时候拿到新的状态值，如果是非受控模式就 setStateValue，然后调用 onChange。

用的时候就不用区分受控非受控了，直接 setState 就行：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14b0ce55b2df415b93a504bb28e19304~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1126&h=714&s=148166&e=png&b=1f1f1f)

试试效果：

非受控模式：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/459c2177c2db44e48a2417f9a5c6be60~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1190&h=280&s=52422&e=png&b=1f1f1f)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/095da794a8ae424484bbb26f95360f40~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=778&s=100027&e=gif&f=21&b=fdfdfd)

受控模式：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d75265a6e4c49fab7f87940845d3183~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=904&h=334&s=59645&e=png&b=1f1f1f)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/095da794a8ae424484bbb26f95360f40~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=778&s=100027&e=gif&f=21&b=fdfdfd)

完美！

这样，我们的组件就同时支持了受控模式和非受控模式。

平时写组件，你想同时支持受控和非受控，可以像这样自己封装一个 hook，也可以直接用 ahooks 的 useControllableValue，实现逻辑是一样的。

案例代码上传了 react 小册仓库：https://github.com/QuarkGluonPlasma/react-course-code/tree/main/controlled-and-uncontrolled

## 总结

涉及到用户输入的组件都要考虑用受控模式还是非受控模式。

**value 由用户控制就是非受控模式，由代码控制就是受控模式**。

非受控模式就是完全用户自己修改 value，我们只是设置个 defaultValue，可以通过 onChange 或者 ref 拿到表单值。

受控模式是代码来控制 value，用户输入之后通过 onChange 拿到值然后 setValue，触发重新渲染。

单独用的组件，绝大多数情况下，用非受控模式就好了，因为你只是想获取到用户的输入。

受控模式只在需要对用户的输入做一些修改然后再设置到 value 的情况用，再就是实时同步表单值到父组件的时候，比如 Form。

如果需要结合 Form 表单用，那是要支持受控模式，因为 Form 会通过 Store 来统一管理所有表单项。

封装业务组件的话，用非受控模式或者受控都行。

有的团队就要求组件一定是受控的，然后在父组件里维护状态并同步到状态管理库，这样组件重新渲染也不会丢失数据。

但是基础组件还是都要支持，也就是支持 defaultValue 和 value + onChange 两种参数，内部通过判断 value 是不是 undefined 来区分。

写组件想同时支持受控和非受控，可以直接用 ahooks 的 useControllableValue，也可以自己实现。

arco design、ant design 等组件库都是这么做的，并且不约而同封装了 useMergedValue 的 hook，我们也封装了一个。

理清受控模式和非受控模式的区别，在写组件的时候灵活选用或者都支持。
