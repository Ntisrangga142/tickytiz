import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addOrder } from "../../../redux/order/orderSlice";
import { useOrder } from "../../../contexts/OrderContext.jsx";

function PaymentMain() {
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addOrder: addOrderContext } = useOrder();

  // Ambil order data dari Redux (misal pakai key "current")
  const orderData = useSelector((state) => state.order.orders);

  // State input personal info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

  // State error
  const [errors, setErrors] = useState({});

  if (!orderData) {
    return (
      <main className="text-center p-10">
        <h2 className="text-xl font-semibold mb-4">No order data found.</h2>
        <p>Please select a movie and seats first.</p>
      </main>
    );
  }

  const formattedDate = new Date(orderData.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handlePaymentMethodClick = (method) => {
    setSelectedPayment(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let tempErrors = {};

    if (!name.trim()) tempErrors.name = "Full Name is required";
    if (!email.trim()) tempErrors.email = "Email is required";
    else if (!validateEmail(email)) tempErrors.email = "Invalid email format";

    if (!phone.trim()) tempErrors.phone = "Phone Number is required";
    else if (phone.trim().length < 10) tempErrors.phone = "Phone Number must be at least 10 digits";

    if (!selectedPayment) tempErrors.payment = "Please select a payment method";

    if (Object.keys(tempErrors).length > 0) {
      Object.values(tempErrors).forEach((err) => toast.error(err));
      setErrors(tempErrors);
      return;
    }

    // Simpan ke Redux
    dispatch(addOrder({ key: `name`, order: name }));
    dispatch(addOrder({ key: `email`, order: email }));
    dispatch(addOrder({ key: `phone`, order: phone }));
    dispatch(addOrder({ key: `paymentMethod`, order: selectedPayment   }));
    setShowInfo(true);
  };

  const handleCheckPayment = () => {
    dispatch(addOrder({ key: `paymentStatus`, order: true }));
    addOrderContext(orderData)
    navigate("/ticket");
  };

  const handlePayLater = () => {
    dispatch(addOrder({ key: `paymentStatus`, order: false }));
    addOrderContext(orderData)
    navigate("/ticket");
  };

  return (
    <main className="flex flex-col justify-center items-center gap-2.5 bg-[rgba(160,163,189,0.2)] px-8 md:px-[130px] py-[25px] relative">
      {/* Step Indicator */}
      <div className="mt-2.5 w-full flex flex-row justify-center items-center gap-2">
        <div className="flex flex-col items-center gap-2">
          <div className="w-[47px] h-[47px] rounded-full flex items-center justify-center bg-green-600">
            <img src="../assets/imgs/icon/check-small.png" alt="check.png" />
          </div>
          <p className="text-[#4E4B66] text-sm font-normal">Dates And Time</p>
        </div>
        <img src="../assets/imgs/icon/horizontal-rule.png" alt="" />
        <div className="flex flex-col items-center gap-2">
          <div className="w-[47px] h-[47px] rounded-full flex items-center justify-center bg-blue-700 text-white font-medium text-base">
            <h5>2</h5>
          </div>
          <p className="text-[#4E4B66] text-sm font-normal">Seat</p>
        </div>
        <img src="../assets/imgs/icon/horizontal-rule.png" alt="" />
        <div className="flex flex-col items-center gap-2">
          <div className="w-[47px] h-[47px] rounded-full flex items-center justify-center bg-[#A0A3BD] text-white font-medium text-base">
            <h5>3</h5>
          </div>
          <p className="text-[#4E4B66] text-sm font-normal">Payment</p>
        </div>
      </div>

      {/* Form Section */}
      <form className="mt-2.5 w-full max-w-[700px] flex flex-col items-start gap-2.5 bg-white border border-[#DEDEDE] rounded px-5 py-[25px]" onSubmit={handleSubmit}>
        {/* Payment Info */}
        <div className="w-full">
          <h1 className="text-2xl font-bold text-[#14142B] px-4 py-4">Payment Info</h1>
          <div className="px-4">
            <h2 className="text-sm text-[#8692A6] py-2">DATE & TIME</h2>
            <p className="text-base border-b border-[#E6E6E6] pb-2">
              {formattedDate} at {orderData.time}
            </p>
          </div>
          <div className="px-4">
            <h2 className="text-sm text-[#8692A6] py-2">MOVIE TITLE</h2>
            <p className="text-base border-b border-[#E6E6E6] pb-2">{orderData.movieTitle}</p>
          </div>
          <div className="px-4">
            <h2 className="text-sm text-[#8692A6] py-2">CINEMA NAME</h2>
            <p className="text-base border-b border-[#E6E6E6] pb-2">{orderData.cinema}</p>
          </div>
          <div className="px-4">
            <h2 className="text-sm text-[#8692A6] py-2">NUMBER OF TICKETS</h2>
            <p className="text-base border-b border-[#E6E6E6] pb-2">{orderData.seats.length} pieces</p>
          </div>
          <div className="px-4">
            <h2 className="text-sm text-[#8692A6] py-2">TOTAL PAYMENT</h2>
            <h3 className="text-lg font-bold text-blue-700 border-b border-[#E6E6E6] pb-2">${orderData.totalPrice}</h3>
          </div>
        </div>

        {/* Personal Info */}
        <div className="w-full">
          <h1 className="text-2xl font-bold text-[#14142B] px-4 py-4">Personal Information</h1>

          <div className="px-4 py-2">
            <label htmlFor="name" className="text-sm text-[#8692A6] block mb-2">
              Full Name
            </label>
            <input type="text" id="name" name="name" placeholder="Enter your name" className={`w-full h-[60px] px-5 border rounded ${errors.name ? "border-red-500" : "border-gray-300"}`} value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="px-4 py-2">
            <label htmlFor="email" className="text-sm text-[#8692A6] block mb-2">
              Email
            </label>
            <input type="email" id="email" name="email" placeholder="Enter your email" className={`w-full h-[60px] px-5 border rounded ${errors.email ? "border-red-500" : "border-gray-300"}`} value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="px-4 py-2">
            <label htmlFor="phone" className="text-sm text-[#8692A6] block mb-2">
              Phone Number
            </label>
            <input type="number" id="phone" name="phone" placeholder="Enter your number" className={`w-full h-[60px] px-5 border rounded ${errors.phone ? "border-red-500" : "border-gray-300"}`} value={phone} onChange={(e) => setPhone(e.target.value)} />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Payment Method */}
        <div className="w-full">
          <h1 className="text-2xl font-bold text-[#14142B] px-4 py-4">Payment Method</h1>
          <div className="flex flex-col gap-4 px-4">
            <div className="flex justify-between gap-2 flex-wrap">
              {["googlepay", "vis", "gopay", "paypal"].map((method, idx) => (
                <button key={idx} type="button" className={`w-[146px] h-[56px] flex items-center justify-center border-2 rounded-md ${selectedPayment === method ? "border-blue-700 bg-blue-100" : "border-[#DEDEDE]"}`} onClick={() => handlePaymentMethodClick(method)}>
                  <img src={`../assets/imgs/payment/${method}.png`} alt={`${method}.png`} />
                </button>
              ))}
            </div>
            <div className="flex justify-between gap-2 flex-wrap">
              {["dana", "bca", "bri", "ovo"].map((method, idx) => (
                <button key={idx} type="button" className={`w-[146px] h-[56px] flex items-center justify-center border-2 rounded-md ${selectedPayment === method ? "border-blue-700 bg-blue-100" : "border-[#DEDEDE]"}`} onClick={() => handlePaymentMethodClick(method)}>
                  <img src={`../assets/imgs/payment/${method}.png`} alt={`${method}.png`} />
                </button>
              ))}
            </div>
            {errors.payment && <p className="text-red-500 text-sm mt-1">{errors.payment}</p>}
          </div>
        </div>

        <button type="submit" className="mt-4 w-full h-[56px] bg-blue-700 text-white font-bold text-base rounded-md">
          Pay your order
        </button>
      </form>

      {/* Payment Info Popup */}
      {showInfo && (
        <section className="info fixed inset-0 bg-black/20 flex justify-center items-center">
          <div className="bg-white p-12 rounded-xl w-[573px] h-140 flex flex-col gap-8">
            <h1 className="text-2xl font-bold text-[#14142B]">Payment Info</h1>

            <div className="flex justify-between items-center w-full">
              <h2 className="text-sm text-[#8692A6]">No. Rekening Virtual :</h2>
              <div className="flex items-center">
                <p className="text-lg font-bold mr-4">12321328913829724</p>
                <button className="w-[72px] h-[48px] border border-blue-600 rounded text-blue-600">Copy</button>
              </div>
            </div>

            <div className="flex justify-between items-center w-full">
              <h2 className="text-sm text-[#8692A6]">Total Payment</h2>
              <h3 className="text-lg font-bold text-blue-600">${orderData.totalPrice}</h3>
            </div>

            <p className="text-[#A0A3BD] text-base leading-8">
              Pay this payment bill before it is due,
              <span className="text-[#D00707]"> on June 23, 2023</span>. If the bill has not been paid by the specified time, it will be forfeited.
            </p>

            <button className="w-full h-14 bg-blue-600 text-white font-bold rounded" onClick={handleCheckPayment}>
              Check Payment
            </button>

            <button type="button" className="w-full h-14 text-blue-600 font-bold border border-blue-600 rounded" onClick={handlePayLater}>
              Pay Later
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default PaymentMain;
