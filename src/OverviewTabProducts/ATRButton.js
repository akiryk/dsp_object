import React, { useState, useRef, useEffect } from "react";
import { useDataSubscription } from "../DSP";
import { GROUP_NAME } from "./constants";
import { identifierGenerator } from "./helpers";
import "./ATRButton.scss";

const getUpdateHandler = (setDataState) => (itemInfo) => {
  setDataState(itemInfo.status);
};

const handleClick = () => {};

const ATRButton = ({ sku, title, optionId, isConfigurable }) => {
  const [dataState, setDataState] = useState(null);
  const identifier = identifierGenerator({ sku, title, optionId });
  const actions = useRef();

  actions.current = useDataSubscription({
    groupName: GROUP_NAME,
    identifier,
    dispatchSubscriptionUpdate: getUpdateHandler(setDataState)
  });

  if (dataState === "fetching") {
    return <button className="ATRButton isLoading">Getting Data...</button>;
  }

  if (dataState === "error") {
    return <button className="ATRButton error">ERROR</button>;
  }

  if (dataState === "updating") {
    return <button className="ATRButton isAdding">loading...</button>;
  }

  if (dataState === "found") {
    return (
      <button
        className="ATRButton isSaved"
        onClick={handleClick({
          updateStateOfOneItem: actions.current.updateStateOfOneItem,
          groupName: GROUP_NAME,
          identifier,
          optionId,
          title,
          makeFavorite: false
        })}
      >
        View In Registry
      </button>
    );
  }

  if (dataState === "not-found") {
    return (
      <button
        className="ATRButton"
        onClick={handleClick({
          updateStateOfOneItem: actions.current.updateStateOfOneItem,
          groupName: GROUP_NAME,
          identifier,
          optionId,
          title,
          makeFavorite: true
        })}
      >
        Add To Registry
      </button>
    );
  }
  return null;
};

export default ATRButton;
