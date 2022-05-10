import AxiosFactory from "./Axios";

export const contactService = {
  
  getContacts: () => {   
    const api = AxiosFactory("contacts");
    return api.get("/");
  },
  
  
  addContact: (data) => {
    const api = AxiosFactory("contacts");
    return api.post("/", data);
  },
};
