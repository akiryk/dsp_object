import React, { useState } from "react";
import { useDataSubscription } from "../DSP";
import Modal from "./Modal";
import ModalContent from "./ModalContent";

const makeModalUpdater = ({ setIsOpen, setAdditionalData, setType }) => ({
  data
}) => {
  const { isModalOpen, additionalData, type } = data;
  setIsOpen(isModalOpen);
  setAdditionalData(additionalData);
  setType(type);
};

const ModalContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [additionalData, setAdditionalData] = useState(null);
  const [type, setType] = useState("");

  useDataSubscription({
    groupName: "GLOBAL_UI",
    identifier: "MODAL",
    // dispatchSubscriptionUpdate will be invoked whenever state of modal changes
    dispatchSubscriptionUpdate: makeModalUpdater({
      setIsOpen,
      setAdditionalData,
      setType
    })
  });

  if (isOpen) {
    return (
      <Modal>
        <div className="modalWrap">
          <div
            role="button"
            tabIndex={0}
            className="modalVeil"
            onClick={() => setIsOpen(false)}
          />
          <button onClick={() => setIsOpen(false)}>Close</button>
          <ModalContent type={type} additionalData={additionalData} />
        </div>
      </Modal>
    );
  }
  return null;
};

export default ModalContainer;
