import { createContext, useContext } from "react";
import { PositionsStore, UsersStore } from ".";

const usersStore = new UsersStore();
const positionsStore = new PositionsStore();

const stores = { usersStore, positionsStore };

export const StoreContext = createContext(stores);

export const useStores = () => useContext(StoreContext);