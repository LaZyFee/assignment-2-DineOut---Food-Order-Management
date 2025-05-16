import { useState } from "react";
import { CreateOrder } from "../../Components/HomePageComponents/CreateOrder";
import { OrderReports } from "../../Components/HomePageComponents/OrderReports";
import { OrderSummary } from "../../Components/HomePageComponents/OrderSummary";

export const DashBoard = () => {
  const [orders, setOrders] = useState([]);
  const handleOrderPlaced = (orderData) => {
    const newOrder = {
      ...orderData,
      status: "Pending",
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  const handleDelete = (index) => {
    setOrders((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeliver = (index) => {
    setOrders((prev) =>
      prev.map((order, i) =>
        i === index ? { ...order, status: "Delivered" } : order
      )
    );
  };

  const ordersWithHandlers = orders.map((order) => ({
    ...order,
    onDelete: handleDelete,
    onDeliver: handleDeliver,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 flex-grow">
      <CreateOrder onOrderPlaced={handleOrderPlaced} />

      <div className="md:col-span-2 h-[calc(100vh_-_130px)]">
        <OrderSummary orders={orders} />
        <OrderReports orders={ordersWithHandlers} />
      </div>
    </div>
  );
};
