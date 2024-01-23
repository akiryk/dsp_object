import { DEFAULT_GROUP, REGISTERED } from "../dataSubscriptionConstants";
import { getSubscriptionKey } from "./privateMethods";

/**
 * Subscribe
 * Subscribe only adds subscribers and updates them once they are added
 *
 * @param {string} groupName
 * @param {string} identifier
 * @param {function} dispatchSubscriptionUpdate - to be invoked by the Data Provider when updating the subscriber with new data
 * @param {object} data - data associated with the subscriber
 * @param {boolean} linkExistingSubscription
 */
export function subscribe({
  groupName: name,
  identifier: id,
  dispatchSubscriptionUpdate
}) {
  const groupName = name || DEFAULT_GROUP;
  const identifier = id || window.performance.now();
  const subscriptionKey = getSubscriptionKey({
    groupName,
    identifier
  });

  const key = this.key;

  /**
   {
     0: {
       subscriptionKey: 'GROUP_NAME::AAA::123'
       updaterFunction,
       groupName,
       identifier
     }
   } 
   */
  this.subscriptions[key] = {
    subscriptionKey,
    groupName,
    identifier,
    dispatchSubscriptionUpdate
  };

  this.key += 1;

  /**
   {
     // key is subscriptionKey; value is key in this.subscriptions
     GROUP_NAME::AAA::123: [0]
   } 
   */
  this.subscriptionsMap[subscriptionKey] = [
    ...(this.subscriptionsMap[subscriptionKey] || []),
    key
  ];

  if (!this.dataMap[subscriptionKey]) {
    const dataLength = this.data.push({
      subscriptionKey,
      groupName,
      identifier,
      dispatchSubscriptionUpdate,
      status: REGISTERED,
      data: null
    });

    this.dataMap[subscriptionKey] = this.data[dataLength - 1];
    this.dataGroupsMap[groupName] = [
      ...(this.dataGroupsMap[groupName] || []),
      this.data[dataLength - 1]
    ];
  }
  // console.log(this.subscriptionsMap[subscriptionKey]);
  this.updateSubscribers({ groupName, identifier });
  return key;
}

/**
 * unsubscribe
 *
 * @param {number} subscriptionId - the index of the subscribed item
 */
export function unsubscribe(subscriptionId) {
  const subscriptionKey = this.subscriptions[subscriptionId]?.subscriptionKey;
  const indexOfIdInMap = this.subscriptionsMap[subscriptionKey]?.indexOf(
    subscriptionId
  );
  if (subscriptionKey && indexOfIdInMap !== -1) {
    this.subscriptionsMap[subscriptionKey] = [
      ...this.subscriptionsMap[subscriptionKey].slice(0, indexOfIdInMap),
      ...this.subscriptionsMap[subscriptionKey].slice(indexOfIdInMap + 1)
    ];
  }
  delete this.subscriptions[subscriptionId];
}

/**
 * Update state for a subscriber
 *
 * This function is called by a subscriber when the status or data changes, such as
 * when an add-to-registry button is clicked and changes to 'adding'.
 *
 * @param {string} - groupName
 * @param {string} - identifier
 * @param {string} - status, e.g. "registered", "loaded", "not-found"
 * @param {object} - data.
 */
export function updateStateOfOneItem({ groupName }) {
  return ({ identifier, status = "", data = null }) => {
    const dataMap = this.dataMap[`${groupName}::${identifier}`];
    if (!dataMap) {
      // if the group isn't registered or the identifier isn't subscribed,
      // the dataMap key won't exist and we should just return
      return;
    }
    if (status) {
      dataMap.status = status;
    }
    if (data !== null) {
      dataMap.data = {
        ...dataMap.data,
        ...data
      };
    }
    this.updateSubscribers({
      groupName,
      identifier
    });
  };
}

/**
 * getItemData returns data for a specified item
 *
 * @param {string} identifier
 * @return {object} data object for a given item
 */
export function getItemData({ groupName }) {
  return ({ identifier }) =>
    this.dataMap[`${groupName}::${identifier}`]
      ? this.dataMap[`${groupName}::${identifier}`].data
      : null;
}

/**
 * getItemActions
 * Return an object containing references to functions that can be used by a single subsriber
 *
 * @param {string} groupName - the name of the group
 * @return {object} functions that can be used by the individual subscriber
 */
export function getItemActions({ groupName }) {
  return {
    getItemData: this.getItemData({ groupName }),
    updateStateOfOneItem: this.updateStateOfOneItem({ groupName })
  };
}
