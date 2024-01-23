import React from "react";
import Product from "./Product";
import "./main.scss";

const ManageItemsContainer = ({ products, dispatchParentModal }) => {
  if (products.length > 0) {
    return (
      <div className="ProductsGrid">
        {products.map((product) => (
          <div key={product.id} className="ProductsGrid-item">
            <Product
              name={product.name}
              tagline={product.tagline}
              customerPrice={product.price.customer}
              listPrice={product.price.list}
              colors={product.colors || []}
              id={product.id}
              sku={product.sku}
              isSelected={!!product.isSelected}
              dispatchParentModal={dispatchParentModal}
            />
          </div>
        ))}
      </div>
    );
  }
  return <p>l o a d i n g...</p>;
};

export default React.memo(ManageItemsContainer);
