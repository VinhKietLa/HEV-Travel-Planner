import React from "react";

function CoolPlaces() {
  return (
    <>
      <div id="info" class="alert alert-primary"></div>
      <div class="row">
        <div class="col-12 col-lg-5">
          <div id="list" class="list-group"></div>
          <nav class="text-center">
            <button id="next_button" type="button" class="btn btn-primary">
              Next
            </button>
          </nav>
        </div>
        <div class="col-12 col-lg-7">
          <div id="poi" class="alert"></div>
        </div>
      </div>
    </>
  );
}

export default CoolPlaces;
