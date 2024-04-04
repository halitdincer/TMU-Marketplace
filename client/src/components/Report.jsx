import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Modal from "./Modal";

function Report() {
  const { apiToken } = useContext(AuthContext);
  const [reportReason, setReportReason] = useState("");
  const [details, setDetails] = useState("");
  const navigate = useNavigate(); // Hook for navigation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      console.log({ reportReason, details });
      setIsModalOpen(true);
      setModalContent({
        title: "Success!",
        message:
          "Thank you for your input. We will take the appropriate measures!",
      });
    } catch (error) {
      console.error("Error:", error);
      setIsModalOpen(true);
      setModalContent({
        title: "Error!",
        message: "An error occurred while reporting. Please try again",
      });
    }

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-6  bg-gray-50 flex items-center justify-center lg:pb-0 pb-24">
      <div className="container max-w-screen-lg mx-auto">
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={modalContent.title}
          message={modalContent.message}
        />
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-2xl text-custom-blue pb-3">
            Report Ad
          </h2>
          <div className="px-4 py-4 justify-end">
            <Link
              to="/"
              className="flex items-center text-black-600 hover:text-indigo-500"
            >
              <div className="rounded-full bg-gray-200 p-1">
                <XMarkIcon className="h-5 w-5 " />
              </div>
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Report Details</p>
              </div>
              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <p className="text-xl mb-5 font-semibold">
                      Please select the reason for your report:
                    </p>

                    <div>
                      <input
                        type="radio"
                        id="spam"
                        name="report_reason"
                        value="spam"
                        onChange={(e) => setReportReason(e.target.value)}
                        checked={reportReason === "spam"}
                        className="mb-2"
                      />
                      <label htmlFor="spam" className="ml-2 text-lg">
                        Spam
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="inappropriate"
                        name="report_reason"
                        value="inappropriate"
                        onChange={(e) => setReportReason(e.target.value)}
                        checked={reportReason === "inappropriate"}
                        className="mb-2"
                      />
                      <label htmlFor="inappropriate" className="ml-2 text-lg">
                        Inappropriate Content
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="misinformation"
                        name="report_reason"
                        value="misinformation"
                        onChange={(e) => setReportReason(e.target.value)}
                        checked={reportReason === "misinformation"}
                        className="mb-2"
                      />
                      <label htmlFor="misinformation" className="ml-2 text-lg ">
                        Misinformation
                      </label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="other"
                        name="report_reason"
                        value="other"
                        onChange={(e) => setReportReason(e.target.value)}
                        checked={reportReason === "other"}
                        className="mb-2"
                      />
                      <label htmlFor="other" className="ml-2 text-lg">
                        Other
                      </label>
                    </div>

                    {reportReason === "other" && (
                      <div className="md:col-span-5 mt-3">
                        <label htmlFor="details" className="ml-1 text-md">
                          If "Other", please provide more details:
                        </label>
                        <br />
                        <textarea
                          id="details"
                          name="details"
                          rows="4"
                          cols="50"
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          className="border border-gray-300 w-full"
                        ></textarea>
                      </div>
                    )}

                    <div className="md:col-span-5 pt-4">
                      <input
                        type="submit"
                        value="Report"
                        className="bg-custom-blue hover:bg-custom-yellow text-white font-bold py-2 px-4 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Report;