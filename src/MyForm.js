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
                { "label": "nginx" },
                { "label": "centos" },
                { "label": "ubutun" },
            ],
            ram_size: 0,
            disk_size: 0,
            selected_requirements: [],
            selected_repos: [],
            message: [],
            repo_list: [],
            snapshot_list: [],
            file_list: [],
            username : '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleRamChange = this.handleRamChange.bind(this);
        this.handleDiskChange = this.handleDiskChange.bind(this);
        this.handleRqmtsChange = this.handleRqmtsChange.bind(this)
        this.handlePopReposChange = this.handlePopReposChange.bind(this)
        this.handlebtnClick = this.handlebtnClick.bind(this)
        this.handleRepobtnClick = this.handleRepobtnClick.bind(this)
        this.handleSnapshotbtnClick = this.handleSnapshotbtnClick.bind(this)
        this.handleFilebtnClick = this.handleFilebtnClick.bind(this)
    }

    componentWillMount() {
        console.log(this.props.location.username)
        let username = this.props.location.username != undefined ? this.props.location.username : ''
        this.setState({
            username: username,
        })
        let t = this
        let url = "http://10.141.221.85:8102/repo" + "?nums=30"
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
        let repo_list = this.state.repo_list
        let snapshot_list = this.state.snapshot_list
        let file_list = this.state.file_list

        let url = 'http://10.141.221.85:8102/task/allocate' + '?username=' + username + '&ram_size=' + ram_size
            + '&disk_size=' + disk_size + '&selected_requirements=' + selected_requirements
            + '&repo_selected_list=' + selected_repos + '&repo_list=' + repo_list
            + '&snapshot_list=' + snapshot_list + '&file_list=' + file_list
        let myMsg = []


        console.log(url)
        const _this = this
        axios.get(url, {
            method: 'GET',
            headers: { "Content-type": "application/json" },
            async: false,
        })
            .then(data => {
                console.log(data)
                let file = this.refs.fileupload.files[0]
                const formdata = new FormData();
                formdata.append('file', file);

                let pre_name = ''
                for (var value of formdata.values()) {
                    console.log(value);
                    pre_name = value['name']
                }

                console.log(data.data)
                console.log(data.data['Container_name'])
                let cur_name = data.data.Container_name
                const url = 'http://10.141.221.85:8102/file/upload' + '?cur_name=' + cur_name;
                fetch(url, {
                    method: 'POST',
                    body: formdata,
                    headers: {
                        // "Content-Type": "multipart/form-data"
                        'pre_name':pre_name,
                    },
                    contentType: false,
                })
                console.log(formdata.values())
                console.log(pre_name)

                // // let pre_name = formdata.values()['name']
                // let cur_name = data.data['Container_name']
                // let url_tar = 'http://10.141.221.85:8102/file/tar' + '?pre_name=' + pre_name + '&cur_name=' + cur_name;
                // fetch(url_tar).then(res => console.log(res))
            
                console.log(data)
                console.log(data.data)
                _this.setState(
                    {
                        message: data.data,
                    }
                )
                myMsg = data.data
                console.log(myMsg)
                console.log(this.state.message)
                var path = {
                    pathname: '/free',
                    message: myMsg,
                    username: this.state.username,
                }
                this.props.history.push(
                    path
                )
            }
            )

        console.log(this.state.message)
        console.log(myMsg)
    }

    handleRepobtnClick() {
        let repo_url = this.refs.input_repo_url.value
        let repo_branch = this.refs.input_repo_branch.value
        let tmp = this.state.repo_list
        tmp.push(repo_url + '#' + repo_branch)
        this.setState({
            repo_list: tmp
        })
        console.log(this.state.repo_list)
        this.refs.input_repo_url.value = ''
        this.refs.input_repo_branch.value = ''
    }
    handleSnapshotbtnClick() {
        let snapshot_url = this.refs.input_snapshot_url.value
        let snapshot_branch = this.refs.input_snapshot_branch.value
        let snapshot_commit = this.refs.input_snapshot_commit.value
        let tmp = this.state.snapshot_list
        tmp.push(snapshot_url + '#' + snapshot_branch + '#' + snapshot_commit)
        this.setState({
            snapshot_list: tmp
        })
        console.log(this.state.snapshot_list)
        this.refs.input_snapshot_url.value = ''
        this.refs.input_snapshot_branch.value = ''
        this.refs.input_snapshot_commit.value = ''
    }
    handleFilebtnClick() {
        let file_url = this.refs.input_file_url.value
        let file_branch = this.refs.input_file_branch.value
        let file_commit = this.refs.input_file_commit.value
        let file_path = this.refs.input_file_path.value
        let tmp = this.state.file_list
        tmp.push(file_url + '#' + file_branch + '#' + file_commit + '#' + file_path)
        this.setState({
            file_list: tmp
        })
        console.log(this.state.file_list)
        this.refs.input_file_url.value = ''
        this.refs.input_file_branch.value = ''
        this.refs.input_file_commit.value = ''
        this.refs.input_file_path.value = ''
    }

    handleUpload = (e) => {
        e.preventDefault();

        let file = this.refs.fileupload.files[0]
        const formdata = new FormData();
        formdata.append('file', file);

        for (var value of formdata.values()) {
            console.log(value);
        }

        const url = 'http://10.141.221.85:8102/file/upload';
        fetch(url, {
            method: 'POST',
            body: formdata,
            headers: {
                // "Content-Type": "multipart/form-data"
            },
            contentType: false,
        }).then(response => console.log(response))
            .catch(error => console.log(error));
    };

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
                            请勾选您想要的<strong><i>项目Git库(如有需要)：</i></strong><br />
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
                                <input required="required" class="form-control" ref='input_repo_url'></input>
                                <label class="form-label">请输入url：</label>
                            </div>
                            <div class='form-group'>
                                <input required="required" class="form-control" ref='input_repo_branch'></input>
                                <label class="form-label">请输入branch：</label>
                            </div>
                            <div >
                                <input class="button white" type="button" value="添加" onClick={this.handleRepobtnClick}>
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
                                <input required="required" class="form-control" ref='input_snapshot_url'></input>
                                <label class="form-label">请输入url：</label>
                            </div>
                            <div class='form-group'>
                                <input required="required" class="form-control" ref='input_snapshot_branch'></input>
                                <label class="form-label">请输入branch：</label>
                            </div>
                            <div class='form-group'>
                                <input required="required" class="form-control" ref='input_snapshot_commit'></input>
                                <label class="form-label">请输入commit：</label>
                            </div>
                            <div >
                                <input class="button white" type="button" value="添加" id='snapshotRepos' onClick={this.handleSnapshotbtnClick}>
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
                                <input required="required" class="form-control" ref='input_file_url'></input>
                                <label class="form-label">请输入url：</label>
                            </div>
                            <div class='form-group'>
                                <input required="required" class="form-control" ref='input_file_branch'></input>
                                <label class="form-label">请输入branch：</label>
                            </div>
                            <div class='form-group'>
                                <input required="required" class="form-control" ref='input_file_commit'></input>
                                <label class="form-label">请输入commit：</label>
                            </div>
                            <div class='form-group'>
                                <input required="required" class="form-control" ref='input_file_path'></input>
                                <label class="form-label">请输入文件相对路径：</label>
                            </div>
                            <div >
                                <input class="button white" type="button" value="添加" id='snapshotRepos' onClick={this.handleFilebtnClick}>
                                </input>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label class="fileuploadlabel">请上传源代码压缩包<strong><i>（建议压缩成tar.gz格式）：</i></strong></label>

                        <input class="button white" type="file" ref="fileupload" ></input>
                        <hr />
                        <input class="button white" type="button" value="上传" onClick={this.handleUpload}></input>
                        <input class="button white" type="button" value="确认申请" onClick={this.handlebtnClick}></input>
                        <input class="button white" type="button" value="重新填写"></input>
                        <input class="button white" type="button" value="退出登录"></input>
                        <hr />
                    </div>
                </form>
            </div>
        )
    }
}

export default MyForm;