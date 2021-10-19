import * as types from '../types'

export const headerReducer = (state = {}, { type, title }) => {
    switch (type) {
        case types.SHOW_TITLE:
            return {
                ...state,
                title,
                showTitle:true
            }
         case types.HIDE_TITLE:
            return {
                ...state,
                showTitle:false
            }
        default:
            return state
    }
}
