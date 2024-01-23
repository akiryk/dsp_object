import React from "react";
import ProductModal from "../Manage/ProductModal";

const components = {
  PRODUCT_MODAL: ProductModal
};

const ModalContent = ({ type, additionalData }) => {
  const Component = components[type];
  return <Component additionalData={additionalData} />;
};

export default ModalContent;
