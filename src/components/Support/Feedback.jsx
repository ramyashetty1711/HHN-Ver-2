import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useFetch } from "../../query/UseFetch";
import { APPURL } from "../../URL";
import { useToast } from "../Toast/ToastContext";
import CustomButton from "../Common/CustomButton";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../query/UseFetchData";
import { useLocalUserData } from "../../query/UseLocalData";

export default function Feedback() {
  const { get, usePost } = useFetch();
  const SessionData = useLocalUserData();
  const { mutate, isPostLoading, isSuccess, isError, error, data } = usePost();
  const { data: devices } = useQuery({
    queryKey: ["devices"],
    queryFn: () => getData(APPURL.devices, SessionData.token),
    enabled: !!SessionData.token,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  const [selectedDevice, setSelectedDevice] = useState({});
  const [ratings, setRatings] = useState({
    looks: 0,
    ruggedness: 0,
    software: 0,
    easeOfUse: 0,
  });
  const [hover, setHover] = useState({
    looks: null,
    ruggedness: null,
    software: null,
    easeOfUse: null,
  });
  const [comments, setComments] = useState({
    looks: "",
    ruggedness: "",
    software: "",
    easeOfUse: "",
    general: "",
  });
  const [disabled, setDisabled] = useState(true);
  const { showToast } = useToast();

  const HandleFeedBackSubmit = async () => {
    if (ratings.looks === 0 || ratings.ruggedness === 0 || ratings.software === 0 || ratings.easeOfUse === 0) {
      showToast({
        type: "error",
        heading: "Error",
        message: "Please provide a rating for all categories to submit.",
      });
      return;
    }
    if (comments.general.length === 0) {
      showToast({
        type: "error",
        heading: "Error",
        message: "Please provide a general comment to submit.",
      });
      return;
    }
    const GetDeviceID =
      devices.find((val) => val.device_id === selectedDevice.device_id).id ||
      null;
    mutate({
      url: APPURL.feedbacks,
      data: {
        ratings,
        feedback: comments.general,
        device_info: GetDeviceID,
        detailedFeedback: comments,
      },
      isForm: true,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setComments({
        looks: "",
        ruggedness: "",
        software: "",
        easeOfUse: "",
        general: "",
      });
      setRatings({
        looks: 0,
        ruggedness: 0,
        software: 0,
        easeOfUse: 0,
      });
      setSelectedDevice({});
      setDisabled(true);
    }
  }, [isSuccess]);

  const generateQuestions = (rating) => {
    if (rating < 3) {
      return "What could be improved about this feature?"; // Low rating question
    } else {
      return "What did you like most about this feature?"; // High rating question
    }
  };

  const questionForLooks = generateQuestions(ratings.looks);
  const questionForRuggedness = generateQuestions(ratings.ruggedness);
  const questionForSoftware = generateQuestions(ratings.software);
  const questionForEaseOfUse = generateQuestions(ratings.easeOfUse);

  useEffect(() => {
    setDisabled(comments.general === "" || !Object.values(ratings).every(r => r > 0));
  }, [comments, ratings]);

  return (
    <div className="bg-white h-full p-4 md:max-h-[72vh] overflow-y-auto custom-scrollbar">
      <div className="space-y-4 ">
        <div className="flex flex-row">
          {/* Device Selection (Uncomment and customize if needed) */}
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {/* Star Rating for Looks */}
          <div className="flex flex-col mb-4">
            <h3 className="text-lg font-semibold mb-2">Device Looks</h3>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => {
                const currentRating = i + 1;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setRatings((prev) => ({ ...prev, looks: currentRating }));
                    }}
                    onMouseEnter={() => setHover((prev) => ({ ...prev, looks: currentRating }))}
                    onMouseLeave={() => setHover((prev) => ({ ...prev, looks: null }))}
                    className="cursor-pointer"
                  >
                    <FaStar
                      size={24}
                      className={
                        currentRating <= (hover.looks || ratings.looks)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                );
              })}
            </div>
            {ratings.looks > 0 && (
              <div className="mt-2">
                <label className="text-sm font-semibold">{questionForLooks}</label>
                <textarea
                  value={comments.looks}
                  onChange={(e) => setComments((prev) => ({ ...prev, looks: e.target.value }))}
                  className="w-full border p-2 rounded resize-none border-gray-300 mt-2"
                  rows={3}
                  placeholder="Write your feedback about looks..."
                />
              </div>
            )}
          </div>

          {/* Star Rating for Ruggedness */}
          <div className="flex flex-col mb-4">
            <h3 className="text-lg font-semibold mb-2">Device Ruggedness</h3>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => {
                const currentRating = i + 1;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setRatings((prev) => ({ ...prev, ruggedness: currentRating }));
                    }}
                    onMouseEnter={() => setHover((prev) => ({ ...prev, ruggedness: currentRating }))}
                    onMouseLeave={() => setHover((prev) => ({ ...prev, ruggedness: null }))}
                    className="cursor-pointer"
                  >
                    <FaStar
                      size={24}
                      className={
                        currentRating <= (hover.ruggedness || ratings.ruggedness)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                );
              })}
            </div>
            {ratings.ruggedness > 0 && (
              <div className="mt-2">
                <label className="text-sm font-semibold">{questionForRuggedness}</label>
                <textarea
                  value={comments.ruggedness}
                  onChange={(e) => setComments((prev) => ({ ...prev, ruggedness: e.target.value }))}
                  className="w-full border p-2 rounded resize-none border-gray-300 mt-2"
                  rows={3}
                  placeholder="Write your feedback about ruggedness..."
                />
              </div>
            )}
          </div>

          {/* Star Rating for Software */}
          <div className="flex flex-col mb-4">
            <h3 className="text-lg font-semibold mb-2">Application</h3>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => {
                const currentRating = i + 1;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setRatings((prev) => ({ ...prev, software: currentRating }));
                    }}
                    onMouseEnter={() => setHover((prev) => ({ ...prev, software: currentRating }))}
                    onMouseLeave={() => setHover((prev) => ({ ...prev, software: null }))}
                    className="cursor-pointer"
                  >
                    <FaStar
                      size={24}
                      className={
                        currentRating <= (hover.software || ratings.software)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                );
              })}
            </div>
            {ratings.software > 0 && (
              <div className="mt-2">
                <label className="text-sm font-semibold">{questionForSoftware}</label>
                <textarea
                  value={comments.software}
                  onChange={(e) => setComments((prev) => ({ ...prev, software: e.target.value }))}
                  className="w-full border p-2 rounded resize-none border-gray-300 mt-2"
                  rows={3}
                  placeholder="Write your feedback about software..."
                />
              </div>
            )}
          </div>

          {/* Star Rating for Ease of Use */}
          <div className="flex flex-col mb-4">
            <h3 className="text-lg font-semibold mb-2">Ease of use</h3>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => {
                const currentRating = i + 1;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setRatings((prev) => ({ ...prev, easeOfUse: currentRating }));
                    }}
                    onMouseEnter={() => setHover((prev) => ({ ...prev, easeOfUse: currentRating }))}
                    onMouseLeave={() => setHover((prev) => ({ ...prev, easeOfUse: null }))}
                    className="cursor-pointer"
                  >
                    <FaStar
                      size={24}
                      className={
                        currentRating <= (hover.easeOfUse || ratings.easeOfUse)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                );
              })}
            </div>
            {ratings.easeOfUse > 0 && (
              <div className="mt-2">
                <label className="text-sm font-semibold">{questionForEaseOfUse}</label>
                <textarea
                  value={comments.easeOfUse}
                  onChange={(e) => setComments((prev) => ({ ...prev, easeOfUse: e.target.value }))}
                  className="w-full border p-2 rounded resize-none border-gray-300 mt-2"
                  rows={3}
                  placeholder="Write your feedback about ease of use..."
                />
              </div>
            )}
          </div>
        </div>

        {/* General Feedback Textarea */}
        <div className="mt-4">
          <label className="text-lg font-semibold mb-2">Feedback</label>
          <textarea
            placeholder="Write your feedback..."
            className="w-full border p-2 rounded resize-none border-gray-300"
            rows={4}
            value={comments.general}
            onChange={(e) => setComments((prev) => ({ ...prev, general: e.target.value }))}
          />
        </div>

        {/* Submit Button */}
        <div className="w-full flex flex-row justify-end">
          <CustomButton
            onClick={HandleFeedBackSubmit}
            disabled={disabled || !selectedDevice.device_id}
          >
            Submit
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
