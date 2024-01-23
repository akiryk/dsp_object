import { products, registryItems, registryData } from "./items";

/**
 * Check if this customer has a registry, if they do we'll show buttons
 *
 * @param {number} customerId
 */
export const getShouldShowButtons = (customerId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        shouldShowButtons: true
      });
    }, 300);
  });
};

/**
 * Get the registry skus by registry ID
 *
 * @param {number} registryId
 */
export const getRegistryItems = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject("ugh, it no work");
      resolve(registryData);
    }, 1000);
  });
};

/**
 * Find all the products that are already in a customer's registry
 * 1. Create an array of all registry skus
 * 2. Filter the products to find only those with skus that match the registry
 *
 * @param {array} products
 * @param {array} registryItems
 *
 * @return {array} array of products that are in the registry
 */
export const getMatchingItems = ({ products, registryItems }) => {
  const registryItemSkus = registryItems.map((item) => item.sku);
  // return the skus of any products that are on the registry
  return products.filter((item) => registryItemSkus.includes(item.sku));
};

export const fetchBrowseProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(products);
    }, 200);
  });
};

const extractSkusFromRegistryData = (response) => {
  const edges =
    response?.data?.registry?.registries[0]?.items?.itemConnection?.edges;
  if (!edges) {
    console.log("no edges");
    return;
  }

  return edges.map((edge) => {
    return {
      sku: edge.node?.registryProduct?.product?.sku,
      options: edge.selectedOptionIds || []
    };
  });
};

export const fetchRegistry = (items) => {
  return getRegistryItems()
    .then(extractSkusFromRegistryData)
    .then((registryItems) => {
      const productsThatAreInTheRegistry = getMatchingItems({
        registryItems,
        products: items
      });
      // return the products that are in the registry to the data subscription provider
      // which will change their status to "found" and will add their data to the store
      return productsThatAreInTheRegistry;
    });
};
