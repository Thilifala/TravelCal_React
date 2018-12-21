// 参与人管理
import React from 'react';
import {Link} from 'react-router-dom';
import '../../css/personManager.less';
import '../../css/popupWin.less';
import Title from './title.jsx';
import Footer from './footer.jsx';

//弹窗  
let PopupWin = React.createClass({
    getInitialState: function () {
        return {
            personName: this.props.personName || ''
        }
    },
    handleEditOk: function () {
        this.props.onPersonEditOK(this.refs.txtPersonName.value, this.props.editingIndex);
    },
    handleNameChange: function (event) {
        this.setState({
            personName: event.target.value
        })
    },
    render: function () {
        return (
            <div className="popupWin flexStyle">
                <input ref="txtPersonName" type="text" value={this.state.personName} onChange={this.handleNameChange} />
                <input type="button" value="OK" onClick={this.handleEditOk} />
            </div>
        );
    }
});

let PersonRow = React.createClass({
    handleRowClick: function () {
        this.props.onRowClick(this.props.personName, this.props.index);
    },
    handleDel: function () {
        this.props.onPersonDel(this.props.index);
    },
    render: function () {
        return (
            <div className="personRowBox">
                <div className="txtName" onClick={this.handleRowClick}>{this.props.personName}</div>
                <div className="boxBtn">
                    <input type="button" className="btnDelPer" onClick={this.handleDel} />
                </div>
            </div>
        )
    }
})

let PersonList = React.createClass({
    render: function () {
        let personRows = this.props.person.map((name, i) =>
            <PersonRow personName={name} key={i} index={i} {...this.props} />
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
            personArr: [],
            showPopupWin: false,
            editingIndex: -1,
        }
    },
    //fetch获取文档数据
    fetchData: function () {
        let copn = this;
        fetch('mock/person.json').then(function (resp) {
            if (resp.ok) {
                return resp.json();
            }
        }).then(function (data) {
            let personArr = data || [];
            copn.setState({
                personArr: personArr
            })
        }).catch(function (err) {
            console.error('fetch error:' + err.message);
        });
    },
    //通过读写localstorage设置“人列表”
    setPersonArr:function(newPersonArr){
        if (typeof (Storage) !== "undefinded") {
            //放到本地存储，目的是为了下次打开app时还能读到
            if(newPersonArr) localStorage.setItem('personArr',JSON.stringify(newPersonArr));
            //读取本地存储
            let personArr = JSON.parse(localStorage.getItem('personArr'));
            //排除非数组
            if(Object.prototype.toString.call(personArr) !== '[object Array]') return;

            this.props.onUpdatePerArr(personArr || []);          
        }
        else{
            console.error('sorry,你的渣渣浏览器不支持Web Storage...');
        }
    },
    componentDidMount: function () {
        // this.fetchData();
        this.setPersonArr();
    },
    handleAddPersonClick: function (name, editingIndex) {
        name = typeof name == 'string' && name.constructor == String ? name : '';
        editingIndex = isNaN(editingIndex) ? -1 : editingIndex;

        this.props.showAddPerWin(editingIndex);       
    },
    handlePopWinOK: function (name, index) {
        let personArr = this.props.personArr;
        if (name) {
            if (index >= 0) {
                personArr[index] = name;
            }
            else {
                personArr.push(name);
            }
        }
        this.props.closePerModel();
        this.setPersonArr(personArr);
    },
    handlePersonDel: function (index) {
        let personArr = this.props.personArr;
        personArr.splice(index, 1);
        this.setPersonArr(personArr);
    },
    render: function () {
        let editingName = this.props.personArr[this.props.editingIndex] || "";
        let popupWin = <PopupWin personName={editingName}
            onPersonEditOK={this.handlePopWinOK}
            editingIndex={this.props.editingIndex}
        />;
        return (
            <div className="personMngbox">
                <Title title="人" />
                <PersonList person={this.props.personArr} onRowClick={this.handleAddPersonClick} onPersonDel={this.handlePersonDel} />
                {this.props.showPopupWin ? popupWin : ''}
                <Footer>
                    <input type="button" className="btnAddPerson" onClick={this.handleAddPersonClick} />
                    <Link to={{pathname:'/consum',state: this.props.personArr}} className="btnAddPersonOK" />
                </Footer>
            </div>
        );
    }
});

export default PersonCopn;