import React, { useState } from "react";
import { useDataSubscription } from "../DSP";
import { updateServerWithNewSelectedState } from "./manageServices";
import Button, { buttonStatuses } from "./Button";
import "./main.scss";
// import useModal from "../Modal/useModal";

const { DEFAULT, LOADING } = buttonStatuses;

const makeHandleSelect = ({
  setButtonStatus,
  selected,
  dispatchProductUpdate,
  identifier
}) => (event) => {
  event.stopPropagation();
  setButtonStatus(LOADING);
  updateServerWithNewSelectedState(!selected).then((response) => {
    setButtonStatus(DEFAULT);
    if (response?.success) {
      dispatchProductUpdate({
        identifier: identifier,
        data: {
          isSelected: response.isSelected
        }
      });
    }
  });
};

const Product = ({
  id,
  sku,
  name,
  tagline,
  customerPrice,
  listPrice,
  isSelected,
  dispatchParentModal
}) => {
  const identifier = `${sku}.${id}`;
  const [selected, setSelected] = useState(isSelected);
  const [buttonStatus, setButtonStatus] = useState(DEFAULT);
  const [shipping, setShipping] = useState("");

  const updater = (item) => {
    if (item.data.shipping) {
      setShipping(item.data.shipping);
    }
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

  const handleClick = (e) => {
    dispatchParentModal({
      type: "PRODUCT_MODAL",
      payload: {
        additionalData: {
          id,
          sku,
          name,
          tagline,
          customerPrice,
          listPrice,
          isSelected: selected,
          identifier
        }
      }
    });
  };

  // Expect three renders each time the Select button is clicked because
  // first: re-render with button status of "LOADING"
  // next:  re-render with button status of "DEFAULT"
  // last:  re-render with new selected state

  let text;
  if (buttonStatus === buttonStatuses.LOADING) {
    text = "l o a d i n g . . .";
  } else {
    text = selected ? "Unselect" : "Select";
  }

  const classes = `Product ${selected ? "Product--selected" : ""}`;

  return (
    <div className={classes} onClick={handleClick}>
      {selected && <span className="Product-selected">Selected!</span>}
      <h2 className="Product-name">{name}</h2>
      <p className="Product-tagline">{tagline}</p>
      <div className="Product-price">{customerPrice}</div>
      <div className="Product-list">{listPrice}</div>
      {shipping && <p>{shipping}</p>}
      <div className="Product-checkboxContainer">
        <p>
          <Button
            onClick={makeHandleSelect({
              setButtonStatus,
              selected,
              setSelected,
              dispatchProductUpdate,
              identifier
            })}
            text={text}
            status={buttonStatus}
          />
        </p>
      </div>
    </div>
  );
};

export default Product;
