import React from "react";

function OrderUnPaid({order}) {
  return (
    <div className="px-[40px] py-[30px] flex flex-col gap-[20px]">
      {/* <!-- Virtual Account --> */}
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full mr-[10px]">
        <p className="text-sm text-[#A0A3BD] text-[14px]">No. Rekening Virtual :</p>
        <span className="text-gray-800 font-semibold ml-2 text-[18px]">
          12321328913829724
        </span>
        </div>

        <button className="text-[#1D4ED8] text-sm border border-[#1D4ED8] px-2 py-1 rounded hover:bg-blue-50 w-[72px] h-[48px]">
          Copy
        </button>
      </div>

      {/* <!-- Total Payment --> */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-[#A0A3BD] text-[14px]">Total Payment :</p>
        <span className="text-[#1D4ED8] font-bold text-[18px]">$ {order.totalPrice.toFixed(2)}</span>
      </div>

      {/* <!-- Payment Deadline --> */}
      <p className="text-sm text-[#A0A3BD] tracking-[0.75px] text-[16px] leading-[32px]">
        Pay this payment bill before it is due, on
        <span className="text-red-500 font-medium"> June 23, 2023</span>. If the bill
        has not been paid by the specified time, it will be forfeited.
      </p>

      {/* <!-- Payment Button --> */}
      <button className="w-[190px] h-[50px] bg-[#1D4ED8] hover:bg-[#1D4ED8] text-white py-2 rounded-lg mt-2 text-[14px] tracking-[0.75px]">
        Cek Pembayaran
      </button>
    </div>
  );
}

export default OrderUnPaid;
