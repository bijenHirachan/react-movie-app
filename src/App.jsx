import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";

import { fetchDataFromApi } from "./utils/api";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Details from "./pages/Details";
import Explore from "./pages/Explore";
import SearchResult from "./pages/SearchResult";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];

    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    data?.map(({ genres }) => {
      return genres?.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
