import { useContext, useEffect, useState } from "react";
import { DataSubscriptionContext } from "../DSP";
import { getShouldShowButtons } from "./services";
import { GROUP_NAME } from "./constants";

const INITIAL = "INITIAL";
const SHOULD_FETCH = "SHOULD_FETCH";
const SHOULD_NOT_FETCH = "SHOULD_NOT_FETCH";

const getUnfetchedItemsFromItems = (oldItems, newItems) => {
  return newItems.filter(
    (item) => !oldItems.find((oldItem) => oldItem.id === item.id)
  );
};

const FavoritesButtonsConsumer = ({ items }) => {
  // const [alreadyFetchedItems, setAlreadyFetchedItems] = useState([]);
  const [status, setStatus] = useState(INITIAL);
  const context = useContext(DataSubscriptionContext);
  useEffect(() => {
    // get a reference to group-specific functions
    const groupActions = context.getGroupActions({
      groupName: GROUP_NAME
    });

    if (status === INITIAL) {
      return getShouldShowButtons().then((result) => {
        if (result?.shouldShowButtons) {
          setStatus(SHOULD_FETCH);
        } else {
          setStatus(SHOULD_NOT_FETCH);
        }
      });
    } else if (status === SHOULD_FETCH) {
      // setAlreadyFetchedItems(items);
      // console.log(items);
      // const newItems = getUnfetchedItemsFromItems(alreadyFetchedItems, items);

      console.log("BEGIN FETCH");
      // if (newItems.length > 0) {
      // if we call  this even when length is zero, we enable the group to set status to fetching
      groupActions.fetch(items);
      // }
    }
  }, [items, context, status]);

  // This component doesn't need to render anything so can return null
  return null;
};

export default FavoritesButtonsConsumer;
