import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { APPURL } from "./URL";
import { getCountData } from "./query/UseFetchData";
import { updateVisitorsCount, updateVisitorsDataLoading } from "./redux/DataSlice";

const mutationFn = async ({ url, data }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
  const dispatch=useDispatch()

  const [shouldFetch, setShouldFetch] = useState(false); 
  console.log("post",shouldFetch);
  

  // Visitor count GET
  const {
    data: visitorsCount,
    isLoading: visitorsCountLoading,
  } = useQuery({
    queryKey: ["visitorsCount"],
    queryFn: () => getCountData(APPURL.pageVisitors),
    enabled: shouldFetch, 
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });
  
  console.log("script",visitorsCount);
  



  useEffect(() => {
  if (visitorsCount) {
    dispatch(updateVisitorsCount(visitorsCount));
  }
}, [visitorsCount, dispatch]);

useEffect(() => {
  dispatch(updateVisitorsDataLoading(visitorsCountLoading));
}, [visitorsCountLoading, dispatch]);

  // Visitor count POST
  const { mutate: PostVisitorCount } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      console.log("POST: Visitor count updated");
        setShouldFetch(true); // trigger GET after POST
    },
    onError: (err) => {
      if (err.detail) {
        console.error("Error while posting visitor:", err.detail);
      } else {
        console.error("Error while posting visitor:", err);
      }
    },
  });

  // POST logic runs only once per session
  useEffect(() => {
    if (!sessionStorage.getItem("visited")) {
      sessionStorage.setItem("visited", "true");
      PostVisitorCount({
        url: APPURL.pageVisitors,
        data: {
          page_name: "landing_page",
        },
      });
    } else {
      console.log("Already visited");
      setShouldFetch(true); // allow GET if already visited
    }
  }, []);

  // Redirect if logged in
  useEffect(() => {
    if (LoggedInStatus) {
      if (
        !location.pathname.includes("downloads") &&
        !location.pathname.includes("tickets") &&
        !location.pathname.includes("tutorials") &&
        !location.pathname.includes("feedback")
      ) {
        Navigate("/downloads");
      }
    }
  }, [LoggedInStatus, location.pathname, Navigate]);

  return null;
}
