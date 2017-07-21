var React = require('react');
var ReactDom = require('react-dom');
// import ReactDom from 'react-dom';

let textCompn = React.createClass({
    render: function () {
        return <div>Hello world!</div>
    }
})

ReactDOM.render(<textCompn>Hello world!</textCompn>,document.getElementById('container'));