import { SHOW_MODAL_PER, CLOSE_MODAL_PER,UPDATE_PERARR } from '../action/actions'

export function popupWinControl(state = {showPopupWin:false,editingIndex: -1,personArr: []}, action) {
    switch (action.type) {
        case SHOW_MODAL_PER:
            return Object.assign({}, state, {
                showPopupWin: true,
                editingIndex:action.editingIndex
            })
        case CLOSE_MODAL_PER:
            return Object.assign({}, state, {
                showPopupWin: false,
            })
        case UPDATE_PERARR:
            return Object.assign({},state,{
                personArr:action.personArr
            });
        default:
            return state;
    }
}