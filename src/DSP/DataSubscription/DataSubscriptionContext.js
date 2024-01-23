import { createContext } from "react";

const DataSubscriptionContext = createContext();

const {
  Provider: DataSubscriptionContextProvider,
  Consumer: DataSubscriptionContextConsumer
} = DataSubscriptionContext;

export default DataSubscriptionContext;
export { DataSubscriptionContextProvider, DataSubscriptionContextConsumer };
