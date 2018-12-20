import {connect} from 'react-redux';
import {closePerModel,showPerModal,updatePerArr} from '../action/actions';
import PersonCopn from '../components/personManager';

const mapStateToProps = (state)=>{
    return {
        showPopupWin:state.showPopupWin,
        editingIndex:state.editingIndex,
        personArr:state.personArr
    }
}

const mapDispathToProps = dispatch =>{
    return {
        closePerModel: () =>{
            dispatch(closePerModel())
        },
        showAddPerWin:(editingIndex)=>{
            dispatch(showPerModal(editingIndex))
        },
        onUpdatePerArr:(perArr)=>{
            dispatch(updatePerArr(perArr))
        }
    }
}

const PersonManagerLink = connect(
    mapStateToProps,
    mapDispathToProps
)(PersonCopn)

export default PersonManagerLink