import { MoveDown, MoveRight } from "lucide-react";
import logoImg from "/assets/imgs/logo/logo.png";
import backgroundImage from "/assets/imgs/log-in/background-login.png";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
  
function TicketMain() {
  const navigate = useNavigate();
    const orderData = useSelector((state) => state.order.orders);

  if (!orderData) {
    return (
      <div className="text-center p-10">
        <h2 className="text-xl font-semibold mb-4">No order data found.</h2>
        <p>Please complete your order first.</p>
      </div>
    );
  }

  // Format tanggal dan kursi
  const formattedDate = new Date(orderData.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const seatList = orderData.seats?.join(", ") || "";

   const handleDoneClick = () => {
    navigate("/"); // navigasi ke halaman home
  };

  return (
    <>
      <div className="bg-gray-200">
        <div className="flex flex-col lg:flex-row">
          <section
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
            }}
            className="h-150 w-full bg-cover lg:h-200"
          >
            <div className="flex h-full w-full flex-row items-center px-5 lg:px-10 2xl:pl-40">
              <div className="flex flex-col items-center gap-5 lg:items-start">
                <div className="mt-[80px]">
                  <img
                    src={logoImg}
                    alt={`logo.png`}
                    className={`w-[17.25rem] h-[6.5rem]`}
                  />
                </div>
                <h1 className="text-center text-5xl font-bold text-white lg:text-left">
                  Thank you For Purchasing
                </h1>
                <p className="text-center text-xl text-gray-300 lg:text-left">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolore numquam atque consequuntur amet error nemo?
                </p>
                <div className="flex items-center gap-5">
                  <h3 className="text-center text-xl text-white lg:text-left">
                    Please Download Your Ticket
                  </h3>
                  <div className="text-white">
                    <span className="block lg:hidden">
                      <MoveDown />
                    </span>
                    <span className="hidden lg:block">
                      <MoveRight />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right Container */}
          <section className="flex flex-col items-center justify-center gap-5 p-10 xl:px-40">
            <div className="w-75 overflow-hidden rounded-2xl bg-white p-5 xl:w-80">
              <div className="flex flex-col items-center gap-5">
                <img
                  src="/assets/imgs/ticket-result/QR Code 1.png"
                  alt="Barcode Ticket"
                  className="w-50"
                />

                <div className="relative mb-5 flex w-84 items-center justify-between xl:w-88">
                  <div className="absolute h-8 w-8 rounded-full bg-gray-200"></div>
                  <hr className="w-full border-dashed border-gray-200" />
                  <div className="absolute right-0 h-8 w-8 rounded-full bg-gray-200"></div>
                </div>

                <div className="flex w-full justify-between gap-10">
                  <div className="flex flex-col gap-5">
                    <div>
                      <h4 className="font-regular text-secondary">Movie</h4>
                      <h4 className="font-regular">{orderData.movieTitle}</h4>
                    </div>
                    <div>
                      <h4 className="font-regular text-secondary">Date</h4>
                      <h4 className="font-regular">{formattedDate}</h4>
                    </div>
                    <div>
                      <h4 className="font-regular text-secondary">Count</h4>
                      <h4 className="font-regular">{orderData.seats.length} pcs</h4>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div>
                      <h4 className="font-regular text-secondary">Category</h4>
                      <h4 className="font-regular">{orderData.category || "PG-13"}</h4>
                    </div>
                    <div>
                      <h4 className="font-regular text-secondary">Time</h4>
                      <h4 className="font-regular">{orderData.time}</h4>
                    </div>
                    <div>
                      <h4 className="font-regular text-secondary">Seats</h4>
                      <h4 className="font-regular">{seatList}</h4>
                    </div>
                  </div>
                </div>

                <div className="flex w-full justify-between rounded-lg border border-gray-200 p-2">
                  <h3 className="font-regular">Total</h3>
                  <h3 className="font-regular">${orderData.totalPrice}</h3>
                </div>
              </div>
            </div>
            <div className="flex w-75 flex-col gap-3 xl:w-80">
              <button className="rounded-lg border border-blue-600 px-4 py-2 text-blue-700">
                Download
              </button>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white" onClick={handleDoneClick}>
                Done
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default TicketMain;
