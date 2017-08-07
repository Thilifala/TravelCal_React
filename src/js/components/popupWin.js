// 弹窗组件
import React from 'react';
import '../../css/popupWin.less';

let PopupWin = React.createClass({
    render:function(){
        return (
            <div className="popupWinStyle">
                <input type="text"/>
                <input type="button" value="OK"/>
            </div>
        );
    }
});

export default PopupWin;