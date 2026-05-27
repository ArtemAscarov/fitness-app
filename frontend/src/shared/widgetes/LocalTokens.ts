import { AuthTokens } from "../types/type";

class LocalTokensClass {
  getTokens() {
    const refreshToken = localStorage.getItem("refreshToken");
    const accesToken = localStorage.getItem("accesToken");

    return { refreshToken, accesToken };
  }

  getAcces() {
    const accesToken = localStorage.getItem("accesToken");

    return accesToken;
  }

  getRefresh() {
    const accesToken = localStorage.getItem("refreshToken");

    return accesToken;
  }

  clearTokens() {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accesToken");
  }

  setTokens(tokens: AuthTokens) {
    localStorage.setItem("refreshToken", tokens.refreshToken);
    localStorage.setItem("accesToken", tokens.accesToken);
  }
}

export const LocalTokens = new LocalTokensClass();
