import React from "react";
import ItemCard from "./ItemCard";

const Overview = ({ items }) => {
  return (
    <div className="grid">
      {items.map((item) => (
        <div key={item.id} className="grid-item">
          <ItemCard data={item} />
        </div>
      ))}
    </div>
  );
};

export default Overview;
