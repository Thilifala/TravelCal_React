import {SHOW_MODAL_PER,showPerModal} from '../action/actions'

export function changePopupWinState(state={},action){
    switch(action){
        case SHOW_MODAL_PER:
        return Object.assign({},state,{
            showPopupWin:true
        })
    }
}