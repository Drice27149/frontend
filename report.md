## 项目小结

* 个人贡献

  参与了前端页面的编写, 使用的是[react](https://reactjs.org/)。

*  前端项目结构

  ```shell
  │  app.js
  │  home.js
  │  index.js
  │  login.js
  │  profile.js
  │  signup.js
  │
  ├─components
  │  ├─comment
  │  │      comment.css
  │  │      comment.js
  │  │
  │  ├─content
  │  │      content.css
  │  │      content.js
  │  │
  │  └─user
  │          user.css
  │          user.js
  │
  └─css
          app.css
          home.css
          profile.css
  ```

  ```index.js```负责页面路由, 有登录页```login.js```, 注册页```signup.js```, 主页(需要登陆)```app.js```三个主页面。

  在```app.js```中进一步路由, 根据不同的url参数加载广场内容```home.js```或者用户个人信息```profile.js```。

  ```user.js, content.js, comment.js```中分别实现了展示用户信息, 发布内容, 评论的组件。

* 知识点

  *  页面路由

    使用了[React Router](https://reactrouter.com/web/guides/quick-start), 下面是一个简单的例子: 根据url决定显示登录页面, 注册页面或者主页。

    ```javascript
    class Routes extends React.Component {
        render() {
            return (
               <Router>
                  <div>
                    <Switch>
                      <Route path="/login">
                        <Login />
                      </Route>
                      <Route path="/signup">
                        <SignUp />
                      </Route>
                      <Route path="/">
                        <App />
                      </Route>
                    </Switch>
                  </div>
               </Router>
            )
        }
    }
    ```

    包含url参数的路由例子:

    ```javascript
    // 路由形如/status/{contentID}的url
    <Route path="/status/:contentID" component={Status}/>
    ...
    // 在Status组件中, 可以通过以下方式获得contentID
    const { contentID } = this.props.match.params;
    ```

  *  访问网络

    主要使用了```fetch()```方法来从后端获取网络资源, 一个基本的登录请求如下所示: 

    ```javascript
        handleSubmit(event) {
            event.preventDefault();
            fetch(url + '/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
            .then((response) => (response.json()))
            .then((info) => {
                if(info.status === 'succeed') {
                    window.localStorage['token'] = info.token;
                    window.location.replace('/')
                }
                else {
                    console.log('login failed');
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    ```

  *  组件的动态更新

    在加载显示网络信息时, 经常会出现组件已经渲染到页面上, 但要显示的数据还没从网络上拉取到本地的情况。这种时候需要暂时在组件上显示loading的信息, 等待数据拉取成功后再重新渲染组件。下面选取了```app.js```的片段作为例子:

    ```javascript
    export class App extends React.Component {
        
        constructor(props) {
            super(props);
            this.state = {
                username: null
            };
            this.FetchData();
        }
        
        FetchData(){
            const token = window.localStorage['token'];
            fetch(url + '/user', {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            })
            .then((response) => (response.json()))
            .then((info) => {
                console.log(info);
                this.setState({
                    username: info.username
                });
            })
            .catch((error) => {
                console.log(error);
            });
        }
        
        ...
        
        render() {
            if(this.state.username!=null){
                return (
               		// profile base on username
                    ... 
                )
            }
            else{
                return (
                    // still fetching data, display loading
                    ... 
                )
            }
        }
    }
    
    ```

    可以看到, 在App组件中, 当它被构造时就调用了```FetchData()```方法拉取用户的信息, 在拉取完成之前, 显示的都是loading; 在拉去成功之后, 通过```this.setState(newState)```方法通知组件状态的改变, 并重新进行```render```，这一次用户的信息就渲染到页面上了。

  *  父组件向子组件传递信息

    父组件在创建子组件是, 可以通过 ```data={xxx}```的方式传递信息, 子组件中通过```this.props.data```获取信息, 这里参数的名称可以自定义。合理地传递信息可以避免在子组件中多次从网络上拉取数据, 仅在父组件中进行一次拉取, 然后分配到子组件中进行渲染展示。下面是一个简单的例子:

    ```javascript
    class Parent extends React.Component {
    	render () {
           	return(
              <div>
                <Child data={this.someData} />
              </div>
            );
        }
    }
    
    class Child extends React.Component {
        render() {
            return (
              <div>{this.props.data}</div>
            );
        }
    }
    ```

  *  子组件调用父组件的回调函数

    当子组件中进行了会改变父组件内容的操作时, 子组件需要及时通知父组件进行重新渲染, 一个可选的方法就是调用父组件的回调函数。这种场景并不少见, 比如当删除一条评论之后, 整一个评论列表的布局都要进行更新。实现并不复杂, 父组件只要把回调函数作为参数传入子组件, 再在子组件中调用即可, 一个例子如下:

    ```javascript
    class Parent extends React.Component {
        construtor(props) {
            super(props);
            this.callbackFun = this.callbackFun.bind(this);
        }
        
        callbackFun() {
            // implement logic here
            ...
        }
        
    	render () {
           	return(
              <div>
                <Child parentFun={this.callbackFun} />
              </div>
            );
        }
    }
    
    class Child extends React.Component {
        render() {
            return (
              <button onClick={() => {
                this.props.parentFun(); // call callbackFun() in Parent
              }}>
                 callParentFun
    		  </button>   
    		 );
        }
    }
    
    ```

    