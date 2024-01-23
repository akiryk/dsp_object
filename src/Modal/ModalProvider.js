import React, { useContext, useEffect, useState } from "react";
import { DataSubscriptionContext } from "../DSP";
import ModalContainer from "./ModalContainer";

const ModalProvider = () => {
  const { registerGroup, getGroupActions } = useContext(
    DataSubscriptionContext
  );
  const [isReady, setIsReady] = useState(false);

  // Register a store to manage state for UI components
  useEffect(() => {
    registerGroup({
      groupName: "GLOBAL_UI",
      identifierGenerator: (item) => item.type
    });
  }, [registerGroup]);

  useEffect(() => {
    getGroupActions({
      groupName: "GLOBAL_UI"
    })
      .addDataToStore([{ type: "MODAL" }])
      .then(() => {
        setIsReady(true);
      });
  }, [getGroupActions]);

  if (!isReady) {
    return null;
  }

  return <ModalContainer />;
};

export default ModalProvider;
