import { leadTypes } from "../types";
import _ from 'underscore';
let initialState;
const leadReducer = (state = initialState = {pagination : {current : 1, pageSize:10}}, action) => {
    // console.log(state);
    switch (action.type) {
        case leadTypes.LEAD_GET_REQUEST : {
            return {
              ...state,
              loading : true,
              pagination: {...state.pagination, current : action.data.page, pageSize: action.data.pageSize},
              error : undefined
            }
        };
        case leadTypes.LEAD_GET_SUCCESS : {
            return {
              ...state,
              loading : false,
              leads : action.data.leads,
              pagination: {...state.pagination, total : action.data.total},
              error : undefined
            }
        };
        case leadTypes.LEAD_GET_ERROR : {
            return {
              ...state,
              loading : false,
              error : action.error
            }
        };
        default:
            return state;
    }
}   
export default leadReducer;
