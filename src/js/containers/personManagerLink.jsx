import {connect} from 'react-redux';
import PersonCopn from '../components/personManager';

const mapStateToProps = (state)=>{
    return {
        showPopupWin:true
    }
}

const PersonManagerLink = connect(
    mapStateToProps,
    null
)(PersonCopn)

export default PersonManagerLink