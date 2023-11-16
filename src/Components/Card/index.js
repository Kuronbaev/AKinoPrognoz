import React from "react";

const Card = ({ el }) => {
  return (  
    <div className="container">
      <h1>{el.name}</h1>
    </div>
  );
};

export default Card;
