import { createContext } from "react";

export const Detailed = createContext({});

export const loadprop = createContext({
  id: 0,
  name: "",
  disc: "",
  cost: "",
});

export const props = createContext({
    id: 0,
    name: '',
    disc: "",
    cost: ""
})

export const Log = createContext({})

export const Updat = createContext({ item_name: "", price: null });