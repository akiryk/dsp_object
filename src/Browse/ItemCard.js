import React from "react";
import FavoritesButton from "./FavoritesButton";
import "./ItemCard.scss";

const ItemCard = ({ data }) => {
  return (
    <div className="ItemCard">
      <h2 className="ItemCard-title">{data.title}</h2>
      <FavoritesButton
        title={data.title}
        optionId={data.optionId}
        isConfigurable={data.isConfigurable}
      />
    </div>
  );
};

export default ItemCard;
