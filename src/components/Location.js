import axios from "axios";
import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuiv4 } from "uuid";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../style/Location.css";
import background from "../assets/images/background.jpg";
import ResidentInfo from "./ResidentInfo";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Location = () => {
  const [location, setLocation] = useState({});
  const [id, setId] = useState("");

  useEffect(() => {
    const random = Math.floor(Math.random() * 126) + 1;
    axios
      .get(`https://rickandmortyapi.com/api/location/${random}/`)
      .then((res) => setLocation(res.data));
  }, []);

  console.log(location);

  const searchId = () => {
    axios
      .get(`https://rickandmortyapi.com/api/location/${id}/`)
      .then((res) => setLocation(res.data));
  };

  return (
    <div className="location">
      <div>
        <div className="img">
          <img src={background} alt="" />
        </div>
        <div className="text-input-header">
          <h1>Rick and Morty</h1>

          <input
            type="text"
            onChange={(e) => setId(e.target.value)}
            value={id}
            placeholder="type a location id"
          />
          <button onClick={searchId}>Search</button>

          <h2>{location.name}</h2>
          <div className="location">
            <p>
              <span>Type: </span>
              {location.type}
            </p>
            <p>
              <span>Dimensión: </span>
              {location.dimension}
            </p>
            <p>
              <span>Population: </span>
              {location.residents?.length}{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="swiperSlide">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={location.residents?.length}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {location.residents?.map((resident) => (
            <SwiperSlide>
              <ResidentInfo url={resident} key={uuiv4()} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Location;
