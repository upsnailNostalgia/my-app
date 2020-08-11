import React from 'react';
import axios from 'axios'
import cookie from 'react-cookies'

import './myLogin.css';


class MyLogin extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        username: '',
        password: '',
      }
      this.handlebtnClick = this.handlebtnClick.bind(this)
      this.handleUsernameChange = this.handleUsernameChange.bind(this)
      this.handPasswordChange = this.handPasswordChange.bind(this)
    }
  
    handlebtnClick(event) {
      console.log(this.state.username)
      console.log(this.state.password)
      cookie.save('username',this.state.username)
      event.preventDefault();
      let url = 'http://10.141.221.85:8102/user/valid' + 
                '?username=' + this.state.username + '&password=' + this.state.password
      // axios.get(url, {
      //   method: 'GET',
      //   headers: { "Content-type": "application/json" },
      // }).then(data => {
      //   console.log(data)
      //   console.log(data.data)
      //   this.setState(
      //     {
      //       message: data.data,
      //       isActive: true,
      //     }
      //   )
      //   let myMsg = data.data
      //   console.log(myMsg)
      //   var path = {
      //     pathname: '/tasks',
      //     message: myMsg,
      //     username: this.state.username
      //   }
      //   this.props.history.push(
      //     path
      //   )
      // })

      var path = {
        pathname: '/tasks',
        username: this.state.username
      }
      this.props.history.push(
        path
      )
    }
  
    handleUsernameChange(event) {
      this.setState(
        {
          username: event.target.value,
        }
      )
      console.log(this.state.username)
    }
  
    handPasswordChange(event) {
      this.setState(
        {
          password: event.target.value,
        }
      )
      console.log(this.state.password)
    }
  
    render() {
      return (
        <div id="formwrapper">
          <form action="" method="post" name="apLogin" id="apLogin">
            <fieldset>
              <legend>用户登录</legend>
              <div>
                <label for="Name">用户名</label>
                <input type="text" name="Name" id="Name" size="18" maxlength="30" onChange={this.handleUsernameChange} />
                <br />
              </div>
              <div>
                <label for="password">密码</label>
                <input type="password" name="password" id="password" size="18" maxlength="30" onChange={this.handPasswordChange} />
                <br />
              </div>
              <div class="cookiechk">
                <label>
                  <input type="checkbox" name="CookieYN" id="CookieYN" value="1" />
                  <a href="#" title="选择是否记录您的信息">记住我</a></label>
                <input name="login791" type="submit" class="buttom" value="登录" onClick={this.handlebtnClick} />
              </div>
              <div class="forgotpass"><a href="#">忘记密码?</a></div>
            </fieldset>
          </form>
        </div>
      )
    }
  }

export default MyLogin;
