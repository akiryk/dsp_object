import React, { useState, useRef, useEffect } from "react";
import { useDataSubscription } from "../DSP";
import { updateFavoritesItem } from "./services";
import { GROUP_NAME } from "./constants";
import "./FavoritesButton.scss";

const getUpdateHandler = (setDataState) => (itemInfo) => {
  setDataState(itemInfo.status);
};

const updateItem = ({
  updateStateOfOneItem,
  identifier,
  optionId,
  title,
  makeFavorite
}) => {
  // the button should handle its own saving/deleting etc
  updateFavoritesItem({ title, optionId, isFavorited: makeFavorite })
    .then((data) => {
      const status = makeFavorite ? "found" : "not-found";
      updateStateOfOneItem({ identifier, status, data });
    })
    .catch((error) => {
      updateStateOfOneItem({
        identifier,
        status: "error",
        data: error
      });
    });
};

const handleClick = ({
  updateStateOfOneItem,
  identifier,
  optionId,
  makeFavorite,
  title
}) => () => {
  updateStateOfOneItem({ identifier, status: "updating" });
  updateItem({
    updateStateOfOneItem,
    identifier,
    optionId,
    makeFavorite,
    title
  });
};

const FavoritesButton = ({ title, optionId, isConfigurable }) => {
  const [dataState, setDataState] = useState(null);
  const identifier = `${title}.${optionId}`;
  const actions = useRef();

  actions.current = useDataSubscription({
    groupName: GROUP_NAME,
    identifier,
    dispatchSubscriptionUpdate: getUpdateHandler(setDataState)
  });

  if (dataState === "fetching") {
    return (
      <button className="FavoritesButton isLoading">Getting Data...</button>
    );
  }

  if (dataState === "error") {
    return <button className="FavoritesButton error">ERROR</button>;
  }

  if (dataState === "updating") {
    return <button className="FavoritesButton isAdding">loading...</button>;
  }

  if (dataState === "found") {
    return (
      <button
        className="FavoritesButton isSaved"
        onClick={handleClick({
          updateStateOfOneItem: actions.current.updateStateOfOneItem,
          groupName: GROUP_NAME,
          identifier,
          optionId,
          title,
          makeFavorite: false
        })}
      >
        Mark Unfavorited
      </button>
    );
  }

  if (dataState === "not-found" && isConfigurable) {
    return (
      <button className="FavoritesButton isConfigurable">Choose Options</button>
    );
  }

  if (dataState === "not-found" && !isConfigurable) {
    return (
      <button
        className="FavoritesButton"
        onClick={handleClick({
          updateStateOfOneItem: actions.current.updateStateOfOneItem,
          groupName: GROUP_NAME,
          identifier,
          optionId,
          title,
          makeFavorite: true
        })}
      >
        Favorite
      </button>
    );
  }
  return null;
};

export default FavoritesButton;
