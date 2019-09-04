import Cookie from 'js-cookie';
import { auth, googleProvider, StoreDB, functions } from '@/services/firebase';

export const state = () => ({
  user: null,
});

export const getters = {
  // eslint-disable-next-line no-shadow
  isAuthenticated(state) {
    return state.user != null;
  },
  // eslint-disable-next-line no-shadow
  isAdmin(state) {
    if (!state.user) { return false; }
    return state.user.admin;
  },
};

export const mutations = {
  // eslint-disable-next-line no-shadow
  SET_USER: (state, account) => {
    state.user = account;
  },
};

export const actions = {
  async login({ commit }, account) {
    try {
      // Login the user
      await auth.signInWithEmailAndPassword(account.email, account.password);

      // Get JWT from Firebase
      const token = await auth.currentUser.getIdToken();
      const idTokenResult = await auth.currentUser.getIdTokenResult();
      const { claims } = idTokenResult;
      let isAdmin = false;
      if (claims.admin) { isAdmin = true; }
      const { email, uid } = auth.currentUser;
      // Set JWT to the cookie
      Cookie.set('__session', token);
      // Set the user locally
      commit('SET_USER', { email, uid, admin: isAdmin });
      if (isAdmin) { this.$router.replace({ path: 'admin' }); }
    

    } catch (error) {
      throw error;
    }
  },
  async logout() {
    await auth.signOut();
    await Cookie.remove('__session');
    // eslint-disable-next-line no-restricted-globals
    location.href = '/';
  },
  async signUserInWithGoogle({ commit }) {
    const obj = await auth.signInWithPopup(googleProvider);
    const token = await auth.currentUser.getIdToken();
    const idTokenResult = await auth.currentUser.getIdTokenResult();
    const isAdmin = idTokenResult.claims.admin || false;
    const user = {
      email: obj.additionalUserInfo.profile.email,
      uid: obj.user.uid,
      admin: isAdmin,
    };
    if (!obj.additionalUserInfo.isNewUser) {
      Cookie.set('__session', token);
      commit('SET_USER', user);
      if (isAdmin) { this.$router.replace({ path: 'admin' }); }
    } else {
      StoreDB.collection('users').add(user).then(() => {
        Cookie.set('__session', token);
        commit('SET_USER', user);
        if (isAdmin) { this.$router.replace({ path: 'admin' }); }
      });
    }
  },
  async addAdminRole({ commit }, email) {
    try {
      const addRole = functions.httpsCallable('addAdminRole');
      // eslint-disable-next-line no-return-await
      return await addRole({ email });
    } catch (error) {
      throw error;
    }
  },
};
