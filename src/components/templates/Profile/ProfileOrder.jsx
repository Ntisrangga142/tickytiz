import React, { useState } from "react";
import { useOrder } from "../../../contexts/OrderContext.jsx";
import OrderUnPaid from "./OrderUnPaid.jsx";
import OrderPaid from "./OrderPaid.jsx";

function ProfileOrder() {
  const { orders } = useOrder();
  const [expanded, setExpanded] = useState({}); // simpan toggle tiap order

  const toggleDetails = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="space-y-6 w-full mx-auto">
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada order.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="rounded-xl shadow-sm bg-white">
            {/* HEADER CARD */}
            <div className="p-[40px]">
              <div className="flex justify-between items-center mb-2 text-[#AAAAAA] text-[14px]">
                <span>
                  {order.date} - {order.time}
                </span>
                <div className="w-[160px] h-[60px] flex items-center">
                  <img
                    className="w-full object-cover"
                    src={`/assets/imgs/cinema/${order.cinema}.png`}
                    alt="cinema-logo"
                  />
                </div>
              </div>
              <h2 className="text-[24px] tracking-[0.75px] font-semibold mb-3 text-[#000000]">
                {order.movieTitle}
              </h2>
            </div>

            <hr className="border-[#DEDEDE]" />

            {/* STATUS + TOGGLE */}
            <div className="px-[40px] py-[30px] flex flex-row justify-between">
              <div className="flex gap-2 mb-3">
                {order.paymentStatus ? (
                  <>
                    <span className="w-[196px] h-[40px] bg-[#6E719133] text-[#6E7191] text-[14px] font-medium rounded-md flex justify-center items-center">
                      <p>Ticket used</p>
                    </span>
                    <span className="w-[171px] h-[40px] bg-[#1D4ED833] text-[#1D4ED8] text-[14px] font-medium rounded-md flex justify-center items-center">
                      <p>Paid</p>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-[196px] h-[40px] bg-[#00BA8833] text-[#00BA88] text-[14px] font-medium rounded-md flex justify-center items-center">
                      <p>Ticket in active</p>
                    </span>
                    <span className="w-[171px] h-[40px] bg-[#E82C2C33] text-[#E82C2C] text-[14px] font-medium rounded-md flex justify-center items-center">
                      <p>Not Paid</p>
                    </span>
                  </>
                )}
              </div>

              <button
                onClick={() => toggleDetails(index)}
                className="text-[#AAAAAA] text-[18px] flex items-center gap-1 hover:text-gray-700"
              >
                {expanded[index] ? "Hide Details" : "Show Details"}
                <img
                  src="/assets/imgs/icon/Forward.png"
                  alt="icon-arrow-bot"
                  className={`${expanded[index] ? "rotate-90" : "rotate-0"} transition-transform duration-200`}
                />
              </button>
            </div>

            {/* DETAIL */}
            {expanded[index] &&
              (order.paymentStatus ? <OrderPaid order={order} /> : <OrderUnPaid order={order} />)}
          </div>
        ))
      )}
    </div>
  );
}

export default ProfileOrder;
