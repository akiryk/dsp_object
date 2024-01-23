import { useReducer, useEffect } from "react";
import { useDataSubscription } from "../DSP";

const initialState = {};
const noop = () => {};

export const modalReducer = (state, action) => {
  const { type, payload } = action;
  const onCloseCallback = payload?.onCloseCallback || noop;
  const onSubmitCallback = payload?.onSubmitCallback || noop;
  const additionalData = payload?.additionalData || {};
  switch (type) {
    case "PRODUCT_MODAL":
      return {
        ...state,
        type,
        isModalOpen: true,
        onCloseCallback,
        onSubmitCallback,
        additionalData: payload?.additionalData
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: false,
        onCloseCallback() {},
        onSubmitCallback() {},
        additionalData
      };
    default:
      return state;
  }
};

const useModal = () => {
  const [state, dispatch] = useReducer(modalReducer, initialState);
  const { updateStateOfOneItem } = useDataSubscription({
    groupName: "GLOBAL_UI",
    identifier: "MODAL"
  });

  useEffect(() => {
    updateStateOfOneItem({
      identifier: "MODAL",
      data: {
        additionalData: state.additionalData,
        type: state.type,
        isModalOpen: state.isModalOpen,
        onCloseCallback: () => state.onCloseCallback,
        onSubmitCallback: () => state.onSubmitCallback
      }
    });
  }, [state, updateStateOfOneItem]);

  return dispatch;
};

export default useModal;
