import React from "react";
import { useState } from "react";

import { useDataSubscription } from "../DSP";

const ManageItemsHeader = () => {
  const [isSelected, setIsSelected] = useState(false);
  useDataSubscription({
    identifier: "AAA.1",
    groupName: "REGISTRY_PRODUCTS_GROUP",
    dispatchSubscriptionUpdate: (item) => {
      setIsSelected(item?.data?.isSelected);
    }
  });

  return (
    <div>
      <h1>Header</h1>
      <p>Some special info about the Johnny's Shrimp product:</p>
      <p>That product {`${isSelected ? "is selected" : "is not selected"}`}</p>
    </div>
  );
};
export default ManageItemsHeader;
