import { userTypes } from "../types";
import {getCookie, setCookie} from 'utils/cookie';
import _ from 'underscore';
import {setAuthHeader} from 'config/api'
let initialState;
if (typeof localStorage !== "undefined") {
   const token = getCookie('token');
   const user = getCookie('user');
   const permissions = getCookie('permissions');
   setAuthHeader(token);
   if (token) {
       initialState = {
        isLoggedIn: true,
        permissions : permissions,
        user : user ? JSON.parse(decodeURIComponent(user)) : {},
        successors : [],
        isMobile : false
       }//JSON.parse(decodeURIComponent(authCookie));
   } else {
       initialState = {
           isLoggedIn: false,
           user: undefined,
           loginLoading: false,
           signupLoading: false,
           error:undefined,
           successors : [],
           isMobile : false
       }
   }
} else {
   initialState = {
       isLoggedIn: false,
       user: undefined,
       loginLoading: false,
       signupLoading: false,
       error: undefined,
       successors : [],
       isMobile : false
   };
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.INIT_STORE : {
      return {
        ...state,
        permissions : action.data.permissions ? JSON.parse(action.data.permissions) : [],
        user: action.data.user,
        isLoggedIn : action.data.token ? true : false
      }
    };
    case userTypes.DETECT_DEVICE : {
      return {
        ...state,
        isMobile : action.isMobile
      }
    };
    case userTypes.GETME:
      return {
        ...state,
        user: action.user
      };
    case userTypes.LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        error: undefined
      };
    case userTypes.LOGIN_ERROR:
      return {
        ...state,
        loginLoading: false,
        error: action.error
      };
    case userTypes.LOGIN_SUCCESS:
      setCookie("token", action.user.access_token);
      setCookie("permissions",JSON.stringify(_.pluck(action.user.permissions,'authority')));
      setCookie("user",{name : action.user.name , username: action.user.username})
      setAuthHeader(action.user.access_token);
      return {
        ...state,
        loginLoading: false,
        isLoggedIn: true,
        error: undefined,
        user: {name : action.user.name , username: action.user.username},
        permissions : _.pluck(action.user.permissions,'authority')
      };
    case userTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: undefined
      };
    case userTypes.SIGNUP_REQUEST:
      return {
        ...state,
        signupLoading: true,
        error: undefined
      };
    case userTypes.SIGNUP_ERROR:
      return {
        ...state,
        signupLoading: false,
        error: action.error
      };
    case userTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        error: undefined,
        user: action.user
      };
    case userTypes.SUCCESSORS_SUCCESS: 
      return {
        ...state, 
        successors : action.successors
      }
    default:
      return state;
  }
};

export default userReducer;
