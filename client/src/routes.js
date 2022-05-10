import Contacts from "./views/Contacts";
import CreateContact from "./views/Contacts/components/CreateContact";
import ContactList from "./views/Contacts/components/ContactList";

export const routes = [
  {
    path: "/contacts",
    component: Contacts,
    routes: [
      {
        path: "/contacts/all",
        component: ContactList,
      },
      {
        path: "/contacts/new",
        component: CreateContact,
      },
    ],
  },
];
