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

let ItemWin = React.createClass({
    propTypes:{
        consumeItem:React.PropTypes.instanceOf(ConsumeItem).isRequired
    },
    getInitialState: function () {
        return {
            editingItem: {}
        }
    },
    handleEditOk:function(){
        this.props.onEditItemOK(this.state.editingItem);
    },
    handleNameChange:function(aa,bb){
        let cc=aa;
    },
    render: function () {
        return (
            <div className="popupWin style2">
                <div>
                    <label>项目</label><input ref="txtItemName" type="text" value={this.props.consumeItem.name} onChange={this.handleNameChange} />
                </div>
                <div>
                    <label>花费</label><input ref="txtCost" type="text" value={this.props.consumeItem.cost} onChange={this.handleNameChange} />
                </div>
                <div>
                    <label>付钱人</label><input ref="txtPaid" type="text" value={this.props.consumeItem.paid} onChange={this.handleNameChange} />
                </div>
                <div>
                    <label>蹭钱的</label><input ref="txtPaidFor" type="text" value={this.props.consumeItem.padiFor.join(',')} onChange={this.handleNameChange} />
                </div>
                <input type="button" value="OK" onClick={this.handleEditOk} />
            </div>
        )
    }
});

let ConsumCopn = React.createClass({
    getInitialState: function () {
        return {
            isEditing:false,
            editingItem:{},
            personArr: []
        }
    },
    componentDidMount: function () {
        //TODO:fetch PersonArr
    },
    //点击添加项目
    handleAddItemClick: function () {
        this.setState({
            isEditing:true,
            editingItem:new ConsumeItem()
        })
    },
    //添加OK
    handleEditItemOK:function(){
        this.setState({
            isEditing:false
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
                { this.state.isEditing ? <ItemWin onEditItemOK={this.handleEditItemOK} consumeItem={this.state.editingItem}/> : '' }
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