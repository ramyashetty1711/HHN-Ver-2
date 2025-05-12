import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useFetch } from "../../query/UseFetch";
import { APPURL } from "../../URL";
import { useToast } from "../Toast/ToastContext";
import CustomButton from "../Common/CustomButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getData } from "../../query/UseFetchData";
import { useLocalUserData } from "../../query/UseLocalData";

export default function Feedback() {
  const SessionData = useLocalUserData();

  const [selectedDevice, setSelectedDevice] = useState({});
  const [ratings, setRatings] = useState({
    look_rating: 0,
    rugged_rating: 0,
    app_ratings: 0,
    ease_of_use: 0,
  });
  const [hover, setHover] = useState({
    look_rating: null,
    rugged_rating: null,
    app_ratings: null,
    ease_of_use: null,
  });
  const [comments, setComments] = useState({
    look_feedback: "",
    rugged_feedback: "",
    app_feedback: "",
    ease_of_use_feedback: "",
    feedback: "",
  });

  const { mutate: PostTicket, isPending } = useMutation({
    mutationFn,

    onSuccess: (data) => {
      if (data.status === 201) {
        showToast({
          type: "success",
          heading: "Feedback Submitted",
          message: "We appreciate your input and have recorded your feedback.",
        });
        setComments({
          look_feedback: "",
          rugged_feedback: "",
          app_feedback: "",
          ease_of_use_feedback: "",
          feedback: "",
        });
        setRatings({
          look_rating: 0,
          rugged_rating: 0,
          app_ratings: 0,
          easeOfUse: 0,
        });
        setSelectedDevice({});
        setDisabled(true);
      }
    },
    onError: (err) => {},
  });
  const { data: devices } = useQuery({
    queryKey: ["devices"],
    queryFn: () => getData(APPURL.devices, SessionData.token),
    enabled: !!SessionData.token,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  const [disabled, setDisabled] = useState(true);
  const { showToast } = useToast();

  const HandleFeedBackSubmit = async () => {
    if (
      ratings.look_rating === 0 ||
      ratings.rugged_rating === 0 ||
      ratings.ratings === 0 ||
      ratings.ease_of_use === 0
    ) {
      showToast({
        type: "error",
        heading: "Error",
        message: "Please provide a rating for all categories to submit.",
      });
      return;
    }
    if (comments.feedback.length === 0) {
      showToast({
        type: "error",
        heading: "Error",
        message: "Please provide a Additional Feedback comment to submit.",
      });
      return;
    }
    // console.log({ ...ratings, ...comments });
    // return;

    PostTicket({
      url: APPURL.feedbacks,
      token: SessionData.token,
      data: JSON.stringify({ ...ratings, ...comments }),
    });
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     setComments({
  //       looks: "",
  //       ruggedness: "",
  //       software: "",
  //       easeOfUse: "",
  //       general: "",
  //     });
  //     setRatings({
  //       looks: 0,
  //       ruggedness: 0,
  //       software: 0,
  //       easeOfUse: 0,
  //     });
  //     setSelectedDevice({});
  //     setDisabled(true);
  //   }
  // }, [isSuccess]);

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
    setDisabled(!Object.values(ratings).every((r) => r > 0));
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
                      setRatings((prev) => ({
                        ...prev,
                        look_rating: currentRating,
                      }));
                    }}
                    onMouseEnter={() =>
                      setHover((prev) => ({
                        ...prev,
                        look_rating: currentRating,
                      }))
                    }
                    onMouseLeave={() =>
                      setHover((prev) => ({ ...prev, look_rating: null }))
                    }
                    className="cursor-pointer"
                  >
                    <FaStar
                      size={24}
                      className={
                        currentRating <=
                        (hover.look_rating || ratings.look_rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                );
              })}
            </div>
            {ratings.look_rating > 0 && (
              <div className="mt-2">
                <label className="text-sm font-semibold">
                  {questionForLooks}
                </label>
                <textarea
                  value={comments.look_feedback}
                  onChange={(e) =>
                    setComments((prev) => ({
                      ...prev,
                      look_feedback: e.target.value,
                    }))
                  }
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
                      setRatings((prev) => ({
                        ...prev,
                        rugged_rating: currentRating,
                      }));
                    }}
                    onMouseEnter={() =>
                      setHover((prev) => ({
                        ...prev,
                        rugged_rating: currentRating,
                      }))
                    }
                    onMouseLeave={() =>
                      setHover((prev) => ({ ...prev, rugged_rating: null }))
                    }
                    className="cursor-pointer"
                  >
                    <FaStar
                      size={24}
                      className={
                        currentRating <=
                        (hover.rugged_rating || ratings.rugged_rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                );
              })}
            </div>
            {ratings.rugged_rating > 0 && (
              <div className="mt-2">
                <label className="text-sm font-semibold">
                  {questionForRuggedness}
                </label>
                <textarea
                  value={comments.rugged_feedback}
                  onChange={(e) =>
                    setComments((prev) => ({
                      ...prev,
                      rugged_feedback: e.target.value,
                    }))
                  }
                  className="w-full border p-2 rounded resize-none border-gray-300 mt-2"
                  rows={3}
                  placeholder="Write your feedback about ruggedness..."
                />
              </div>
            )}
          </div>

          {/* Star Rating for Software */}
          <div className="flex flex-col mb-4">
            <h3 className="text-lg font-semibold mb-2">Software</h3>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => {
                const currentRating = i + 1;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setRatings((prev) => ({
                        ...prev,
                        app_ratings: currentRating,
                      }));
                    }}
                    onMouseEnter={() =>
                      setHover((prev) => ({
                        ...prev,
                        app_ratings: currentRating,
                      }))
                    }
                    onMouseLeave={() =>
                      setHover((prev) => ({ ...prev, app_ratings: null }))
                    }
                    className="cursor-pointer"
                  >
                    <FaStar
                      size={24}
                      className={
                        currentRating <=
                        (hover.app_ratings || ratings.app_ratings)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                );
              })}
            </div>
            {ratings.app_ratings > 0 && (
              <div className="mt-2">
                <label className="text-sm font-semibold">
                  {questionForSoftware}
                </label>
                <textarea
                  value={comments.app_feedback}
                  onChange={(e) =>
                    setComments((prev) => ({
                      ...prev,
                      app_feedback: e.target.value,
                    }))
                  }
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
                      setRatings((prev) => ({
                        ...prev,
                        ease_of_use: currentRating,
                      }));
                    }}
                    onMouseEnter={() =>
                      setHover((prev) => ({
                        ...prev,
                        ease_of_use: currentRating,
                      }))
                    }
                    onMouseLeave={() =>
                      setHover((prev) => ({ ...prev, ease_of_use: null }))
                    }
                    className="cursor-pointer"
                  >
                    <FaStar
                      size={24}
                      className={
                        currentRating <=
                        (hover.ease_of_use || ratings.ease_of_use)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </button>
                );
              })}
            </div>
            {ratings.ease_of_use > 0 && (
              <div className="mt-2">
                <label className="text-sm font-semibold">
                  {questionForEaseOfUse}
                </label>
                <textarea
                  value={comments.ease_of_use_feedback}
                  onChange={(e) =>
                    setComments((prev) => ({
                      ...prev,
                      ease_of_use_feedback: e.target.value,
                    }))
                  }
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
          <label className="text-lg font-semibold mb-2">
            Additional Feedback
          </label>
          <textarea
            placeholder="Write your feedback..."
            className="w-full border p-2 rounded resize-none border-gray-300"
            rows={4}
            value={comments.feedback}
            onChange={(e) =>
              setComments((prev) => ({ ...prev, feedback: e.target.value }))
            }
          />
        </div>

        {/* Submit Button */}
        <div className="w-full flex flex-row justify-end">
          <CustomButton
            onClick={HandleFeedBackSubmit}
            disabled={disabled}
            loading={isPending}
            className="min-w-[6em]"
          >
            Submit
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
const mutationFn = async ({ url, token, data }) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: data,
    });

    if (!res.ok) {
      const response = await res.json();
      throw response; // 🛑 throw error
    }

    return res;
  } catch (err) {
    throw err; // ✅ pass to onError
  }
};
