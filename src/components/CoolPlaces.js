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
      <div id="info" className="alert alert-secondary"></div>

      <div className="column">
        <div className="col-12 col-lg-8">
          <div id="list" className="list-group"></div>
          <nav className="text-center">
            <button
              onClick={handleNextButton}
              id="next_button"
              type="button"
              className="btn btn-secondary"
            >
              Next
            </button>
          </nav>
        </div>
        <div className="col-12 col-lg-8">
          <div id="poi" className="alert"></div>
        </div>
      </div>
    </>
  );
}

export default CoolPlaces;
