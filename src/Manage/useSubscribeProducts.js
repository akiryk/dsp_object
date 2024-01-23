import { useContext, useState, useEffect } from "react";
import { fetchProducts, getEvenMoreData } from "./manageServices";
import { DataSubscriptionContext } from "../DSP";

export const useSubscribeProducts = ({ groupName }) => {
  const { registerGroup, getGroupActions } = useContext(
    DataSubscriptionContext
  );
  registerGroup({
    groupName,
    identifierGenerator: (product) => `${product.sku}.${product.id}`
  });

  const { addDataToStore } = getGroupActions({
    groupName
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((products) => {
      addDataToStore(products);
      setProducts(products);
    });
  }, [addDataToStore]);

  useEffect(() => {
    getEvenMoreData().then((data) => {
      addDataToStore(data);
    });
  }, [addDataToStore]);

  return { products };
};
