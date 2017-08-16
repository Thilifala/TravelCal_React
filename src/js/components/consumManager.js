// 消费管理
import React from 'react';
import Title from './title.js';
import Footer from './footer.js';
import '../../css/popupWin.less';

let ItemWin = React.createClass({
    render: function () {
        return (
            <div className="popupWinStyle">
                <label>XXXX</label><input ref="txtItemName" type="text" onChange={this.handleNameChange} />
                <label>XXXX</label><input ref="txtCost" type="text" onChange={this.handleNameChange} />
                <label>XXXX</label><input ref="txtPaid" type="text" onChange={this.handleNameChange} />
                <label>XXXX</label><input ref="txtPaidFor" type="text" onChange={this.handleNameChange} />
                <input type="button" value="OK" onClick={this.handleEditOk} />
            </div>
        )
    }
});

let ConsumCopn = React.createClass({
    getInitialState: function () {
        return {
            personArr: []
        }
    },
    componentDidMount: function () {
        //TODO:fetch PersonArr
    },
    //添加项目
    handleAddItem: function () {

    },
    //计算
    handleDoCalc: function () {

    },
    //返回
    handleBack: function () {

    },
    render: function () {
        return (
            <div>
                <Title title="消费" />
                <ItemWin/>
                <Footer>
                    <input type="button" className="btnAddItem" onClick={this.handleAddItem} />
                    <input type="button" className="btnDoCalc" onClick={this.handleDoCalc} />
                    <input type="button" className="btnBack" onClick={this.handleBack} />
                </Footer>
            </div>
        )
    }
});

export default ConsumCopn;