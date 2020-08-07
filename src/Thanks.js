import React from 'react';

import './thanks.css'

class Thanks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username : '',
        }
        this.handleApplyClick = this.handleApplyClick.bind(this)
    }

    componentWillMount() {
        console.log(this.props)
        let username = this.props.location.username != undefined ? this.props.location.username : ''
        this.setState({
            username: username,
        })
    }

    handleApplyClick() {
        var path = {
            pathname: '/apply',
            username: this.state.username,
          }
          this.props.history.push(
            path
          )
    }
    
    render() {
        return (
            <div class='thanksdiv'>
                <strong><i>{this.state.username}</i></strong>,<h1>感谢您的使用,资源释放成功！</h1>
                <br/><br/><br/><br/>
                <input class="button white" type="button" value="再次申请" onClick={this.handleApplyClick}></input>
            </div>
        )
    }
}

export default Thanks;
