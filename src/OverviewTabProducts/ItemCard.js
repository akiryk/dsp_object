import React from "react";
import ATRButton from "./ATRButton";
import "./ItemCard.scss";

const ItemCard = ({ data }) => {
  return (
    <div className="ItemCard">
      <h2 className="ItemCard-title">{data.title}</h2>
      <ATRButton
        sku={data.sku}
        title={data.title}
        optionId={data.optionId}
        isConfigurable={data.isConfigurable}
      />
    </div>
  );
};

export default ItemCard;
