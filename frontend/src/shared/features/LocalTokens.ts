import { AuthTokens } from "../types/type";

class LocalTokensClass {
  getTokens() {
    const refreshToken = localStorage.getItem("refreshToken");
    const accesToken = localStorage.getItem("accesToken");

    const sessionRefreshToken = sessionStorage.getItem("refreshToken");
    const sessionAccesToken = sessionStorage.getItem("accesToken");

    if (refreshToken || accesToken) return { refreshToken, accesToken };
    if (sessionRefreshToken || sessionAccesToken)
      return { sessionRefreshToken, sessionAccesToken };
  }

  getAcces() {
    const accesToken = localStorage.getItem("accesToken");
    const sessionAccesToken = sessionStorage.getItem("accesToken");

    return accesToken ? accesToken : sessionAccesToken;
  }

  getRefresh() {
    const refreshToken = localStorage.getItem("refreshToken");
    const sessionRefreshToken = sessionStorage.getItem("refreshToken");

    return refreshToken ? refreshToken : sessionRefreshToken;
  }

  clearTokens() {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accesToken");

    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accesToken");
  }

  setTokens(tokens: AuthTokens) {
    localStorage.setItem("refreshToken", tokens.refreshToken);
    localStorage.setItem("accesToken", tokens.accesToken);
  }

  setSessionTokens(tokens: AuthTokens) {
    sessionStorage.setItem("refreshToken", tokens.refreshToken);
    sessionStorage.setItem("accesToken", tokens.accesToken);
  }
}

export const LocalTokens = new LocalTokensClass();
