import AxiosFactory from "./Axios";

export const singingService = {
  userSigning: (data) => {
    const api = AxiosFactory();
    return api.post("/sign-in", data);
  },
};
