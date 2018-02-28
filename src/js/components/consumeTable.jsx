import React from 'react';
import '../../css/consumeTabel.less';

//项目表格——行
class RowForItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handlerTouchStart = this.handlerTouchStart.bind(this);
        this.handlerTouchMove = this.handlerTouchMove.bind(this);
        this.handlerTouchEnd = this.handlerTouchEnd.bind(this);
        this.handlerTouchCancel = this.handlerTouchCancel.bind(this);
        
        this.timeoutEvent = 0;
    }

    handleRowClick() {
        this.props.onRowClick(this.props.consumeItem);
    }

    longPress() {
        console.log('longPress:' + this.props.consumeItem.id);
        if(confirm('确定删除？')){
            this.props.onDeleItem(this.props.consumeItem);
        }
    }
  
    handlerTouchStart() {
        this.timeoutEvent = setTimeout(() => {
            this.longPress();
        }, 750);
    }

    handlerTouchMove(){
        clearTimeout(this.timeoutEvent);
        this.timeoutEvent = 0 ;
    }

    handlerTouchEnd(){
        clearTimeout(this.timeoutEvent);
    }

    handlerTouchCancel(){
        clearTimeout(this.timeoutEvent);
    }

    render() {
        let consume = this.props.consumeItem;
        return (
            <div className="trow"
                onClick={this.handleRowClick}
                onTouchStart={this.handlerTouchStart}
                onTouchMove={this.handlerTouchMove}
                onTouchEnd={this.handlerTouchEnd}
                onTouchCancel={this.handlerTouchCancel}>
                <div>{consume.name}</div>
                <div>{consume.cost}</div>
                <div>{consume.paidName}</div>
                <div>{consume.paidFor.join(',')}</div>
            </div>
        )
    }
}


//项目表格
class ItemTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let rowItems = this.props.consumeItems.map(function(item,index){
            return <RowForItem consumeItem={item} key={index} onRowClick={this.props.onRowClick} onDeleItem={this.props.onDeleItem}/>;
        }.bind(this));
        return (
            <div className="itemtable">
                <div className="thead">
                    <div>项目名</div>
                    <div>消费</div>
                    <div>付钱人</div>
                    <div>蹭钱人</div>
                </div>
                {rowItems}
            </div>
        )
    }
}

export default ItemTable;