// app组件,所有组件都在此上面,相当于页面容器
import React from 'react';
import '../../css/app.less';

let App = React.createClass({
    render: function () {
        return (
            <div className='appstyle'>
                {this.props.children}
            </div>
        );
    }
})

export default App;