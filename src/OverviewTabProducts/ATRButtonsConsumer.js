import React, { useContext, useEffect, useState } from "react";
import { DataSubscriptionContext, RegisterGroup } from "../DSP";
import { fetchRegistry } from "./services";
import { GROUP_NAME } from "./constants";
import { identifierGenerator } from "./helpers";

const INITIAL = "INITIAL";
const FETCHING = "FETCHING";

const ATRButtonsConsumer = ({ items }) => {
  const [status, setStatus] = useState(INITIAL);
  const context = useContext(DataSubscriptionContext);
  useEffect(() => {
    setTimeout(() => {
      setStatus("ready");
    }, 500);
  }, []);
  useEffect(() => {
    // get a reference to group-specific functions
    const { fetch } = context.getGroupActions({
      groupName: GROUP_NAME
    });

    // In some situations, we might not want to display the ATR buttons at all.
    // We could check for that first and change the status accordingly
    // In this case, assume we want to fetch right away
    if (status === INITIAL) {
      setStatus(FETCHING);
      // fetch will call fetchRegistry() in the services file
      fetch(items).catch((error) => {
        console.log(`errors`, error);
      });
    }
  }, [items, context, status]);

  return (
    <RegisterGroup
      groupName={GROUP_NAME}
      fetchItems={fetchRegistry}
      identifierGenerator={identifierGenerator}
    />
  );
};

export default ATRButtonsConsumer;
