import { leadTypes } from "../types";
import api from 'config/api';
import axios from 'axios';
import qs from 'qs';

export const findAllLeads = (page, size, filters) => {
    console.log(page,size,filters);
    return async dispatch => {
        dispatch({
          type: leadTypes.LEAD_GET_REQUEST,
          data : {page: page , pageSize: size}
        });
        await api
          .get("/admin/lead/v1/get", { params : {
                page : page,
                size : size,
                ...filters
              }
          } )
          .then(response => {
            return dispatch({
              type: leadTypes.LEAD_GET_SUCCESS,
              data : {
                  leads: response.data.leads,
                  total : response.data.total
              }
            });
          })
          .catch(error => {
            console.log(error.response);
           // openNotification('error','Opps! invalid login',error.response.data.error_description);  
            dispatch({
              type: leadTypes.LEAD_GET_ERROR,
              error: error.response.data && error.response.data.error && error.response.data.error || 'Something went wrong'
            });
          });
      };
}