import React from 'react';
import '../../css/consumeCard.less';

class OneCard extends React.Component{
    constructor(props){
        super(props);
        //事件绑定
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handlerTouchStart = this.handlerTouchStart.bind(this);
        this.handlerTouchMove = this.handlerTouchMove.bind(this);
        this.handlerTouchEnd = this.handlerTouchEnd.bind(this);
        this.handlerTouchCancel = this.handlerTouchCancel.bind(this);
        //超时变量
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
            <div className="cardrow">
                <div className="cardBox"
                    onClick={this.handleRowClick}
                    onTouchStart={this.handlerTouchStart}
                    onTouchMove={this.handlerTouchMove}
                    onTouchEnd={this.handlerTouchEnd}
                    onTouchCancel={this.handlerTouchCancel}
                >
                    <div className="titleBox">
                        <div className='item-img'></div>{consume.name}
                        <div className="cost">
                            <div className='cost-img'></div>{consume.cost}
                        </div>
                    </div>
                    <div className="paidName">
                        <div className='paid-img'></div>{consume.paidName}
                    </div>
                    <div className="paidFor">
                        <div className='paidfor-img'></div>
                        <div className='paidfor-list'>{consume.paidFor.join(' ')}</div>
                    </div>
                </div>
            </div>
        )
    }
}

class ConsumeCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let rowItems = this.props.consumeItems.map(function (item, index) {
            return <OneCard consumeItem={item} key={index} onRowClick={this.props.onRowClick} onDeleItem={this.props.onDeleItem} />;
        }.bind(this));
        return (
            <div className="consumeCardBox">
                {rowItems}
            </div>
        )
    }
}

export default ConsumeCard;
