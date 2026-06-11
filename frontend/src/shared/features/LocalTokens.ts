import { AuthTokens } from "../types/type";

class LocalTokensClass {
  private checkWindow() {
    if (typeof window === "undefined") return false;
    return true;
  }

  getTokens() {
    if (!this.checkWindow()) return undefined;

    const refreshToken = localStorage.getItem("refreshToken");
    const accesToken = localStorage.getItem("accesToken");

    const sessionRefreshToken = sessionStorage.getItem("refreshToken");
    const sessionAccesToken = sessionStorage.getItem("accesToken");

    if (refreshToken || accesToken) return { refreshToken, accesToken };
    if (sessionRefreshToken || sessionAccesToken)
      return {
        refreshToken: sessionRefreshToken,
        accesToken: sessionAccesToken,
      };
  }

  getAcces() {
    if (!this.checkWindow()) return undefined;

    const accesToken = localStorage.getItem("accesToken");
    const sessionAccesToken = sessionStorage.getItem("accesToken");

    return accesToken ? accesToken : sessionAccesToken;
  }

  getRefresh() {
    if (!this.checkWindow()) return undefined;

    const refreshToken = localStorage.getItem("refreshToken");
    const sessionRefreshToken = sessionStorage.getItem("refreshToken");

    return refreshToken ? refreshToken : sessionRefreshToken;
  }

  clearTokens() {
    if (!this.checkWindow()) return undefined;

    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accesToken");

    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accesToken");
  }

  setTokens(tokens: AuthTokens) {
    if (!this.checkWindow()) return undefined;

    localStorage.setItem("refreshToken", tokens.refreshToken);
    localStorage.setItem("accesToken", tokens.accesToken);
  }

  setSessionTokens(tokens: AuthTokens) {
    if (!this.checkWindow()) return undefined;

    sessionStorage.setItem("refreshToken", tokens.refreshToken);
    sessionStorage.setItem("accesToken", tokens.accesToken);
  }
}

export const LocalTokens = new LocalTokensClass();
