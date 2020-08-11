import React from 'react';
import axios from 'axios'


import './retMsg.css'
import './myForm.css'
import Tasks from './Tasks';

class RetMsg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: '',
            container_name: '',
            host: '',
            username: '',
        }
        this.handleFreeBtnChange = this.handleFreeBtnChange.bind(this)
        // this.handleResBtnClick = this.handleResBtnClick.bind(this)
    }
    handleFreeBtnChange() {
        let url = 'http://10.141.221.85:8102/task/free' + '?task=' + this.state.container_name
        axios.get(url, {
            method: 'GET',
            headers: { "Content-type": "application/json" },
        })
        var path = {
            pathname: '/thanks',
            username: this.state.username,
        }
        this.props.history.push(
            path
        )
    }
    // handleResBtnClick() {
    //     console.log('aaaaaa')
    //     let url = 'http://10.141.221.85:8102/file/download' + '?container_name=' + this.state.container_name
    //     fetch(url).then(res => res.blob().then(blob => {
    //         let a = document.createElement('a')
    //         let url = window.URL.createObjectURL(blob)
    //         let filename = res.headers.get('Content-Disposition')
    //         if (filename) {
    //             a.href = url
    //             a.download = filename
    //             a.click()
    //             window.URL.revokeObjectURL(url)
    //             a = null
    //         }
    //     }))
    // }
    componentWillMount() {
        console.log(this.props)
        let username = this.props.location.username != undefined ? this.props.location.username : ''
        this.setState({
            username: username,
        })
        if (this.props.location.message != undefined) {
            let status = this.props.location.message.Status != undefined ? this.props.location.message.Status : ''
            let host = this.props.location.message.Host != undefined ? this.props.location.message.Host : ''
            let container_name = this.props.location.message.Container_name != undefined ? this.props.location.message.Container_name : ''
            this.setState({
                status: status,
                container_name: container_name,
                host: host,
            })
        }
        
    }
    render() {
        console.log(this.props)
        let download_url = "http://10.141.221.85:8102/file/download?container_name=" + this.state.container_name
        console.log(download_url)
        return (
            // this.props.location.message != undefined &&
            <div>
                <div>
                    <div class='toptip'><strong><i>{this.state.username}</i></strong>,您的容器信息如下：</div>
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
                    <form method='post' action={download_url}>
                        <input class="button white" type="button" value="释放资源" onClick={this.handleFreeBtnChange}></input>
                        <input class="button white" type="submit" value="获取结果"></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default RetMsg;
