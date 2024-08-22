import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import trans2 from "../animationData/trans_01_short_reverse.json";
import { analytics } from "../firebaseConfig/fireanalytics";
import { logEvent } from "firebase/analytics";
const Form1 = ({
  closeModal,
  line1,
  line2,
  line3,
  line4,
  line5,
  line6,
  gamerid,
  formtype,
}) => {
  const [page, setPage] = useState("default");
  const [isSending, setIsSending] = useState(false);
  let scrollbarStyle = "style-1";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      gamerid: gamerid,
    },
  });
  const watchEmail = watch("email");
  const watchGamerid = watch("gamerid");
  useEffect(() => {
    logEvent(analytics, "Opened_Form", {
      formtype: formtype,
    });
  }, []);

  const onSubmit = async (data) => {
    // 提交表单的处理逻辑
    setIsSending(true);
    if (formtype === "REDEEM") {
      if (data) {
        const sendmail = await sendMail(
          "https://roggamercard_es-api.rd-02f.workers.dev/sendform_redeem",
          data.gamerid,
          data.firstname,
          data.lastname,
          data.phone,
          data.email,
          formtype
        );
        if (sendmail === "success") {
          logEvent(analytics, "Sended_REDEEMForm", {
            gamerid: gamerid,
          });
          setTimeout(() => {
            setIsSending(false);
            setPage("success");
            reset();
          }, 500);
        }
      }
    } else {
      if (data) {
        const sendmail = await sendMail(
          "https://roggamercard_es-api.rd-02f.workers.dev/sendform_raffle",
          data.gamerid,
          data.firstname,
          data.lastname,
          data.phone,
          data.email,
          formtype
        );
        if (sendmail === "success") {
          logEvent(analytics, "Sended_RAFFLEForm", {
            gamerid: gamerid,
          });
          setTimeout(() => {
            setIsSending(false);
            setPage("success");
            reset();
          }, 500);
        }
      }
    }
  };

  const sendMail = async (
    fetchurl,
    gamerid,
    firstname,
    lastname,
    phone,
    mail,
    formtype
  ) => {
    try {
      const formData = new FormData();
      formData.append("gamerid", gamerid);
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("phone", phone);
      formData.append("mail", mail);
      formData.append("formtype", formtype);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", process.env.REACT_APP_APITOKEN);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow",
      };
      const response = await fetch(fetchurl, requestOptions);
      if (!response.ok) {
        alert("Send Fail, Please Try again.");
        return;
      }
      const responseData = await response.json();
      return responseData.status;
    } catch (error) {
      console.log(error);
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
  return (
    <>
      {isMobile ? (
        <>
          <motion.div
            key="form1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className=" absolute top-0 left-0 w-full h-screen z-[60] font-robotocon "
          >
            <motion.div
              initial={{ opacity: 0, x: "-50%", y: "0%" }}
              animate={{ opacity: 1, x: "-50%", y: "-55%" }}
              exit={{ opacity: 0, x: "-50%", y: "0%" }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 20,
                delay: 0.2,
              }}
              className=" absolute top-1/2 left-1/2 w-[81%] aspect-[365/500]   "
            >
              <div className="w-full">
                <img
                  src={process.env.PUBLIC_URL + "/images/mb/form_bg_t.png"}
                  alt=""
                  className="w-full"
                />
              </div>
              <motion.div
                className=" px-[4%] py-[5%] w-full   bg-cover bg-left  bg-repeat-y h-full min-h-[75%] "
                style={{
                  backgroundImage: `url('${
                    process.env.PUBLIC_URL + "/images/mb/form_bg_c.png"
                  }')`,
                }}
              >
                {page == "default" && (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`max-h-full ${scrollbarStyle}  overflow-y-auto px-4 flex flex-col h-full  `}
                  >
                    <div className="  w-[55%] mx-auto drop-shadow-[0_15px_10px_rgba(0,0,0,1)] mb-[2%]">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/images/form_title_no.png"
                        }
                        alt=""
                        className="w-full"
                      />
                    </div>
                    <div className="text-[3.5vw] text-white/50 leading-tight space-y-2 pt-[3%] font-light ">
                      {line1 && <p>{line1}</p>}
                      {line2 && <p>{line2}</p>}
                      {line3 && <p>{line3}</p>}
                      {line4 && <p>{line4}</p>}
                      {line5 && <p>{line5}</p>}
                      {line6 && <p>{line6}</p>}
                    </div>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="bg-red-700/0 h-full flex flex-col mt-auto "
                    >
                      <div className="my-[9%] space-y-3">
                        <div className=" flex gap-2 items-center">
                          <div className="text-[3.8vw]">Email:</div>
                          <input
                            type="text"
                            autoComplete="off"
                            className=" w-full  border-b-2 border-red-600 bg-transparent text-[3.8vw] focus:outline-none "
                            {...register("email", {
                              required: true,
                              maxLength: 100,
                              pattern: {
                                value: /\S+@\S+\.\S+/,
                                message:
                                  "Entered value does not match email format",
                              },
                            })}
                          />
                        </div>

                        <div className=" flex gap-2 items-center hidden">
                          <div className="text-[3.8vw] whitespace-nowrap">
                            First Name:
                          </div>
                          <input
                            type="text"
                            autoComplete="off"
                            className=" w-full  border-b-2 border-red-600 bg-transparent text-[3.8vw] focus:outline-none "
                            {...register("firstname", {
                              required: false,
                              maxLength: 20,
                            })}
                          />
                        </div>
                        <div className=" flex gap-2 items-center hidden">
                          <div className="text-[3.8vw] whitespace-nowrap">
                            Last Name:
                          </div>
                          <input
                            type="text"
                            autoComplete="off"
                            className=" w-full  border-b-2 border-red-600 bg-transparent text-[3.8vw] focus:outline-none "
                            {...register("lastname", {
                              required: false,
                              maxLength: 20,
                            })}
                          />
                        </div>
                        <div className=" flex gap-2 items-center hidden">
                          <div className="text-[3.8vw]">Phone:</div>
                          <input
                            type="text"
                            autoComplete="off"
                            className=" w-full  border-b-2 border-red-600 bg-transparent text-[3.8vw] focus:outline-none "
                            {...register("phone", {
                              required: false,
                              maxLength: 20,
                            })}
                          />
                        </div>
                        <div className=" flex gap-2 items-center">
                          <div className="text-[3.8vw] whitespace-nowrap">
                            GamerID:
                          </div>
                          <input
                            type="text"
                            autoComplete="off"
                            className=" w-full  border-b-2 border-red-600 bg-transparent text-[3.8vw] focus:outline-none "
                            {...register("gamerid", {
                              required: true,
                              maxLength: 20,
                            })}
                          />
                        </div>

                        <div className="inline-flex items-center mt-[3%] hidden">
                          <label
                            className="relative flex items-center p-3 -ml-3  rounded-full cursor-pointer"
                            htmlFor="check"
                          >
                            <input
                              type="checkbox"
                              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none  border border-red-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gr00 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                              id="check"
                              {...register("agree", { required: false })}
                            />
                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="red"
                                stroke="red"
                                stroke-width="1"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </label>
                          <label
                            className="mt-px font-light text-white cursor-pointer select-none text-[3.8vw]"
                            htmlFor="check"
                          >
                            I agree to the{" "}
                            <span
                              className=" underline"
                              onClick={() => setPage("terms")}
                            >
                              Privacy Policy
                            </span>{" "}
                            of this website.
                          </label>
                        </div>
                        <div></div>
                      </div>
                      <div className="flex gap-5 w-full px-[5%] mt-auto">
                        <div
                          className="border border-red-600 w-full flex items-center justify-center py-1 cursor-pointer hover:bg-white/10"
                          onClick={closeModal}
                        >
                          Cancel
                        </div>
                        {isSending ? (
                          <div className="border border-red-600 w-full flex items-center justify-center py-1 cursor-pointer hover:bg-white/10">
                            <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                          </div>
                        ) : (
                          <button
                            type="submit"
                            disabled={!watchEmail || !watchGamerid}
                            className={`border ${
                              watchEmail && watchGamerid
                                ? "cursor-pointer border-red-600 hover:bg-white/10 "
                                : "border-zinc-600 text-zinc-600"
                            }   w-full flex items-center justify-center py-1 `}
                          >
                            Cofirm
                          </button>
                        )}
                      </div>
                      <div className="text-red-600 text-[4vw] text-center mt-[2%]">
                        {errors.email && (
                          <div>The format of the email is incorrect.</div>
                        )}
                        {errors.agree && <div>agree is required</div>}
                        {errors.phone ||
                          errors.firstname ||
                          (errors.lastname && (
                            <div>All forms are required</div>
                          ))}
                      </div>
                    </form>
                  </motion.div>
                )}
                {page == "terms" && (
                  <motion.div
                    key="terms"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full  bg-cyan-400/0"
                  >
                    <div
                      className={`h-[80%] relative  overflow-y-auto  ${scrollbarStyle}`}
                    >
                      <div
                        className={`text-white/50 h-full  pr-3 text-[3.8vw] relative `}
                      >
                        Congratulations on completing the "Create your gamer
                        card" experience!  Now, fill in your information for a
                        chance to win exciting prizes. Winning notifications
                        will be sent to your contact email address by 6/9 at
                        12:00 PM. If you are not selected as a winner, you will
                        not receive further notification.Congratulations on
                        completing the "Create your gamer card" experience! 
                        Now, fill in your information for a chance to win
                        exciting prizes. Winning notifications will be sent to
                        your contact email address by 6/9 at 12:00 PM. If you
                        are not selected as a winner, you will not receive
                        further notification.Congratulations on completing the
                        "Create your gamer card" experience!  Now, fill in your
                        information for a chance to win exciting prizes. Winning
                        notifications will be sent to your contact email address
                        by 6/9 at 12:00 PM. If you are not selected as a winner,
                        you will not receive further
                        notification.Congratulations on completing the "Create
                        your gamer card" experience!  Winning notifications will
                        be sent to your contact email address by 6/9 at 12:00
                        PM. If you are not selected as a winner, you will not
                        receive further notification.Congratulations on
                        completing the "Create your gamer card" experience! 
                        Winning notifications will be sent to your contact email
                        address by 6/9 at 12:00 PM. If you are not selected as a
                        winner, you will not receive further
                        notification.Congratulations on completing the "Create
                      </div>
                      <div className="w-full h-1/2  bottom-0 left-0 z-10  absolute pointer-events-none bg-gradient-to-t from-black "></div>
                    </div>

                    <div className="w-full mx-auto my-[15%]">
                      <div
                        className="border border-red-600 w-full flex items-center justify-center py-1 cursor-pointer hover:bg-white/10"
                        onClick={() => setPage("default")}
                      >
                        OK
                      </div>
                    </div>
                  </motion.div>
                )}
                {page == "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center  justify-around h-full bg-cyan-700/0"
                  >
                    <div className="  w-[60%] mx-auto drop-shadow-[0_15px_10px_rgba(0,0,0,1)] mb-[2%]">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/form_success_msg.png"
                        }
                        alt=""
                        className="w-full"
                      />
                    </div>
                    <div className="text-[3.8vw] text-white/50 leading-tight space-y-2 py-[10%] font-light text-center ">
                      <p>We have received your response,</p>
                      <p>and will contact you via email by Sep 27!</p>
                    </div>
                    <div className="w-1/2 mx-auto mt-au">
                      <div
                        className="border border-red-600 w-full flex items-center justify-center py-1 cursor-pointer hover:bg-white/10 "
                        onClick={closeModal}
                      >
                        OK
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
              <div className="w-full">
                <img
                  src={process.env.PUBLIC_URL + "/images/mb/form_bg_b.png"}
                  alt=""
                  className="w-full -translate-y-1"
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      ) : (
        <motion.div
          key="form1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className=" absolute top-0 left-0 w-full h-screen z-[60] font-robotocon"
        >
          <motion.div
            initial={{ opacity: 0, x: "-50%", y: "0%" }}
            animate={{ opacity: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, x: "-50%", y: "0%" }}
            transition={{
              type: "spring",
              stiffness: 130,
              damping: 20,
              delay: 0.2,
            }}
            className={`  p-[2.5%] absolute top-1/2 left-1/2 w-[40%] aspect-[661/608] overflow-hidden bg-contain bg-center bg-no-repeat drop-shadow-[0_15px_10px_rgba(0,0,0,1)]`}
            style={{
              backgroundImage: `url('${
                process.env.PUBLIC_URL + "/images/form_bg.png"
              }')`,
            }}
          >
            {page == "default" && (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`max-h-full ${scrollbarStyle}  overflow-y-auto  flex flex-col space-y-[4%] h-full ${
                  formtype === "REDEEM" ? " px-8 py-6" : "px-3"
                } `}
              >
                <div className="  w-[46%] mx-auto drop-shadow-[0_15px_10px_rgba(0,0,0,1)] mb-[2%]">
                  <img
                    src={process.env.PUBLIC_URL + "/images/form_title_no.png"}
                    alt=""
                    className="w-full"
                  />
                </div>
                <div
                  className={`text-[1vw] text-white/60 leading-tight space-y-[2%] py-[%] font-light `}
                >
                  {line1 && <p>{line1}</p>}
                  {line2 && <p>{line2}</p>}
                  {line3 && <p>{line3}</p>}
                  {line4 && <p>{line4}</p>}
                  {line5 && <p>{line5}</p>}
                  {line6 && <p>{line6}</p>}
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-red-700/0 h-1/2 flex flex-col mt- space-y-[6%] "
                >
                  <div className="mt-[4%] space-y-[4%]">
                    <div className=" flex gap-2 items-center">
                      <div className="text-[1vw] font-bold whitespace-nowrap">
                        Gamer name:
                      </div>
                      <input
                        disabled
                        type="text"
                        className=" w-full  border-b-2 border-red-600 bg-transparent text-[1vw] focus:outline-none "
                        {...register("gamerid", {
                          required: true,
                          maxLength: 20,
                        })}
                      />
                    </div>
                    <div className="flex w-full gap-4 hidden">
                      <div className="w-1/2 flex gap-2 items-center">
                        <div className="text-[1vw] whitespace-nowrap">
                          First Name:
                        </div>
                        <input
                          type="text"
                          className=" w-full  border-b-2 border-red-600 bg-transparent text-[1vw] focus:outline-none "
                          {...register("firstname", {
                            required: false,
                            maxLength: 20,
                          })}
                        />
                      </div>
                      <div className="w-1/2 flex gap-2 items-center">
                        <div className="text-[1vw] whitespace-nowrap">
                          Last Name:
                        </div>
                        <input
                          type="text"
                          className=" w-full  border-b-2 border-red-600 bg-transparent text-[1vw] focus:outline-none "
                          {...register("lastname", {
                            required: false,
                            maxLength: 20,
                          })}
                        />
                      </div>
                    </div>

                    <div className=" flex gap-2 items-center hidden">
                      <div className="text-[1vw]">Phone:</div>
                      <input
                        type="text"
                        className=" w-full  border-b-2 border-red-600 bg-transparent text-[1vw] focus:outline-none "
                        {...register("phone", {
                          required: false,
                          maxLength: 20,
                        })}
                      />
                    </div>
                    <div className=" flex gap-2 items-center">
                      <div className="text-[1vw]">Email:</div>
                      <input
                        type="text"
                        autoComplete="off"
                        className=" w-full  border-b-2 border-red-600 bg-transparent text-[1vw] focus:outline-none "
                        {...register("email", {
                          required: true,
                          maxLength: 100,
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message:
                              "Entered value does not match email format",
                          },
                        })}
                      />
                    </div>
                    <div className="inline-flex items-center mt-[3%] hidden">
                      <label
                        className="relative flex items-center p-3 -ml-3  rounded-full cursor-pointer"
                        htmlFor="check"
                      >
                        <input
                          type="checkbox"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none  border border-red-600 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gr00 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                          id="check"
                          {...register("agree", { required: false })}
                        />
                        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="red"
                            stroke="red"
                            stroke-width="1"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                      <label
                        className="mt-px font-light text-white cursor-pointer select-none text-[1vw] "
                        htmlFor="check"
                      >
                        I agree to the{" "}
                        <span
                          className=" underline"
                          onClick={() => setPage("terms")}
                        >
                          Privacy Policy
                        </span>{" "}
                        of this website.
                      </label>
                    </div>
                    <div></div>
                  </div>
                  <div className="flex gap-5 w-full px-[10%] mt-auto text-[1vw]">
                    <div
                      className="border border-red-600 w-full flex items-center justify-center py-[2%]  cursor-pointer hover:bg-white/10"
                      onClick={closeModal}
                    >
                      Cancel
                    </div>
                    {isSending ? (
                      <div className="border border-red-600 w-full flex items-center justify-center py-[2%] text-[1vw] cursor-pointer hover:bg-white/10">
                        <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface"></div>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        disabled={!watchEmail || !watchGamerid}
                        className={`border ${
                          watchEmail && watchGamerid
                            ? "cursor-pointer border-red-600 hover:bg-white/10 "
                            : "border-zinc-600 text-zinc-600"
                        }  w-full flex items-center justify-center py-[2%]    `}
                      >
                        Cofirm
                      </button>
                    )}
                  </div>
                  <div className="text-red-600 text-[1vw] text-center mt-[1%]">
                    {errors.email && (
                      <div>The format of the email is incorrect.</div>
                    )}
                    {errors.agree && <div>agree is required</div>}
                    {errors.phone ||
                      errors.firstname ||
                      (errors.lastname && <div>All forms are required</div>)}
                  </div>
                </form>
              </motion.div>
            )}
            {page == "terms" && (
              <motion.div
                key="terms"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <div className="h-[78%] relative mt-[2%]">
                  <div
                    className={`text-white/50 h-full bg-emerald-500/0 overflow-y-auto pr-3 text-[1vw] relative ${scrollbarStyle}`}
                  >
                    Congratulations on completing the "Create your gamer card"
                    experience!  Now, fill in your information for a chance to
                    win exciting prizes. Winning notifications will be sent to
                    your contact email address by 6/9 at 12:00 PM. If you are
                    not selected as a winner, you will not receive further
                    notification.Congratulations on completing the "Create your
                    gamer card" experience!  Now, fill in your information for a
                    chance to win exciting prizes. Winning notifications will be
                    sent to your contact email address by 6/9 at 12:00 PM. If
                    you are not selected as a winner, you will not receive
                    further notification.Congratulations on completing the
                    "Create your gamer card" experience!  Now, fill in your
                    information for a chance to win exciting prizes. Winning
                    notifications will be sent to your contact email address by
                    6/9 at 12:00 PM. If you are not selected as a winner, you
                    will not receive further notification.Congratulations on
                    completing the "Create your gamer card" experience!  Winning
                    notifications will be sent to your contact email address by
                    6/9 at 12:00 PM. If you are not selected as a winner, you
                    will not receive further notification.Congratulations on
                    completing the "Create your gamer card" experience!  Winning
                    notifications will be sent to your contact email address by
                    6/9 at 12:00 PM. If you are not selected as a winner, you
                    will not receive further notification.Congratulations on
                    completing the "Create your gamer card" experience!  Winning
                    notifications will be sent to your contact email address by
                    6/9 at 12:00 PM. If you are not selected as a winner, you
                    will not receive further notification.Congratulations on
                    completing the "Create your gamer card" experience!  Winning
                    notifications will be sent to your contact email address by
                    6/9 at 12:00 PM. If you are not selected as a winner, you
                    will not receive further notification.Congratulations on
                    completing the "Create your gamer card" experience!  Winning
                    notifications will be sent to your contact email address by
                    6/9 at 12:00 PM. If you are not selected as a winner, you
                    will not receive further notification.Congratulations on
                    completing the "Create your gamer card" experience!  Winning
                    notifications will be sent to your contact email address by
                    6/9 at 12:00 PM. If you are not selected as a winner, you
                    will not receive further notification.Congratulations on
                    completing the "Create your gamer card" experience!  Winning
                    notifications will be sent to your contact email address by
                    6/9 at 12:00 PM. If you are not selected as a winner, you
                    will not receive further notification.Congratulations on
                    completing the "Create your gamer card" experience!  Winning
                    notifications will be sent to your contact email address by
                    6/9 at 12:00 PM. If you are not selected as a winner, you
                    will not receive further notification.Congratulations on
                    completing the "Create your gamer card" experience! 
                    <br />
                    <br />
                    <br />
                  </div>
                  <div className="w-full h-1/2  bottom-0 left-0 z-10  absolute pointer-events-none bg-gradient-to-t from-black via-black/20 opacity-80 "></div>
                </div>

                <div className="w-1/2 mx-auto my-[10%]">
                  <div
                    className="border border-red-600 w-full flex items-center justify-center py-1 cursor-pointer hover:bg-white/10"
                    onClick={() => setPage("default")}
                  >
                    OK
                  </div>
                </div>
              </motion.div>
            )}
            {page == "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full"
              >
                <div className="  w-[50%] mx-auto drop-shadow-[0_15px_10px_rgba(0,0,0,1)] mb-[2%]">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/form_success_msg.png"
                    }
                    alt=""
                    className="w-full"
                  />
                </div>
                <div className="text-[1vw] text-white/50 leading-tight space-y-2 py-[10%] font-light text-center">
                  <p>We have received your response,</p>
                  <p>and will contact you via email by Sep 27!</p>
                </div>
                <div className="w-1/2 mx-auto mt-[5%]">
                  <div
                    className="border border-red-600 w-full flex items-center justify-center py-1 cursor-pointer hover:bg-white/10"
                    onClick={closeModal}
                  >
                    OK
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Form1;
