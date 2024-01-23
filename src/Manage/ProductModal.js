import React, { useState } from "react";
import { updateServerWithNewSelectedState } from "../Manage/manageServices";
import Button, { buttonStatuses } from "./Button";
import { useDataSubscription } from "../DSP";

const { DEFAULT, LOADING } = buttonStatuses;

const ProductModal = ({ additionalData }) => {
  const {
    name,
    tagline,
    customerPrice,
    isSelected,
    identifier
    // dispatchProductUpdate
  } = additionalData;

  const [selected, setSelected] = useState(isSelected);
  const [buttonStatus, setButtonStatus] = useState(DEFAULT);

  const updater = (item) => {
    if (item?.data.isSelected) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  const { updateStateOfOneItem: dispatchProductUpdate } = useDataSubscription({
    groupName: "REGISTRY_PRODUCTS_GROUP",
    identifier,
    dispatchSubscriptionUpdate: updater
  });

  const handleSelect = () => {
    setButtonStatus(LOADING);
    updateServerWithNewSelectedState(!selected).then((response) => {
      setButtonStatus(DEFAULT);
      if (response?.success) {
        setSelected((prev) => !prev);
        dispatchProductUpdate({
          identifier: identifier,
          data: {
            isSelected: response.isSelected
          }
        });
      }
    });
  };

  let text;
  if (buttonStatus === buttonStatuses.LOADING) {
    text = "l o a d i n g . . .";
  } else {
    text = selected ? "Unselect" : "Select";
  }

  return (
    <div className="modalContent">
      <h3>Modal Title</h3>
      <div className="Product-checkboxContainer">
        <p>
          {selected && <span>Selected!</span>}
          <Button onClick={handleSelect} text={text} status={buttonStatus} />
        </p>
      </div>
      <p>{name}</p>
      <p>{tagline}</p>
      <p>{customerPrice}</p>
    </div>
  );
};

export default ProductModal;
