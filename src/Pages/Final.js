import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, m, motion } from "framer-motion";
import { useImage } from "../Helper/ImageContext";
import {
  getCookie,
  updateCookie,
  getUsernameFromCookie,
  getDescriptionByMbti,
  processImage,
  processImageToWallpaper,
} from "../Helper/Helper";
import { toast } from "react-toastify";
import TransitionAnimation from "../Components/TransitionAnimation";
import BigwinAnimation from "../Components/BigwinAnimation";
import Form1 from "../Components/Form1";
import { QRCodeSVG } from "qrcode.react";
import { analytics } from "../firebaseConfig/fireanalytics";
import { logEvent } from "firebase/analytics";
const Final = () => {
  let scrollbarStyle = "style-1";
  let r2url = "https://r2.web.moonshine.tw/msweb/roggamercard/";
  let r2urlformat = "https://r2.web.moonshine.tw/opt/lg/msweb/roggamercard/";
  let r2imagesurl = "https://r2.web.moonshine.tw/opt/md/msweb/roggamercard";
  let r2gifurl = "https://r2.web.moonshine.tw/msweb/roggamercard";

  const { username, setUsername } = useImage();
  const [showAnimationPrev, setShowAnimationPrev] = useState(false);
  const [resultData, setResultData] = useState({});
  const [homeCheckData, setHomeCheckData] = useState({});

  const [mbtiData, setMbtiData] = useState({});
  const [showBanner, setShowBanner] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("image");
  const [isCompressing, setIsCompressing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [wallpaperdUrl, setWallpaperdUrl] = useState("");
  const [card1Url, setCard1Url] = useState("");
  const [card2Url, setCard2Url] = useState("");
  const [card3Url, setCard3Url] = useState("");
  // const [printCardUrl,setPrintCardUrl]=useState('')
  const openFormModal = () => setShowFormModal(true);
  const closeFormModal = () => setShowFormModal(false);
  const onChange = ({ target }) => setUsername(target.value);
  const navigate = useNavigate();
  useEffect(() => {
    logEvent(analytics, "Enter_FinalResultPage");
  }, []);
  const divRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (divRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = divRef.current;
        console.log(scrollTop, scrollHeight, clientHeight);
        if (scrollTop + clientHeight >= scrollHeight) {
          console.log("Scrolled to bottom");
          setIsAtBottom(true);
        } else {
          console.log("Not yet at bottom");
          setIsAtBottom(false);
        }
      }
    };

    const divElement = divRef.current;
    if (divElement) {
      divElement.addEventListener("scroll", handleScroll);
      console.log("Event listener added");

      // 手动调用一次 handleScroll 以在页面加载时进行检测
      handleScroll();
    } else {
      console.log("divElement is not defined on initial render");
    }

    // Clean up event listener on component unmount
    return () => {
      if (divElement) {
        divElement.removeEventListener("scroll", handleScroll);
        console.log("Event listener removed");
      }
    };
  }, [divRef.current]);
  const mb_menu = [
    { title: "image" },
    { title: "download" },
    { title: "share" },
    { title: "star" },
    { title: "home" },
  ];
  const getTitleCardType = (title) => {
    console.log(title);
    const card_info = [
      { title: "ENFJ", cardtype: "white", fontcolor: "#fff" },
      { title: "ENFP", cardtype: "white", fontcolor: "#fff" },
      { title: "ENTJ", cardtype: "black", fontcolor: "#fff" },
      { title: "ENTP", cardtype: "black", fontcolor: "#fff" },
      { title: "ESFJ", cardtype: "red", fontcolor: "#ff0000" },
      { title: "ESFP", cardtype: "gradient", fontcolor: "#fff" },
      { title: "ESTJ", cardtype: "red", fontcolor: "#ff0000" },
      { title: "ESTP", cardtype: "gradient", fontcolor: "#fff" },
      { title: "INFJ", cardtype: "white", fontcolor: "#fff" },
      { title: "INFP", cardtype: "black", fontcolor: "#fff" },
      { title: "INTJ", cardtype: "black", fontcolor: "#fff" },
      { title: "INTP", cardtype: "black", fontcolor: "#fff" },
      { title: "ISFJ", cardtype: "red", fontcolor: "#ff0000" },
      { title: "ISFP", cardtype: "gradient", fontcolor: "#fff" },
      { title: "ISTJ", cardtype: "red", fontcolor: "#ff0000" },
      { title: "ISTP", cardtype: "gradient", fontcolor: "#fff" },
    ];

    // 使用 find 方法查找与给定 title 相对应的 cardtype
    const card = card_info.find((card) => card.title === title);
    // 如果找到了匹配的 title，则返回对应的 cardtype，否则返回 undefined
    return card;
  };

  const handleClick = () => {};
  const handleBackHome = () => {
    navigate("/");
  };
  const handlePrev = () => {
    setTimeout(() => {
      setShowAnimationPrev(true);
    }, 500);
    navigate("/camera");
  };
  const handleNext = () => {
    navigate("/render");
  };

  //處理圖片下載
  const handleDownload = async () => {
    try {
      let gamerNeme = getUsernameFromCookie();
      let imageData;
      const processedWallpaper = await processImageToWallpaper(
        resultData.result,
        "https://r2.web.moonshine.tw/msweb/roggamercard/templates/logos/wallpaperlogo1000_2.png",
        resultData.randomSelect === "2"
          ? "https://r2.web.moonshine.tw/msweb/roggamercard/templates/logos/wallpaper_top_logo_300.png"
          : null
      );
      // 获取原始图片的 Blob 数据
      const response = await fetch(processedWallpaper);
      imageData = await response.blob();

      // 创建一个 URL 对象
      const imageUrl = URL.createObjectURL(imageData);

      // 创建一个可下载的链接
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download = gamerNeme + "_" + resultData.mbti + "_Wallpaper.jpg"; // 设置下载文件的名称

      // 模拟点击下载链接
      a.click();

      // 释放 URL 对象
      URL.revokeObjectURL(imageUrl);
      logEvent(analytics, "onClickDownload_Wallpaper", {
        imageUrl: resultData.result,
      });
    } catch (error) {
      console.error("Error while handling download:", error);
      logEvent(analytics, "Fail_onClickDownloadWallpaper");
    }
  };

  //下載裁切好的卡片
  const handleDownloadCard = async () => {
    let card = await getTitleCardType(resultData.mbti);
    try {
      // 处理图片
      let gamerNeme = getUsernameFromCookie();
      let imageData;
      if (!card1Url.length > 0) {
        const response = await fetch(card1Url);
        imageData = await response.blob();
      } else {
        console.log("DL CARD3");
        const processedImage = await processImage(
          resultData.result,
          resultData.randomSelect === "2"
            ? r2url + "templates/border/card3/gold.png"
            : r2url + "templates/border/card3/" + card.cardtype + ".png",
          638,
          1016,
          getUsernameFromCookie(),
          "RobotoCon",
          "22",
          resultData.randomSelect === "2" ? "#a49250" : card.fontcolor,
          "90",
          { x: 70, y: 405 },
          resultData.mbti,
          "ROGFonts",
          "45",
          resultData.randomSelect === "2" ? "#000" : card.fontcolor,
          "90",
          { x: 50, y: 280 }
        );

        const response = await fetch(processedImage);
        imageData = await response.blob();
      }

      // 创建一个 URL 对象
      const imageUrl = URL.createObjectURL(imageData);

      // 创建一个可下载的链接
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download = gamerNeme + "_" + resultData.mbti + "_Card.jpg"; // 设置下载文件的名称

      // 模拟点击下载链接
      a.click();

      // 释放 URL 对象
      URL.revokeObjectURL(imageUrl);
      logEvent(analytics, "onClickDownload_Card1", {
        imageUrl: card1Url,
      });
    } catch (error) {
      console.error("Error while handling download:", error);
      logEvent(analytics, "Fail_onClickDownloadCard1");
    }
  };

  //處理圖片並產生網址給qrcode
  const processAndGenerateURL = async (imageUrl, mbtiName, randomSelect) => {
    try {
      //wallpapaer
      const processedWallpaper = await processImageToWallpaper(
        imageUrl,
        "https://r2.web.moonshine.tw/msweb/roggamercard/templates/logos/wallpaperlogo1000_2.png",
        randomSelect === "2"
          ? r2imagesurl + "/images/final_sm_win_icon.png"
          : null
      );
      const wallpaperfile = await base64toFileList(processedWallpaper);
      const wallpaperImageUrl = await uploadImageToR2(
        wallpaperfile[0],
        "wallpaper_"
      );
      setWallpaperdUrl(wallpaperImageUrl);

      const card = await getTitleCardType(mbtiName);

      //card1
      console.log();
      const processedCard1 = await processImage(
        imageUrl,
        randomSelect === "2"
          ? r2url + "templates/border/card1/gold.png"
          : r2url + "templates/border/card1/" + card.cardtype + ".png",
        1200,
        1500,
        getUsernameFromCookie(),
        "RobotoCon",
        "30",
        randomSelect === "2" ? "#a49250" : card.fontcolor,
        "90",
        { x: 120, y: 610 },
        mbtiName,
        "ROGFonts",
        "75",
        randomSelect === "2" ? "#000" : card.fontcolor,
        "90",
        { x: 95, y: 412 }
      );
      const card1file = await base64toFileList(processedCard1);
      const card1ImageUrl = await uploadImageToR2(card1file[0], "card_");
      setCard1Url(card1ImageUrl);
      //card2
      const processedCard2 = await processImage(
        imageUrl,
        randomSelect === "2"
          ? r2url + "templates/border/card2/gold.png"
          : r2url + "templates/border/card2/" + card.cardtype + ".png",
        1200,
        1200,
        getUsernameFromCookie(),
        "RobotoCon",
        "30",
        randomSelect === "2" ? "#a49250" : card.fontcolor,
        "90",
        { x: 120, y: 500 },
        mbtiName,
        "ROGFonts",
        "55",
        randomSelect === "2" ? "#000" : card.fontcolor,
        "90",
        { x: 100, y: 333 }
      );
      const card2file = await base64toFileList(processedCard2);
      const card2ImageUrl = await uploadImageToR2(card2file[0], "card2_");
      setCard2Url(card2ImageUrl);

      //card3
      const processedCard3 = await processImage(
        imageUrl,
        randomSelect === "2"
          ? r2url + "templates/border/card3/gold.png"
          : r2url + "templates/border/card3/" + card.cardtype + ".png",
        638,
        1016,
        getUsernameFromCookie(),
        "RobotoCon",
        "22",
        randomSelect === "2" ? "#a49250" : card.fontcolor,
        "90",
        { x: 70, y: 405 },
        mbtiName,
        "ROGFonts",
        "45",
        randomSelect === "2" ? "#000" : card.fontcolor,
        "90",
        { x: 50, y: 280 }
      );
      const card3file = await base64toFileList(processedCard3);
      const card3ImageUrl = await uploadImageToR2(card3file[0], "card3_");
      // setPrintCardUrl(card3ImageUrl)
      setCard3Url(card3ImageUrl);

      setIsProcessed(true);
      // 生成包含处理后的图片数据的URL
      const generatedURL = `${window.location.origin}/qr?a=${wallpaperImageUrl}&b=${card1ImageUrl}`;
      setQrUrl(generatedURL);
      console.log("Generated URL:", generatedURL);

      return generatedURL;
    } catch (error) {
      console.error("Error processing image and generating URL:", error);
      return null;
    }
  };
  //base64轉jpg
  function base64toFileList(base64String) {
    const byteCharacters = atob(base64String.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const file = new File(byteArrays, "image.jpeg", { type: "image/jpeg" });

    return [file];
  }

  //上傳圖片到ROGR2
  const uploadImageToR2 = async (imgfile, prefix) => {
    const apiUrl = "https://roggamercard_es-api.rd-02f.workers.dev/upload";
    const formData = new FormData();
    formData.append("source_image", imgfile);
    formData.append("prefix", prefix);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `${process.env.REACT_APP_APITOKEN}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        return data.uri; // 返回图像的实体网址
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleImageUpload = async (base64string) => {
    const base64Image = base64string; // 替换为你的base64图像
    // const imageUrl = await uploadImageToR2(base64Image);
    // console.log('Uploaded image URL:', imageUrl);
  };

  const handleShare = async () => {
    try {
      // 获取图片数据
      const response = await fetch(card1Url);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob(); // 将响应数据转换为 Blob

      // 创建分享数据
      const shareData = {
        files: [
          new File([blob], "image.jpg", {
            type: blob.type,
          }),
        ],
        title: "Share Image",
        text: "Check out this image!",
      };

      // 执行分享
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Image shared successfully");
        logEvent(analytics, "onClickShare_Card_mobile");
      } else {
        throw new Error("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
    }
  };

  //暫時無用
  const handleShareIg = async () => {
    try {
      // 获取图片数据
      const response = await fetch(card1Url);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob(); // 将响应数据转换为 Blob

      // 创建分享数据
      const shareData = {
        files: [
          new File([blob], "image.jpg", {
            type: blob.type,
          }),
        ],
        title: "Share Image",
        text: "Check out this image!",
      };

      // 执行分享
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Image shared successfully");
      } else {
        throw new Error("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
    }
  };
  const handleShareFb = () => {
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      resultData.result
    )}`;
    window.open(facebookShareURL, "_blank");
  };
  const handleShareX = async () => {
    try {
      // 获取图片数据
      const response = await fetch(card3Url);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob(); // 将响应数据转换为 Blob

      // 创建分享数据
      const shareData = {
        files: [
          new File([blob], "image.jpg", {
            type: blob.type,
          }),
        ],
        title: "Share Image",
        text: "Check out this image!",
      };

      // 执行分享
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Image shared successfully");
        logEvent(analytics, "onClickShareToX_Card_mobile");
      } else {
        throw new Error("Web Share API not supported");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    const waitForCssLoad = setTimeout(() => {
      setIsMobile(window.innerWidth < 768);
    }, 100); // 100ms 等待时间

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(waitForCssLoad);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const cookieData = getCookie("currentValue");
    const userDataFromCookie = JSON.parse(cookieData);
    setResultData(userDataFromCookie);

    const homeCheckData = getCookie("homeCheck");
    const homeCheckDataFromCookie = JSON.parse(homeCheckData);
    setHomeCheckData(homeCheckDataFromCookie);
    setMbtiData(getDescriptionByMbti(userDataFromCookie.mbti));
    // console.log(getDescriptionByMbti(userDataFromCookie.mbti))
    if (!isProcessed) {
      processAndGenerateURL(
        userDataFromCookie.result,
        userDataFromCookie.mbti,
        userDataFromCookie.randomSelect
      );
    }
  }, [isProcessed]);
  useEffect(() => {
    if (resultData.randomSelect === "2") {
      const timeoutId = setTimeout(() => {
        setShowBanner(true);
      }, 1000); // 等待兩秒後顯示
      return () => clearTimeout(timeoutId);
    }
  }, [resultData.randomSelect]);

  const areAllUrlsFilled = () => {
    return (
      wallpaperdUrl.length > 0 &&
      card1Url.length > 0 &&
      card2Url.length > 0 &&
      card3Url.length > 0
    );
  };
  const post_swapdata = async () => {
    try {
      const formData = new FormData();
      formData.append("username", getUsernameFromCookie());
      formData.append("result_image_url", resultData.result);
      formData.append("swap_image_url", resultData.template);
      formData.append("wallpaper_image_url", wallpaperdUrl);
      formData.append("card1_image_url", card1Url);
      formData.append("card2_image_url", card2Url);
      formData.append("card3_image_url", card3Url);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", process.env.REACT_APP_APITOKEN);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow",
      };
      const response = await fetch(
        "https://roggamercard_es-api.rd-02f.workers.dev/swap_data",
        requestOptions
      );
      if (!response.ok) {
        console.log("Send Fail, Please Try again.");
        logEvent(analytics, "SAVE_DB_FAIL");
        return;
      }
      // const responseData = await response.json();
      // console.log(response.status)
      logEvent(analytics, "SAVE_DB_SUCCESS");
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect 监听三个 URL 状态的变化
  useEffect(() => {
    // 检查是否所有的 URL 都已经有值
    if (homeCheckData.agreeCookie && areAllUrlsFilled()) {
      // 执行上传操作
      post_swapdata();
    } else {
      console.log(homeCheckData.agreeCookie);
      console.log("no set Cookie");
    }
  }, [wallpaperdUrl, card1Url, card2Url, card3Url, homeCheckData.agreeCookie]); // 在这里定义 useEffect 的依赖项

  if (!resultData) {
    navigate("/");
  }
  return (
    <div className=" relative h-[100dvh]  ">
      {showBanner && resultData.randomSelect === "2" && (
        <BigwinAnimation setShowBanner={setShowBanner} />
      )}
      {showBanner && resultData.randomSelect === "2" && (
        <div className="w-full h-screen bg-black/60 fixed top-0 left-0 z-[60]"></div>
      )}
      {showFormModal && (
        <>
          {resultData && resultData.randomSelect === "2" ? (
            <Form1
              closeModal={closeFormModal}
              line1={
                "¡Enhorabuena por conseguir la INSIGNIA SUPER RARA: estás entre un 0,5 % de afortunados! "
              }
              line2={
                "Facilita tus datos para que podamos entregarte el premio del sorteo misterioso. Gracias por unirte de nuevo a ROG MBTI Gamer Card."
              }
              gamerid={getUsernameFromCookie()}
              formtype={"REDEEM"}
            />
          ) : (
            <Form1
              closeModal={closeFormModal}
              line1={
                'Enhorabuena, has completado la experiencia "Crea tu carta de jugador".'
              }
              line2={
                "Ahora, introduce tus datos para tener la oportunidad de ganar el nuevo portátil gaming ROG Zephyrus."
              }
              line3={"📍 Duración del concurso: del 27/9 al 13/10"}
              line4={"🎁 Premios:"}
              line5={
                <ul>
                  <li>1 x portátil ROG Zephyrus (1r ganador)</li>
                  <li>1 x ratón ROG Harpe Ace Aim Lab Edition Blanco</li>
                  <li>5 x Jengas</li>
                </ul>
              }
              line6={
                "Los ganadores recibirán una notificación por correo electrónico en la dirección de contacto antes del 20/10. Si no eres uno de los ganadores, no recibirás ninguna notificación."
              }
              gamerid={getUsernameFromCookie()}
              formtype={"RAFFLE"}
            />
          )}
        </>
      )}

      {isMobile ? (
        <div className="w-full h-[100dvh] ">
          {resultData && resultData.randomSelect === "2" && (
            <motion.div
              initial={{ opacity: 0, scale: 1.2, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.2, y: -30 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 1.3,
              }}
              className="h-[100dvh] bg-cover bg-bottom bg-no-repeat z-10 fixed  top-0 left-0 w-full animate-pulse animate-infinite animate-alternate pointer-events-none"
              style={{
                backgroundImage: `url('${
                  r2imagesurl + "/images/mb/final_win_topmask.png"
                }')`,
                overscrollBehavior: "none",
              }}
            >
              <div className=" fixed bottom-0 w-full transition-all ">
                <img
                  src={r2imagesurl + "/images/mb/final_win_bottommask.png"}
                  alt=""
                />
              </div>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: "0%", scale: 1.15 }}
            animate={{ opacity: 1, y: "0%", scale: 1.15 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-[100dvh] transition-all w-full bg-cover bg-center bg-no-repeat z-0 fixed top-0 left-0 pointer-events-none"
            style={{
              backgroundImage: `${
                resultData
                  ? `url('${resultData.result}')`
                  : `url('${r2imagesurl + "/images/final_character.png"}')`
              }`,
              touchAction: "none",
            }}
          ></motion.div>
          <div
            className=" fixed top-0 left-0 w-full h-[100dvh] bg-bottom bg-cover bg-no-repeat pointer-events-none  bg-gradient-to-t from-black via-black/75 to-black/0  "
            // style={{
            //   backgroundImage: `url('${r2imagesurl+'/images/mb/final_mask2.png'}')`,
            // }}
          ></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.5,
            }}
            className=" fixed bottom-0 left-0 w-full h-1/2  bg-bottom bg-cover bg-no-repeat opacity-90 pointer-events-none"
            style={{
              backgroundImage: `url('${
                r2imagesurl + "/images/mb/final_mask_red.png"
              }')`,
            }}
          ></motion.div>

          <div className="w-full h-[100dvh] fixed bottom-0 left-0 flex flex-col overflow-hidden   ">
            <div className="h-[45dvh] w-full bg-fuchsia-500/0 mt-auto flex flex-col  ">
              <div
                className={`flex justify-between items-center w-[80%] mx-auto ${
                  resultData.randomSelect === "2"
                    ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100"
                    : "opacity-80 brightness-100"
                }`}
              >
                {mb_menu.map((item, index) => {
                  // item.title star  display after 202409/27
                  if (
                    item.title === "star" &&
                    new Date() < new Date("2024-09-27")
                  ) {
                    return null;
                  }
                  return (
                    <div
                      key={"mb_menu_" + index}
                      onClick={() => setCurrentMenu(item.title)}
                      className=" bg-purple-400/0 relative"
                    >
                      <img
                        src={
                          r2gifurl + "/images/mb/final_" + item.title + ".svg"
                        }
                        alt=""
                      />
                      {item.title === currentMenu && (
                        <motion.div
                          initial={{ opacity: 0, x: "-50%", y: 10 }}
                          animate={{ opacity: 1, x: "-50%", y: 0 }}
                          exit={{ opacity: 0, x: "-50%", y: 10 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                          }}
                          className=" absolute w-[100%] left-1/2 bg-amber-400/0 flex items-center justify-center"
                        >
                          <img
                            src={r2gifurl + "/images/mb/final_selected.svg"}
                            alt=""
                          />
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
              <AnimatePresence initial={true} mode="wait">
                {currentMenu === "image" && (
                  <motion.div
                    key="p_inmage"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // exit={{ opacity: 0}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="w-full bg-slate-700/0 pl-[10%] pr-[4%] mt-[5%] "
                  >
                    <div
                      className={`w-[4vw] fixed right-[6%] bottom-[2%]   z-[99999] pointer-events-none transition-all ${
                        isAtBottom ? "opacity-0" : " opacity-100"
                      } `}
                    >
                      <img
                        src={r2gifurl + "/images/mb/scroll_icon.svg"}
                        alt=""
                        className=" animate-pulse"
                      />
                    </div>
                    <div
                      ref={divRef}
                      className={`${scrollbarStyle} relative overflow-y-auto bg-slate-500/0 pr-[5%] max-h-[50dvh] pb-[10%]  ${
                        resultData.randomSelect === "2"
                          ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100"
                          : "opacity-80 brightness-100"
                      }`}
                      style={{
                        overscrollBehaviorY: "contain",
                      }}
                    >
                      <div
                        className={`flex items-center justify-start gap-3 mt-[10%] mb-[5%]  `}
                      >
                        <div className="w-[10%]">
                          <img
                            src={
                              r2imagesurl +
                              "/mbti/sm_icon/" +
                              resultData.mbti +
                              ".png"
                            }
                            className=""
                            alt=""
                          />
                        </div>

                        <div className="font-cachetpro text-[5vw] align-middle bg-slate-500/0 pt-[2%] leading-3 ">
                          {resultData.mbti}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className=" font-cachetpro text-[5vw] font-semibold  ">
                          Nombre del jugador:
                        </div>
                        <div className=" font-robotocon font-semibold  text-[5vw] leading-relaxed ">
                          {getUsernameFromCookie()}
                        </div>
                      </div>
                      <div className=" text-[4vw] mt-[5%]  text-white/80 font-light  overflow-hidden overflow-y-auto font-robotocon ">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: mbtiData.description,
                          }}
                        />
                      </div>
                      <div className="mt-[10%]">
                        <div className="font-cachetpro text-[5vw] leading-[1.8vw]  ">
                          Producto recomendado:
                        </div>
                      </div>
                      <div className="mt-[10%] font-light flex flex-col gap-8 pb-[25%]">
                        {mbtiData &&
                          mbtiData.products &&
                          mbtiData.products.map((items, index) => {
                            return (
                              <div
                                key={"products_" + index}
                                className="flex items-center justify-start gap-4"
                              >
                                <div className="w-[40px] bg-sky-400/0  aspect-[1/1] ">
                                  <img
                                    src={
                                      r2url +
                                      "templates/product_icon/" +
                                      items.type +
                                      ".svg"
                                    }
                                    alt="icon"
                                    className="w-full aspect-[1/1]  object-contain "
                                  />
                                </div>

                                <a
                                  href={items.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className=" font-cachetpro text-[4vw] underline whitespace-nowrap"
                                  onClick={() => {
                                    logEvent(
                                      analytics,
                                      "onClick_RecommendedProduct",
                                      {
                                        productName: items.name,
                                        productLink: items.link,
                                      }
                                    );
                                  }}
                                >
                                  {items.name}
                                </a>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </motion.div>
                )}
                {currentMenu === "download" && (
                  <motion.div
                    key="p_download"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // exit={{ opacity: 0}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="w-full bg-slate-700/0 px-[10%]  flex items-center h-full"
                  >
                    <div
                      className={` flex flex-col justify-center items-center gap-10 bg-orange-400/0 w-full `}
                    >
                      <a
                        href={card3Url}
                        target="_blank"
                        rel="noreferrer"
                        className={`${
                          qrUrl && qrUrl.length > 0
                            ? "hover:scale-95 cursor-pointer  "
                            : " pointer-events-none grayscale text-zinc-600  cursor-wait "
                        }  transition-all duration-500 flex items-end justify-between  bg-fuchsia-100/0 pl-[10%] relative`}
                      >
                        <div className=" absolute top-0 left-0 w-[12%]  ">
                          {qrUrl && qrUrl.length > 0 ? (
                            <img
                              className=" absolute -top-1 left-0"
                              src={r2imagesurl + "/images/final_dl_icon.png"}
                              alt=""
                            />
                          ) : (
                            <div className="absolute top-0 left-0 flex items-center justify-center w-full aspect-square ">
                              <div className=" w-[4vw]  aspect-square   animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                            </div>
                          )}
                        </div>

                        <div
                          className={` ${
                            resultData.randomSelect === "2" && "text-[#C7B299]"
                          } font-cachetpro bg-sky-400/0 text-[5vw] underline`}
                        >
                          Descargar carta de jugador
                        </div>
                      </a>
                      <a
                        href={wallpaperdUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`${
                          qrUrl && qrUrl.length > 0
                            ? "hover:scale-95 cursor-pointer  "
                            : " pointer-events-none grayscale text-zinc-600 cursor-wait "
                        } transition-all duration-500 flex items-end justify-between bg-fuchsia-100/0 pl-[10%] relative`}
                      >
                        <div className=" absolute top-0 left-0 w-[12%]  ">
                          {qrUrl && qrUrl.length > 0 ? (
                            <img
                              className=" absolute  left-0"
                              src={r2imagesurl + "/images/final_dl_icon.png"}
                              alt=""
                            />
                          ) : (
                            <div className="absolute top-0 left-0 flex items-center justify-center w-full aspect-square ">
                              <div className=" w-[4vw]  aspect-square   animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                            </div>
                          )}
                        </div>

                        <div
                          className={` ${
                            resultData.randomSelect === "2" && "text-[#C7B299]"
                          } font-cachetpro bg-sky-400/0 text-[5vw] underline`}
                        >
                          Descargar fondo de pantalla
                        </div>
                      </a>
                    </div>
                  </motion.div>
                )}
                {currentMenu === "share" && (
                  <motion.div
                    key="p_share"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // exit={{ opacity: 0}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="w-full bg-slate-700/0 px-[10%]  flex items-center h-full"
                  >
                    <div
                      className={` flex flex-col justify-center items-center  bg-orange-400/0 w-full ${
                        resultData.randomSelect === "2"
                          ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100 "
                          : "opacity-80 brightness-100 "
                      } `}
                    >
                      <div className="flex gap-[16%] mt-[7%] w-full justify-center ">
                        {/* <div className=' flex items-center w-[12%] aspect-square' onClick={handleShare}><img src={r2imagesurl+'/images/ig.svg'} alt="" className='w-full ' /></div> */}
                        <div
                          className=" flex items-center w-[10%] aspect-square"
                          onClick={handleShareX}
                        >
                          <img
                            src={r2gifurl + "/images/twitter.svg"}
                            alt=""
                            className="w-full"
                          />
                        </div>
                        <div
                          className=" flex items-center w-[6%] aspect-square"
                          onClick={handleShare}
                        >
                          <img
                            src={r2gifurl + "/images/fb.svg"}
                            alt=""
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {currentMenu === "star" && (
                  <motion.div
                    key="p_star"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    // exit={{ opacity: 0,y:10}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="w-full bg-slate-700/0 px-[0%]   flex items-end h-auto mt-auto "
                  >
                    <div className="   bg-orange-400/0 w-full relative   ">
                      {resultData.randomSelect === "2" ? (
                        <div className=" absolute z-20  top-0 scale-[120%] pointer-events-none">
                          <img
                            src={
                              r2imagesurl +
                              "/images/mb/final_redeem_banner2x.png"
                            }
                            alt=""
                            className="z-0 w-full mx-auto "
                          />
                        </div>
                      ) : (
                        <div className=" absolute z-20  top-0 scale-[120%] pointer-events-none">
                          <img
                            src={
                              r2imagesurl +
                              "/images/mb/final_raffle_banner2x.png"
                            }
                            alt=""
                            className="z-0 w-full mx-auto "
                          />
                        </div>
                      )}

                      <img
                        src={r2imagesurl + "/images/mb/star_fire.png"}
                        alt=""
                        className="z-0 w-10/12 mx-auto brightness-[.6] "
                      />

                      <div className="w-full bg-blue-400/0 pt-[7%] h-[15dvh] fixed bottom-0 z-20  ">
                        <div className=" flex justify-center h-full bg-violet-600/0 relative">
                          <motion.div
                            initial={{ opacity: 0, x: 0, y: "50%" }}
                            animate={{ opacity: 1, x: "0%", y: "0%" }}
                            // exit={{ opacity: 0, x: 0,y:'50%' }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 20,
                              delay: 0.3,
                            }}
                            className=" top-1/2 left-0 z-40 h-10 flex items-center bg-slate-700/0"
                          >
                            <button
                              onClick={openFormModal}
                              className="h-full  w-[100%] aspect-[90/40]  bg-contain bg-left-top bg-no-repeat flex items-center justify-center hover:scale-95 font-cachet font-bold"
                              style={{
                                backgroundImage: `url('${
                                  r2imagesurl + "/images/redbutton_bg.png"
                                }')`,
                              }}
                            >
                              Go
                            </button>
                          </motion.div>
                          <div className="h-[4vh] w-[1px] bg-white/70 absolute bottom-0 left-1/2 -translate-x-1/2 "></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {currentMenu === "home" && (
                  <motion.div
                    key="p_home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    // exit={{ opacity: 0}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.3,
                    }}
                    className="w-full  px-[10%]  flex items-center h-full bg-gradient-to-t from-red-800 via-red-800/30"
                  >
                    <div
                      className={`flex flex-col justify-center items-center gap-10 bg-orange-400/0 w-full`}
                    >
                      <div className=" font-cachetpro bg-sky-400/0 text-[5vw] text-center ">
                        ¿ESTÁS SEGURO DE QUE QUIERES SALIR? <br />
                        Perderás todo tu progreso. Volver a la página de inicio.
                      </div>

                      <div
                        onClick={handleBackHome}
                        className="hover:scale-95 cursor-pointer flex items-end justify-between bg-fuchsia-100/0 pl-[12%] relative"
                      >
                        <img
                          className=" absolute top-1 left-0 w-[15%]"
                          src={r2gifurl + "/images/roglogo_red.svg"}
                          alt=""
                        />
                        <div className=" font-cachetpro bg-sky-400/0 text-[5vw] underline">
                          Back to Home Page
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className=" absolute w-full h-screen  z-50 flex justify-center items-center  ">
            <div className=" relative bg-slate-400/0 w-[80vw] h-[80vh] flex items-center justify-between gap-2  ">
              <div className=" absolute top-1/2 -translate-y-1/2 left-0 h-full w-[1px] bg-white/20"></div>
              <div className=" absolute top-1/2 -translate-y-1/2 right-0 h-full w-[1px] bg-white/20"></div>
              <motion.div
                className={` h-full  w-[70%] bg-purple-500/0 relative pl-10 flex flex-col  ${
                  resultData.randomSelect === "2" ? "pt-[0%] " : "pt-[3%] "
                }`}
              >
                <div className=" absolute top-1/2 -translate-y-1/2 left-0 h-full w-[1px] bg-white/20 hidden"></div>

                <motion.div
                  initial={{ opacity: 0, y: "10%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  exit={{ opacity: 0, y: "10%" }}
                  transition={{
                    type: "spring",
                    stiffness: 130,
                    damping: 20,
                    delay: 0.2,
                  }}
                  className="pr-[73%] mb-[%]  "
                >
                  <div
                    className={
                      resultData.randomSelect === "2"
                        ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100 "
                        : "opacity-80 brightness-100 "
                    }
                  >
                    {resultData.randomSelect === "2" && (
                      <div className="w-[64%] mb-4">
                        <img
                          src={r2imagesurl + "/images/final_sm_win_icon.png"}
                          className="w-full"
                          alt=""
                        />
                      </div>
                    )}
                    <div className="w-[]">
                      <div className=" font-cachetpro text-[2.8vmin] font-semibold pt-[4%] leading-3 ">
                        Nombre del jugador:
                      </div>
                    </div>

                    <div className="mt-[8%] font-robotocon font-semibold text-[2.2vmin]">
                      {getUsernameFromCookie()}
                    </div>
                  </div>
                  <div
                    className={`w-full h-auto  mt-[10%] overflow-hidden relative flex flex-col justify-start  bg-slate-400/0    ${
                      resultData.randomSelect === "2"
                        ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100"
                        : "opacity-80 brightness-100 "
                    }`}
                  >
                    <div
                      className={`flex items-center justify-start gap-3 mt-[10%] opacity-90 `}
                    >
                      <div className="w-[15%]">
                        <img
                          src={
                            r2imagesurl +
                            "/mbti/sm_icon/" +
                            resultData.mbti +
                            ".png"
                          }
                          className=""
                          alt=""
                        />
                      </div>

                      <div className="font-cachetpro text-[2.8vmin] align-middle bg-slate-500/0 pt-[4%] leading-3 ">
                        {resultData.mbti}
                      </div>
                    </div>
                    <div
                      className={`${scrollbarStyle} max-h-[40vh] overflow-y-auto pr-3  text-[1.5vmin] mt-[6%] leading-4 xl:leading-normal  text-white/80 font-light  overflow-hidden  font-robotocon `}
                    >
                      {mbtiData.description}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: "10%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  exit={{ opacity: 0, y: "10%" }}
                  transition={{
                    type: "spring",
                    stiffness: 130,
                    damping: 20,
                    delay: 1,
                  }}
                  className={`mt-auto ${
                    resultData.randomSelect === "2"
                      ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100"
                      : "opacity-80 brightness-100"
                  }`}
                >
                  <div className="w-[20%]">
                    <div className="font-cachetpro text-[2.8vmin] leading-[2.8vmin]  ">
                      Producto recomendado:
                    </div>
                  </div>

                  <div className="mt-[2%] font-light flex  gap-3 w-full  ">
                    {mbtiData &&
                      mbtiData.products &&
                      mbtiData.products.map((items, index) => {
                        return (
                          <div
                            key={"products_" + index}
                            className={`flex items-center justify-start relative  ${
                              mbtiData.products.length >= 4
                                ? " flex-1  gap-2"
                                : "flex-auto  gap-4 "
                            }  `}
                          >
                            <div className="w-[0.5vw]">
                              <img
                                src={
                                  r2gifurl + "/images/final_recom_prod_red.svg"
                                }
                                alt=""
                                className="w-full"
                              />
                            </div>

                            <div
                              className={` ${
                                mbtiData.products.length >= 4
                                  ? " w-[3vw] h-[3vh]"
                                  : "w-[4vw] h-[4vh] "
                              }  min-w-[30px]`}
                            >
                              <img
                                src={
                                  r2url +
                                  "templates/product_icon/" +
                                  items.type +
                                  ".svg"
                                }
                                alt="icon"
                                className="w-full object-contain h-full"
                              />
                            </div>

                            <a
                              href={items.link}
                              target="_blank"
                              rel="noreferrer"
                              className=" font-cachetpro text-[1vw] underline whitespace-nowrap"
                              onClick={() => {
                                logEvent(
                                  analytics,
                                  "onClick_RecommendedProduct",
                                  {
                                    productName: items.name,
                                    productLink: items.link,
                                  }
                                );
                              }}
                            >
                              {items.name}
                            </a>
                          </div>
                        );
                      })}
                    {mbtiData &&
                      mbtiData.products &&
                      mbtiData.products.length === 2 && (
                        <>
                          <div className="flex-1"></div>
                          <div className="flex-1"></div>
                        </>
                      )}
                    {mbtiData &&
                      mbtiData.products &&
                      mbtiData.products.length === 3 && (
                        <>
                          <div className="flex-1"></div>
                        </>
                      )}
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 130,
                  damping: 20,
                  delay: 0.5,
                }}
                className="bg-blue-500/0 w-[30%]  flex flex-col items-end justify-between h-full pt-[5%] pr-[2%]"
              >
                <motion.div
                  className={`w-full space-y-[8%] flex flex-col  justify-end items-end ${
                    resultData.randomSelect === "2"
                      ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100"
                      : "opacity-80 brightness-100 "
                  }`}
                >
                  {/* after 2024 09 27 display this button */}
                  {new Date() > new Date("2024-09-27") && (
                    <div
                      className="hover:scale-95 cursor-pointer flex items-end  w-[76%] bg-fuchsia-100/0 pl-[12%] relative "
                      onClick={openFormModal}
                    >
                      <div className=" absolute -top-1 -left-[1px] w-[12%]">
                        <img
                          className="w-full"
                          src={
                            resultData.randomSelect === "2"
                              ? r2gifurl + "/images/final_raffle_gold_icon.svg"
                              : r2gifurl + "/images/final_raffle_icon.svg"
                          }
                          alt=""
                        />
                      </div>

                      <div
                        className=" font-cachetpro bg-contain  w-[100%] bg-no-repeat bg-right-bottom bg-sky-400/0 text-[1.2vw]"
                        style={{
                          backgroundImage: `url('${
                            r2imagesurl + "/images/final_text_ui.png"
                          }')`,
                        }}
                      >
                        {resultData.randomSelect === "2"
                          ? "Canjear el premio"
                          : "Participar en el sorteo"}
                      </div>
                    </div>
                  )}

                  <div
                    className={` flex items-end justify-between w-[76%] pl-[12%] relative transition-all duration-500  ${
                      qrUrl && qrUrl.length > 0
                        ? "hover:scale-95 cursor-pointer  "
                        : " grayscale brightness-50 cursor-wait "
                    }`}
                  >
                    <div className=" absolute -top-1 left-0 w-[11%]  ">
                      {qrUrl && qrUrl.length > 0 ? (
                        <img
                          className=" w-full"
                          src={
                            resultData.randomSelect === "2"
                              ? r2gifurl + "/images/final_dl_gold_icon.svg"
                              : r2gifurl + "/images/final_dl_icon.svg"
                          }
                          alt=""
                        />
                      ) : (
                        <div className="absolute top-0 left-0 flex items-center justify-center w-full aspect-square ">
                          <div className=" w-[1vw]  aspect-square   animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                        </div>
                      )}
                    </div>
                    <div
                      className={` font-cachetpro bg-contain  w-[100%] bg-no-repeat bg-right-bottom bg-sky-400/0 text-[1.2vw]`}
                      style={{
                        backgroundImage: `url('${
                          r2imagesurl + "/images/final_text_ui.png"
                        }')`,
                      }}
                      onClick={() => {
                        if (qrUrl && qrUrl.length > 0) {
                          handleDownloadCard();
                        }
                      }}
                    >
                      Descargar carta de jugador
                    </div>
                  </div>
                  <div
                    className={`flex items-end justify-between w-[76%] pl-[12%] relative transition-all duration-500  ${
                      qrUrl && qrUrl.length > 0
                        ? "hover:scale-95 cursor-pointer  "
                        : " grayscale brightness-50 cursor-wait "
                    }`}
                  >
                    <div className=" absolute -top-1 left-0 w-[11%]">
                      {qrUrl && qrUrl.length > 0 ? (
                        <img
                          className=" w-full"
                          src={
                            resultData.randomSelect === "2"
                              ? r2gifurl + "/images/final_dl_gold_icon.svg"
                              : r2gifurl + "/images/final_dl_icon.svg"
                          }
                          alt=""
                        />
                      ) : (
                        <div className="absolute top-0 left-0 flex items-center justify-center w-full aspect-square ">
                          <div className=" w-[1vw]  aspect-square   animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                        </div>
                      )}
                    </div>
                    <div
                      className=" font-cachetpro bg-contain  w-[100%] bg-no-repeat bg-right-bottom bg-sky-400/0 text-[1.2vw]"
                      style={{
                        backgroundImage: `url('${
                          r2imagesurl + "/images/final_text_ui.png"
                        }')`,
                      }}
                      onClick={() => {
                        if (qrUrl && qrUrl.length > 0) {
                          handleDownload();
                        }
                      }}
                    >
                      Descargar fondo de pantalla
                    </div>
                  </div>
                  <div
                    onClick={handleBackHome}
                    className="hover:scale-95 cursor-pointer flex items-end justify-between w-[76%] bg-fuchsia-100/0 pl-[12%] relative"
                  >
                    <div className=" absolute top-1 left-0 w-[11%]">
                      <img
                        className=" w-full "
                        src={
                          resultData.randomSelect === "2"
                            ? r2gifurl + "/images/roglogo_gold.svg"
                            : r2gifurl + "/images/roglogo_red.svg"
                        }
                        alt=""
                      />
                    </div>
                    <div
                      className=" font-cachetpro bg-contain  w-[100%] bg-no-repeat bg-right-bottom bg-sky-400/0 text-[1.2vw]"
                      style={{
                        backgroundImage: `url('${
                          r2imagesurl + "/images/final_text_ui.png"
                        }')`,
                      }}
                    >
                      Volver a la página de inicio
                    </div>
                  </div>
                </motion.div>

                <div className="mt-[2%] text-right  ml-auto relative pr-[8%] border-r border-white/50 w-[50%]  ">
                  <div className=" relative  p-4 bg-[#D9D9D950] rounded-md ">
                    <div className="  ">
                      {qrUrl && qrUrl.length > 0 ? (
                        <QRCodeSVG
                          value={qrUrl}
                          size={"100%"}
                          bgColor={"#ffffff"}
                          fgColor={"#000000"}
                          level={"L"}
                          includeMargin={true}
                        />
                      ) : (
                        <div className="w-full aspect-square flex justify-center items-center">
                          <div className="inline-block w-[1.4vw] aspect-square animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`mt-[2%] w-1/2 hidden ${
                    resultData.randomSelect === "2"
                      ? "brightness-[60%] sepia-[100%] saturate-[1]  opacity-100"
                      : "opacity-80 brightness-100 "
                  } `}
                >
                  <div className="w-full">
                    <div className="font-cachetpro text-[1.6vw] leading-[1.8vw]">
                      Share:
                    </div>
                  </div>

                  <div className="flex gap-[16%] mt-[7%] w-full ">
                    <div
                      className=" flex items-center w-[18%] aspect-square"
                      onClick={handleShareIg}
                    >
                      <img
                        src={r2gifurl + "/images/ig.svg"}
                        alt=""
                        className="w-full "
                      />
                    </div>
                    <div
                      className=" flex items-center w-[16%] aspect-square"
                      onClick={handleShareX}
                    >
                      <img
                        src={r2gifurl + "/images/twitter.svg"}
                        alt=""
                        className="w-full"
                      />
                    </div>
                    <div
                      className=" flex items-center w-[9%] aspect-square"
                      onClick={handleShareFb}
                    >
                      <img
                        src={r2gifurl + "/images/fb.svg"}
                        alt=""
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          {resultData && resultData.randomSelect === "2" && (
            <motion.div
              initial={{ opacity: 0, scale: 1.2, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.2, y: -30 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 1.3,
              }}
              className="h-screen bg-cover bg-bottom bg-no-repeat z-20 mix-blend- absolute top-0 left-0 w-full animate-pulse animate-infinite animate-alternate"
              style={{
                backgroundImage: `url('${
                  r2imagesurl + "/images/final_mask_win.png"
                }')`,
              }}
            ></motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-screen bg-cover bg-center bg-no-repeat z-0"
            style={{
              backgroundImage: `${
                resultData
                  ? `url('${resultData.result}')`
                  : `url('${r2imagesurl + "/images/final_character.png"}')`
              }`,
            }}
          ></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-screen bg-cover bg-center bg-no-repeat z-10 mix-blend-multiply absolute top-0 left-0 w-full"
            style={{
              backgroundImage: `url('${
                r2imagesurl + "/images/final_mask.png"
              }')`,
            }}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className=" absolute    top-1/2 -translate-y-1/2 left-0 z-50 h-8 flex items-center hidden"
          >
            <div className="h-[1px] w-[120px] bg-white/70 mr-2"></div>
            <button
              onClick={handlePrev}
              className="px-2 h-full bg-contain bg-left-top bg-no-repeat flex items-center justify-center w-[70px] hover:scale-95 font-cachet font-bold"
              style={{
                backgroundImage: `url('${
                  r2imagesurl + "/images/redbutton_bg.png"
                }')`,
              }}
            >
              Back
            </button>
          </motion.div>
        </>
      )}

      <span style={{ fontFamily: "ROGFonts" }} className=" fixed">
        &nbsp;
      </span>
      <span style={{ fontFamily: "RobotoConBold" }} className=" fixed">
        &nbsp;
      </span>
    </div>
  );
};

export default Final;
