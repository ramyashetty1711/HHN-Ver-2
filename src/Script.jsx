import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { APPURL } from "./URL";
import { updateVisitorsCount, updateVisitorsDataLoading } from "./redux/DataSlice";

// Generic fetch POST helper
const postOrGetData = async ({ url, data, method = "POST" }) => {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: method === "POST" ? JSON.stringify(data) : undefined,
  });

  let result;
  try {
    result = await res.json();
  } catch (err) {
    const text = await res.text();
    throw new Error(`Server returned non-JSON response: ${text}`);
  }

  if (!res.ok) {
    throw result;
  }

  return result;
};

export default function Script() {
  const LoggedInStatus = useSelector((state) => state.data.LoggedInStatus);
  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  // GET Mutation for visitors count
  const getVisitorCount = useMutation({
    mutationFn: () =>
      postOrGetData({ url: APPURL.pageVisitors, method: "GET" }),
    onSuccess: (data) => {
      dispatch(updateVisitorsCount(data));
      dispatch(updateVisitorsDataLoading(false));
      console.log("GET: Visitor count fetched");
    },
    onError: (err) => {
      console.error("Error while fetching visitor count:", err);
      dispatch(updateVisitorsDataLoading(false));
    },
  });

  // POST Mutation to update visitor count
  const postVisitorCount = useMutation({
    mutationFn: ({ url, data }) => postOrGetData({ url, data, method: "POST" }),
    onSuccess: () => {
      console.log("POST: Visitor count updated");
      getVisitorCount.mutate(); // Trigger GET after successful POST  
    },
    onError: (err) => {
      console.error("Error while posting visitor count:", err);
    },
  });

  // POST logic runs only once per session
  useEffect(() => {
    dispatch(updateVisitorsDataLoading(true));
    if (!sessionStorage.getItem("visited")) {
      sessionStorage.setItem("visited", "true");
      postVisitorCount.mutate({
        url: APPURL.pageVisitors,
        data: { page_name: "landing_page" },
      });
    } else {
      getVisitorCount.mutate(); // Directly fetch count if already visited
    }
  }, []);

  // Redirect if logged in
  useEffect(() => {
  if (LoggedInStatus) {
    const isAllowedPath = [
      "downloads",
      "tickets",
      "tutorials",
      "feedback",
    ].some((segment) => location.pathname.includes(segment));

    if (!isAllowedPath) {
      Navigate("/downloads");
    }
  }
}, [LoggedInStatus, location.pathname, Navigate]);


  return null;
}
