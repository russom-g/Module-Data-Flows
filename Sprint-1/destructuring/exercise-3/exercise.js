let order = [
  { itemName: "Hot cakes", quantity: 1, unitPricePence: 232 },
  { itemName: "Apple Pie", quantity: 2, unitPricePence: 139 },
  { itemName: "Egg McMuffin", quantity: 1, unitPricePence: 280 },
  { itemName: "Sausage McMuffin", quantity: 1, unitPricePence: 300 },
  { itemName: "Hot Coffee", quantity: 2, unitPricePence: 100 },
  { itemName: "Hash Brown", quantity: 4, unitPricePence: 40 },
];

function printReceipt(order) {
  let total = 0;

  console.log("QTY".padEnd(8) + "ITEM".padEnd(22) + "TOTAL");
  
  order.forEach(({ quantity, itemName, unitPricePence }) => {
    
    let itemTotal = quantity * unitPricePence;
    
    total = total + itemTotal;
    
    let priceInPounds = itemTotal / 100;
    
    console.log(
      quantity.toString().padEnd(8) +
        itemName.padEnd(22) +
        priceInPounds.toFixed(2)
    );
  });

  console.log("\nTotal: " + (total / 100).toFixed(2));
}

printReceipt(order);
// 1. Log each item quantity and name.
// 2. Log total cost.
// 3.
