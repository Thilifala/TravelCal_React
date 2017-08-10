// 参与人管理
import React from 'react';
import '../../css/personManager.less';
import '../../css/popupWin.less';
import Title from './title.js';
import Footer from './footer.js';

//弹窗
let PopupWin = React.createClass({
    getInitialState: function () {
        return {
            personName: this.props.personName || ''
        }
    },
    handleEditOk: function () {
        this.props.onPersonEditOK(this.refs.txtPersonName.value);
    },
    handleNameChange: function (event) {
        this.setState({
            personName: event.target.value
        })
    },
    render: function () {
        return (
            <div className="popupWinStyle">
                <input ref="txtPersonName" type="text" value={this.state.personName} onChange={this.handleNameChange} />
                <input type="button" value="OK" onClick={this.handleEditOk} />
            </div>
        );
    }
});

let PersonRow = React.createClass({
    handllePersonModify: function () {
        this.props.onPersonModify(this.props.personName);
    },
    handleDel: function () {
        this.props.onPersonDel(this.props.personName);
    },
    render: function () {
        return (
            <div className="personRowBox">
                <div onClick={this.handllePersonModify}>{this.props.personName}</div>
                <input type="button" className="btnDelPer" onClick={this.handleDel} />
            </div>
        )
    }
})

let PersonList = React.createClass({
    render: function () {
        let personRows = this.props.person.map((name, i) =>
            <PersonRow personName={name} key={i} {...this.props} />
        );
        return (
            <div>
                {personRows} 
            </div>
        )
    }
})

let PersonCopn = React.createClass({
    getInitialState: function () {
        return {
            personArr: ["PersonA", "PersonB"],
            editPerson: false,
            editingName:''
        }
    },
    handleAddPersonClick: function (name) {
        name = typeof name=='string'&&name.constructor==String ?name :'';
        this.setState({
            editPerson: true,
            editingName:name||''
        })
    },
    handleAddPersonOK: function (name,index) {
        let personArr = this.state.personArr;
        name && personArr.push(name);
        this.setState({
            personArr: personArr,
            editPerson: false
        })
    },
    handlePersonChangeOK: function () {

    },
    handlePersonDel:function(name){
        let personArr = this.state.personArr;
        let idx = personArr.indexOf(name)
        personArr.splice(idx,1);
        this.setState({
            personArr:personArr
        })
    },
    render: function () {
        let popupWin = <PopupWin personName={this.state.editingName}
            onPersonEditOK={this.handleAddPersonOK}
            onPersonChangeOK={this.handlePersonChangeOK}
        />;
        return (
            <div className="personMngbox">
                <Title title="人" />
                <PersonList person={this.state.personArr} onPersonModify={this.handleAddPersonClick} onPersonDel={this.handlePersonDel}/>
                {this.state.editPerson ? popupWin : ''}
                <Footer>
                    <input type="button" className="btnAddPerson" onClick={this.handleAddPersonClick} />
                    <input type="button" className="btnAddPersonOK" />
                </Footer>
            </div>
        );
    }
});

export default PersonCopn;