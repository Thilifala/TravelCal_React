import React from 'react';
import '../../css/title.less';

let Title = React.createClass({
    render: function () {
        return (
            <div className="pagetitle">
                {this.props.title}
            </div>
        )
    }
});

export default Title;