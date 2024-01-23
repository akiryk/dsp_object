/**
 * Return a string to identify an item based on particular properties
 *
 * @param {object} item
 * @return {string} the identifier of an item in the data store
 */
export const identifierGenerator = (item) => `${item.sku}.${item.optionId}`;
