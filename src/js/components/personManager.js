// 参与人管理
import React from 'react';
import '../../css/personManager.less';
import Title from './title.js';
import Footer from './footer.js';

let PersonRow = React.createClass({
    render:function(){
        return (
            <div className="personRowBox">
                <div>{this.props.personName}</div>
                <input type="button" className="btnDelPer"/>
            </div>
        )
    }
})

let PersonList = React.createClass({
    render:function(){
        let personRows = this.props.person.map((name,i) =>
            <PersonRow personName={name} key={i}/>
        );
        return (
            <div>
                {personRows}
            </div>
        )
    }
})

let PersonCopn = React.createClass({
    getInitialState:function(){
        return {
            personArr:["PersonA","PersonB"]
        }
    },
    render:function(){
        return (
            <div className="personMngbox">
                <Title title="人"/>
                <PersonList person={this.state.personArr}/>
                <Footer>
                    <input type="button" className="btnAddPerson"/>
                    <input type="button" className="btnAddPersonOK"/>
                </Footer>
            </div>
        );
    }
});

export default PersonCopn;