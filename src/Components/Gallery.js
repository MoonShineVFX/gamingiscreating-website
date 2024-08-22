import React, { useState } from "react";
import VerticalCarousel from "./VerticalCarousel";
import { config } from "@react-spring/web";

const slides = [
  {
    key: 1,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/ENFJ.png"
        alt="card"
      />
    )
  },
  {
    key: 2,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/ENFP.png"
        alt="card"
      />
    )
  },
  {
    key: 3,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/ENTJ.png"
        alt="card"
      />
    )
  },
  {
    key: 4,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/ENTP.png"
        alt="card"
      />
    )
  },
  {
    key: 5,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/ESFJ.png"
        alt="card"
      />
    )
  },
  {
    key: 6,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/ESFP.png"
        alt="card"
      />
    )
  },
  {
    key: 7,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/ESTJ.png"
        alt="card"
      />
    )
  },
  {
    key: 8,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/ESTP.png"
        alt="card"
      />
    )
  },
  {
    key: 9,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/INFJ.png"
        alt="card"
      />
    )
  },
  {
    key: 10,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/INFP.png"
        alt="card"
      />
    )
  },
  {
    key: 11,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/INTJ.png"
        alt="card"
      />
    )
  },
  {
    key: 12,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/INTP.png"
        alt="card"
      />
    )
  },
  {
    key: 13,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/ISFJ.png"
        alt="card"
      />
    )
  },
  {
    key: 14,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/ISFP.png"
        alt="card"
      />
    )
  },
  {
    key: 15,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/ISTJ.png"
        alt="card"
      />
    )
  },
  {
    key: 16,
    content: (
      <img
        style={{ width: "100%", height: "auto" }}
        src="https://r2.web.moonshine.tw/msweb/roggamercard/mbti_icon/ISTP.png"
        alt="card"
      />
    )
  }
];


export default function Gallery() {
  const [offsetRadius, setOffsetRadius] = useState(4);
  const [showNavigation, setShowNavigation] = useState(false);
  const [nowConfig, setNowConfig] = useState(config.gentle);

  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        margin: "0 auto"
      }}
    >
      <VerticalCarousel
        slides={slides}
        offsetRadius={offsetRadius}
        showNavigation={showNavigation}
        animationConfig={nowConfig}
      />
    </div>
  );
}
