// 参与人管理
import React from 'react';
import '../../css/personManager.less';
import Title from './title.js';

let personname = ['aaa','bbb'];

let PersonCopn = React.createClass({
    render:function(){
        return (
            <div>
                <Title title="人"/>
                <div></div>
                <footer></footer>
            </div>
        );
    }
});

export default PersonCopn;