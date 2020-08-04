import React from 'react';
import axios from 'axios'

import './myForm.css';


class MyForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pop_repos: [],
            requirements: [
                { "label": "java7以下（包括7）" },
                { "label": "java8" },
                { "label": "python2" },
                { "label": "python3" },
                { "label": "git" },
                { "label": "nginx" }
            ],
            ram_size: 0,
            disk_size: 0,
            selected_requirements: [],
            selected_repos: [],
            message: [],
            isActive: true,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRamChange = this.handleRamChange.bind(this);
        this.handleDiskChange = this.handleDiskChange.bind(this);
        this.handleRqmtsChange = this.handleRqmtsChange.bind(this)
        this.handlePopReposChange = this.handlePopReposChange.bind(this)
        this.handlebtnClick = this.handlebtnClick.bind(this)
    }

    componentWillMount() {
        console.log(this.props.location.username)
        let username = this.props.location.username != undefined ? this.props.location.username : ''
        this.setState({
            username: username,
        })
        let t = this
        let url = "http://10.141.221.85:8102/repo" + "?nums=20"
        axios.get(url).then(
            function (data) {
                console.log(data);
                t.setState({
                    pop_repos: data.data.Data
                });
            }
        );
    }

    handleChange(event) {
        let item = event.target.value;
        let items = this.state.value.slice();
        let index = items.indexOf(item);
        index === -1 ? items.push(item) : items.splice(index, 1);
        this.setState({ value: items });
    }
    handleRamChange(event) {
        this.setState(
            { ram_size: event.target.value }
        )
    }
    handleDiskChange(event) {
        this.setState(
            { disk_size: event.target.value }
        )
    }
    handleRqmtsChange(event) {
        let pre_rqmts = this.state.selected_requirements
        pre_rqmts.push(event.target.value)
        this.setState(
            { selected_requirements: pre_rqmts }
        )
        console.log(pre_rqmts)
    }
    handlePopReposChange(event) {
        let pre_poprepos = this.state.selected_repos
        pre_poprepos.push(event.target.value)
        this.setState(
            { selected_repos: pre_poprepos }
        )
        console.log(pre_poprepos)
    }
    handlebtnClick(event) {
        event.preventDefault();

        let ram_size = this.state.ram_size
        let disk_size = this.state.disk_size
        let selected_requirements = this.state.selected_requirements
        let selected_repos = this.state.selected_repos
        let username = this.state.username

        let url = 'http://10.141.221.85:8102/task/allocate' + '?username=' + username +  '&ram_size=' + ram_size
                    + '&disk_size=' + disk_size + '&selected_requirements=' + selected_requirements
                    + '&repo_git_list=' + selected_repos
        let myMsg = []
        console.log(url)
        axios.get(url, {
            method: 'GET',
            headers: { "Content-type": "application/json" },
        }).then(data => {
            console.log(data)
            console.log(data.data)
            this.setState(
                {
                    message: data.data,
                }
            )
            myMsg = data.data
            console.log(myMsg)
            var path = {
                pathname: '/free',
                message: myMsg,
            }
            this.props.history.push(
                path
            )
        })
    }
    
    render() {
        console.log(this.props)
        let requirements_list = this.state.requirements.map((item, index) => {
            return (
                <label>
                    <input type="checkbox" index={index} value={item.label} onClick={this.handleRqmtsChange} />
                    <div>
                        {item.label}
                    </div>
                </label>
            )
        })
        console.log(this.state.pop_repos)
        let popular_repos_list = this.state.pop_repos.map((item, index) => {
            return (
                <label class='poprepos'>
                    <input type="checkbox" index={index} value={item.uuid} onClick={this.handlePopReposChange} />
                    <div>
                        <strong><i>url:</i></strong>&nbsp;{item.url} &nbsp; &nbsp; &nbsp; &nbsp; <strong><i>branch:</i></strong>&nbsp;{item.branch}
                    </div>
                </label>
            )
        })
        
        return (
            <div class='myform'>
                <form>
                    <label>欢迎登陆，<strong><i>{this.state.username}</i></strong></label>
                    <div class="selectdiv">
                        <label>内存预估：</label>
                        <select class="selectOption" onChange={this.handleRamChange}>
                            <option value="1">1GB及以下</option>
                            <option value="2">2GB</option>
                            <option value="4">4GB</option>
                            <option value="8">8GB</option>
                            <option value="8以上">8GB以上</option>
                        </select>
                    </div><br />
                    <div class="selectdiv">
                        <label>存储预估：</label>
                        <select class="selectOption" onChange={this.handleDiskChange}>
                            <option value="5">5GB及以下</option>
                            <option value="10">10GB</option>
                            <option value="20">20GB</option>
                            <option value="50">50GB</option>
                            <option value="50以上">50GB以上</option>
                        </select>
                    </div><br />

                    <div class="label_box">
                        <label class="selectdiv">
                            请勾选您想要的<strong><i>预置环境：</i></strong>
                        </label>
                        {requirements_list}
                    </div>
                    <br /><br />

                    <div class="label_box">
                        <label class="selectdiv">
                            请勾选您想要的<strong><i>项目Git库：</i></strong><br />
                            <strong><i>最流行的一些项目如下：</i></strong>
                        </label>
                        {popular_repos_list}
                    </div>
                    <div class="label_box">
                        <label class="selectdiv">
                            <strong><i>请添加想要的项目Git库：</i></strong>
                        </label>
                        <div class='addRepo'>
                            <div class='form-group'>
                                <input required="required" class="form-control"></input>
                                <label class="form-label">请输入url：</label>
                            </div>
                            <div class='form-group'>
                                <input required="required" class="form-control"></input>
                                <label class="form-label">请输入branch：</label>
                            </div>
                            <div >
                                <input class="button white" type="button" value="添加" >
                                </input>
                            </div>
                        </div>

                    </div>

                    <div class="label_box">
                        <label class="selectdiv">
                            <strong><i>请添加想要的项目某个快照版本：</i></strong>
                        </label>
                        <div class='addRepo'>
                            <div class='form-group'>
                                <input required="required" class="form-control"></input>
                                <label class="form-label">请输入url：</label>
                            </div>
                            <div class='form-group'>
                                <input required="required" class="form-control"></input>
                                <label class="form-label">请输入branch：</label>
                            </div>
                            <div class='form-group'>
                                <input required="required" class="form-control"></input>
                                <label class="form-label">请输入commit：</label>
                            </div>
                            <div >
                                <input class="button white" type="button" value="添加" id='snapshotRepos'>
                                </input>
                            </div>
                        </div>
                    </div>
                    <div class="label_box">
                        <label class="selectdiv">
                            <strong><i>请添加想要的项目文件：</i></strong>
                        </label>
                        <div class='addRepo'>
                            <div class='form-group'>
                                <input required="required" class="form-control"></input>
                                <label class="form-label">请输入url：</label>
                            </div>
                            <div class='form-group'>
                                <input required="required" class="form-control"></input>
                                <label class="form-label">请输入branch：</label>
                            </div>
                            <div class='form-group'>
                                <input required="required" class="form-control"></input>
                                <label class="form-label">请输入commit：</label>
                            </div>
                            <div class='form-group'>
                                <input required="required" class="form-control"></input>
                                <label class="form-label">请输入文件夹目录：</label>
                            </div>
                            <div >
                                <input class="button white" type="button" value="添加" id='snapshotRepos'>
                                </input>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input class="button white" type="button" value="确认申请" onClick={this.handlebtnClick}></input>
                        <input class="button white" type="button" value="重新填写"></input>
                        <input class="button white" type="button" value="退出登录"></input>
                    </div>

                </form>
            </div>
        )
    }
}

export default MyForm;