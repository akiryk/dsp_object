export const products = [
  {
    title: "Table",
    id: 1,
    sku: "table",
    optionId: "MODERN",
    isConfigurable: false
  },
  {
    title: "Chair",
    id: 2,
    sku: "vvv",
    optionId: "WOODEN",
    isConfigurable: true
  },
  {
    title: "Plate",
    id: 3,
    sku: "PLATE",
    optionId: "GLASS",
    isConfigurable: false
  },
  {
    title: "Spoon",
    id: 4,
    sku: "spoon",
    optionId: "GOLD",
    isConfigurable: false
  }
];

export const registryItems = [
  {
    id: 1,
    sku: "ccc",
    optionId: "GLASS",
    mostWanted: false
  },
  {
    id: 2,
    sku: "Glue Gun",
    optionId: "",
    mostWanted: false
  },
  {
    id: 3,
    sku: "Set of Lamps",
    optionId: "GLASS",
    mostWanted: false
  },
  {
    id: 4,
    sku: "spoon",
    optionId: "GOLD",
    mostWanted: true
  },
  {
    id: 5,
    sku: "High Rise Stool",
    optionId: "FOOLS_GOLD",
    mostWanted: false
  }
];

export const registryData = {
  data: {
    registry: {
      registries: [
        {
          items: {
            itemConnection: {
              edges: [
                {
                  node: {
                    registryProduct: {
                      product: {
                        sku: "PLATE"
                      }
                    },
                    selectedOptionIds: []
                  }
                },
                {
                  node: {
                    registryProduct: {
                      product: {
                        sku: "donkey"
                      }
                    },
                    selectedOptionIds: []
                  }
                }
              ]
            }
          }
        }
      ]
    }
  }
};
