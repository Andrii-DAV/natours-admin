import { AuthProvider } from "@refinedev/core";
import { axiosInstance } from "../api.ts";

export const authProvider: AuthProvider = {
  check: async () => {
    const token = localStorage.getItem("jwt");
    return { authenticated: Boolean(token) };
  },
  login: async ({ email, password }) => {
    const { data } = await axiosInstance({
      method: "POST",
      url: "/users/login",
      data: {
        email,
        password,
      },
    });

    if (data.token) {
      localStorage.setItem("jwt", data.token);
      return { success: true };
    }

    return { success: false };
  },
  logout: async () => {
    const { data } = await axiosInstance({
      method: "POST",
      url: "/users/logout",
    });

    if (data.status === "success") {
      localStorage.removeItem("jwt");
    }

    return { success: data.status === "success", redirectTo: "/login" };
  },
  onError: async () => {
    throw new Error("Not implemented");
  },
  // ...
};
