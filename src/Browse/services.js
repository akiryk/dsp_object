import { items1, items2, items3 } from "./items";

const browseProducts = {
  items1, //: [items1[0]],
  items2, // : [items2[0]]
  items3
};

const favoritedItems = [1, 5, 6, 12, 21, 22];

export const fetchBrowseProducts = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(browseProducts[`items${id}`]);
    }, 1000);
  });
};

const getMatchingItems = (prevValue, currentValue) => {
  return favoritedItems.includes(currentValue.id)
    ? [...prevValue, currentValue]
    : prevValue;
};

// this is the fetchItems function passed to DSP
export const fetchFavorites = (items) => {
  const favorites = items.reduce(getMatchingItems, []);
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(favorites);
    }, 1500);
  });
};

export const getShouldShowButtons = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        shouldShowButtons: true
      });
    }, 300);
  });
};

export const updateFavoritesItem = ({ title, optionId, isFavorited }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true
      });
    }, 500);
  });
};
