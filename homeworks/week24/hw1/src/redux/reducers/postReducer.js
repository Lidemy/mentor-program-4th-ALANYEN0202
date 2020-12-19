import { createSlice } from '@reduxjs/toolkit';
import { getSinglePage, postArticle, updateArticle, deleteArticle, getLimitPosts } from '../../WepAPI'


export const postReducer = createSlice({
  name: 'posts',
  initialState: {
    isLoadingPost: false,
    post: {},
    newPostResponse: null,
    limit: 5,
    activePage: 1,
    allPaginationsNumber: 0,
  },
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    clearPost: (state) => {
      state.post = {}
    },
    setPostResponse: (state, action) => {
      state.newPostResponse = action.payload;
    },
    clearPostResponse: (state) => {
      state.newPostResponse = null
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setAllPaginationsNumber: (state, action) => {
      state.allPaginationsNumber = action.payload;
    }
  },
});

export const { setIsLoadingPost, setPost, clearPost, setPostResponse, clearPostResponse, setIsDelete, setActivePage, setAllPaginationsNumber } = postReducer.actions;

export const getPost = id => dispatch => {
  dispatch(setIsLoadingPost(true))
   return getSinglePage(id).then(res => {
    dispatch(setPost(res))
    dispatch(setIsLoadingPost(false))
    return res
  }).catch(err => {
    console.log(err)
  })
};

export const newPost = (title, body) => dispatch => {
  dispatch(setIsLoadingPost(true))
  postArticle(title, body).then(res => {
    dispatch(setPostResponse(res))
    dispatch(setIsLoadingPost(false))
  }).catch(err => {
    console.log(err)
  })
}

export const updatePost = (title, body, id) => dispatch => {
  updateArticle(title, body, id).then(res => {
    dispatch(setPostResponse(res))
  }).catch(err => {
    console.log(err)
  })
}

export const deletePost = (id) => dispatch => {
  return deleteArticle(id).then(res => res)
}

export const getPosts = (limit, activePage) => dispatch => {
  getLimitPosts(limit, activePage).then(res => {
    const totalPostCount = res.headers.get('x-total-count')
      dispatch(setAllPaginationsNumber(Math.ceil(totalPostCount/limit)))
      return res.json();
  }).then(data => {
    dispatch(setPost(data))
  }).catch(err => {
    console.log(err);
  })
}

export default postReducer.reducer;
