import { useState } from "react";
import { FilterSVG } from "../SVGs/FilterSVG";

export const OrderReports = ({ orders }) => {
  const [filterStatus, setFilterStatus] = useState("All");

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    filterStatus === "All" ? true : order.status === filterStatus
  );

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Order Reports</h2>

        <div className="flex gap-4 items-center">
          <FilterSVG />
          <select
            onChange={handleFilterChange}
            className="appearance-none bg-zinc-900 accent-orange-600 border-none outline-none rounded-sm"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="bg-cardbg rounded-lg p-4">
        <div className="reports-container">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Customer Name</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {[...filteredOrders]
                .map((order) => ({
                  order,
                  originalIndex: orders.indexOf(order),
                }))
                .reverse()
                .map(({ order, originalIndex }) => (
                  <tr key={originalIndex} className="border-t border-gray-700">
                    <td className="py-3">{originalIndex + 1}</td>
                    <td className="py-3">{order.customerName}</td>
                    <td className="py-3">{order.qty}</td>
                    <td className="py-3">{order.totalPrice}</td>
                    <td className="py-3">
                      <span
                        className={`${
                          order.status === "Pending"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3">
                      <button
                        className="bg-gray-800 hover:bg-red-600 text-xs px-3 py-1 rounded-full mr-1 transition-colors duration-300"
                        onClick={() => order.onDelete(originalIndex)}
                      >
                        Delete
                      </button>
                      {order.status === "Pending" && (
                        <button
                          className="bg-gray-800 hover:bg-green-600 text-xs px-3 py-1 rounded-full transition-colors duration-300"
                          onClick={() => order.onDeliver(originalIndex)}
                        >
                          DELIVER
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-400">
                    No orders to show.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
