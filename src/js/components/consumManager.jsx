// 消费管理
import React from 'react';
import { createHashHistory  } from 'history';

import Title from './title.jsx';
import Footer from './footer.jsx';
import ItemTable from './consumeTable.jsx';
import ConsumeCard from './consumeCard.jsx';
import StaticResultForm from './staticResult.jsx';
import Tabs from './tabs.jsx';
import '../../css/popupWin.less';
import '../../css/consumManager.less';

//类——消费项
let ConsumeItem = function (id, name, cost, paidName, paidFor) {
    this.id = id || 0;
    this.name = name || '';
    this.cost = cost || 0;
    this.paidName = paidName || '';
    this.paidFor = paidFor || [];
}

//项目表单
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
        item.cost = parseFloat(this.refs.txtCost.value);
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
        this.props.onEditItemOK(this.state.consumeItem);
    },
    render: function () {
        return (
            <div className="itemForm">
                <div>
                    <label>项目</label><input ref="txtItemName" type="text" value={this.state.consumeItem.name} onChange={this.handleNameChange} />
                </div>
                <div>
                    <label>花费</label><input ref="txtCost" type="text" value={this.state.consumeItem.cost} onChange={this.handleCostChange} />
                </div>
                <div>
                    <label>付钱人</label><div className="txtDiv txtPaid" onClick={this.handlePaidClick}>{this.state.consumeItem.paidName}</div>
                </div>
                <div>
                    <label>蹭钱的</label><div className="txtDiv txtPaidFor" onClick={this.handlePaidForClick}>{this.state.consumeItem.paidFor.join(',')}</div>
                </div>
                <input type="button" value="OK" onClick={this.handleEditOk} />
            </div>
        )
    }
})

//人选择器
let PersonSelector = React.createClass({
    propTypes: {
        personArr: React.PropTypes.array.isRequired,
        isMutiSelect: React.PropTypes.bool.isRequired
    },
    getInitialState: function () {
        return {
            selectedPer: this.props.selectedPer || []
        }
    },
    handlePerRowClick: function (e) {
        let name = e.target.innerText;
        if (!this.props.isMutiSelect) {
            this.props.onPersonSelectOK(name);
        }
        else {
            let selectedPer = this.state.selectedPer;
            let idx = this.state.selectedPer.indexOf(name);
            if (idx < 0) {
                selectedPer.push(name);
            }
            else {
                selectedPer.splice(idx, 1);
            }
            this.setState({
                selectedPer: selectedPer
            })
        }
    },
    handleSelectOKClick: function (e) {
        this.props.onPerMutiSelectOK(this.state.selectedPer);
    },
    render: function () {
        let personRow = this.props.personArr.map((name, i) => {
            let className = this.state.selectedPer.indexOf(name) < 0 ? "" : "per-selected";
            return (
                <div key={i} onClick={this.handlePerRowClick} className={className}>{name}</div>
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

//模态窗
let ModalWin = React.createClass({
    propTypes: {
        consumeItem: React.PropTypes.instanceOf(ConsumeItem).isRequired,
        personArr: React.PropTypes.array.isRequired
    },
    getInitialState: function () {
        return {
            consumeItem: this.props.consumeItem,
            showPerSelector: false,
            isMutiSelect: false
        }
    },
    handlePersonCtlTab: function (isMutiSelect) {
        this.setState({
            showPerSelector: true,
            isMutiSelect: isMutiSelect
        })
    },
    handlePerMutiSelectOK: function (nameArr) {
        let consumeItem = this.state.consumeItem;
        consumeItem.paidFor = nameArr;
        this.setState({
            showPerSelector: false,
            consumeItem: consumeItem
        })
    },
    handlePersonSelectOK: function (name) {
        let consumeItem = this.state.consumeItem;
        consumeItem.paidName = name;
        this.setState({
            showPerSelector: false,
            consumeItem: consumeItem
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
                {
                    this.state.showPerSelector ?
                        <PersonSelector
                            personArr={this.props.personArr}
                            selectedPer={this.state.isMutiSelect ? this.state.consumeItem.paidFor : this.state.consumeItem.paidName}
                            isMutiSelect={this.state.isMutiSelect}
                            onPersonSelectOK={this.handlePersonSelectOK}
                            onPerMutiSelectOK={this.handlePerMutiSelectOK}
                        />
                        : ''
                }
            </div>
        )
    }
});

//顶层容器
let ConsumCopn = React.createClass({
    getInitialState: function () {
        return {
            showPopupWin: false,
            editingItemId: -1,
            consumeItems: [],
            activeTab:0
        }
    },

    componentDidMount: function () {
    },

    handleTabClick:function(tabCode){
        this.setState({
            activeTab:tabCode
        })
    },

    handleDeleteItem:function(item){
        let items = this.state.consumeItems;
        let idx = items.findIndex((e) => {
            return e.id == item.id;
        })
        items.splice(idx,1);
        this.setState({
            consumeItems:items
        })
    },

    handleRowClick:function(item){
        console.log('handleRowClick:'+ item.id);
        this.setState({
            showPopupWin: true,
            editingItemId: item.id
        })
    },

    //点击添加项目
    handleAddItemClick: function () {
        this.setState({
            showPopupWin: true,
            editingItemId: this.state.consumeItems.length
        })
    },

    //添加OK
    handleEditItemOK: function (item) {
        let items = this.state.consumeItems;
        //当前项
        let currIndex = items.findIndex(function(e){
            return e.id == item.id;
        })
        if (currIndex < 0) {
            if(item.paidName && item.paidFor.length > 0){
                items.push(item);
            }
            this.setState({
                showPopupWin: false,
                consumeItems: items
            })
        }
        else{
            items.splice(currIndex,1,item);
            this.setState({
                showPopupWin: false,
            })
        }
    },
    //计算
    handleDoCalc: function () {

    },
    //返回
    handleBack: function () {
        createHashHistory().goBack();
    },

    getContentView: function () {
        if (this.state.activeTab === 0)
            return <ConsumeCard consumeItems={this.state.consumeItems} onRowClick={this.handleRowClick} onDeleItem={this.handleDeleteItem}/>;
        else
            return (
                <div>
                    <ItemTable consumeItems={this.state.consumeItems} onRowClick={this.handleRowClick} onDeleItem={this.handleDeleteItem} />
                    <StaticResultForm consumeItems={this.state.consumeItems} />
                </div>
            );
    },
    render: function () {
        let consumeStyle = '';
        let modalWin = '';
        let editingId = this.state.editingItemId;
        let currItems = this.state.consumeItems;
        let editingItem = editingId == currItems.length ? new ConsumeItem(editingId) : currItems[editingId];
        if (this.state.showPopupWin) {
            modalWin = <ModalWin onEditItemOK={this.handleEditItemOK} consumeItem={editingItem} personArr={this.props.location.state || []} />;
        }
        return (
            <div>
                {modalWin}
                <div className="consumeMngbox">
                    <Title title="消费" />
                    <Tabs tabs={["卡片","表格"]} activeTab={this.state.activeTab} onTabClick={this.handleTabClick}/>
                    {this.getContentView()}
                    <Footer>
                        <input type="button" className="btnAddItem" onClick={this.handleAddItemClick} />
                        <input type="button" className="btnDoCalc" onClick={this.handleDoCalc} />
                        <input type="button" className="btnBack" onClick={this.handleBack} />
                    </Footer>
                </div>
            </div>

        )
    }
});

export default ConsumCopn;