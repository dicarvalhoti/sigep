export const currentUser = (state) => state.auth.currentUser;
export const authLoading = (state) => state.auth.loading;
export const authError = (state) => state.auth.error;
export const isAuthenticated = (state) => !!state.auth.currentUser;
export const isAdmin = (state) => state.isAdmin;