import { SHOW_MODAL_PER, showPerModal } from '../action/actions'

export function popupWinControl(state = {}, action) {
    switch (action.type) {
        case SHOW_MODAL_PER:
            return Object.assign({}, state, {
                showPopupWin: action.showPopupWin
            })
        default:
            return state;
    }
}