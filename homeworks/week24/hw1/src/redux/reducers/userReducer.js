import { createSlice } from '@reduxjs/toolkit';
import { register, getMe, login } from '../../WepAPI'
import { setAuthToken } from "../../utilis";



export const userReducer = createSlice({
  name: 'users',
  initialState: {
    isLoadingLogin: false,
    user: null,
    registerResponse: null,
    errorMessage: null,
  },
  reducers: {
    setIsLoadingLogin: (state, action) => {
      state.isLoadingLogin = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRegisterResponse: (state, action) => {
      state.registerResponse = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearUser: (state) => {
      state.user = null
    }
  },
});

export const { setIsLoadingLogin, setUser, setRegisterResponse, setErrorMessage, clearUser } = userReducer.actions;

export const postRegister = (nickname, username, password) => dispatch => {
  register(nickname, username, password).then(res => {
    if(res.ok !== 1) {
     return dispatch(setErrorMessage(res.message))
    }
    setAuthToken(res.token)
    getMe().then(data => {
      dispatch(setIsLoadingLogin(true))
      if(data.ok !== 1) {
        dispatch(setIsLoadingLogin(false))
        return dispatch(setErrorMessage(res.message))
      }
      dispatch(setUser(data.data))
      dispatch(setIsLoadingLogin(false))
    })
  })
}

export const userLogin = (username, password) => dispatch => {
  login(username, password).then(res => {
    if(res.ok !== 1) {
     return dispatch(setErrorMessage(res.message))
    }
    setAuthToken(res.token)
    getMe().then(data => {
      dispatch(setIsLoadingLogin(true))
      if(data.ok !== 1) {
        dispatch(setIsLoadingLogin(false))
        return dispatch(setErrorMessage(data.message))
      }
      dispatch(setUser(data.data))
      dispatch(setIsLoadingLogin(false))
    })
  })
}


export const getTokenLogin = () => dispatch => {
  getMe().then(data => {
    dispatch(setIsLoadingLogin(true))
      if(data.ok !== 1) {
        dispatch(setIsLoadingLogin(false))
        return dispatch(setErrorMessage(data.message))
      }
      dispatch(setUser(data.data))
      dispatch(setIsLoadingLogin(false))
  })
}

export default userReducer.reducer;
