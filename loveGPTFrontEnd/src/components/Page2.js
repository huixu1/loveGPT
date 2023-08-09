import { Image, Card, Col, Row } from "antd";
import React from "react";

function Page2() {
  //const { Meta } = Card;
  const imageContainerStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const imageStyle = {
    //marginRight: "0px",
    textAlign: "center",
  };
  return (
    <div style={imageContainerStyle}>
      <div style={imageStyle}>
        <img
          src="https://images.unsplash.com/photo-1633367583895-08545d733dfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1hbiUyMHNtaWxpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
          alt="Image 1"
          width="300"
          height="400"
        />
        <p>click to chat</p>
        <p>click to chat2</p>
      </div>
      <div style={imageStyle}>
        <img
          src="https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fHdvbWVuJTIwc21pbGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="Image 2"
          width="300"
          height="400"
        />
        <p>click to chat</p>
      </div>
    </div>
  );
}

export default Page2;
