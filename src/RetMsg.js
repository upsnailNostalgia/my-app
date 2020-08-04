import React from 'react';

import './retMsg.css'
import './myForm.css'

class RetMsg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: '',
            container_name: '',
            host: '',
        }
        this.handleFreeBtnChange = this.handleFreeBtnChange.bind(this)
    }
    handleFreeBtnChange() {
        var path = {
            pathname: '/thanks',
          }
          this.props.history.push(
            path
          )
    }
    componentWillMount() {
        console.log(this.props)
        let status = this.props.location.message.Status != undefined ? this.props.location.message.Status : ''
        let host = this.props.location.message.Host!= undefined ? this.props.location.message.Host : ''
        let container_name = this.props.location.message.Container_name!= undefined ? this.props.location.message.Container_name : ''
        this.setState({
            status : status,
            container_name : container_name,
            host : host,
        })
    }
    render() {
        console.log(this.props)
        return (
            // this.props.location.message != undefined &&
            <div>
                <table>
                    <tbody>
                        <tr align="center">
                            <td>Status:</td>
                            <td>{this.state.status} </td>
                        </tr>
                        <tr align="center">
                            <td>Container name:</td>
                            <td>{this.state.container_name}</td>
                        </tr>
                        <tr align="center">
                            <td>Host:</td>
                            <td>{this.state.host} </td>
                        </tr>
                    </tbody>
                </table>
                <input class="button white" type="button" value="释放资源" onClick={this.handleFreeBtnChange}></input>
                <input class="button white" type="button" value="退出登录"></input>
            </div>
        )
    }
}

export default RetMsg;
