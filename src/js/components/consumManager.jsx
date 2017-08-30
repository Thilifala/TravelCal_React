// 消费管理
import React from 'react';
import Title from './title.jsx';
import Footer from './footer.jsx';
import '../../css/popupWin.less';

let ConsumeItem = function (name, cost, paid, padiFor) {
    this.name = name || '';
    this.cost = cost || 0;
    this.paid = paid || '';
    this.padiFor = padiFor || [];
}

//项目弹窗组件
let ItemWin = React.createClass({
    propTypes: {
        consumeItem: React.PropTypes.instanceOf(ConsumeItem).isRequired,
        personArr:React.PropTypes.array.isRequired
    },
    getInitialState: function () {
        return {
            consumeItem: this.props.consumeItem
        }
    },
    // OK
    handleEditOk: function () {
        this.props.onEditItemOK(this.state.editingItem);
    },
    //项目
    handleNameChange: function (e) {
        let item = this.state.consumeItem;
        item.name = this.refs.txtItemName.value;
        this.setState({
            consumeItem: item
        })
    },
    //花费
    handleCostChange: function (e) {

    },
    // 付钱人
    handlePaidClick: function (e) {
        console.log(this.props.personArr);
    },
    // 蹭钱人
    handlePaidForClick: function (e) {

    },
    render: function () {
        return (
            <div className="popupWin style2">
                <div>
                    <label>项目</label><input ref="txtItemName" type="text" value={this.state.consumeItem.name} onChange={this.handleNameChange} />
                </div>
                <div>
                    <label>花费</label><input ref="txtCost" type="text" value={this.state.consumeItem.cost} onChange={this.handleCostChange} />
                </div>
                <div>
                    <label>付钱人</label><div className="txtDiv txtPaid" onClick={this.handlePaidClick}>{this.state.consumeItem.paid}</div>
                </div>
                <div>
                    <label>蹭钱的</label><div className="txtDiv txtPaidFor" onClick={this.handlePaidForClick}>{this.state.consumeItem.padiFor.join(',')}</div>
                </div>
                <input type="button" value="OK" onClick={this.handleEditOk} />
            </div>
        )
    }
});

// 人 选择器组件
let PersonSelector = React.createClass({
    propTypes:{
        personArr:React.PropTypes.array.isRequired,
        isMutiSelect:React.PropTypes.bool.isRequired
    },
    render:function(){
        return (
            <div className="personSelector"></div>
        );
    }
})

//顶层组件
let ConsumCopn = React.createClass({
    getInitialState: function () {
        return {
            isEditing: false,
            editingItem: {},
            personArr: []
        }
    },
    componentDidMount: function () {
        //TODO:fetch PersonArr
    },
    //点击添加项目
    handleAddItemClick: function () {
        this.setState({
            isEditing: true,
            editingItem: new ConsumeItem()
        })
    },
    //添加OK
    handleEditItemOK: function () {
        this.setState({
            isEditing: false
        })
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
                {this.state.isEditing ? <ItemWin onEditItemOK={this.handleEditItemOK} consumeItem={this.state.editingItem} personArr={this.state.personArr}/> : ''}
                <Footer>
                    <input type="button" className="btnAddItem" onClick={this.handleAddItemClick} />
                    <input type="button" className="btnDoCalc" onClick={this.handleDoCalc} />
                    <input type="button" className="btnBack" onClick={this.handleBack} />
                </Footer>
            </div>
        )
    }
});

export default ConsumCopn;