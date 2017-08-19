// 消费管理
import React from 'react';
import Title from './title.jsx';
import Footer from './footer.jsx';
import '../../css/popupWin.less';

let ItemWin = React.createClass({
    render: function () {
        return (
            <div className="popupWin style2">
                <div>
                    <label>项目</label><input ref="txtItemName" type="text" onChange={this.handleNameChange} />
                </div>
                <div>
                    <label>花费</label><input ref="txtCost" type="text" onChange={this.handleNameChange} />
                </div>
                <div>
                    <label>付钱人</label><input ref="txtPaid" type="text" onChange={this.handleNameChange} />
                </div>
                <div>
                    <label>蹭钱的</label><input ref="txtPaidFor" type="text" onChange={this.handleNameChange} />
                </div>
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
                <ItemWin />
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