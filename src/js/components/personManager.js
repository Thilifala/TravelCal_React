// 参与人管理
import React from 'react';
import '../../css/personManager.less';
import Title from './title.js';
import Footer from './footer.js';

let personname = ['aaa','bbb'];

let PersonCopn = React.createClass({
    render:function(){
        return (
            <div>
                <Title title="人"/>
                <div></div>
                <Footer>
                    <input type="button" id="addPerson" value="添加人"/>
                    <input type="button" id="addOK" value="添加完成"/>
                </Footer>
            </div>
        );
    }
});

export default PersonCopn;