import React, { useEffect } from "react";

const GlobalContext = React.createContext();

// actions
const LOADING = "LOADING";
const SET_VIDEOS = "SET_VIDEOS";
const SET_SELECTED_VIDEO = "SET_SELECTED_VIDEO";

// access payload in reducer to change state accordingly
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_VIDEOS:
      return {
        ...state,
        loading: false,
        // change video state
        videos: [
          ...action.payload.map((video) => {
            return {
              ...video,
              videoUrl: `http://localhost:3000/public/videos/${video.filename}`,
            };
          }),
        ],
      };
    default:
      return state;
  }
  return state;
};

// it will contain whole app
export const GlobalProvider = ({ children }) => {
  const initialState = {
    videos: [],
    loading: false,
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  // get videos
  const getAllVideos = async () => {
    try {
      // fetch all videos
      const res = await fetch("http://localhost:3000/api/videos");
      const data = await res.json();

      // dispatch an data to payload
      dispatch({ type: SET_VIDEOS, payload: data.videos });

      console.log(data.videos);
    } catch (e) {}
  };

  // on initial render ,fetch the videos
  useEffect(() => {
    getAllVideos();
  }, []);
  return (
    <GlobalContext.Provider value={{ ...state }}>
      {children}
    </GlobalContext.Provider>
  );
};

// need a function to use globalContext

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
};
