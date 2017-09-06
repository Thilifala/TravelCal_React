// 消费管理
import React from 'react';
import Title from './title.jsx';
import Footer from './footer.jsx';
import '../../css/popupWin.less';
import '../../css/consumManager.less';

let ConsumeItem = function (name, cost, paid, padiFor) {
    this.name = name || '';
    this.cost = cost || 0;
    this.paid = paid || '';
    this.padiFor = padiFor || [];
}

//项目表单组件
let ItemForm = React.createClass({
    propTypes: {
        consumeItem: React.PropTypes.instanceOf(ConsumeItem).isRequired
    },
    getInitialState: function () {
        return {
            consumeItem: this.props.consumeItem
        }
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
        let item = this.state.consumeItem;
        item.cost = this.refs.txtCost.value;
        this.setState({
            consumeItem: item
        })
    },
     // 付钱人
     handlePaidClick: function (e) {
        this.props.onPersonCtlTab(false);
    },
    // 蹭钱人
    handlePaidForClick: function (e) {
        this.props.onPersonCtlTab(true);
    },
    // OK
    handleEditOk: function () {
        this.props.onEditItemOK(this.state.editingItem);
    },
    render:function(){
        return (
            <div className="itemForm">
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
})

//  人选择器组件
let PersonSelector = React.createClass({
    propTypes: {
        personArr: React.PropTypes.array.isRequired,
        isMutiSelect: React.PropTypes.bool.isRequired
    },
    handlePerRowClick: function (e) {
        !this.props.isMutiSelect && this.props.onPersonSelectOK(e.target.innerText);
        e.target.className = "per-selected";
    },
    handleSelectOKClick:function(e){

    },
    render: function () {
        let personRow = this.props.personArr.map((name, i) => {
            return (
                <div key={i} onClick={this.handlePerRowClick}>{name}</div>
            )
        });
        let el_selectOK = this.props.isMutiSelect ? <div className="selectOK" onClick={this.handleSelectOKClick}>OK</div> : '';
        return (
            <div className="personSelector">
                {personRow}
                <div></div>
                {el_selectOK}
            </div>
        );
    }
})

//弹窗组件
let ItemWin = React.createClass({
    propTypes: {
        consumeItem: React.PropTypes.instanceOf(ConsumeItem).isRequired,
        personArr:React.PropTypes.array.isRequired
    },
    getInitialState: function () {
        return {
            consumeItem: this.props.consumeItem,
            isSelectingPer:false,
            isMutiSelect:false
        }
    },
    handlePersonCtlTab:function(isMutiSelect){
        this.setState({
            isSelectingPer:true,
            isMutiSelect:isMutiSelect
        })
    },
    handlePersonSelectOK:function(name){
        var consumeItem = this.state.consumeItem;
        consumeItem.paid = name;
        this.setState({
            isSelectingPer:false,
            consumeItem:consumeItem
        })
    },
    render: function () {
        return (
            <div className="popupWin style2">
                <ItemForm
                    onEditItemOK={this.props.onEditItemOK}
                    onPersonCtlTab={this.handlePersonCtlTab}
                    consumeItem={this.props.consumeItem}
                />
                {this.state.isSelectingPer?<PersonSelector personArr={this.props.personArr} isMutiSelect={this.state.isMutiSelect} onPersonSelectOK={this.handlePersonSelectOK}/>:''}
            </div>
        )
    }
});

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
        let copn = this;
        fetch('mock/person.json').then(function(resp){
            if(resp.ok){
                return resp.json();
            }
        }).then(function(data){
            let personArr = data || [];
            copn.setState({
                personArr:personArr
            })
        }).catch(function(err){
            console.error('fetch error:' + err.message);
        })
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
            <div className="consumeMngbox">
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