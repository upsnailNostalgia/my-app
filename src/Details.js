/**
 * 折线图
 */
import React from 'react';
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react';
import cookie from 'react-cookies'

import './details.css';

class Details extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            memory: [3.1, 2.8, 4.5, 6.0, 7.2, 7.5],
            disk: [15, 12, 36, 40, 11, 20],
            cpu: [10, 23, 35, 27, 19, 26, 31],
            gpu: [11, 25, 26, 31, 35, 26, 24],
            memeoryAXios: [1, 5, 10, 15, 20, 25],
            diskAXios: [1, 5, 10, 15, 20, 25],
        }
        this.handleReturnbtnClick = this.handleReturnbtnClick.bind(this);
    }

    componentWillMount() {
        this.setState({
            username: cookie.load('username')
        })
    }

    handleReturnbtnClick() {
        console.log('aaaa')
        var path = {
            pathname: '/tasks',
        }
        this.props.history.push(
            path
        )
    }
    /**
     * 折线图的配置对象
     */
    getOption = (resource, name, yAxiosName) => {
        return {
            title: {
                text: name + '使用情况'
            },
            tooltip: {},
            legend: {
                data: [resource]
            },
            xAxis: {
                data: [5, 10, 15, 20, 25, 30],
                // axisLabel:{formatter: '{value} %'}
                name: 'mins ago'
            },
            yAxis: {
                name: yAxiosName,
            },
            series: [{
                name: '内存大小',
                type: 'line',
                data: resource
            },]
        };
    }
    render() {
        const self = this
        return (
            <div class='details'>
                <div class='toptip'>
                    <strong><i>{this.state.username}</i></strong>,当前任务的资源使用情况如下：
                </div>
                <div>
                    <input class="button white" type="button" value="返回" id='returnBtn' onClick={this.handleReturnbtnClick}>
                    </input>
                </div>
                <Card>
                    <ReactEcharts option={self.getOption(self.state.memory, '内存', 'GB')} />
                    <ReactEcharts option={self.getOption(self.state.disk, '磁盘存储', 'GB')} />
                    <ReactEcharts option={self.getOption(self.state.cpu, 'CPU', '%')} />
                    <ReactEcharts option={self.getOption(self.state.gpu, 'GPU', '%')} />
                </Card>
            </div>
        )
    }

}

export default Details;
