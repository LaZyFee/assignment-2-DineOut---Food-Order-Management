import { useState } from "react";
import { MinusSVG } from "../SVGs/MinusSVG";
import { PlusSVG } from "../SVGs/PlusSVG";

const menuItems = [
  { id: 1, name: "Hamburger", price: 100, image: "./assets/hamburger.svg" },
  { id: 2, name: "Chicken Nuggets", price: 200, image: "./assets/chicken.svg" },
  {
    id: 3,
    name: "Submarine Sandwich",
    price: 300,
    image: "./assets/submarine.svg",
  },
  { id: 4, name: "Pizza slices", price: 400, image: "./assets/pizza.svg" },
];

export const CreateOrder = ({ onOrderPlaced }) => {
  const [customerName, setCustomerName] = useState("");
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [showError, setShowError] = useState(false);
  const [qty, setQty] = useState(0);

  const toggleItem = (id) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const totalPrice = selectedItemIds.reduce((sum, id) => {
    const item = menuItems.find((i) => i.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const handleToggle = (isAdding) => {
    setQty((prev) => (isAdding ? prev + 1 : Math.max(prev - 1, 0)));
  };

  const handlePlaceOrder = () => {
    if (!customerName.trim()) {
      setShowError(true);
      return;
    }

    // Send data to parent
    onOrderPlaced({
      customerName,
      selectedItemIds,
      totalPrice,
      qty,
    });

    // Reset form
    setShowError(false);
    setCustomerName("");
    setQty(0);
    setSelectedItemIds([]);
  };

  return (
    <div className="bg-cardbg rounded-lg p-6 h-[calc(100vh_-_130px)]">
      <h2 className="text-xl font-bold mb-1">CREATE ORDER</h2>
      <p className="text-gray-400 text-sm mb-4">
        Accurately fulfill customer orders based on a precise understanding of
        their requirements.
      </p>

      {/* Customer Name Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => {
            setCustomerName(e.target.value);
            setShowError(false);
          }}
          className={`w-full bg-gray-700 bg-opacity-50 rounded-md p-2 focus:outline-none transition-all duration-300 ${
            showError
              ? "border border-red-500 focus:ring-red-500"
              : "focus:ring-2 focus:ring-primary"
          }`}
          placeholder="Enter name"
        />
        {showError && (
          <p className="text-red-500 mt-2">Enter your name first</p>
        )}
      </div>

      {/* Choose Items */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Choose Items</label>
        <div className="items-container">
          {menuItems.map((item) => {
            const isSelected = selectedItemIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-gray-700 bg-opacity-30 rounded-md p-3 mb-3 flex justify-between items-center hover:bg-opacity-40 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center mr-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-400">BDT {item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const isAlreadySelected = selectedItemIds.includes(item.id);
                    toggleItem(item.id);
                    handleToggle(!isAlreadySelected, item.price); // true if adding, false if removing
                  }}
                  className="w-8 h-8 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  {isSelected ? <MinusSVG /> : <PlusSVG />}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        disabled={totalPrice === 0}
        className={`w-full text-white font-medium py-3 rounded-full transition-all duration-300 transform 
    ${
      totalPrice === 0
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-primary hover:bg-opacity-90 hover:shadow-lg hover:-translate-y-1"
    }`}
      >
        Place Order (BDT {totalPrice})
      </button>
    </div>
  );
};
