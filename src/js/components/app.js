// app组件,所有组件都在此上面
import React from 'react';

let App = React.createClass({
    render: function () {
        return (
            <div className="appstyle">
                {this.props.children}
            </div>
        );
    }
})

export default App;