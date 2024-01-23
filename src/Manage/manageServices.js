import { products, shippingInfo } from "./Data.js";

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(products);
    }, 800);
  });
};

export const updateServerWithNewSelectedState = (selected) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        success: true,
        isSelected: selected
      });
    }, 800);
  });
};

export const getEvenMoreData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(shippingInfo);
    }, 3200);
  });
};
