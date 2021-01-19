import { queryCurrent, query as queryUsers } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      let item =yield sessionStorage.getItem("X-USER");
      yield put({
        type: 'save',
        payload: JSON.parse(item),
      });
    },

    *fetchCurrent(_, { call, put }) {
      let item =yield sessionStorage.getItem("X-USER");
      yield put({
        type: 'saveCurrentUser',
        payload: JSON.parse(item),
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
