import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/lib/redux/store";
import { setCredentials, logout } from "@/lib/redux/features/auth/authSlice";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  data: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  };
};

type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};


type RegisterResponse = {
  message: string;
};

type RefreshResponse = {
  data: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  };
};

export type Trip = {
  id: string;
  destination: string;
  travellers: number;
  startDate: string;
  endDate: string;
  budget: number | null;
  travelStyle: string | null;
  interests: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTripRequest = {
  destination: string;
  travellers: number;
  startDate: string;
  endDate: string;
  budget?: number;
  travelStyle?: string;
  interests?: string[];
};

export type ParsedTripPrompt = {
  destination: string;
  startDate: string;
  endDate: string;
  travellers: number;
  budget: number | null;
  travelStyle: string | null;
  interests: string[];
  highlights: string[];
  summary: string;
};

export type ParseTripPromptRequest = {
  prompt: string;
};

export type ParseTripPromptResponse = {
  data: ParsedTripPrompt;
};

export type TripResponse = { data: Trip };
export type TripsResponse = {
  data: Trip[];
  meta: { page: number; limit: number; total: number };
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  category: string;
  time: string;
  travelMode: string | null;
  travelMinutes: number | null;   
  travelDistanceKm: number | null;
};

export type ItineraryDay = {
  id: string;
  dayNumber: number;
  date: string;
  activities: Activity[];
};

export type Itinerary = {
  id: string;
  tripId: string;
  status: string;
  days: ItineraryDay[];
};

// NOTE: data can be null (trip exists, no itinerary yet)
export type ItineraryResponse = { data: Itinerary | null };

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const refreshData = refreshResult.data as RefreshResponse;

      api.dispatch(
        setCredentials({
          accessToken: refreshData.data.accessToken,
          user: (api.getState() as RootState).auth.user!,
        }),
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Trips","Itinerary"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    googleLogin: builder.mutation<LoginResponse, { idToken: string }>({
      query: (body) => ({
        url: "/auth/google",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
    }),
    updateUser: builder.mutation<RegisterResponse, Partial<RegisterRequest>>({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
    }),
    refresh: builder.mutation<RefreshResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),
    getTrips: builder.query<TripsResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: `/trips?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Trips"],
    }),

    getTrip: builder.query<TripResponse, string>({
      query: (id) => ({
        url: `/trips/${id}`,
        method: "GET",
      }),
      providesTags: ["Trips"],
    }),

    parseTripPrompt: builder.mutation<ParseTripPromptResponse, ParseTripPromptRequest>({
      query: (body) => ({
        url: "/trips/parse-prompt",
        method: "POST",
        body,
      }),
    }),

    createTrip: builder.mutation<TripResponse, CreateTripRequest>({
      query: (trip) => ({
        url: "/trips",
        method: "POST",
        body: trip,
      }),
      invalidatesTags: ["Trips"],
    }),

    updateTrip: builder.mutation<
      TripResponse,
      { id: string; data: Partial<CreateTripRequest> }
    >({
      query: ({ id, data }) => ({
        url: `/trips/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Trips"],
    }),

    deleteTrip: builder.mutation<void, string>({
      query: (id) => ({
        url: `/trips/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Trips"],
    }),

    getItinerary: builder.query<ItineraryResponse, string>({
      query: (tripId) => ({
        url: `/itineraries/${tripId}`,
        method: "GET",
      }),
      providesTags: (result, error, tripId) => [{ type: "Itinerary", id: tripId }],
    }),
    
    generateItinerary: builder.mutation<ItineraryResponse, string>({
      query: (tripId) => ({
        url: `/itineraries/generate/${tripId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, tripId) => [{ type: "Itinerary", id: tripId }],
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useRefreshMutation,
  useGetTripsQuery,
  useGetTripQuery,
  useParseTripPromptMutation,
  useCreateTripMutation,
  useUpdateTripMutation,
  useDeleteTripMutation,
  useGetItineraryQuery,
  useGenerateItineraryMutation
} = api;
