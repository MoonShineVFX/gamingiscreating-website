import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TermContent2 } from "../Helper/Helper";
import { useForm } from "react-hook-form";
const Terms = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const watchAgree1 = watch("agree1");
  const watchAgree2 = watch("agree2");
  let scrollbarStyle = "style-1";
  const onSubmit = async (data) => {
    closeModal("accept", data.agreeCookie);
  };
  const closebtn = async () => {
    closeModal("cancel");
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
  return (
    <>
      {isMobile ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className=" fixed top-0 left-0 w-full h-[100dvh] z-[60] font-robotocon bg-black/50 "
        >
          <motion.div
            initial={{ opacity: 0, x: "-50%", y: "0%" }}
            animate={{ opacity: 1, x: "-50%", y: "0%" }}
            exit={{ opacity: 0, x: "-50%", y: "0%" }}
            transition={{ duration: 0.5 }}
            className=" fixed top-1/2 left-1/2 w-[90vw] aspect-[397/345] bg-cover bg-center bg-no-repeat  "
          >
            <div className=" relative w-full">
              <img
                src={
                  process.env.PUBLIC_URL + "/images/mb/home_terms_bghalf2x.png"
                }
                alt=""
                className="w-full relative z-10"
              />
              <img
                src={
                  process.env.PUBLIC_URL + "/images/mb/home_terms_bghalfred.png"
                }
                alt=""
                className="w-full absolute top-0 blur-xl saturate-200 z-0"
              />
            </div>
            <div className=" absolute top-0 z-20 w-full pt-[2%]  ">
              <div className="text-center text-[5vw] py-[2%]  font-bolder ">
                Cookies y privacidad
              </div>
              <div
                className={`border border-white/40 w-[85%] mx-auto text-[3vw] text-zinc-400 pl-[3%] pr-[2%] py-2    `}
              >
                <div
                  className={`overflow-y-auto overflow-x-hidden ${scrollbarStyle}  w-full aspect-[8/2] pr-2 pt-2 pb-10`}
                >
                  <TermContent2 />
                </div>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-red-700/0 h-full flex flex-col mt-[3%] w-[85%] mx-auto space-y-[4%] "
              >
                <div className="inline-flex items-center mt-[%]  ">
                  <label
                    className="relative flex items-center px-[2%] -ml-[1%]  rounded-full cursor-pointer"
                    htmlFor="agreeCookie"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-[4vmin] w-[4vmin] cursor-pointer appearance-none  border border-red-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gr00 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                      id="agreeCookie"
                      {...register("agreeCookie", { required: false })}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="red"
                        stroke="red"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-light text-white cursor-pointer select-none text-[3vw]"
                    htmlFor="agreeCookie"
                  >
                    Acepto el Aviso de cookies anterior (opcional).
                  </label>
                </div>
                <div className="inline-flex items-center mt-[1%] ">
                  <label
                    className="relative flex items-center px-[2%] py-0 -ml-[1%]  rounded-full cursor-pointer"
                    htmlFor="check2"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-[4vmin] w-[4vmin] cursor-pointer appearance-none  border border-red-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gr00 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                      id="check2"
                      {...register("agree2", { required: false })}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="red"
                        stroke="red"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-light text-white cursor-pointer select-none text-[3vw]"
                    htmlFor="check2"
                  >
                    Acepto el Aviso de recopilación de datos anterior y también
                    la{" "}
                    <a
                      className=" underline"
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.asus.com/es/terms_of_use_notice_privacy_policy/privacy_policy/"
                    >
                      Política de privacidad de Asus
                    </a>
                    .
                  </label>
                </div>
                <div className="inline-flex items-center mt-[1%] ">
                  <label
                    className="relative flex items-center p-[2%] -ml-[1%]  rounded-full cursor-pointer"
                    htmlFor="check"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-[4vmin] w-[4vmin] cursor-pointer appearance-none  border border-red-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gr00 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                      id="check"
                      {...register("agree1", { required: false })}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="red"
                        stroke="red"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-light text-white cursor-pointer select-none text-[3vw]"
                    htmlFor="check"
                  >
                    Soy mayor de 20 años.
                  </label>
                </div>
                <div className="flex gap-5 w-full px-[10%] mt-[2%] text-[3vw]">
                  <div
                    className="border border-zinc-100 text-zinc-100 w-full flex items-center justify-center py-[2%]  cursor-pointer hover:bg-white/10"
                    onClick={closebtn}
                  >
                    Cancelar
                  </div>

                  <button
                    type="submit"
                    disabled={!watchAgree1 || !watchAgree2}
                    aria-label="accept"
                    className={`border ${
                      watchAgree1 && watchAgree2
                        ? "cursor-pointer border-red-600 hover:bg-white/10 "
                        : "border-zinc-600 text-zinc-600"
                    }   w-full flex items-center justify-center py-[2%] `}
                  >
                    Aceptar
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className=" absolute top-0 left-0 w-full h-screen z-[60] font-robotocon bg-black/50  "
        >
          <motion.div
            initial={{ opacity: 0, x: "-50%", y: "0%", scale: 0.9 }}
            animate={{ opacity: 1, x: "-50%", y: "-35%", scale: 0.9 }}
            exit={{ opacity: 0, x: "-50%", y: "0%", scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className=" absolute top-1/2 left-1/2 w-[40vw] aspect-[800/549] bg-cover bg-center bg-no-repeat   "
            style={{}}
          >
            <div className=" relative w-full">
              <img
                src={process.env.PUBLIC_URL + "/images/home_terms_bghalf2x.png"}
                alt=""
                className="w-full relative z-10"
              />
              <img
                src={
                  process.env.PUBLIC_URL + "/images/home_terms_bghalfred.png"
                }
                alt=""
                className="w-full absolute top-0 blur-3xl saturate-200 z-0"
              />
            </div>
            <div className=" absolute top-0 z-20 w-full pt-[1%]  ">
              <div className="text-center text-[1.5vw] py-[2%]  font-bolder ">
                Cookies y privacidad
              </div>
              <div
                className={`border border-white/40 w-[85%] mx-auto text-[0.7vw] text-zinc-400 pl-[3%] pr-[2%] py-2    `}
              >
                <div
                  className={`overflow-y-auto ${scrollbarStyle} w-full h-[7vw] pr-2 pt-2 pb-2`}
                >
                  <TermContent2 />
                </div>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-red-700/0 h-full flex flex-col mt-auto w-[85%] mx-auto "
              >
                <div className="inline-flex items-center  ">
                  <label
                    className="relative flex items-center p-[3%] -ml-[1%]  rounded-full cursor-pointer"
                    htmlFor="agreeCookie"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-[2vmin] w-[2vmin] cursor-pointer appearance-none  border border-red-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gr00 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                      id="agreeCookie"
                      {...register("agreeCookie", { required: false })}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-[1vw] w-[1vw]"
                        viewBox="0 0 20 20"
                        fill="red"
                        stroke="red"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-light text-white cursor-pointer select-none text-[0.9vw]"
                    htmlFor="agreeCookie"
                  >
                    Acepto el Aviso de cookies anterior (opcional).
                  </label>
                </div>
                <div className="inline-flex items-start  ">
                  <label
                    className="relative flex items-center px-[3%] py-0 -ml-[1%]  rounded-full cursor-pointer"
                    htmlFor="check2"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-[2vmin] w-[2vmin] cursor-pointer appearance-none  border border-red-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gr00 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                      id="check2"
                      {...register("agree2", { required: true })}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-[1vw] w-[1vw]"
                        viewBox="0 0 20 20"
                        fill="red"
                        stroke="red"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-light text-white cursor-pointer select-none text-[0.9vw]"
                    htmlFor="check2"
                  >
                    Acepto el Aviso de recopilación de datos anterior y también
                    la{" "}
                    <a
                      className=" underline"
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.asus.com/es/terms_of_use_notice_privacy_policy/privacy_policy/"
                    >
                      Política de privacidad de Asus
                    </a>
                    .
                  </label>
                </div>
                <div className="inline-flex items-center  ">
                  <label
                    className="relative flex items-center p-[3%] -ml-[1%]  rounded-full cursor-pointer"
                    htmlFor="check"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-[2vmin] w-[2vmin] cursor-pointer appearance-none  border border-red-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gr00 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                      id="check"
                      {...register("agree1", { required: true })}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-[1vw] w-[1vw]"
                        viewBox="0 0 20 20"
                        fill="red"
                        stroke="red"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-light text-white cursor-pointer select-none text-[0.9vw]"
                    htmlFor="check"
                  >
                    Soy mayor de 20 años.
                  </label>
                </div>

                <div className="flex gap-5 w-full px-[10%] mt-[3%]">
                  <div
                    className="border border-zinc-100 text-zinc-100 w-full flex items-center justify-center py-[1%] text-[1vw] cursor-pointer hover:bg-white/10"
                    onClick={closebtn}
                  >
                    Cancelar
                  </div>

                  <button
                    type="submit"
                    aria-label="accept"
                    disabled={!watchAgree1 || !watchAgree2}
                    className={`border ${
                      watchAgree1 && watchAgree2
                        ? "cursor-pointer border-red-600 hover:bg-white/10 "
                        : "border-zinc-600 text-zinc-600"
                    }   w-full flex items-center justify-center py-[1%] text-[1vw]`}
                  >
                    Aceptar
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Terms;
