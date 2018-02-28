import React from 'react';
import '../../css/tabs.less';

class OneTab extends React.Component {
    constructor(props) {
        super(props);
        this.handleOneTabClick = this.handleOneTabClick.bind(this);
    }

    handleOneTabClick(){
        this.props.onTabClick(this.props.tabCode);
    }

    render() {
        return (
            <div className={this.props.className} onClick={this.handleOneTabClick}>{this.props.tabName}</div>
        )
    }
}

//标签页
class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.handleTabClick = this.handleTabClick.bind(this);
    }
    //切换叶签
    handleTabClick(tabCode){
        this.props.onTabClick(tabCode);
    }

    render() {
        let tabDivs = this.props.tabs.map((e, i) => {
            let className = '';
            if (i === this.props.activeTab) className = 'activeTab';
            return <OneTab key={i} className={className} onTabClick={this.handleTabClick} tabName={e} tabCode={i} />
        })
        return (
            <div className="tabs">
                {tabDivs}
            </div>
        )
    }
}

export default Tabs;