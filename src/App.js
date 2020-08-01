import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
              pop_repos: [],
              requirements: []
    }
    this.handleChange = this.handleChange.bind(this);
}

componentWillMount(){
      let t = this;
      fetch("/data", {method: 'GET'}).then(
        function (res) {
            // console.log(res);
            res.json().then(function (data) {
                    console.log(data);
                    t.setState({
                      requirements:data
                    });
                }
            )
        });
      fetch("/data", {method: 'GET'}).then(
          function (res) {
              // console.log(res);
              res.json().then(function (data) {
                      console.log(data);
                      t.setState({
                        pop_repos:data
                      });
                  }
              )
          });
}
handleChange(event) {
    let item = event.target.value;
    let items = this.state.value.slice();
    let index = items.indexOf(item);
    index === -1 ? items.push(item) : items.splice(index, 1);
    this.setState({value: items});
}
handelSubmit(event) {
  // 一点提交就会刷新，阻止submit事件
  event.preventDefault();
  console.log(event.target.value)
}

// form css 样式
formLayout = {
  width: 400,
  marginTop: 100,
  marginLeft: 'auto',
  marginRight: 'auto'
}

render() {
  let requirements_list = this.state.requirements.map((item,index)=>{
    return (
    <label><input type="checkbox" index={index}/>{item.label}<br/></label>
  )})
    let popular_repos_list = this.state.pop_repos.map((item,index)=>{
      return (
      <label><input type="checkbox" index={index}/>{item.url}/{item.branch}<br/></label>
    )})
    return (
            <div>
              <Form onSubmit={this.handleSubmit} style={formLayout}>
              预置环境：<br/>
              {requirements_list}
                最流行的一些项目：<br/>
                {popular_repos_list}
                <input type="submit" value="确认申请"></input>
              </Form>
            </div>
    )
}

}

export default App;
