import { userTypes } from "../types";
import authAPI from 'config/authAPI';
import api from 'config/api';
import axios from 'axios';
import qs from 'qs';
import {openNotification} from 'utils/notification';
import {setAuthHeader} from 'config/api'

export const detectDevice = (isMobile) => {
  console.log('detectDevice called');
  return dispatch => {
    dispatch({
      type: userTypes.DETECT_DEVICE,
      isMobile: isMobile 
    });
  }
}
export const getme = () => {
  return dispatch => {
    axios.get("/api/user/me").then(response => {
      dispatch({
        type: userTypes.GETME,
        user: response.data
      });
    });
  };
};

export const whoAmI = (token,user,permissions) => {
  setAuthHeader(token);
  return dispatch => {
    dispatch({
      type : userTypes.INIT_STORE, 
      data : {user:user, token:token, permissions:permissions}
    })
  }
}
export const login = (credentials) => {
  console.log(credentials);
  return dispatch => {
    dispatch({
      type: userTypes.LOGIN_REQUEST
    });
    authAPI
      .post("/auth/oauth/token", qs.stringify({
        username:credentials.username,
        password:credentials.password,
        source:'life_admin',
        grant_type:'password'
      }),{withCredentials:true})
      .then(response => {
        dispatch({
          type: userTypes.LOGIN_SUCCESS,
          user: response.data
        });
      })
      .catch(error => {
        openNotification('error','Opps! invalid login',error.response && error.response.data && error.response.data.error_description ||'Something went wrong!!');  
        dispatch({
          type: userTypes.LOGIN_ERROR,
          error: error.response && error.response.data && error.response.data.error_description ||'Something went wrong!!'
        });
      });
  };
};

export const logout = () => {
  return dispatch => {
    axios.get("/api/user/logout").then(response => {
      dispatch({ type: userTypes.LOGOUT });
    });
  };
};

export const signup = user => {
  return async dispatch => {
    dispatch({
      type: userTypes.SIGNUP_REQUEST
    });
    await axios
      .post("/api/user/signup", user)
      .then(response => {
        dispatch({
          type: userTypes.SIGNUP_SUCCESS,
          user: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: userTypes.SIGNUP_ERROR,
          error: 'not found'
        });
      });
  };
};

export const findSuccessors  = (manager, all) => {
  return async dispatch => {
    await api
      .get("/admin/user/v1/successors", {
        params  : {
          manager :  manager, 
          all : all
        }
      })
      .then(response => {
        dispatch({
          type: userTypes.SUCCESSORS_SUCCESS,
          successors: response.data
        });
      })
      .catch(error => {
        // dispatch({
        //   type: userTypes.SUCCESSORS_ERROR,
        //   error: 'Unable to load manager, try to refresh page.'
        // });
      });
  }
  
}
