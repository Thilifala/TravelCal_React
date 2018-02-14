import React from 'react'

//类——消费项
let PersonalFee = function (name) {
    this.name = name || '';
    this.totalPay = 0;//总付
    this.debt = 0;//欠债
    this.shouldPay = ()=>{
        return this.totalPay - this.debt;
    }//应收应付    
}

class RowForStatic extends React.Component{
    render(){
        const fee = this.props.personFee;
        return (
            <div className="trow">
                <div>{fee.name}</div>
                <div>{fee.totalPay}</div>
                <div>{fee.debt}</div>
                <div>{fee.shouldPay()}</div>
            </div>
        )
    }
}

class StaticResultForm extends React.Component{
    constructor(props) {
        super(props);
    }
    
    findPersonFee(name, feeArr){
        //找到对应个人消费项
        let personalFee = feeArr.find((e) => {
            return e.name == name;
        });
        if (!personalFee) {
            personalFee = new PersonalFee(name);
            feeArr.push(personalFee);
        }
        return personalFee;
    }

    render(){
        let feeArr = [];
        let consumeItems = this.props.consumeItems;
        consumeItems.forEach((item)=>{
            let name = item.paidName;
            let personalFee = this.findPersonFee(name,feeArr);
            //计算个人消费项
            let avg = parseFloat((item.cost/item.paidFor.length).toFixed(2));
            personalFee.totalPay += item.cost;
            item.paidFor.forEach(function(paidForName){
                let fee = this.findPersonFee(paidForName,feeArr);
                fee.debt += avg;
            }.bind(this))
        })
        let rowItems = feeArr.map(function(item,index){
            return <RowForStatic personFee={item} key={index}/>;
        }.bind(this));
        return (
            <div className="statictable itemtable">
                <div className="thead">
                    <div>名字</div>
                    <div>总付</div>
                    <div>总欠</div>
                    <div>应收付</div>
                </div>
                {rowItems}
            </div>
        )
    }
}

export default StaticResultForm;