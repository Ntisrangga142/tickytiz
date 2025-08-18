import React from "react";
import { useNavigate } from "react-router";

import IconCalender from "/assets/imgs/icon/calendar (1) 1.png";
import Eye from "/assets/imgs/icon/Eye.png";
import Edit from "/assets/imgs/icon/Edit.png";
import Delete from "/assets/imgs/icon/Delete.png";
import { useDispatch, useSelector } from "react-redux";
import { removeMovie } from "../../../redux/admin/moviesSlice";

function DashboardListMovie() {
  const navigate = useNavigate();
  const movies = useSelector((state) => state.admin.movies);
  const dispatch = useDispatch();

  const handleAddMovie = () => {
    navigate("/admin/form");
  };

  const handleEditMovie = (index) => {
    const movie = movies[index];
    navigate(`/admin/form?id=${index}`, { state: { movie } });
  };

  const handleDeleteMovie = (name, index) => {
    if (confirm("Yakin hapus movie ini?")) {
      console.log("Delete movie name:", name);
      dispatch(removeMovie(index));
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen flex items-start justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">List Movie</h2>
          <div className="flex items-center space-x-2">
            {/* Date Selector */}
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-gray-600 w-[284px] h-[56px] gap-[10px]">
              <img src={IconCalender} alt="icon-calender" className="w-[18px] h-[18px]" />
              <span>November 2023</span>
            </div>
            {/* Add Movie Button */}
            <button onClick={handleAddMovie} className="bg-[#1D4ED8] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors h-[56px]">
              Add Movies
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600 overflow-x-scroll">
            <thead className="text-gray-500 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Thumbnail</th>
                <th className="px-4 py-3">Movie Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Released Date</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, index) => (
                <tr key={movie.id} className="border-b hover:bg-gray-50 ">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    <img src={movie.thumbnail} className="w-10 h-10 rounded-lg" alt="movie thumb" />
                  </td>
                  <td className="px-4 py-3 text-[#1D4ED8] hover:underline cursor-pointer">{movie.name}</td>
                  <td className="px-4 py-3">{movie.category}</td>
                  <td className="px-4 py-3">
                    {new Date(movie.releaseDate).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-4 py-3">{`${movie.hour} Hours ${movie.minute} Minutes`}</td>
                  <td className="px-4 py-3 flex justify-center space-x-2">
                    <button className="bg-[#1D4ED8] text-white p-2 rounded hover:bg-blue-700 transition-colors">
                      <img src={Eye} alt="icon-eye" />
                    </button>
                    <button onClick={() => handleEditMovie(index)} className="bg-[#5D5FEF] text-white p-2 rounded hover:bg-indigo-700 transition-colors">
                      <img src={Edit} alt="icon-edit" className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteMovie(movie.name, index)} className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors">
                      <img src={Delete} alt="icon-delete" className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          {[1, 2, 3, 4].map((page) => (
            <button key={page} className={`px-3 py-1 rounded ${page === 1 ? "bg-[#1D4ED8] text-white" : "bg-gray-200 hover:bg-gray-300"}`}>
              {page}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export default DashboardListMovie;
