import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";


function CreateAdForm() {
  // Use useState to manage multiple images
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const {apiToken} = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        Authorization: "Token " + apiToken,
        "Content-Type": "multipart/form-data",
      },
    };

    const form = new FormData();

    images.forEach((image) => {
      form.append("images", image);
    });

    form.append("title", title);
    form.append("description", description);
    form.append("price", price);
    form.append("type", type);
    form.append("category", category);
    form.append("location", location);

    for (let [key, value] of form.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post("/api/ads/create/", form, config);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
    console.log([...e.target.files]);
  };


  return (
    <div className="min-h-screen p-6  bg-gray-50 flex items-center justify-center lg:pb-0 pb-24">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-2xl text-custom-blue pb-3">
            Create Ad
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Ad Details</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="description">Description </label>
                      <textarea
                        id="description"
                        rows="7"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500   "
                        placeholder="Your description here"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="$99"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="type">Ad Type</label>
                      <select
                        id="type"
                        className="h-10 border mt-1 rounded px-2 w-full bg-gray-50"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Ad Type
                        </option>
                        <option value="IW">Items Wanted</option>
                        <option value="IS">Items for Sale</option>
                        <option value="AS">
                          Academic Services
                        </option>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="category">Category</label>
                      <select
                        id="category"
                        className="h-10 border mt-1 rounded px-2 w-full bg-gray-50"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        <optgroup label="Items">
                          <option value="EL">Electronics</option>
                          <option value="CL">Clothing</option>
                          <option value="HM">Home & Garden</option>
                          <option value="SP">Sports & Outdoors</option>
                          <option value="GA">Games & Hobbies</option>
                          <option value="MU">Music & Instruments</option>
                          <option value="FA">Furniture & Appliances</option>
                          <option value="BE">Beauty & Personal Care</option>
                          <option value="TB">Textbooks</option>
                          <option value="LO">Lost & Found</option>
                        </optgroup>
                        <optgroup label="Services">
                          <option value="SG">Study Groups</option>
                          <option value="TU">Tutoring</option>
                          <option value="RS">Research & Surveys</option>
                        </optgroup>
                        <optgroup label="Other">
                          <option value="OT">Others</option>
                        </optgroup>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="location">Location</label>
                      <select
                        id="location"
                        className="h-10 border mt-1 rounded px-2 w-full bg-gray-50"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        <option value="" disabled>
                          Select Location
                        </option>

                        <option value="TE">Toronto & East York</option>
                        <option value="EB">Etobicoke</option>
                        <option value="NY">North York</option>
                        <option value="SC">Scarborough</option>
                        <option value="VA">Vaughan</option>
                        <option value="MK">Markham</option>
                        <option value="RH">Richmond Hill</option>
                        <option value="MV">Mississauga</option>
                        <option value="BR">Brampton</option>
                        <option value="AP">Ajax & Pickering</option>
                        <option value="OS">Whitby & Oshawa</option>
                        <option value="OK">Oakville & Milton</option>
                        <option value="OT">Other Locations</option>
                      </select>
                    </div>

                    <div className=" md:col-span-5 justify-center">
                    <label htmlFor="upload" className="block mb-2 text-sm font-medium text-gray-900 ">
                        Upload Photos
                      </label>
                      <input
                        id="upload"
                        type="file"
                        multiple // Allow multiple file selections
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-custom-blue file:text-white hover:file:bg-custom-yellow"
                        onChange={handleImageChange}
                      />
                    </div>

                    <div className="md:col-span-5 pt-4">
                      <input
                        type="submit"
                        value="Post Your Ad"
                        className="bg-custom-blue hover:bg-custom-yellow text-white font-bold py-2 px-4 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAdForm;
