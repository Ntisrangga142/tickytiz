import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchMovieDetails } from "../../../services/fetchMovie.js";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../../redux/order/orderSlice.js";

function MainOrder() {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.order.orders || null);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load movie detail
  useEffect(() => {
    async function loadMovie() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadMovie();
    }
  }, [id]);

  const seatRows = ["A", "B", "C", "D", "E", "F", "G"];
  const leftCols = 7;
  const rightCols = 7;
  const pricePerSeat = 10;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const soldSeats = ["B3", "E10", "F11"];
  const loveNestSeats = ["F11", "F12"];

  const toggleSeat = (seat) => {
    if (soldSeats.includes(seat) || loveNestSeats.includes(seat)) return;

    setSelectedSeats((prev) => (prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]));
  };

  const totalPayment = selectedSeats.length * pricePerSeat;

  const handleCheckout = () => {
    if (!movie) {
      alert("Movie data not found!");
      return;
    }
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    console.log(totalPayment);
    dispatch(addOrder({ key: `movieId`, order: movie.id }));
    dispatch(addOrder({ key: `movieTitle`, order: movie.title }));
    dispatch(addOrder({ key: `seats`, order: selectedSeats }));
    dispatch(addOrder({ key: `totalPrice`, order: totalPayment }));

    navigate("/payment");
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-600">{error}</div>;
  if (!movie) return null;

  return (
    <main className="flex flex-col lg:flex-row gap-10 lg:px-20 md:px-8 py-10 ">
      {/* Left Section */}
      <div className="flex-1">
        {/* Stepper */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white">✓</div>
              <p className="text-xs mt-1 text-gray-600">Dates And Time</p>
            </div>
            <span className="h-[2px] w-10 bg-gray-300"></span>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1D4ED8] text-white">2</div>
              <p className="text-xs mt-1 text-gray-600">Seat</p>
            </div>
            <span className="h-[2px] w-10 bg-gray-300"></span>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-700">3</div>
              <p className="text-xs mt-1 text-gray-600">Payment</p>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className="w-20 rounded" />
            <div>
              <h1 className="font-bold text-lg">{movie.title}</h1>
              <div className="flex gap-2 my-2">
                {movie.genres_name?.map((g, idx) => (
                  <span key={idx} className="text-xs bg-[#D6D8E7] px-2 py-1 rounded-full">
                    {g}
                  </span>
                ))}
              </div>
              {orderData ? (
                <p className="text-sm text-gray-600">
                  {orderData.date} - {orderData.time}
                </p>
              ) : (
                <p className="text-sm text-gray-600">Regular - 13:00 PM</p>
              )}
            </div>
          </div>
          <button className="text-[#1D4ED8] border border-[#1D4ED8] px-3 py-1 rounded hover:bg-[#1D4ED8]">Change</button>
        </div>

        {/* Seat Selection */}
        <h2 className="text-lg font-semibold mb-4">Choose Your Seat</h2>
        <div className="bg-white rounded-lg shadow p-4">
          {/* Screen */}
          <div className="text-center mb-6">
            <div className="bg-gray-300 h-1 w-full rounded-full mb-2"></div>
            <p className="text-xs text-[#6E7191]">Screen</p>
          </div>

          {/* Seats */}
          <div className="space-y-3 flex flex-col items-center w-full gap-x-[100px]">
            {seatRows.map((row) => (
              <div key={row} className="flex items-center justify-around gap-[100px] md:gap-3">
                {/* Left block */}
                <div className="grid grid-cols-9 gap-1">
                  <span className="w-5 text-sm font-medium">{row}</span>
                  {Array.from({ length: leftCols }).map((_, i) => {
                    const seat = `${row}${i + 1}`;
                    const isSold = soldSeats.includes(seat);
                    const isLove = loveNestSeats.includes(seat);
                    const isSelected = selectedSeats.includes(seat);

                    return (
                      <div
                        key={seat}
                        onClick={() => toggleSeat(seat)}
                        className={`w-8 h-8 rounded text-xs flex items-center justify-center cursor-pointer
                          ${isSold ? "bg-[#6E7191] text-white cursor-not-allowed" : isSelected ? "bg-[#1D4ED8] text-white" : isLove ? "bg-[#F589D7] text-white cursor-not-allowed" : "bg-[#D6D8E7] hover:bg-[#1D4ED8]"}`}></div>
                    );
                  })}
                  <span className="w-5 text-sm font-medium"></span>
                </div>

                {/* Right block */}
                <div className="grid grid-cols-8 gap-1">
                  <span className="w-5 text-sm font-medium"></span>
                  {Array.from({ length: rightCols }).map((_, i) => {
                    const seat = `${row}${i + 8}`;
                    const isSold = soldSeats.includes(seat);
                    const isLove = loveNestSeats.includes(seat);
                    const isSelected = selectedSeats.includes(seat);

                    return (
                      <div
                        key={seat}
                        onClick={() => toggleSeat(seat)}
                        className={`w-8 h-8 rounded text-xs flex items-center justify-center cursor-pointer
                          ${isSold ? "bg-[#6E7191] text-white cursor-not-allowed" : isSelected ? "bg-[#1D4ED8] text-white" : isLove ? "bg-[#F589D7] text-white cursor-not-allowed" : "bg-[#D6D8E7] hover:bg-[#1D4ED8]"}`}></div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Column numbers */}
          <div className="flex justify-center gap-[100px] mt-2 select-none md:gap-3">
            <div className="grid grid-cols-9 gap-1">
              <span className="w-5"></span>
              {Array.from({ length: leftCols }).map((_, i) => (
                <span key={`num-left-${i}`} className="w-8 text-center text-sm font-medium text-gray-600">
                  {i + 1}
                </span>
              ))}
              <span className="w-5"></span>
            </div>
            <div className="grid grid-cols-8 gap-1">
              <span className="w-5"></span>
              {Array.from({ length: rightCols }).map((_, i) => (
                <span key={`num-right-${i}`} className="w-8 text-center text-sm font-medium text-gray-600">
                  {i + 1 + leftCols}
                </span>
              ))}
            </div>
          </div>

          {/* Seat Key */}
          <div className="flex gap-6 mt-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#D6D8E7] rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#1D4ED8] rounded"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#F589D7] rounded"></div>
              <span>Love nest</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#6E7191] rounded"></div>
              <span>Sold</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="md:w-full lg:w-1/3 bg-white rounded-lg shadow p-6 h-fit">
        <h2 className="text-xl font-bold text-[#1D4ED8] mb-4">Cinema</h2>
        <div className="text-sm text-gray-600 mb-4 flex flex-col gap-2">
          <p>
            Movie selected: <span className="font-semibold">{movie.title}</span>
          </p>
          {orderData && (
            <>
              <p>
                Date: <span className="font-semibold">{orderData.date}</span>
              </p>
              <p>
                Time: <span className="font-semibold">{orderData.time}</span>
              </p>
              <p>
                Location: <span className="font-semibold capitalize">{orderData.location}</span>
              </p>
              <p>
                Cinema: <span className="font-semibold capitalize">{orderData.cinema}</span>
              </p>
            </>
          )}
          <p>One ticket price: ${pricePerSeat}</p>
          <p>Seat choosed: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "-"}</p>
        </div>
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>Total Payment</span>
          <span className="text-[#1D4ED8]">${totalPayment}</span>
        </div>
        <button className="w-full bg-[#1D4ED8] text-white py-3 rounded hover:bg-[#1D4ED8]" onClick={handleCheckout} disabled={selectedSeats.length === 0}>
          Checkout now
        </button>
      </div>
    </main>
  );
}

export default MainOrder;
