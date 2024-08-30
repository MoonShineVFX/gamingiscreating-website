export const setUsernameToCookie = (username) => {
  // 設定 cookie 的過期時間（此例為一天）
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);

  // 將 username 存入 cookie
  document.cookie = `username=${username}; expires=${expirationDate.toUTCString()}; path=/`;
};
export const getUsernameFromCookie = () => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "username") {
      return value;
    }
  }
  return null;
};

export const setCookie = (name, value, days) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  // 將 cookie 存入瀏覽器
  document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
};

/***
 *
 * setCookie('username', 'user123', 1); // 設置名稱為 'username' 的 cookie，過期時間為一天
 * setCookie('custom_cookie', 'value123', 7); // 設置自定義名稱的 cookie，過期時間為七天
 */

export const getCookie = (name) => {
  // 從 document.cookie 中獲取所有 cookie
  const cookies = document.cookie.split(";");

  // 遍歷所有 cookie，尋找與指定名稱匹配的 cookie
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName.trim() === name) {
      // 如果找到與指定名稱匹配的 cookie，則返回其值
      return decodeURIComponent(cookieValue);
    }
  }

  // 如果沒有找到與指定名稱匹配的 cookie，則返回 null
  return null;
};

export const updateCookie = (name, newValue) => {
  const cookieValue = getCookie(name);
  if (cookieValue) {
    // 解析现有的cookie值
    const data = JSON.parse(cookieValue);
    // 添加或更新值
    Object.assign(data, newValue);
    // 重新设置cookie
    setCookie(name, JSON.stringify(data), 1); // 假设setCookie是您之前定义的函数
  }
};

export const getDescriptionByMbti = (mbtiType) => {
  // const recommendedItem = recommended_List.find(item => item.mbti === mbtiType);
  // return recommendedItem ? recommendedItem.description : "No description available";
  return recommended_List.find((item) => item.mbti === mbtiType);
};

export const randomTwo = () => {
  let imgs = ["1", "2"]; // 图片数组
  let probabilities = [1.0, 0.0];
  // let probabilities = [0.995, 0.005];
  // let probabilities = [0.001, 0.999];
  let sum = 0;
  let r = Math.random(); // 生成一个[0, 1)之间的随机数

  for (let i = 0; i < probabilities.length; i++) {
    sum += probabilities[i]; // 累加概率值
    if (r <= sum) return imgs[i]; // 当随机数小于等于当前概率和时，返回对应的图片
  }

  return imgs[0]; // 默认返回第一张图片，理论上这行代码不应该被触达
};

export const recommended_List = [
  {
    mbti: "INTJ",
    description:
      "Los INTJ tienden a valorar el ingenio creativo, la racionalidad simple y la superación personal. A menudo les impulsa un intenso deseo de dominar todos y cada uno de los temas que despiertan su interés.\n\n  Tienen una inclinación por resolver problemas complejos y pueden encontrar refugio en los juegos de estrategia y simulación, atraídos por los retos mentales que plantean.",
    products: [
      {
        type: "xgm",
        name: "ROG XGM",
        link: "https://rog.asus.com/es/external-graphic-docks/rog-xg-mobile-2023-model/",
      },
      {
        type: "host",
        name: "ROG STRIX GT35",
        link: "https://rog.asus.com/es/desktops/full-tower/rog-strix-gt35-series/",
      },
      {
        type: "mtb",
        name: "ROG MAXIMUS Z790 DARK HERO",
        link: "https://rog.asus.com/es/motherboards/rog-maximus/rog-maximus-z790-dark-hero/",
      },
      {
        type: "nuc",
        name: "ROG NUC 14 Enthusiast ",
        link: "https://rog.asus.com/es/desktops/mini-pc/rog-nuc/",
      },
    ],
  },
  {
    mbti: "INTP",
    description:
      "Los INTP se crecen en el espacio infinito de la curiosidad y la abstracción. Con una mente que danza entre posibilidades, encuentran consuelo en la exploración y la creatividad, por lo que utilizan los RPG de mundo abierto como patios de recreo digitales.\n\nEstos juegos alimentan los deseos de los INTP de exploración sin límites y libertad para crear mundos intrincados.",
    products: [
      {
        type: "ltp",
        name: "ROG FLOW X13",
        link: "https://rog.asus.com/es/laptops/rog-flow/rog-flow-x13-2023-series/",
      },
      {
        type: "clr",
        name: "ROG Strix LC III 360 ARGB",
        link: "https://rog.asus.com/es/cooling/cpu-liquid-coolers/rog-strix-lc/rog-strix-lc-iii-360-argb/",
      },
    ],
  },
  {
    mbti: "ENTJ",
    description:
      "Los ENTJ son líderes natos movidos por la ambición y el pensamiento estratégico. Destacan a la hora de orquestar maniobras complejas y superar retos con estrategias calculadas. Por eso, sus juegos ideales son los tipo MOBA (arena de batalla multijugador), en los que las decisiones determinan el curso de la batalla. \n\n Las acciones que realizan en estos campos de batalla virtuales reflejan sus deseos de orden y triunfo.",
    products: [
      {
        type: "phn",
        name: "ROG PHONE 8",
        link: "https://rog.asus.com/es/phones/rog-phone-8/",
      },
      {
        type: "mtb",
        name: "ROG MAXIMUS Z790 FORMULA",
        link: "https://rog.asus.com/es/motherboards/rog-maximus/rog-maximus-z790-formula/",
      },
    ],
  },
  {
    mbti: "ENTP",
    description:
      "A los ENTP les mueve la curiosidad y el ingenio. Son capaces de aportar ideas, adaptarse e innovar con un dinamismo vertiginoso, por lo que son perfectos para los RPG de acción.\n\n Estos juegos ofrecen un escenario en el que pueden brillar por su rapidez mental y su capacidad de adaptación.",
    products: [
      {
        type: "ltp",
        name: "ROG ZEPHYRUS DUO",
        link: "https://rog.asus.com/es/laptops/rog-zephyrus/rog-zephyrus-duo-16-2023-series/",
      },
      {
        type: "mic",
        name: "ROG Carnyx",
        link: "https://rog.asus.com/es/streaming-kits/rog-carnyx/",
      },
    ],
  },
  {
    mbti: "INFJ",
    description:
      "Los INFJ son empáticos y perspicaces y encuentran consuelo en los RPG de aventuras con una buena base narrativa y emocional. \n\nEstos juegos nutren su profunda conexión con las historias y los personajes, pues les permiten sumergirse en intrincados mundos cargados de emociones.",
    products: [
      {
        type: "rtr",
        name: "ROG Rapture GT-BE98",
        link: "https://rog.asus.com/es/networking/rog-rapture-gt-be98-model/",
      },
      {
        type: "ctr",
        name: "ROG Raikiri Pro",
        link: "https://rog.asus.com/es/controllers/rog-raikiri-pro-model/",
      },
    ],
  },
  {
    mbti: "INFP",
    description:
      "Los INFP, con el corazón rebosante de poesía e imaginación, tienden a gravitar hacia experiencias emocionalmente inmersivas y artísticas.\n\n Los RPG de simulación con final abierto son sus santuarios digitales, pues ofrecen historias profundas e impresionantes efectos visuales. Los INFP encuentran en estos juegos su refugio poético, ya que les permiten explorar los escenarios ilimitados de su imaginación.",
    products: [
      {
        type: "ltp",
        name: "ROG ZEPHYRUS G14",
        link: "https://rog.asus.com/es/laptops/rog-zephyrus/rog-zephyrus-g14-2024/",
      },
      {
        type: "psu",
        name: "ROG-LOKI-1200T-SFX-L-GAMING",
        link: "https://rog.asus.com/es/power-supply-units/rog-loki/rog-loki-1200t-sfx-l-gaming-model/",
      },
    ],
  },
  {
    mbti: "ENFJ",
    description:
      "Los ENFJ son una combinación magnética de empatía y liderazgo. Les atraen los hero shooters cooperativos y en equipo, en los que florecen las dinámicas interpersonales. \n\n Estos juegos permiten a los ENFJ exhibir sus habilidades y coordinarse con los demás. Para los ENFJ, el gaming no es una aventura en solitario, sino una experiencia en comunidad, una plataforma para forjar conexiones y llevar a sus aliados virtuales a la victoria.",
    products: [
      {
        type: "wep",
        name: "ROG Cetra True Wireless SpeedNova",
        link: "https://rog.asus.com/es/headsets-audio/in-ear-headphone/rog-cetra-true-wireless-speednova/",
      },
    ],
  },
  {
    mbti: "ENFP",
    description:
      "Los ENFP abrazan la vida con un entusiasmo y una creatividad sin límites. Por eso tienden a sentirse como en casa en los juegos de supervivencia sandbox, pues los mundos virtuales que exploran se convierten en extensiones de su infinita curiosidad y su insaciable sed de vida.\n\nEstos juegos reflejan los vastos paisajes imaginativos de los ENFP y les permiten deleitarse en la libertad de embarcarse en aventuras épicas, conocer personajes diversos y descubrir tesoros ocultos.",
    products: [
      {
        type: "ltp",
        name: "ROG FLOW Z13",
        link: "https://rog.asus.com/es/laptops/rog-flow/rog-flow-z13-2023-series/",
      },
    ],
  },
  {
    mbti: "ISTJ",
    description:
      "A los ISTJ les gusta la precisión y el orden, tanto en la vida como en el gaming. Destacan en los juegos de estrategia y simulación que exigen una planificación meticulosa.\n\nLos simuladores de conducción y negocios permiten a los ISTJ preparar y gestionar metódicamente cada detalle. Se crecen ante los retos estructurados de asignación de recursos y toma de decisiones estratégicas.",
    products: [
      {
        type: "ltp",
        name: "ROG ZEPHYRUS M16",
        link: "https://rog.asus.com/es/laptops/rog-zephyrus/rog-zephyrus-m16-2023-series/",
      },
      {
        type: "ssd",
        name: "ROG STRIX ARION",
        link: "https://rog.asus.com/es/storage/rog-strix-arion-model/",
      },
    ],
  },
  {
    mbti: "ISFJ",
    description:
      "Los ISFJ suelen ser afectuosos y demostrar una lealtad inquebrantable. Su mente empática encaja perfectamente en los RPG por turnos basados en historias y en los juegos cooperativos. \n\n Estos juegos son sus refugios digitales, pues les ofrecen una oportunidad para entablar relaciones virtuales y un lienzo en blanco para desarrollar su carácter solidario.",
    products: [
      {
        type: "chr",
        name: "ROG Destrier Ergo Gaming Chair",
        link: "https://rog.asus.com/es/apparel-bags-gear/gear/rog-destrier-ergo-gaming-chair-model/",
      },
    ],
  },
  {
    mbti: "ESTJ",
    description:
      "Los ESTJ dirigen su vida con una autoridad y un pragmatismo inquebrantables, grandes cualidades por las que pueden disfrutar de los FPS (shooters en primera persona).\n\n Los trepidantes encuentros de estos juegos plantean retos estructurados de toma de decisiones, que gustan mucho a los ESTJ al poner a prueba su mente pragmática.",
    products: [
      {
        type: "host",
        name: "ROG G22CH",
        link: "https://rog.asus.com/es/desktops/small-form-factor/rog-g22ch-series/",
      },
      {
        type: "mse",
        name: "ROG Harpe Ace Aim Lab Edition",
        link: "https://rog.asus.com/es/mice-mouse-pads/mice/ambidextrous/rog-harpe-ace-aim-lab-edition-model/",
      },
    ],
  },
  {
    mbti: "ESFJ",
    description:
      "La empatía y el espíritu comunitario de los ESFJ hacen que sean perfectos para los juegos cooperativos y de simulación social.\n\n Estos juegos les permiten entablar relaciones y crear comunidades armoniosas. Los ESFJ se deleitan en el tejido interactivo de las amistades y convierten el gaming en animadas reuniones sociales.",
    products: [
      {
        type: "host",
        name: "ROG Hyperion GR701 BTF Edition",
        link: "https://rog.asus.com/es/cases/rog-hyperion-gr701-btf-edition/",
      },
    ],
  },
  {
    mbti: "ISTP",
    description:
      "Los ISTP albergan una mezcla de pragmatismo y espíritu aventurero. Por eso les encantan los juegos roguelike de acción basados en habilidades. \n\n Estos juegos ponen a prueba las habilidades de los ISTP y les permiten superarse. Disfrutan de la adrenalina del juego intenso y se toman cada desafío como una oportunidad para exhibir sus habilidades.",
    products: [
      {
        type: "vga",
        name: "ROG Strix GeForce RTX™ 4080 SUPER",
        link: "https://rog.asus.com/es/graphics-cards/graphics-cards/rog-strix/rog-strix-rtx4080s-o16g-gaming/",
      },
      {
        type: "kb",
        name: "ROG Azoth",
        link: "https://rog.asus.com/es/keyboards/keyboards/compact/rog-azoth-model/",
      },
    ],
  },
  {
    mbti: "ISFP",
    description:
      "Los ISFP suelen ser de espíritu libre y creativo. Por eso encuentran su vocación en los juegos en los que brilla la creatividad.\n\n Estos se convierten en un lienzo en blanco digital para los ISFP, en el que explorar mundos vibrantes y expresarse jugando. Las expresiones artísticas de estos juegos calan profundamente en su carácter sensible.",
    products: [
      {
        type: "ally",
        name: "ROG ALLY X",
        link: "https://rog.asus.com/es/gaming-handhelds/rog-ally/rog-ally-x-2024/",
      },
      {
        type: "ep",
        name: "ROG Delta S Wireless",
        link: "https://rog.asus.com/es/headsets-audio/headsets/wireless-headsets/rog-delta-s-wireless-model/",
      },
      {
        type: "mse",
        name: "ROG Keris II Ace",
        link: "https://rog.asus.com/es/mice-mouse-pads/mice/wireless/rog-keris-ii-ace/",
      },
    ],
  },
  {
    mbti: "ESTP",
    description:
      "Los ESTP afrontan la vida con audacia y espontaneidad, por lo que no es raro que sus juegos preferidos sean los competitivos.\n\n Los juegos de carreras ofrecen a los ESTP emocionantes aventuras en las que demostrar su rapidez de reflejos. Lo que buscan es imponerse en la arena virtual con estrategias dinámicas e intrépidas.",
    products: [
      {
        type: "ltp",
        name: "ROG Strix G16",
        link: "https://rog.asus.com/es/laptops/rog-strix/rog-strix-g16-2024/",
      },
      {
        type: "bag",
        name: "ROG Ranger Gaming Backpack 16",
        link: "https://rog.asus.com/es/apparel-bags-gear/bags/rog-ranger-gaming-backpack-16/",
      },
    ],
  },
  {
    mbti: "ESFP",
    description:
      "Los ESFP iluminan la vida con espontaneidad y carisma. Destacan en los juegos de fiesta dinámicos y sociales. \n\n Los juegos de baile basados en movimiento les permiten disfrutar de la alegría de compartir experiencias y competir entre amigos. Para los ESFP, el gaming no es solo un pasatiempo: es una oportunidad para contagiar la risa y crear recuerdos inolvidables.",
    products: [
      {
        type: "ltp",
        name: "ROG Strix SCAR 18",
        link: "https://rog.asus.com/es/laptops/rog-strix/rog-strix-scar-18-2024/",
      },
      {
        type: "bag",
        name: "ROG SLASH",
        link: "https://rog.asus.com/es/rog-slash/",
      },
    ],
  },
];

//上傳圖片到Imgur
const uploadImageToImgur = async (imgfile) => {
  const apiUrl = "https://api.imgur.com/3/image";
  const formData = new FormData();
  formData.append("image", imgfile);
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_IMGUR_APIKEY}`,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.data.link; // 返回图像的实体网址
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

//處理成為卡片 可以自訂編筐位置 跟寫入文字與位置
// 处理图片，并返回处理后的图片数据
export const processImage = async (
  imageUrl,
  imageBorderUrl,
  customWidth,
  customHeight,
  text,
  font,
  fontSize,
  textColor,
  textRotation,
  textPosition,
  mbti_text,
  mbti_font,
  mbti_fontSize,
  mbti_textColor,
  mbti_textRotation,
  mbti_textPosition
) => {
  return new Promise((resolve, reject) => {
    // 创建一个 Image 元素
    const image = new Image();
    image.crossOrigin = "anonymous"; // 允许跨域请求图片

    // 图片加载完成后的处理逻辑
    image.onload = () => {
      try {
        // 创建一个 Canvas 元素
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // 计算裁剪区域的尺寸和位置
        const sourceWidth = image.width;
        const sourceHeight = image.height;
        const targetWidth = customWidth; // 目标宽度
        const targetHeight = customHeight; // 目标高度
        const targetAspectRatio = targetWidth / targetHeight;
        let clipWidth, clipHeight, clipX, clipY;

        if (sourceWidth / sourceHeight > targetAspectRatio) {
          // 图片宽高比较宽，根据高度裁剪
          clipHeight = sourceHeight;
          clipWidth = targetAspectRatio * clipHeight;
          clipX = (sourceWidth - clipWidth) / 2; // 使裁剪区域位于图片中心
          clipY = 0;
        } else {
          // 图片宽高比较窄，根据宽度裁剪
          clipWidth = sourceWidth;
          clipHeight = clipWidth / targetAspectRatio;
          clipX = 0;
          clipY = (sourceHeight - clipHeight) / 2; // 使裁剪区域位于图片中心
        }

        // 设置 Canvas 的尺寸为目标尺寸
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // 清空 Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 在 Canvas 上绘制裁剪后的图片
        ctx.drawImage(
          image,
          clipX,
          clipY,
          clipWidth,
          clipHeight,
          0,
          0,
          targetWidth,
          targetHeight
        );

        // 加载边框图片
        const imageBorder = new Image();
        imageBorder.crossOrigin = "anonymous";
        imageBorder.onload = () => {
          ctx.drawImage(imageBorder, 0, 0); // 绘制边框图片，位置在 (0, 0)

          if (text) {
            ctx.font = `${fontSize}px RobotoConBold`; // 设置字体样式
            ctx.fillStyle = textColor; // 设置文字颜色
            ctx.translate(textPosition.x, textPosition.y); // 设置文字位置
            ctx.rotate((textRotation * Math.PI) / 180); // 设置文字旋转角度
            var atext = text.split("").join(String.fromCharCode(8202));
            ctx.fillText(atext, 0, 0); // 绘制文字
            ctx.rotate((-textRotation * Math.PI) / 180); // 恢复画布角度
            ctx.translate(-textPosition.x, -textPosition.y); // 恢复画布位置
          }

          if (mbti_text) {
            ctx.font = `${mbti_fontSize}px ROGFonts`; // 设置字体样式
            ctx.textAlign = "center";
            ctx.fillStyle = mbti_textColor; // 设置文字颜色
            ctx.translate(mbti_textPosition.x, mbti_textPosition.y); // 设置文字位置
            ctx.rotate((mbti_textRotation * Math.PI) / 180); // 设置文字旋转角度
            var ctext = mbti_text.split("").join(String.fromCharCode(8202));
            ctx.fillText(ctext, 0, 0); // 绘制文字
            ctx.rotate((-mbti_textRotation * Math.PI) / 180); // 恢复画布角度
            ctx.translate(-mbti_textPosition.x, -mbti_textPosition.y); // 恢复画布位置
          }

          // 将 Canvas 中的内容转换为 base64 编码的数据
          const processedImage = canvas.toDataURL("image/jpeg");

          // 返回处理后的图片数据
          resolve(processedImage);
        };

        imageBorder.onerror = reject;
        imageBorder.src = imageBorderUrl;
      } catch (error) {
        reject(error);
      }
    };

    // 图片加载失败后的处理逻辑
    image.onerror = reject;

    // 设置图片的 URL
    image.src = imageUrl;
  });
};

//處理桌布 加入logo圖片
// 处理图片，并返回处理后的图片数据
export const processImageToWallpaper = async (imageUrl, logoUrl, leftopimg) => {
  return new Promise((resolve, reject) => {
    // 创建一个 Image 元素
    const image = new Image();
    image.crossOrigin = "anonymous"; // 允许跨域请求图片

    // 图片加载完成后的处理逻辑
    image.onload = () => {
      try {
        // 创建一个 Canvas 元素
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;

        // 清空 Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 在 Canvas 上绘制图片
        ctx.drawImage(image, 0, 0);

        // 加载 Logo 图片
        const logo = new Image();
        logo.crossOrigin = "anonymous";
        logo.onload = () => {
          // 绘制 Logo 图片，位置在右上角
          const logoWidth = canvas.width * 0.25; // 设置 Logo 宽度为画布宽度的 20%
          const logoHeight = (logoWidth / logo.width) * logo.height; // 根据 Logo 宽度计算高度，保持比例
          const logoX = 2680; // 使 Logo 与画布右边和顶部保持 20px 的距离
          const logoY = 1480; // 使 Logo 与画布顶部保持 20px 的距离
          ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);

          if (leftopimg) {
            // 加载左上角图片
            const leftop = new Image();
            leftop.crossOrigin = "anonymous";
            leftop.onload = () => {
              // 绘制左上角图片，位置在左上角
              const leftopWidth = canvas.width * 0.1; // 设置左上角图片宽度为画布宽度的 10%
              const leftopHeight = (leftopWidth / leftop.width) * leftop.height; // 根据左上角图片宽度计算高度，保持比例
              const leftopX = 100; // 使左上角图片与画布左边和顶部保持 20px 的距离
              const leftopY = 100; // 使左上角图片与画布顶部保持 20px 的距离
              ctx.drawImage(
                leftop,
                leftopX,
                leftopY,
                leftopWidth,
                leftopHeight
              );

              // 将 Canvas 中的内容转换为 base64 编码的数据
              const processedImage = canvas.toDataURL("image/jpeg");

              // 返回处理后的图片数据
              resolve(processedImage);
            };

            leftop.onerror = reject;
            leftop.src = leftopimg;
          } else {
            // 将 Canvas 中的内容转换为 base64 编码的数据
            const processedImage = canvas.toDataURL("image/jpeg");

            // 返回处理后的图片数据
            resolve(processedImage);
          }
        };

        logo.onerror = reject;
        logo.src = logoUrl;
      } catch (error) {
        reject(error);
      }
    };

    // 图片加载失败后的处理逻辑
    image.onerror = reject;

    // 设置图片的 URL
    image.src = imageUrl;
  });
};

const switchBtn = () => {
  // <motion.div
  //   initial={{ opacity: 0, y: -20, x:'-50%' }}
  //   animate={{ opacity: 1, y: 0, x:'-50%' }}
  //   exit={{ opacity: 0, y: 30 , x:'-50%'}}
  //   transition={{ type: 'spring', stiffness: 200, damping: 20,delay: 0.5 }}
  //   className='absolute bottom-10 left-1/2   w-[240px] flex flex-col justify-center items-center z-[999]'
  // >
  //   <div className='font-robotocon text-sm opacity-15'>
  //     Selected:  {isActive ? 'type2' : 'type1'}_{buttonData1[currentIndex].name}
  //   </div>
  //   <button
  //     className="relative w-full"
  //     onClick={handleSwitchBtnClick}
  //   >
  //     <div className={`absolute top-0 left-0 py-[3%] w-full h-full   transition-all ${isActive ? 'translate-x-[48%]' : 'translate-x-[14%]'} `}>
  //       <img src={process.env.PUBLIC_URL+'/images/switch_btn_click.png'} alt="" className=' mix-blend-screen h-full  opacity-85' />
  //     </div>
  //     <img src={process.env.PUBLIC_URL+'/images/switch_btn_bg.png'}  alt="" className='w-full' />
  //   </button>
  // </motion.div>
};

export const TermContent = () => {
  return (
    <>
      This Event will collect following information:
      <br />
      - Gamer name, MBTI type and picture to generate AI pictures.
      <br />
      - Email address for contact purpose when joining an event of this website.
      <br />
      <br />
      Also, full name, physical address and phone number for prize delivery
      purpose if I am an event winner.
      <br />
      <br />
      Terms of Use Notice:
      <br />
      <div className="span9-line" id="member-page-content">
        <span id="ctl00_ContentPlaceHolder1_ctl00_ContentPageContent1_span_product_content_area">
          <div className="privacy_policy us">
            <p>
              ASUSTeK COMPUTER INC. and its affiliated entities companies
              (hereinafter referred to as “<strong>ASUS</strong>”, “
              <strong>we/our/us</strong>”) are committed to protecting and
              respecting your privacy. We endeavor to comply with all applicable
              laws on privacy protection and personal data security. ASUS
              Privacy Policy, together with any privacy-related notices or
              statements that contain supplementary information in connection
              with particular ASUS products and services you are using
              (hereinafter referred to as “Privacy Policy”), outline our privacy
              practices regarding the collection, use and safeguard of your
              personal data through ASUS products and services, both online and
              offline we provide. In Privacy Policy, we also outline whom we may
              share or disclose the collected personal data.
              <br />
              <br />
              If you are a child, you shall access or use ASUS products and
              services only after your parents (or your guardian) read and agree
              our Privacy Policy and agree to provide your personal data to
              ASUS.
            </p>
            <br />
            <h3>1. Data ASUS collect and how ASUS use such data</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces what your data may be collected by ASUS
              and how ASUS may use such data through ASUS products and services.
            </p>
            <p>
              When you use ASUS products and services (for example, ASUS
              computers, software, official websites and customer support
              services), we may need to collect certain personal data from you
              when you use or interact with ASUS products and service.
              <br />
              The following is an overview of the personal data ASUS may collect
              and how ASUS may use such collected personal data. Please be noted
              that we will only collect certain items of your personal data for
              particular purposes based on the ASUS products and services you
              actually use. Please also be noted that what items of the personal
              data will be collected is varied from the nature of the products
              and services. Moreover, in some countries, in order to avoid
              wrongfully collecting and using children’s personal data, you may
              need to additionally provide your age or the contact data of your
              parents (or guardian) so that we could obtain the consent from
              your parents (or guardian). Furthermore, when you use ASUS
              products and services, we may collect the following anonymous data
              which could not directly or indirectly identify you.
              <br />
              When you use ASUS products and services, you do not have to
              provide your personal data based on our request. However, if you
              choose not to provide your personal data to ASUS, we may not be
              able to provide the corresponding ASUS products and services or
              respond to your inquires.
            </p>
            <h4>1.1 The personal data ASUS collect</h4>
            <p>
              Personal data means any data which could directly or indirectly
              identify you, such as your name, email address and IP address.
              ASUS may collect your following personal data based on your prior
              consent:
            </p>
            <ol>
              <li>
                Your true, accurate, current and complete registration data,
                including your e-mail address, country/region and age (now only
                requested in some countries) when you sign up for ASUS Member
                account. If you use your social media account (for example, your
                Facebook or Google account) to sign up for ASUS Member account,
                such social media provider (for example, Facebook Inc. or Google
                Inc.) may share your personal data under your social media
                account (for example, email address, name, nickname and date of
                birth) based on your consent. Moreover, when you log in your
                ASUS Member account (Route: Visit ASUS official website
                <a href="http://www.asus.com">http://www.asus.com </a>
                →find “LOGIN” on the upper-right side of the website→insert the
                E-mail address and password you registered for ASUS Member
                accountfind your data under “ASUS Account”), you can provide
                your additional personal data to edit your profile of ASUS
                Member account (for example, your picture, gender, address and
                profession), and to enjoy ASUS products and services associated
                with your ASUS Member account (for example, your product serial
                number for ASUS product registration, articles and pictures
                posted and uploaded on ASUS’ forums which may contain your
                personal data).
              </li>
              <li>
                Your name, mailing/shipping/billing address (including zip
                code), contact data, e-mail address, credit card number or other
                payment service data when you make a purchase of our products
                (for example, purchasing ASUS products through ASUS Store) and
                paid services. Moreover, in addition to the above personal data,
                your product data (for example, product serial number, IMEI
                number) may also be collected when you request for certain
                customer services (for example, product repair services).
              </li>
              <li>
                Your name, contact data, e-mail, gender, date of birth, product
                data (for example, product serial number, IMEI number), and a
                copy of your invoice (in some countries, your name, address and
                other personal data may be included in your invoice), when you
                enter our events or campaigns. The actual collected items of
                your personal data will vary from respective event or campaign.
                Moreover, if you are a winner of our event or campaign, or if
                you will receive giveaways from ASUS, you may need to
                additionally provide your mailing/shipping address (including
                zip code) and personal data for tax declaration (for example,
                your residential address, ID or passport number and its copy).
                <br />
                Furthermore, in addition to the above personal data, you may
                need to provide your bank account data when you join our
                cashback event.
              </li>
              <li>
                Your age, gender, height, weight, body temperature, heart rate,
                blood pressure, movement of belly as well as certain data about
                your daily activities, for example, your step taken, calories
                burned, sleep patterns and diary records when you use our
                healthcare products and services.
              </li>
              <li>
                Your product data, such as your product serial number, IP
                Address, MAC Address, IMEI number, Android ID number and other
                unique product identifiers may be collected when you use ASUS
                products.
              </li>
              <li>
                Your location data associated with ASUS products and services,
                such as your GPS signal, data identifying nearby Wi-Fi access
                points and cell towers, the country, city, time zone, latitude,
                longitude, altitude and precision of coordinates where your
                product is located, movement speed of your product, your country
                and language settings on your product.
              </li>
              <li>
                Your voice, video, communication records when you contact ASUS
                (for example, by calling to ASUS call center, using ASUS online
                customer service portal to have a chat with ASUS, filling out
                online application form on ASUS official website and sending
                emails to ASUS). Moreover, we may record your image through
                security cameras when you visit ASUS Royal Club repair stations
                and ASUS offices. Furthermore, we may collect your voice
                instruction as well as your video record which may contain the
                image of your home environment when you use our robot-related
                products and services. The above voice, video and communication
                records may contain your personal data.
              </li>
            </ol>
            <br />
            <h4>1.2 How ASUS use your personal data</h4>
            <p>We may use your personal data for the purposes below:</p>
            <ol>
              <li>To assess and improve ASUS products and services.</li>
              <li>
                To obtain customer feedback and to analyze user experience for
                the purpose of development and evaluation of new products and
                services.
              </li>
              <li>
                To fulfill the sign-up process of ASUS Member account and to
                experience ASUS products and services associated with ASUS
                Member account (for example, product registration and services
                of ASUS’ forums).
              </li>
              <li>
                To provide delivery services (for example, delivering proof of
                purchase or invoice), software updates and technical notices for
                ASUS products and services you purchase.
              </li>
              <li>
                To process and fulfill any subscriptions you have signed up for,
                including ASUS eDMs or newsletters to keep you up to date with
                the latest ASUS news, promotions and upcoming events. You may
                unsubscribe it at any time with no charge.
              </li>
              <li>
                To send you important notifications, such as communications
                about changes to our terms, conditions and policies. Because of
                the importance of such communications, you may not opt out of
                receiving these communications.
              </li>
              <li>
                To verify your identity, deliver event or campaign entries and
                rewards, contact you for event or campaign-related ma tters,
                provide cashback allowance, declare tax and provide shuttle
                services and cover you with insurance if it is a necessity when
                you enter our events or contests.
              </li>
              <li>
                To assist you on recording, analyzing, modifying and storing
                data including your body data, your daily activities and the
                activity results calculated from the data above. Moreover, we
                will support you on editing and accessing the data and activity
                results, when you share this data with your family, caregivers,
                and health care professionals.
              </li>
              <li>
                To provide you with customer support services (for example, to
                fulfill your product repair requests and respond to your
                questions), our customer care and customer satisfaction survey
                for user experience analysis, and to protect your rights and
                interests and adopt access control, we may collect your voice,
                video and communication records when you contact ASUS or visit
                ASUS Royal Club repair stations and ASUS offices. Moreover, we
                may collect your voice and video records to assist ASUS
                robot-related products and services arriving at the specific
                destination upon your request.
              </li>
              <li>
                To provide you with personalized marketing services, for
                example, using third party advertising cookies to offer
                marketing communications and advertising that we believe may be
                of interest of you, or recommendation about services you may be
                interest in based on your use of ASUS products and services.
              </li>
              <li>Any other purposes with your prior consent.</li>
            </ol>
            <br />
            <h4>
              1.3 The anonymous data ASUS collect and how ASUS use such
              anonymous data
            </h4>
            <p>
              Anonymous data means any data which could not directly or
              indirectly identify you, such as your product model, software
              version and date of invoice. When you use ASUS products and
              services, we may collect the following anonymous data from you,
              and use such collected anonymous data for any purposes. Moreover,
              when the following anonymous data is connected with your personal
              data listed above, under such circumstances, we will also treat
              such anonymous data as personal data and protect such anonymous
              data at the same level of protection for personal data.
            </p>
            <ol>
              <li>
                Your log data associated with ASUS products and services, such
                as your product model name, product name, brand name,
                manufacturer name, part number, type and version of hardware
                (for example, CPU and motherboard) and operation system,
                factory-default settings, activation time, firmware update data
                (for example, the execution method for firmware update, update
                date and result of update), size of memory and storage,
                Read-Only Memory (ROM) related data (for example, type, version,
                build fingerprint and build description of ROM), camera
                resolution, product color, the telecom and network you use to
                connect to our products and services, the status of the network,
                telephony log data, standby status, crash history, preferred
                interface, type, version and language settings of browser,
                diagnose and usage data, your usage behavior, version of GPS and
                Wi-Fi, system status (for example, usage status of battery, CPU
                and RAM), and local time.
              </li>
              <li>
                Your application data associated with your usage and interaction
                with ASUS applications and software, such as the name and
                version of applications and software, the install and uninstall
                time, login and logout time, frequency and numbers of your
                usage, open and close time of applications and software, the
                category of your preferred applications and software, usage
                behavior settings, update version and update result.
              </li>
              <li>
                Your purchase data of ASUS products and services (for example,
                the purchase date and reseller’s name) when you request for
                certain customer support services (for example, product repair
                services) or join our events.
              </li>
            </ol>
            <br />
            <br />
            <h3>2. Retention of your personal data</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces how long ASUS retain your personal data.
            </p>
            <p>
              We will retain your personal data for the period necessary to
              fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is permitted by law or required to fulfill
              other necessary purposes. For example, for customer relationship
              management purpose, we may retain your personal data within
              adequate and reasonable period; to comply with tax law or other
              laws and regulations, we may retain your personal data within the
              period requested by such laws and regulations; to follow requests
              from governments or judiciary for purposes such as investigation
              or lawsuit, we may retain your personal data for longer retention
              period. Moreover, if you wish to withdraw your previous consent to
              collect your personal data from ASUS, we will stop collecting your
              personal data by your request and will only retain your personal
              data collected before such request for withdrawal.
            </p>
            <br />
            <h3>3. To whom ASUS disclose your personal data</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces ASUS may share your personal data to
              third parties under limited circumstances and purposes.
            </p>
            <p>
              Your personal data will not be disclosed to any third parties
              without one of the following exceptions:
            </p>
            <h4>3.1 Your Consent</h4>
            <ul>
              <li>
                We will only disclose or share your personal data to other third
                parties with your prior consent.
              </li>
            </ul>
            <h4>3.2 Business Partners</h4>
            <ul>
              <li>
                We may disclose hashed and anonymized data to our business
                partners, for example, business partners who provide data
                analytics services or advertisings and marketing communications
                based on the hashed and anonymized data through third party
                advertising cookies.
              </li>
            </ul>
            <h4>3.3 Service Providers</h4>
            <ul>
              <li>
                We may disclose and share necessary items of your personal data
                to our service providers that provide services for or on behalf
                of us, for instance, marketing agencies assisting us with
                sending marketing communications and holding marketing
                events/campaigns, forwarder companies delivering repaired and
                purchased products to you, payment service providers processing
                your billing, and customer service providers offering customer
                support services (for example, product repair services, services
                through ASUS call center and ASUS online customer service
                portal) to you. These service providers shall only use your
                personal data in compliance with our instruction and with the
                scope of the purposes hereof; ASUS ensures that all of our
                service providers strictly comply with the Privacy Policy.
              </li>
            </ul>
            <h4>3.4 For legal, protection, security purposes</h4>
            <p>
              We may disclose or share necessary items of your personal data
              with third parties for one of the following legal or security
              purposes:
            </p>
            <ul>
              <li>
                To the extent it is required by applicable laws or regulations
                or competent governmental or judicial authorities, necessary to
                establish or preserve a legal claim or defense, or necessary to
                prevent fraud or other illegal activities.
              </li>
              <li>
                To protect the rights, property or safety of ASUS, our service
                providers, customers or the public, as required or permitted by
                law.
              </li>
            </ul>
            <br />
            <br />
            <h3>4. Cross-border processing of your personal data</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces ASUS may transfer your personal data to
              different countries under the premises that ASUS should comply
              with privacy-related laws and regulation in such countries.
            </p>
            <p>
              You understand and consent that when you agree to provide your
              personal data to ASUS, your personal data may transfer, storage,
              use or process to ASUS and any of its affiliated entities, service
              providers who may be located in a different country to you. All
              said transfer, storage, or process of your personal data, shall be
              subject to the Privacy Policy and applicable laws on privacy
              protection and personal data security.
            </p>
            <br />
            <h3>5. Cookies and similar technologies</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces how ASUS and third parties use cookies
              and similar technologies on ASUS products and services, and how
              you can manage cookies settings.
            </p>
            <p>
              ASUS and our third party partners use cookies (cookies are small
              text files placed on your products to personalize your user
              experience on ASUS products and services) and similar technologies
              such as web beacons to provide our products and services to you.
              When you visit one of our websites under ASUS’ website domain
              (including microsites and versions of particular country/region),
              such ASUS website may use some or all of the following cookies and
              similar technologies.
              <br />
              Almost all of the data collected through cookies will only be
              stored in your products, rather than being transmitted to ASUS.
              Only under a very few and limited circumstances, your data
              collected through cookies may be shared to ASUS. For example, when
              you purchase our products on ASUS Store, we may use cookies to
              collect your IP addresses at both times when you log in and place
              an order on ASUS Store, to verify the user who places the order is
              the same one who logs in ASUS Store for the security of online
              purchase.
            </p>
            <br />
            <h4>5.1 How we use Cookies</h4>
            <p>
              1. In order to enrich and perfect your online experiences, we use
              the following cookies which are essential to ASUS products and
              services:
            </p>
            <table className="privacyTableContent" border="1" frame="border">
              <tbody>
                <tr className="privacyTableTr">
                  <td>Function</td>
                  <td>Example</td>
                </tr>
                <tr>
                  <td>Sign-up and authentication</td>
                  <td>
                    We use cookies to store your unique sign-up ID number and
                    authentication data on your products. Cookies allow you to
                    visit and move from page to page within ASUS products and
                    services without having to log in again on subsequent
                    visits, such as aticket cookies provided by ASUS.
                  </td>
                </tr>
                <tr>
                  <td>Storing your preferences and settings</td>
                  <td>
                    We use cookies to maintain your settings and preferences on
                    your products, such as your preferred language, location or
                    fonts; by storing the settings in cookies, it is not a
                    necessity to reapply your preferences and settings each time
                    you visit our products and services, such as current_site
                    cookies and EntryPage cookies provided by ASUS.
                  </td>
                </tr>
                <tr>
                  <td>User-input function</td>
                  <td>
                    We use cookies to temporarily store the data you insert on
                    ASUS products and services, such as count cookies provided
                    by ASUS. For example, when you enjoy your shopping
                    experiences through ASUS Store, such cookies will help you
                    to remember the product and the quantity you click and the
                    data you insert.
                  </td>
                </tr>
                <tr>
                  <td>Security</td>
                  <td>
                    We use cookies to protect the security of your online
                    purchase activities, such as ip_address cookies provided by
                    ASUS. For the above purpose, when you purchase our products
                    through ASUS Store, we may store your IP addresses in ASUS
                    in order to help us verify the user who places the order on
                    ASUS Store is same as the one who logging in ASUS Store.
                  </td>
                </tr>
                <tr>
                  <td>Load balancing function</td>
                  <td>
                    We use cookies for load balancing function to provide you
                    with the stable browsing experiences on our websites, such
                    as BIGipServerNew cookie provided by ASUS.
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <p>
              2. For analytics purpose and to provide you with personalized
              advertising services and other functions, we use the following
              cookies to optimize your experiences in using ASUS products and
              services:
            </p>
            <table className="privacyTableContent" border="1" frame="border">
              <tbody>
                <tr className="privacyTableTr">
                  <td>Function</td>
                  <td>Example</td>
                </tr>
                <tr>
                  <td>Analytics</td>
                  <td>
                    We use cookies to count the number and length of your visit
                    in ASUS products and services as well as which part or
                    features you visit the most as well. This data helps us
                    analyze the performance and operation of ASUS products and
                    services to improve performance and develop new features,
                    functions and services, such as MIGO cookies provided by
                    MIGO Corp., Google Tag Manager cookies and Google Analytics
                    cookies provided by Google Inc. For the above purposes, when
                    you browse our websites, we may store your personal data
                    such as IP address and your ASUS Member ID in ASUS through
                    the above MIGO cookies.
                  </td>
                </tr>
                <tr>
                  <td>Targeting and advertising</td>
                  <td>
                    We use cookies to collect data about your use in ASUS
                    products and services and identify your interests, such as
                    the advertisings you have viewed.
                    <br />
                    Such cookies are also used to limit the number of times you
                    see an advertisement as well as help measure the
                    effectiveness of the advertising campaigns. ASUS place
                    cookies by using advertising campaign services, such as
                    Hubrus DSP provided by Hubrus, Google AdWords cookies and
                    Google Double Click cookies provided by Google Inc. The data
                    cookies collect is only used between ASUS and advertising
                    campaign service providers.
                  </td>
                </tr>
                <tr>
                  <td>Watching YouTube videos embedded in our websites</td>
                  <td>
                    We use cookies to help us insert YouTube videos into our
                    websites. You can watch YouTube videos through our websites
                    with such cookies provided by Google Inc.
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <br />
            <h4>5.2 How to manage cookies settings</h4>
            <ol>
              <li>
                Please note that you can configure cookies settings by accessing
                the browser you install to accept, block or delete some or all
                of cookies (for example, third party cookies).
              </li>
              <li>
                In some countries, for the first time you browse ASUS websites,
                we may put a brief introduction on how we use cookies in a
                banner placed on the top side of such ASUS websites. You may
                freely choose to accept or block the above third party cookies
                through such banner.
              </li>
              <li>
                If you choose to block cookies, you may not be able to use all
                of the features of ASUS products and services.
              </li>

              <li>
                The functions of cookies settings may vary depending on the type
                and version of browser you install. We try to list common and
                widely-used types of browsers as following. You may refer to the
                following linkage to understand how to control your cookies
                settings through such browsers (The content in the following
                linkage is English. For your easier reading, please find the
                language option in the following linkage to select your
                preferred language). Also, if you do not use anyone of the
                following browsers, or the content in the following linkage is
                removed or not accessible, please visit those browsers’
                privacy-related statements or support pages for further
                information. You may also refer to
                <a href="https://www.aboutcookies.org/">
                  https://www.aboutcookies.org/{" "}
                </a>
                (the content in this linkage is English) which introduces how to
                manage your cookies settings through various browsers.
              </li>
            </ol>
            <br />
            <ul>
              <li>
                How to control your cookies settings through Google Chrome
                browser:
                <br />
                <a href="https://support.google.com/chrome/answer/95647?hl=en">
                  https://support.google.com/chrome/answer/95647?hl=en{" "}
                </a>
              </li>
              <li>
                How to control your cookies settings through Microsoft Internet
                Explorer browser:
                <br />
                <a href="https://support.microsoft.com/en-us/help/278835/how-to-delete-cookie-files-in-internet-explorer">
                  https://support.microsoft.com/en-us/help/278835/how-to-delete-cookie-files-in-internet-explorer
                </a>
              </li>
              <li>
                How to control your cookies settings through Mozilla Firefox
                browser:
                <br />
                <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored">
                  https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored
                </a>
              </li>
              <li>
                How to control your cookies settings through Apple Safari
                browser:
                <br />
                <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac">
                  https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac
                </a>
              </li>
            </ul>
            <br />
            <br />
            <h4>5.3 Web Beacons</h4>
            <p>
              A web beacon is an often-transparent graphic 1x1 (pixel) GIF or
              PNG image that is implemented on websites or in an email to
              measure the effectiveness of campaigns. ASUS or our service
              providers may use web beacons to know if you visit certain pages
              or click links in ASUS products and services. We may implement web
              beacons in our marketing communications such as eDMs or ASUS
              newsletters to know which communication contents you have clicked
              or read. We will use the data from web beacons to improve our
              websites and ASUS products and services.
            </p>
            <br />
            <br />
            <h3>6. Third-party links in ASUS products and services</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces when you visit any links or use any
              services provided by third parties, please always refer to
              privacy-related statements issued by third parties.
            </p>
            <p>
              ASUS products and services may contain links to third-party
              websites. Please be aware that ASUS is not responsible for the
              security, the privacy practices and the materials of those
              third-party websites. We encourage you to be aware of when you
              leave our websites, and to read the privacy statements of those
              third-party websites carefully. This Privacy Policy applies to
              ASUS products and services only.
            </p>
            <br />
            <h3>7. Security</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces how ASUS protects your personal data and
              provide some suggestions on how to protect your personal data at
              your end.
            </p>
            <p>
              We take precautions to protect your personal data against
              unauthorized access, alteration, disclosure or destruction. We
              conduct internal reviews of our data collection, storage and
              processing practices and technical and organizational security
              measures, as well as physical security measures to guard against
              unauthorized access to systems where we store your personal data.
              Transmission of personal data between different locations of ASUS
              and its affiliated entities is performed through our secured wide
              area network. When you submit your personal data to us, your
              personal data is protected both online and offline. However, ASUS
              cannot guarantee perfect security on the internet. To protect your
              personal data from unauthorized access, we recommend that you:
            </p>
            <br />
            <h4>
              7.1 To appropriately protect your ASUS Member account, for
              example:
            </h4>
            <ol>
              <li>
                To use alphanumerical passwords when signing up ASUS Member
                account.
              </li>
              <li>
                To use your own account name and password to log in ASUS Member
                account. Also, you are solely and entirely responsible for
                securing the confidentiality of your account name and password
                and for any and all activities that occur under your ASUS Member
                account.
              </li>
              <li>
                To change your passwords of ASUS Member account on a regular
                basis.
              </li>
              <li>
                To immediately contact us when you find that the account
                name/password of your ASUS Member account had been
                misappropriated. ASUS may suspend or terminate the permission to
                login your ASUS Member account with such account name/password
                (or any part thereof), and remove your personal data related to
                your ASUS Member account.
              </li>
            </ol>
            <h4>
              7.2 To keep your products up to date by applying the latest
              available security updates for your software and use such tools as
              virus/spyware scanners.
            </h4>
            <h4>
              7.3 If you become aware of a technical vulnerability affecting
              ASUS products and services, please do not hesitate to contact us
              through
              <a href="mailto:privacy@asus.com">privacy@asus.com</a>
            </h4>
            <br />
            <br />

            <h3>8. How to manage your personal data</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces that if you may have any inquiries or
              requests on your personal data collected by ASUS, you may log in
              your “ASUS Account” or manage privacy-related settings on
              particular ASUS products and services you use. Also, you may
              contact us through “Customer’s request on personal data” interface
              on ASUS official website or email to
              <a href="mailto:privacy@asus.com">privacy@asus.com.</a>
            </p>
            <h4>8.1 ASUS Member account</h4>
            <ol>
              <li>
                Please provide your true, accurate, current and complete
                personal data to ASUS under your ASUS Member account so that
                ASUS can provide you with the corresponding ASUS products and
                services.
              </li>
              <li>
                You may view and change your account data by logging in your
                ASUS Member account and editing your account data.
              </li>
              <li>
                If you would like to subscribe or unsubscribe ASUS eDM and
                notice with ASUS news, latest products and services, you may
                change the setting by logging in your ASUS Member account find
                “Subscribe” on the left column choose “YES” or “NO”. If you
                choose “NO” for unsubscription, please be noted that it may take
                around 2 business days to complete the unsubscription process.
              </li>
            </ol>
            <br />
            <h4>8.2 ASUS products and services</h4>
            <p>
              You are free to choose to enable or disable sharing your personal
              data with ASUS through privacy-related settings in particular ASUS
              products and services at all times when you use such ASUS products
              and services.
            </p>
            <br />
            <h4>
              8.3 Cookies settings (Please refer to “How to manage cookies
              settings”“Cookies and similar technologies” in this Privacy
              Policy.)
            </h4>
            <ol>
              <li>
                You can manage cookies settings through the browser you install
                to accept, block or delete some or all of cookies (for example,
                third party cookies) or adopt other settings at all times.
              </li>
              <li>
                If you do not wish ASUS to provide you with personalized
                marketing services and advertisement through third party
                cookies, you may block or delete third party cookies through
                your browser at all times.
              </li>
            </ol>
            <br />
            <h4>8.4 Contact ASUS to manage your personal data</h4>
            <p>
              Your may contact us through “Customer’s request on personal data”
              interface on ASUS official website or email to
              <a href="mailto:privacy@asus.com">privacy@asus.com</a>
              if you have any requests and inquiries about your personal data
              under your ASUS Member account or other personal data collected by
              ASUS, such as request for access, correction, download, block,
              deletion, objecting ASUS from using some or all of your personal
              data (for example, you may contact us if you consider ASUS may
              wrongfully collect and use your personal data) and restricting
              ASUS from using your personal data under some certain
              circumstances (for example, you may contact us if you do not wish
              your personal data to be analyzed) at all times.
              <br />
              <br />
              Also, if you have consented ASUS to collect your personal data
              through ASUS products and services, you are free to withdraw your
              consent by changing privacy-related settings in particular ASUS
              products and services (please refer to 8.2 in this Privacy Policy)
              or by submitting your request for withdrawal of consent to us. We
              will stop collecting your personal data and will only retain your
              personal data collected before such request for withdrawal.
            </p>
            <br />
            <h4>
              8.5 Whenever you use ASUS products and services, we strive to
              maintain the accuracy of your personal data and protect your
              personal data against any accidental or malicious destruction. We
              will accommodate your requests regarding your personal data;
              however, we may not be able to fulfill your above requests in one
              of the following circumstances:
            </h4>

            <ol>
              <li>As required or permitted under application laws;</li>
              <li>For legitimate business purposes;</li>
              <li>
                Unreasonably repetitive requests that require disproportionate
                technical efforts and resources, for example, developing a new
                system or fundamentally changing the current practices;
              </li>
              <li>Potentially risks on the privacy of others;</li>
            </ol>
            <br />
            <br />
            <h3>9. Children’s Privacy</h3>
            <p className="privacyBlockHighLight">
              This paragraph introduces that in order to protect children’s
              privacy, if you are a child, please seek your parents (or
              guardian)’s consent before you provide your personal data to ASUS.
              Also, if your parents (or guardian) would like to manage your
              personal data, he/ she may contact us through “Customer’s request
              on personal data” interface on ASUS official website or email to
              <a href="mailto:privacy@asus.com">privacy@asus.com</a>
            </p>
            <p>
              We do not knowingly collect personal data from a child below the
              age of sixteen (16), or equivalent minimum age in the relevant
              jurisdiction, without parental consent. We encourage parents (or
              guardian) to take an active role in a child’s online activities
              and interests while using ASUS products and services.
              <br />
              If you are a child, please seek parental consent before your use
              of ASUS products and services. You may submit your personal data
              with parental (or guardian’s) consent to us only. Your parents (or
              guardian) can contact us through “Customer’s request on personal
              data” interface on ASUS official website or email to
              <a href="mailto:privacy@asus.com">privacy@asus.com</a>
              to revoke or withdraw any consent previously given, request for
              access, correction, download, block, deletion, objecting ASUS from
              using some or all of your personal data (for example, your parents
              (or guardian) may contact us if he/she considers ASUS may
              wrongfully collect and use your personal data) and restricting
              ASUS from using your personal data under some certain
              circumstances (for example, your parents (or guardian) may contact
              us if he/she does not wish your personal data to be analyzed) at
              all times.
            </p>
            <br />
            <h3>10. Sensitive Personal Data</h3>
            <p>
              ASUS will never ask you to provide sensitive personal data such as
              data about your medical or health records, political, religious or
              philosophical beliefs, criminal offences (alleged, or committed),
              criminal conviction background, racial or ethnic origin, trade
              union membership, sexual orientation, sexual history, behavior or
              genetic data. Please refrain from providing us with such sensitive
              personal data.
            </p>
            <br />
            <h3>11. Changes to ASUS Privacy Policy</h3>
            <p>
              We may change the Privacy Policy from time to time, we highly
              recommend you periodically review the Privacy Policy posted on our
              websites. By accessing or using our products and services after
              the Privacy Policy has been updated, ASUS will deem that you
              consent to the Privacy Policy, including any updates. The most
              current version of the Privacy Policy will always be available on
              this page; a prominent notice such as email notification will be
              delivered to you about any significant changes. You can always
              check the “updated time” at the bottom for the most current
              version of Privacy Policy.
            </p>
            <br />
            <h3>12. Contacting Us</h3>
            <p>
              If you have any inquiries, questions, comments or complaints about
              the Privacy Policy, or if you believe that ASUS did not comply
              with the Privacy Policy, please feel free to contact us. If you
              consider we may not appropriately deal with any issues related to
              your personal data collected by ASUS, please be noted that it is
              your right to lodge a complaint with government authorities
              handling personal data protection in your country.
            </p>
            <br />
          </div>
        </span>
      </div>
    </>
  );
};

export const TermContent2 = () => {
  return (
    <>
      <p>Lee los tres avisos siguientes antes de unirte al Evento:</p>
      <br />
      <h3 className=" font-robotoconbold font-extrabold">1.Aviso de cookies</h3>
      <br />
      <p>
        ASUSTeK COMPUTER INC. y sus empresas afiliadas utilizan cookies y
        tecnologías similares para desarrollar funciones esenciales en línea,
        como la autenticación y la seguridad. Puedes desactivarlas y cambiar la
        configuración de las cookies a través del navegador, pero esto puede
        afectar al funcionamiento de este sitio web.
      </p>
      <br />
      <p>
        Además, ASUS utiliza algunas cookies analíticas, de segmentación,
        publicitarias e incrustadas en vídeos proporcionadas por ASUS o
        terceros. Si aceptas el uso de estas cookies en este sitio web, marca la
        1.ª casilla de verificación que aparece a continuación. Ten en cuenta
        que puedes configurar los ajustes de las cookies si accedes al navegador
        que instales en cualquier momento. Para obtener más información, visita
        la Política de privacidad de ASUS:"
        <a
          href="https://www.asus.com/Terms_of_Use_Notice_Privacy_Policy/Privacy_Policy"
          className=" underline"
          target="_blank"
          rel="noreferrer"
        >
          Cookies y tecnologías similares
        </a>{" "}
        ”.
      </p>
      <br />
      <h3 className=" font-robotoconbold font-extrabold">
        2.Aviso de recopilación de datos
      </h3>
      <br />
      <p> ASUS recopilará la siguiente información en este Evento:</p>
      <p>
        {" "}
        - Nombre del jugador, tipo de MBTI e imagen para generar imágenes con
        IA.
      </p>
      <p>
        {" "}
        - Dirección de correo electrónico para fines de contacto al participar
        en un evento de este sitio web.
      </p>
      <p>
        {" "}
        Además, nombre completo, dirección física y número de teléfono para la
        entrega del premio si quedas entre los ganadores del evento.
      </p>
      <br />
      <h3 className=" font-robotoconbold font-extrabold">
        3.Términos y condiciones{" "}
      </h3>
      <p>
        Al unirte a este Evento, confirmas que has leído y entendido los{" "}
        <a
          href="https://rog.asus.com/es/event/MBTIgamercard.pdf"
          className=" underline"
          target="_blank"
          rel="noreferrer"
        >
          Términos y condiciones{" "}
        </a>
        .{" "}
      </p>
    </>
  );
};
