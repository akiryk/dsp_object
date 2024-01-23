import React from "react";
import ManageItemsHeader from "./ManageItemsHeader";
import ManageItemsContainer from "./ManageItemsContainer";
import { useSubscribeProducts } from "./useSubscribeProducts";
import useModal from "../Modal/useModal";

import "./main.scss";

const groupName = "REGISTRY_PRODUCTS_GROUP";

const ManagePage = () => {
  const { products } = useSubscribeProducts({ groupName });
  const dispatchParentModal = useModal();

  return (
    <>
      <ManageItemsHeader groupName={groupName} />
      <ManageItemsContainer
        products={products}
        dispatchParentModal={dispatchParentModal}
      />
    </>
  );
};

export default ManagePage;
