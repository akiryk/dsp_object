import React, { useState, useEffect } from "react";
import { fetchBrowseProducts, fetchFavorites } from "./services";
import { RegisterGroup } from "../DSP";
import Browse from "./Browse";
import FavoritesButtonsConsumer from "./FavoritesButtonsConsumer";
import { GROUP_NAME } from "./constants";

const identifierGenerator = (item) => `${item.title}.${item.optionId}`;

const BrowsePage = ({ id }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchBrowseProducts(1).then((items) => {
      setItems(items);
    });
  }, []);

  // mock a second fetch that might occur after scroll
  // useEffect(() => {
  //   setTimeout(() => {
  //     fetchBrowseProducts(2).then((newItems) => {
  //       setItems((prevItems) => [...prevItems, ...newItems]);
  //     });
  //   }, 2000);
  // }, []);

  // mock a third fetch that might occur after scroll
  // useEffect(() => {
  //   setTimeout(() => {
  //     fetchBrowseProducts(3).then((newItems = []) => {
  //       setItems((prevItems) => [...prevItems, ...newItems]);
  //     });
  //   }, 4000);
  // }, []);

  if (items.length > 0) {
    return (
      <>
        <RegisterGroup
          groupName={GROUP_NAME}
          fetchItems={fetchFavorites}
          identifierGenerator={identifierGenerator}
        />
        <FavoritesButtonsConsumer items={items} />
        <Browse items={items} />
      </>
    );
  }
  return <p>loading...</p>;
};

export default BrowsePage;
