import JWTDecode from "jwt-decode";
import cookieparser from "cookieparser";

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (process.server && process.static) return;
    if (!req.headers.cookie) return;
    const parsed = cookieparser.parse(req.headers.cookie);
    const accessTokenCookie = parsed.__session;
    if (!accessTokenCookie) return;
    const decoded = JWTDecode(accessTokenCookie);
    console.log('decoded', decoded)

    if (decoded) {
      commit("users/SET_USER", {
        uid: decoded.user_id,
        email: decoded.email
      });
    }
  }
};
