
## 管理后台


### 学习React16.8Hook新特性，重构ManagerSystem项目

### 1、使用create-react-app脚手架创建manager-hook项目
```cmd
# create-react-app manager-hook
```

### 2、使用npm包管理工具，安装antd
```cmd
# npm i antd --save-dev
```
### 3、配置antd组件的样式
- 安装babel-plugin-import按需加载组件代码和样式的 babel 插件
```cmd
# npm i babel-plugin-import
```
- 使用npm run eject命令将所有配置暴漏出来
```cmd
# npm run eject
```
- 修改webpack.config.js配置
```javascript
['import', {
  libraryName: 'antd',
  style: 'css'
}],
```

![1568869009929](https://github.com/caicaijun007/xiaocaicai07.github.io/blob/master/1568869009929.jpg)

### 4、安装css预处理
- 安装less、less-loader
```cmd
# npm i less less-loader --save-dev
```
- 修改webpack.config.js配置
```javascript
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

{
    test: lessRegex,
    exclude: lessModuleRegex,
    use: getStyleLoaders(
    {
        importLoaders: 3,
        sourceMap: isEnvProduction && shouldUseSourceMap,
    },
    'less-loader'
    ),
	sideEffects: true,
},
{
    test: lessModuleRegex,
    use: getStyleLoaders(
    {
        importLoaders: 3,
        sourceMap: isEnvProduction && shouldUseSourceMap,
        modules: true,
        getLocalIdent: getCSSModuleLocalIdent,
    },
    'less-loader'
    ),
},
```
![1568869009930](https://github.com/caicaijun007/xiaocaicai07.github.io/blob/master/1568869009930.jpg)
![1568869009931](https://github.com/caicaijun007/xiaocaicai07.github.io/blob/master/1568869009931.jpg)

### 5、目录结构
开发源代码在src目录下进行：
- components		      基础组件、公共组件
	- BaseLayout		 基本页
	- Content		 	  内容
	- Footer				  底部
	- Header			    头部
	- MenuSider		 菜单栏
	- Login			       登录页
	- Register		      注册页
- configs		               配置文件
- pages			             路由组件
- utils			                公共方法

### 6、基本页
- 使用useState等同于state、setState

### 7、菜单栏
- 在configs配置目录新建路由配置文件
- 菜单配置文件递归
- 路由跳转
```cmd
# npm i react-router-dom --save-dev
```
### 8、权限设置
- 安装axios，封装ajax异步请求接口
```cmd
# npm i axios --save-dev
```
- 角色权限涉及到封装的、抽离的组件
	- 查询组件
	- table组件
	- 分页组件
	- 创建角色模态框组件
	- 设置角色权限模态框组件

- 用户权限涉及到封装的、抽离的组件
	- 查询组件
	- table组件
	- 分页组件
	- 创建用户模态框组件
	- 设置用户权限模态框组件


### 问题总结：
- useEffect调用ajax异步请求角色列表，需要清除的effect（副作用）
	- 条件判断
	- 参数限制
	- 方法调用
```javascript
//条件判断：
let [dataSource, setDataSource] = useState([]);
useEffect(() => {
    if (dataSource.length === 0) {//根据自己业务逻辑加条件判断
    	request();
    }
});
//参数限制
let [roleList, setRoleList] = useState([]);
useEffect(() => getRoleList(), []); 
//或
useEffect(() => getRoleList(), [roleList]);
//方法调用
useEffect(() => {
	request();
	return () => {
		//清理逻辑
	}
}
```
- 获取子组件form表单数据
	- 之前使用wrappedComponentRef获取不到子组件的属性与方法，
	- 使用useRef、forwardRef、useImperativeHandle获取得到子组件暴露的属性与方法，但是console会报红色警告，大概意思是你应该使用wrappedComponentRef，不应该使用useRef（what? 我刚从“wrappedComponentRef”那过来。。。）
	- 使用wrappedComponentRef、forwardRef、useImperativeHandle就可以了
```javascript
//子组件
import React, { forwardRef, useImperativeHandle } from 'react';
//...省略代码
function RoleForm(props, ref) {
	useImperativeHandle(ref, () => {
        //暴露子组件的参数与方法
        return props.form;
    })
    //...省略代码
}
export default Form.create()(forwardRef(RoleForm));
//父组件
//引用子组件时使用wrappedComponentRef获取子组件暴露的属性或方法
```

### 9、登录页其、注册页
- 安装md5，登录注册传给后端密码需要加密，后端再加密再验证
```cmd
# npm i md5 --save-dev
```
- 安装百度echarts插件
```cmd
# npm i echarts echarts-for-react --save-dev
```

### 问题总结：
- 未登录进行路由跳转（hash路由地址跳转问题）
```javascript
自定义校验路由(除了登陆、注册以外)：判断是否登录，登录就渲染对应组件，否则跳转至登录
<Route path={path} render={() => isLogin ? <AuthComponent /> : <Redirect to='/login' />} />
```
### 10、其它功能页
- 使用createContext、 useReducer、useContext实现redux的状态共享机制
```javascript
//关于redux相关不详细描述，直接贴代码；
//actionCreater.js
import { ADD_MESSAGE_OPTION, DELETE_MESSAGE_OPTION } from './actionType';

export function addMessageOption(message) {
    return {
        type: ADD_MESSAGE_OPTION,
        message
    }
}

export function deleteMessageOption(index) {
    return {
        type: DELETE_MESSAGE_OPTION,
        index
    }
}

//actionType.js
export const ADD_MESSAGE_OPTION = 'add_message_option';
export const DELETE_MESSAGE_OPTION = 'delete_message_option';

//reducer.js
import { ADD_MESSAGE_OPTION, DELETE_MESSAGE_OPTION } from './actionType';

export const defaultState = localStorage.getItem('_itemlist') ? JSON.parse(localStorage.getItem('_itemlist')) : ['学习react', 'hook新特性'];

export default function (state = defaultState, action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case ADD_MESSAGE_OPTION:
            newState.push(action.message);
            return [...newState];
        case DELETE_MESSAGE_OPTION:
            newState.splice(action.index, 1);
            return [...newState];
        default:
            return state;
    }
}

//下面具体实现
//根组件 todoList.js
import {createContext, useReducer} from 'react';
import Reducer, { defaultState } from '../../store/reducer';
import { addMessageOption, deleteMessageOption } from '../../store/actionCreater';
import ReduxPage from './redux'; //引入‘同目录下’的子组件

//导出上下文
export const Message = createContext({});

//使用useReducer
const [state, dispatch] = useReducer(Reducer, defaultState);

//引用上下文，传递state、dispatch
<Message.Provider value={{ state, dispatch }}>
	...
	<ReduxPage />
</Message.Provider>

//子组件 redux.js
import { useContext } from 'react';
import { Message } from './todoList'; //导入上下文
import { addMessageOption } from '../../store/actionCreater';

//引用根组件的上下文
const { state, dispatch } = useContext(Message);

//修改根组件的内容
dispatch(addMessageOption('默认信息'));

//共享根组件的state
console.log(state);
```

### 问题总结：
- 使用useReducer时，注意子组件是要嵌套到根组件里面，否则实现不了状态共享，你可以尝试下

### 效果展示
![manager_hook](https://github.com/caicaijun007/xiaocaicai07.github.io/blob/master/manager_hook.gif)