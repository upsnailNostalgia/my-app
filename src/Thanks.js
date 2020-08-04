import React from 'react';

import './thanks.css'

class Thanks extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div class='thanksdiv'>
                <h1>感谢您的使用,资源释放成功！</h1>
            </div>
        )
    }
}

export default Thanks;
