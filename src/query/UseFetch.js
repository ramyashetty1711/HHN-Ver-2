import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Base Axios instance (you can change baseURL or leave it out for relative URLs)
const api = axios.create({
  //   baseURL: "https://your-api.com/api", // Optional: remove if not needed
  headers: {
    Accept: "application/json",
  },
});

// Helper to extract token from sessionStorage
const getAuthToken = () => {
  const user = sessionStorage.getItem("user");
  try {
    return user ? JSON.parse(user).token : null;
  } catch (e) {
    return null;
  }
};

export const useFetch = () => {
  const queryClient = useQueryClient();

  const get = ({ key, url, config = {} }) => {
    const queryInfo = useQuery({
      queryKey: [key],
      queryFn: async () => {
        const token = getAuthToken();
        const headers = {
          ...(config.headers || {}),
          ...(token ? { Authorization: `Token ${token}` } : {}),
        };

        const res = await api.get(url, { ...config, headers });
        return res.data;
      },
    });

    return {
      ...queryInfo, // Include all query info like data, isLoading, etc.
      refetch: queryInfo.refetch, // Add refetch method
    };
  };

  const mutationFn =
    (method) =>
    async ({ url, data, isForm = false, config = {} }) => {
      const token = getAuthToken();

      const headers = {
        ...(isForm
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Token ${token}` } : {}),
        ...(config.headers || {}),
      };

      const payload = isForm ? data : JSON.stringify(data);

      const res = await api.request({
        url,
        method,
        data: payload,
        headers,
        ...config, // allow query params, timeout, etc.
      });

      return res;
    };

  const post = useMutation({ mutationFn: mutationFn("post") });
  const put = useMutation({ mutationFn: mutationFn("put") });
  const patch = useMutation({ mutationFn: mutationFn("patch") });

  return {
    get,
    post,
    put,
    patch,
    invalidate: queryClient.invalidateQueries,
    queryClient,
  };
};
