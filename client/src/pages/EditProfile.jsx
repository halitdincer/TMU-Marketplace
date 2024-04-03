import React, { useContext, useState, useEffect } from "react";
import Sidebar from "components/Sidebar";
import Header from "components/Header";
import { AuthContext } from "components/AuthProvider"; // replace 'path-to-AuthProvider' with the actual path to AuthProvider.jsx
import axios from "axios";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Modal from "react-modal";
function EditProfile() {
  const { userData, updateProfile } = useContext(AuthContext);

  // Use state to manage form data
  const [formState, setFormState] = useState({
    profilePic: userData.profilePic,
    username: userData.username,
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    password: '',
  });
  useEffect(() => {
    Modal.setAppElement("#root"); // Assuming '#root' is the ID of your root element
  }, []);

  const [profile_picture, setProfilePic] = useState(userData.profile_picture);
  const [username, setUsername] = useState(userData.username);
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(userData.password);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, matchPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const validatePassword = (pwd) => {
    const regex = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()]).{8,}"
    );
    if (!regex.test(pwd)) {
      setPasswordError(
        "Password must contain at least one number, one uppercase and lowercase letter, 8 or more characters, and at least one special character"
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleConfirmPassword = (e) => {
    if (password !== confirmPassword) {
      matchPasswordError("Passwords do not match.");
      return false;
    } else {
      matchPasswordError("");
      return true;
    }
  };

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUp = async (event) => {
    handleConfirmPassword();
    validatePassword(password);

    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = handleConfirmPassword();

    event.preventDefault();

    if (isPasswordValid && isConfirmPasswordValid) {
      try {
        const response = await axios.post(
          "/api/users/signup/",
          JSON.stringify({ username: email, password, firstName, lastName }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        //Strip and Save token to local cache
        const token = response.data.Authorization.split(" ")[1];
        localStorage.setItem("authtoken", token);
      } catch (error) {
        console.error("Error:", error);
        setEmailError("An account with this email already exists.");
      }
    }
  };

  const handleChangeProfilePic = () => {
    setShowUploadModal(true);
    setShowDropdown(false); // Close dropdown when opening modal
  };

  const handleCloseModal = () => {
    setShowUploadModal(false);
  };

  const handleUploadProfilePic = (e) => {
    console.log("Uploading profile picture...", e.target.files[0]);
    setShowUploadModal(false);
  };

  const handleDeleteProfilePic = () => {
    console.log("Deleting profile picture...");
    // Implement your logic for deleting profile picture here
    setShowDropdown(false); // Close dropdown after action
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-28">
        <div className="min-h-screen p-6  bg-gray-50 flex items-center justify-center lg:pb-0 pb-24">
          <div className="container max-w-screen-lg mx-auto">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-2xl text-custom-blue pb-3">
                Edit Profile
              </h2>
              <div className="px-4 py-4 justify-end">
                <Link
                  to="/profile"
                  className="flex items-center text-black-600 hover:text-indigo-500"
                >
                  <div className="rounded-full bg-gray-200 p-1">
                    <XMarkIcon className="h-5 w-5 " />
                  </div>
                </Link>
              </div>
            </div>
            <form onSubmit={handleSignUp}>
              <div className="bg-white rounded-xl shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Profile Details</p>
                  </div>
                  <div className="lg:col-span-2 ">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5 flex items-center justify-center relative">
                        {/* Profile Picture */}
                        <div className="relative">
                          <img
                            className="w-40 h-40 mb-3 rounded-full shadow-lg"
                            src={userData.profile_picture}
                            alt={userData.username}
                          />
                          {/* Pencil Icon */}
                          <div className="absolute top-36 right-8 transform translate-x-2/3 -translate-y-2/3">
                            <button
                              className="bg-gray-200 rounded-full p-2 hover:bg-gray-200"
                              onClick={() => setShowDropdown(!showDropdown)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {/* Dropdown Menu */}
                        {showDropdown && (
                          <div className="absolute lg:top-32 top-12 lg:right-20 right-0 bg-white rounded-lg shadow-md p-2">
                            <button
                              className="block w-full py-2 text-left hover:bg-gray-100"
                              onClick={handleChangeProfilePic}
                            >
                              Change Profile Picture
                            </button>
                            <button
                              className="block w-full py-2 text-left hover:bg-gray-100"
                              onClick={handleDeleteProfilePic}
                            >
                              Delete Profile Picture
                            </button>
                          </div>
                        )}
                        <Modal
                          isOpen={showUploadModal}
                          onRequestClose={handleCloseModal}
                          contentLabel="Upload Profile Picture"
                          className="Modal"
                          overlayClassName="Overlay"
                          style={{
                            overlay: {
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              position: "fixed",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              zIndex: 1000,
                            },
                            content: {
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "70%",
                              height: "55%",
                              overflow: "auto",
                              backgroundColor: "white",
                              borderRadius: "8px",
                              padding: "30px",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                              zIndex: 1100,
                            },
                          }}
                        >
                          <div className="flex flex-col items-center">
                            <h2 className="text-2xl font-bold mb-4">
                              Upload Profile Picture
                            </h2>
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  className="w-8 h-8 mb-4 text-gray-500 "
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 16"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                  />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 ">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  SVG, PNG, JPG
                                </p>
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                onChange={handleUploadProfilePic}
                              />
                            </label>

                            <button
                              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                              onClick={handleCloseModal}
                            >
                              Close
                            </button>
                          </div>
                        </Modal>
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="username">Username</label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={formState.username}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              username: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={formState.first_name}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              first_name: e.target.value,
                            })
                          }
                          placeholder="First Name"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={formState.last_name}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              last_name: e.target.value,
                            })
                          }
                          placeholder="Last Name"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              email: e.target.value,
                            })
                          }
                          placeholder="Email"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="password">Password</label>
                        <input
                          type="text"
                          name="password"
                          id="password"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={formState.password}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              password: e.target.value,
                            })
                          }
                          placeholder="Password"
                        />
                      </div>
                      <div className="md:col-span-5 pt-4 text-right">
                        <input
                          type="submit"
                          value="Save"
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
    </div>
  );
}

export default EditProfile;
