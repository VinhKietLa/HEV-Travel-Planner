import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../styles/coolPlaces.css";
import { nextBtn, loadList } from "./otmLocationGet/location";

function CoolPlaces() {
  const handleNextButton = () => {
    nextBtn();
    loadList();
  };

  return (
    <>
      <div id="info" className="alert alert-secondary bg-secondary"></div>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div id="list" className="list-group"></div>
          <nav className="text-center">
            <button
              onClick={handleNextButton}
              id="next_button"
              type="button"
              className="btn btn-secondary"
            >
              <FontAwesomeIcon
                icon={faRightLong}
                style={{
                  height: "45px",
                  width: "45px",
                  color: "#a4cce3",
                  border: "none",
                }}
              />
            </button>
          </nav>
        </div>
        <div className="card col-12 col-lg-8 text-center">
          <div id="poi" className="alert card-text"></div>
        </div>
      </div>
    </>
  );
}

export default CoolPlaces;
