import React from "react";

const Pill = ({ img, onclick, title }) => {
  return (
    <div class="pill-main">
      <img src={img} alt="" class="pill-image"/>
      {title}
      <i class="fa-solid fa-x" onClick={onclick}></i>
    </div>
  );
};

export default Pill;
