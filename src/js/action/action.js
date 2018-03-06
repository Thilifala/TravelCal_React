
/*
 * 人的增删改
 */

// export const ADD_PER = "ADD_PER";
// export const DELETE_PER = "DELETE_PER";
// export const MODIFY_PER = "MODIFY_PER";
export const UPDATE_PERARR = "UPDATE_PERARR";

/*
 * 消费项的增删改
 */

export const ADD_CONSUME = "ADD_CONSUME";
export const DELETE_CONSUME = "DELETE_CONSUME";
export const MODIFY_CONSUME = "MODIFY_CONSUME";

/*
 * 界面
 */

export const SHOW_MODAL_PER= "SHOW_MODAL_PER";
export const TOGGLE_TAB = "TOGGLE_TAB";

/*
 * action 创建函数
 */

export function updatePerArr(perArr) {
    return { type: UPDATE_PERARR, perArr }
}

export function showPerModal(editingIndex){
    return {type:SHOW_MODAL_PER,editingIndex}
}