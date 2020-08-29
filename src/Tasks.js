import React from 'react';
import axios from 'axios'
import cookie from 'react-cookies'


import './Tasks.css'

class Tasks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            tasks1 : [
                ['aaa','bbbb'],['ccc','ddd'],['eee','ffff'],
            ],
            tasks_up : [],
            tasks_down : [],
            tasks_up0 : [
                {
                  'task_name' : 'aaaaaaaaaaaaaaaaa',
                  'start_time' : '2020/08/10 12:12:12',
                  'status' : 'up',
                  'memory' : '2GB',
                  'disk' : '10GB', 
                  'end_time' : ''
                },
                {
                    'task_name' : 'bbdsdb',
                    'start_time' : '2021',
                    'status' : 'up',
                    'memory' : '1GB',
                    'disk' : '15GB', 
                    'end_time' : ''
                  },
                  {
                    'task_name' : 'ccc',
                    'start_time' : '2022',
                    'status' : 'up',
                    'memory' : '4GB',
                    'disk' : '20GB', 
                    'end_time' : '2022/08/11 12:12:12'
                  },
            ],
            tasks_down0 : [
                {
                    'task_name' : 'upsnail1',
                    'start_time' : '2022',
                    'status' : 'down',
                    'memory' : '4GB',
                    'disk' : '20GB', 
                    'end_time' : '2022/08/11 12:12:12'
                  },
                  {
                    'task_name' : 'upsnail2',
                    'start_time' : '2022',
                    'status' : 'down',
                    'memory' : '4GB',
                    'disk' : '20GB', 
                    'end_time' : '2022/08/11 12:12:12'
                  },
                {
                  'task_name' : 'aaaaaaaaaaaaaaaaa',
                  'start_time' : '2020/08/10 12:12:12',
                  'status' : 'down',
                  'memory' : '2GB',
                  'disk' : '10GB', 
                  'end_time' : ''
                },
                {
                    'task_name' : 'bbdsdb',
                    'start_time' : '2021',
                    'status' : 'down',
                    'memory' : '1GB',
                    'disk' : '15GB', 
                    'end_time' : ''
                  },
                  {
                    'task_name' : 'ccc',
                    'start_time' : '2022',
                    'status' : 'down',
                    'memory' : '4GB',
                    'disk' : '20GB', 
                    'end_time' : '2022/08/11 12:12:12'
                  },
            ],
        }
        this.handleAddTaskClick = this.handleAddTaskClick.bind(this);
        this.handleDetailsClick = this.handleDetailsClick.bind(this);
    }

    componentWillMount() {
//         if (this.props.location != undefined) {
// console.log(this.props.location.username)
//         let username = this.props.location.username != undefined ? this.props.location.username : ''
//         this.setState({
//             username: username,
//         })
//         }
        this.setState({
            username : cookie.load('username')
        })
        let t = this
        let url = "http://10.176.34.85:8102/tasks" + "?username=" + cookie.load('username') + "&status=up" 
        axios.get(url).then(
            function (data) {
                console.log(url)
                console.log(data);
                t.setState({
                    tasks_up: data.data.Data
                });
            }
        );
        url = "http://10.176.34.85:8102/tasks" + "?username=" + cookie.load('username') + "&status=down" 
        axios.get(url).then(
            function (data) {
                console.log(data);
                t.setState({
                    tasks_down: data.data.Data
                });
            }
        );
    }

    handleAddTaskClick() {
        var path = {
            pathname: '/apply',
            username: this.state.username,
        }
        this.props.history.push(
            path
        )
    }

    handleDetailsClick() {
        console.log('aaaa')
        var path = {
            pathname: '/details',
        }
        this.props.history.push(
            path
        )
    }

    render() {
        console.log(this.state.tasks1)
        const self = this
        return (
            <div>
                <div class='toptip'><strong><i>{this.state.username}</i></strong>,所有正在运行的任务信息如下：</div>
                <table>
                    <tbody>
                        <tr>
                            <td>index</td>
                            <td>Task Name</td>
                            <td>Start Time</td>
                            <td>Status</td>
                            <td>Memory Size</td>
                            <td>Disk Size</td>
                            <td ><input class="button white" type="button" value="新增任务" onClick={this.handleAddTaskClick}></input></td>
                        </tr>
                        {
                            this.state.tasks_up.map(function(row,index) {
                                return (<tr key={row.id}>
                                    <td>{index + 1}</td>
                                    <td>{row.task_name}</td>
                                    <td>{row.start_time}</td>
                                    <td>{row.status}</td>
                                    <td>{row.memory}</td>
                                    <td>{row.disk}</td>
                                    <td><input class="button white" type="button" value="详情" onClick={self.handleDetailsClick}></input></td>
                                    <td><input class="button white" type="button" value="暂停" ></input></td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>

                <div class='toptip'><strong><i>{this.state.username}</i></strong>,所有已经结束的任务信息如下：</div>
                <table>
                    <tbody>
                        <tr>
                            <td>index</td>
                            <td>Task Name</td>
                            <td>Start Time</td>
                            <td>Status</td>
                            <td>Memory Size</td>
                            <td>Disk Size</td>
                            <td>End Time</td>
                        </tr>
                        {
                            this.state.tasks_down.map(function(row,index) {
                                return (<tr key={row.id}>
                                    <td>{index + 1}</td>
                                    <td>{row.task_name}</td>
                                    <td>{row.start_time}</td>
                                    <td>{row.status}</td>
                                    <td>{row.memory}</td>
                                    <td>{row.disk}</td>
                                    <td>{row.end_time}</td>
                                    <td><input class="button white" type="button" value="详情"></input></td>
                                    <td><input class="button white" type="button" value="移除"></input></td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                <br />
            </div>
        )
    }
}


export default Tasks;