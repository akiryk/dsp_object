import React, { useState, useEffect } from "react";
import { fetchBrowseProducts, fetchRegistry } from "./services";
// import { RegisterGroup } from "../DSP";
import Overview from "./Overview";
import ATRButtonsConsumer from "./ATRButtonsConsumer";
// import { GROUP_NAME } from "./constants";

// const identifierGenerator = (item) => item.sku;

const OverviewPage = ({ id }) => {
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);

  useEffect(() => {
    fetchBrowseProducts().then((items) => {
      setItems(items);
    });
  }, []);

  if (items.length > 0) {
    return (
      <>
        <ATRButtonsConsumer items={items} />
        <Overview items={items} />
      </>
    );
  }
  return <p>loading...</p>;
};

export default OverviewPage;
