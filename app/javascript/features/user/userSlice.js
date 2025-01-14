import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserApi from '../../services/api/userApiClient';

const userApi = new UserApi();

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (query={}) => {
  // const headers = {
  //   'access-token': localStorage.getItem('access-token'),
  //   client: localStorage.getItem('client'),
  //   uid: localStorage.getItem('uid'),
  // };
  return await userApi.getAll(query);
});

export const fetchSellers = createAsyncThunk('user/fetchSellers', async () => {
  const headers = {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  };
  return await userApi.getAll("sellers");
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
  const headers = {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  };
  await userApi.delete(id, headers);
  return id;
});

export const addUser = createAsyncThunk('user/addUser', async (user) => {
  const headers = {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  };
  const response = await userApi.post(user, headers);
  return response.data;
});

export const updateUser = createAsyncThunk('user/updateUser', async (user) => {
  
  const headers = {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  };
  const response = await userApi.patch(user);
  return response.data;
});

export const userToggleStatus = createAsyncThunk('user/toggleStatus',async (id) => {
    const headers = {
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem(id),
    };
    const response = await userApi.toggleStatus(id);
    return response.data;
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          const index = state.users.findIndex((user) => user.id === action.payload.id);
      
          if (index !== -1) {
            state.users[index] = {
              ...state.users[index],
              ...action.payload,
            };
          }
        }
      })
      
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(userToggleStatus.fulfilled, (state, action) => {
        const user = state.users.find((user) => user.id === action.payload.id);
        user.status = action.payload.status;
      });
      

  },
});

export default userSlice.reducer;
