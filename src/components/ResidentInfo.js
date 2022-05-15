import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/ResidentInfo.css";

const ResidentInfo = ({ url }) => {
  const [resident, setResident] = useState({});

  useEffect(() => {
    axios.get(url).then((res) => setResident(res.data));
  }, [url]);

  return (
    <div className="card">
      <img src={resident.image} alt="" />
      <h3>{resident.name}</h3>
      <div className="status">
        <div
          className="dead"
          style={{
            background: resident.status === "Dead" ? "#ff0000" : "#adff2f",
          }}
        ></div>
        <p>
          <span>Status: </span>
          {resident.status}
        </p>
      </div>

      <p>
        <span>Origin: </span>
        {resident.origin?.name}
      </p>
      <p>
        <span>Episodes: </span>
        {resident.episode?.length}
      </p>
    </div>
  );
};

export default ResidentInfo;
