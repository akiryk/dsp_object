import React from "react";
import ItemCard from "./ItemCard";

const Browse = ({ items }) => {
  return (
    <div className="grid">
      {items.map((item, index) => (
        <div key={`${item.id}.${index}`} className="grid-item">
          <ItemCard data={item} />
        </div>
      ))}
    </div>
  );
};

export default Browse;
