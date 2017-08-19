import React from 'react';
import '../../css/footer.less';

let Footer = React.createClass({
    render:function(){
        return (
            <footer>
                {this.props.children}
            </footer>
        );
    }
});

export default Footer;