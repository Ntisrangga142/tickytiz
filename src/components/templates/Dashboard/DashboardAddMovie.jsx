import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie, updateMovie } from "../../../redux/admin/moviesSlice";
import { useNavigate, useSearchParams } from "react-router";
import { useLocation } from "react-router";

export default function DashboardAddMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ searchParams] = useSearchParams();
  const fileInputRef = useRef();
  const location = useLocation();
  const movie = location.state?.movie || {};
  const index = searchParams.get("id") || null;

  console.log(index)

  const [formData, setFormData] = useState({
    id: index || -1,
    name: movie.name || "",
    category: movie.category || [],
    releaseDate: movie.releaseDate || "",
    hour: movie.hour || "",
    minute: movie.minute || "",
    director: movie.director || "",
    cast: movie.cast || "",
    synopsis: movie.synopsis || "",
    location: movie.location || "",
    image: null,
  });

  console.log("Form Data:", formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file }); // simpan File, bukan Base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.id !== -1) {
      dispatch(updateMovie({ id: formData.id, updatedMovie: formData }));
      console.log("Movie Data Submitted:", formData);
    } else {
      dispatch(addMovie(formData));
    }

    

    // Reset form
    setFormData({
      name: "",
      category: "",
      releaseDate: "",
      hour: "",
      minute: "",
      director: "",
      cast: "",
      synopsis: "",
      location: "",
      image: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    navigate("/admin/movies");
  };
  return (
    <main className="bg-white rounded-2xl shadow-md p-6 w-[732px] mx-auto">
      <h2 className="text-xl font-bold mb-4 tracking-[0.25px] text-[24px]">Add New Movie</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Upload */}
        <div>
          <input type="file" ref={fileInputRef} id="uploadImage" accept="image/*" onChange={handleFileChange} className="hidden" />

          <label htmlFor="uploadImage" className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 cursor-pointer">
            Upload
          </label>

          {/* Preview */}
          {formData.image && (
            <div className="mt-2">
              <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
            </div>
          )}
        </div>

        {/* Movie Name */}
        <div>
          <label className="block text-sm mb-1">Movie Name</label>
          <input name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm mb-1">Category</label>
          <input name="category" value={formData.category} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Release Date + Duration */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm mb-1">Release date</label>
            <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {/* Hour */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Hour</label>
              <select name="hour" value={formData.hour} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                <option value="">Select Hour</option>
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Minute */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Minute</label>
              <select name="minute" value={formData.minute} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                <option value="">Select Minute</option>
                {Array.from({ length: 59 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Director */}
        <div>
          <label className="block text-sm mb-1">Director Name</label>
          <input name="director" value={formData.director} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Cast */}
        <div>
          <label className="block text-sm mb-1">Cast</label>
          <input name="cast" value={formData.cast} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Synopsis */}
        <div>
          <label className="block text-sm mb-1">Synopsis</label>
          <textarea name="synopsis" value={formData.synopsis} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" rows="3" />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm mb-1">Add Location</label>
          <input name="location" type="text" value={formData.location} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Save button */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Save Movie
        </button>
      </form>
    </main>
  );
}
