import axios from "axios";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import moment from "moment";
import { toast } from "react-toastify";

const TemplateOne = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [first, setfirst] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dev-jtzw7l47kq-el.a.run.app/api/employeee/resume1/manish-taneja-ef2004233`
        );
        setUserInfo([response?.data]);
    
      } catch (error) {
        toast(error);
      }
    };
    fetchData();
  }, []);

  console.log("UserrInfooooo", userInfo);
  const languageString = userInfo[0]?.additional_info?.language.join(", ") + ".";
  const paragraphs = userInfo?.experiences[0]?.key_responsibilites.split('<p>')
  const bulletPoints = [];

for (let i = 0; i < paragraphs?.length; i++) {
  const paragraph = paragraphs[i]?.replace("</p>", "");
  if (paragraph !== "" && '</p>') {
    bulletPoints.push(`${paragraph}`);
  }
}
const filteredBullets = bulletPoints.filter(bullet => bullet.trim() !== '<br>')
console.log('buullllll',filteredBullets)


  const certificate = userInfo?.certification[0]?.certificate_description.split('<br>')

  const filteredCerti = certificate?.filter(bullet => bullet.trim() !== "")

  const finalCerti = filteredCerti?.join('')

  

  const projects = userInfo?.projects[0]?.project_description.split('<br>')
  const filteredProject = projects?.filter(paragraph => paragraph.trim() !== "");
  const finalPro = filteredProject?.join('')
  
  
  return (
    <div>
    {/* <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Nunito"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Open Sans"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Inter"
        rel="stylesheet"
      />
    </Head> */}

    <div
      style={{
        fontFamily: "Open Sans",
        width: " 21cm",
        fontWeight: "400",
        display: "block",
        color: "#292929",
        lineHeight: "1",
        fontSize: "16px",

        marginLeft: "-2px",
        marginTop: "0",
        margin: "0 auto",
        backgroundColor: "white",
      }}
    >
      <div style={{ width: "100%" }}>
        <div>
          <div>
            <div
              style={{
                width: "0%",
                height: "0%",
                borderTop: "230px solid #256BD3",
                position: "relative",
                borderRight: "230px solid transparent",
              }}
            />
            {/*  Profile Image */}
            {/*  <div style={{
  marginLeft: "20px",
  marginTop: "-200px",
  background-color: "aquamarine",}}
  >  */}

            <img
            //   src={userInfo?.user_image[0]?.profile_image}
              style={{
                borderRadius: "50%",
                width: "170px",
                position: "absolute",
                marginLeft: "44px",
                marginTop: "-173px",
              }}
            />

            {/*  <img
  src="https://storage.googleapis.com/employee-forums.appspot.com/static_images/employee_forum_profile.png"
   style="border-radius: 50%; width: 190px; marginLeft: 44px;marginTop: -173px;
  ">
 */}
          </div>
        </div>

        <div style={{ width: "70%", float: "right", marginTop: "-18%" }}>
          {/* Name */}
          <div>
            <p
              style={{
                fontSize: "32px",
                marginTop: "2px",
                /* marginBottom: "2px", */
                paddingLeft: "28px",
                color: "#256BD3",
                marginBottom: "20px",
                fontFamily: "Inter",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {userInfo?.user?.username}
            </p>
          </div>
          {/* EF ID, DESIGNATIONAL, TOTAL EXPERIENCE */}
          <div>
            <p
              style={{
                marginTop: "-6px",
                fontWeight: "bold",
                fontSize: "22px",
                color: "#5F5F5F",
                paddingLeft: "28px",
                paddingBottom: "6px",
                textTransform: "uppercase",
              }}
            >
              {/* {userInfo?.summary[0]?.designation} */}
            </p>

            <p
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                paddingLeft: "28px",
                color: "#5F5F5F",
                marginRight: "4px",
                marginTop: "6px",
              }}
            >
              Total Exp: 5
              Yrs&nbsp;&nbsp;
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                  color: "#A9A9A9",
                  paddingBottom: "6px",
                  textTransform: "uppercase",
                }}
              >
                &bull;
              </span>
              &nbsp;&nbsp;
              <span
                style={{
                  fontWeight: "bold",
                  fontFamily: "Inter",
                  fontSize: "15px",
                  color: "#FF7400",
                  paddingBottom: "6px",
                  textTransform: "uppercase",
                }}
              >
                {userInfo?.user?.ef_id}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "spx" }}>
        <div>
          <div
            style={{ width: "40%", float: "left", backgroundColor: "white" }}
          >
            {/*  PHONE NO., EMAIL ID, LOCATION */}
            <p
              style={{
                color: "#256BD3",
                fontWeight: "800",
                fontSize: "20px",
                paddingLeft: "26px",
                fontFamily: "Inter",
              }}
            >
              CONTACT
            </p>
            <hr
              style={{
                borderColor: "#8f8f8f",
                marginLeft: "26px",
                marginRight: "26px",
                marginTop: "20px",
                borderStyle: "solid",
                borderWidth: "1px",
              }}
            />

            {/* PHONE NUMBER */}
            <div
              style={{
                /* display: "inline-block", */
                paddingLeft: "28px",
                marginBottom: "5px",
                marginTop: "14px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <p>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="15" cy="15" r="14.5" stroke="#5F5F5F" />
                  <g clipPath="url(#clip0_10425_2)">
                    <path
                      d="M16.9086 10.625C17.519 10.7441 18.0801 11.0427 18.5199 11.4825C18.9597 11.9223 19.2582 12.4833 19.3773 13.0938L16.9086 10.625ZM16.9086 8.125C18.1769 8.2659 19.3596 8.83386 20.2625 9.73563C21.1654 10.6374 21.7348 11.8194 21.8773 13.0875L16.9086 8.125ZM21.2523 18.075V19.95C21.253 20.1241 21.2174 20.2964 21.1477 20.4558C21.0779 20.6153 20.9757 20.7585 20.8474 20.8762C20.7191 20.9938 20.5677 21.0834 20.4028 21.1392C20.2379 21.195 20.0632 21.2157 19.8898 21.2C17.9666 20.991 16.1192 20.3338 14.4961 19.2813C12.986 18.3217 11.7057 17.0414 10.7461 15.5313C9.68982 13.9008 9.03249 12.0444 8.82734 10.1125C8.81172 9.93967 8.83226 9.76548 8.88765 9.60102C8.94304 9.43656 9.03207 9.28543 9.14907 9.15726C9.26606 9.0291 9.40847 8.92669 9.56721 8.85658C9.72595 8.78646 9.89755 8.75016 10.0711 8.75H11.9461C12.2494 8.74701 12.5435 8.85442 12.7734 9.05221C13.0034 9.24999 13.1536 9.52465 13.1961 9.825C13.2752 10.425 13.422 11.0142 13.6336 11.5813C13.7177 11.805 13.7359 12.0481 13.686 12.2818C13.6362 12.5155 13.5204 12.7301 13.3523 12.9L12.5586 13.6938C13.4483 15.2585 14.7439 16.554 16.3086 17.4438L17.1023 16.65C17.2723 16.482 17.4868 16.3662 17.7205 16.3163C17.9543 16.2665 18.1974 16.2847 18.4211 16.3688C18.9881 16.5803 19.5773 16.7271 20.1773 16.8063C20.4809 16.8491 20.7582 17.002 20.9564 17.2359C21.1546 17.4699 21.2599 17.7685 21.2523 18.075Z"
                      stroke="#5F5F5F"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_10425_2">
                      <rect
                        width="15"
                        height="15"
                        fill="white"
                        transform="translate(7.5 7.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </p>
              <p
                style={{
                  fontWeight: "semi-bold",
                  /*  display: " inline-block",
                  marginTop: "6px", */
                  color: "#5F5F5F",
                  marginLeft: "10px",
                  marginTop: "-14px",
                }}
              >
                {userInfo?.user?.contact_number}
              </p>
            </div>

            {/* EMAIL ID */}
            <div
              style={{
                /* display: "inline-block", */
                marginLeft: "28px",
                marginBottom: "5px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <p>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="15" cy="15" r="14.5" stroke="#5F5F5F" />
                  <path
                    d="M10 10H20C20.6875 10 21.25 10.5625 21.25 11.25V18.75C21.25 19.4375 20.6875 20 20 20H10C9.3125 20 8.75 19.4375 8.75 18.75V11.25C8.75 10.5625 9.3125 10 10 10Z"
                    stroke="#5F5F5F"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.25 11.25L15 15.625L8.75 11.25"
                    stroke="#5F5F5F"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </p>
              <p
                style={{
                  fontWeight: "semi-bold",
                  /* display: "inline-block",
                  marginTop: "6px", */
                  color: "#5F5F5F",
                  marginLeft: "10px",
                  marginTop: "-14px",
                }}
              >
                {" "}
                {userInfo?.user?.email}
              </p>
            </div>

            {/* LOCATION */}
            <div
              style={{
                /* display: "inline-block" */ marginLeft: "28px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <p>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="15"
                    cy="15"
                    r="14.3864"
                    fill="white"
                    stroke="#5F5F5F"
                    strokeWidth="1.22727"
                  />
                  <g clipPath="url(#clip0_10425_11)">
                    <path
                      d="M20.625 13.75C20.625 18.125 15 21.875 15 21.875C15 21.875 9.375 18.125 9.375 13.75C9.375 12.2582 9.96763 10.8274 11.0225 9.77252C12.0774 8.71763 13.5082 8.125 15 8.125C16.4918 8.125 17.9226 8.71763 18.9775 9.77252C20.0324 10.8274 20.625 12.2582 20.625 13.75Z"
                      stroke="#5F5F5F"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 15.625C16.0355 15.625 16.875 14.7855 16.875 13.75C16.875 12.7145 16.0355 11.875 15 11.875C13.9645 11.875 13.125 12.7145 13.125 13.75C13.125 14.7855 13.9645 15.625 15 15.625Z"
                      stroke="#5F5F5F"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_10425_11">
                      <rect
                        width="15"
                        height="15"
                        fill="white"
                        transform="translate(7.5 7.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </p>
              <p
                style={{
                  fontWeight: "semi-bold",
                  /*   display: "inline-block",
                  marginTop: "6px", */
                  color: "#5F5F5F",
                  marginLeft: "10px",
                  marginTop: "-14px",
                }}
              >
                {" "}
                Mumbai (Maharashtra)
              </p>
            </div>

            <div>
              <p
                style={{
                  marginTop: "28px",
                  color: "#256BD3",
                  fontWeight: "800",
                  fontSize: "20px",
                  paddingLeft: "26px",
                  fontFamily: "Inter",
                }}
              >
                SKILLS
              </p>
              <hr
                style={{
                  borderColor: "#8f8f8f",
                  marginLeft: "26px",
                  marginRight: "26px",
                  marginTop: "20px",
                  paddingTop: "0px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
              />
              <div style={{ marginTop: "14px" }}>
                {userInfo?.skills?.map((skill) => (
                  <p
                    
                    style={{
                      fontSize: "16px",
                      marginTop: "1px",
                      marginBottom: "4px",
                      lineHeight: "1.5",
                      paddingLeft: "32px",
                    }}
                  >
                    &bull;&nbsp;{skill}
                  </p>
                  /*  <li
                    key={skill.id}
                    style={{
                      
                    
                      fontSize: "16px",
                      marginTop: "1px",
                      marginBottom: "4px",
                      lineHeight: "1.5",
                    }}
                  >
                    {skill}
                  </li> */
                ))}
              </div>
            </div>
            {/* EDUCATION */}
            <div style={{ marginTop: "28px" }}>
              <p
                style={{
                  color: "#256BD3",
                  fontWeight: "800",
                  fontSize: "20px",
                  paddingLeft: "26px",
                  fontFamily: "Inter",
                }}
                className="pageBreak "
              >
                EDUCATION
              </p>
              <hr
                style={{
                  borderColor: "#8f8f8f",
                  marginLeft: "26px",
                  marginRight: "26px",
                  marginTop: "20px",
                  paddingTop: "0px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
                className="pageBreak"
              />
              <div style={{ marginTop: "14px" }}>
                {userInfo?.education?.map((edu) => (
                  <div
                    
                    style={{
                      fontFamily: "Open Sans",
                      color: "#292929",
                      marginTop: "20px",
                    }}
                  >
                    <div style={{ marginLeft: "26px" }}>
                      <p
                        style={{
                          fontSize: "16px",
                          marginTop: "2px",
                          lineHeight: "1.25",
                          fontWeight: "600",
                          textTransform: "capitalize",
                        }}
                        className="pageBreak"
                      >
                        • &nbsp;{edu.degree}
                        <span
                          style={{
                            color: "#5F5F5F",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                          className="pageBreak"
                        >
                          | {edu.course_type} | {edu.passing_year}
                        </span>
                      </p>
                      <li
                        style={{
                          fontSize: "14px",
                          listStyle: "none",
                          fontWeight: "600",
                          lineHeight: "1.25",
                          padding: "10px 0 10px 13px",
                          color: "#5F5F5F",
                        }}
                        className="pageBreak"
                      >
                        {edu.field_of_study} from {edu.school}
                      </li>
                      <li
                        style={{
                          fontSize: "14px",
                          listStyle: "none",
                          fontWeight: "500",
                          paddingLeft: "14px",
                          color: "#5F5F5F",
                        }}
                        className="pageBreak"
                      >
                        Marks / Grade: {edu.marks_grade}{" "}
                        {edu.marks_type == "Percentage" ? "%" : "+"}
                      </li>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* PERSONAL INFO */}
            <div style={{ marginTop: "28px" }}>
              <p
                style={{
                  color: "#256BD3",
                  fontWeight: "800",
                  fontSize: "20px",
                  paddingLeft: "26px",
                  fontFamily: "Inter",
                }}
                className="pageBreak"
              >
                PERSONAL
              </p>
              <hr
                style={{
                  borderColor: "#8f8f8f",
                  marginLeft: "26px",
                  marginRight: "26px",
                  marginTop: "20px",
                  paddingTop: "0px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
                className="pageBreak"
              />

              {/* DATE OF BIRTH */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  marginLeft: "26px",
                  marginTop: "20px",
                }}
                className="pageBreak"
              >
                <div
                  style={{
                    fontSize: "14px",
                    width: "40%",
                    fontWeight: "600",
                  }}
                >
                  DOB:&nbsp;&nbsp;
                </div>
                <div style={{ fontSize: "14px", fontWeight: "400" }}>
                  {moment(userInfo?.additional_info?.date_of_birth)}
                </div>
              </div>

              {/* Gender */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  marginLeft: "26px",
                  marginTop: "20px",
                }}
                className="pageBreak"
              >
                <div
                  style={{
                    fontSize: "14px",
                    width: "40%",
                    fontWeight: "600",
                  }}
                >
                  Gender:&nbsp;&nbsp;
                </div>
                <div style={{ fontSize: "14px", fontWeight: "400" }}>
                  {userInfo?.additional_info?.gender}
                </div>
              </div>

              {/* Marital Status */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  marginLeft: "26px",
                  marginTop: "20px",
                }}
                className="pageBreak"
              >
                <div
                  style={{
                    fontSize: "14px",
                    width: "40%",
                    fontWeight: "600",
                  }}
                >
                  Marital Status:&nbsp;&nbsp;
                </div>
                <div style={{ fontSize: "14px", fontWeight: "400" }}>
                  {userInfo?.additional_info?.marital_status}
                </div>
              </div>

              {/* Language */}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginLeft: "26px",
                  marginTop: "20px",
                }}
                className="pageBreak"
              >
                <div
                  style={{
                    fontSize: "14px",
                    width: "40%",
                    minWidth: "40%",
                    fontWeight: "600",
                  }}
                >
                  Language:&nbsp;&nbsp;
                </div>
                <div style={{ fontSize: "14px", fontWeight: "400" }}>
                  {userInfo?.additional_info?.language
                    ?.map((lang) => lang)
                    .join(", ")}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              marginLeft: "40%",
              marginRight: "26px",
              paddingTop: "3px",
            }}
          >
            {/* profile summary */}
            <div>
              <p
                style={{
                  color: "#256BD3",
                  fontWeight: "800",
                  fontSize: "20px",
                  paddingLeft: "26px",
                  fontFamily: "Inter",
                }}
              >
                PROFILE SUMMARY
              </p>
              <hr
                style={{
                  borderColor: "#8f8f8f",
                  marginLeft: "26px",
                  marginRight: "26px",
                  marginTop: "20px",
                  paddingTop: "0px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
              />
            </div>
            <div
              style={{
                marginTop: "14px",
                paddingLeft: "26px",
                fontSize: "14px",
                lineHeight: "1.25",
              }}
            >
              <p>
                {userInfo?.summary?.map((sum) => parse(sum.profile_summary))}
              </p>
            </div>

            {/*  work experience */}
            <div style={{ marginTop: "28px" }}>
              <p
                style={{
                  color: "#256BD3",
                  fontWeight: "800",
                  fontSize: "20px",
                  paddingLeft: "26px",
                  fontFamily: "Inter",
                }}
                className="pageBreak"
              >
                WORK EXPERIENCE
              </p>
              <hr
                style={{
                  borderColor: "#8f8f8f",
                  marginLeft: "26px",
                  marginRight: "26px",
                  marginTop: "20px",
                  paddingTop: "0px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
                className="pageBreak"
              />
            </div>
            {userInfo?.experiences?.map((exp) => (
              <div
                
                style={{ marginLeft: "26px", marginTop: "20px" }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    fontFamily: "Open Sans",
                    color: "#292929",
                  }}
                  className="pageBreak"
                >
                  • &nbsp;{exp.functional_area}
                </p>
                <div
                  style={{
                    paddingLeft: "13px",
                    listStyle: "none",
                    lineHeight: "14px",
                    fontWeight: "400",
                    fontSize: "14px",
                    fontFamily: "Open Sans",
                    color: "#292929",
                  }}
                  className="pageBreak"
                >
                  <li
                    style={{
                      fontSize: "14px",
                      padding: "10px 0",
                      fontWeight: 600,
                      color: "#5F5F5F",
                      fontFamily: "Open Sans",
                    }}
                    className="pageBreak"
                  >
                    {exp.organization} | {moment(exp.start_date).format("MMM YYYY")} -{" "}
                    {exp.end_date == null ? (
                      "Present"
                    ) : (
                      <>{moment(exp.end_date)}</>
                    )}
                  </li>
                  <p
                    style={{
                      marginTop: "4px",
                      fontSize: "14px",
                      lineHeight: "1.25",
                    }}
                    className="pageBreak"
                  >
                    {parse(exp.key_responsibilites)}
                  </p>
                </div>
              </div>
            ))}

            {/*  certification  */}
            <div style={{ marginTop: "28px" }}>
              <p
                style={{
                  color: "#256BD3",
                  fontWeight: "800",
                  fontSize: "20px",
                  paddingLeft: "26px",
                  fontFamily: "Inter",
                }}
                className="pageBreak"
              >
                CERTIFICATION
              </p>
              <hr
                style={{
                  borderColor: "#8f8f8f",
                  marginLeft: "26px",
                  marginRight: "26px",
                  marginTop: "20px",
                  paddingTop: "0px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
                className="pageBreak"
              />

              {userInfo?.certification?.map((certificate) => (
                <div
                 
                  style={{ marginLeft: "26px", marginTop: "20px" }}
                >
                  <p
                    style={{
                      fontSize: "16px",

                      fontWeight: 600,
                      fontFamily: "Open Sans",
                      color: "#292929",
                    }}
                    className="pageBreak"
                  >
                    • &nbsp;{certificate.certificate_title}
                  </p>
                  <div
                    style={{
                      paddingLeft: "13px",
                      listStyle: "none",
                      lineHeight: "14px",
                      fontWeight: "400",
                      fontSize: "14px",
                      fontFamily: "Open Sans",
                      color: "#292929",
                    }}
                    className="pageBreak"
                  >
                    <li
                      style={{
                        fontSize: "14px",
                        padding: "10px 0",
                        fontWeight: 600,
                        color: "#5F5F5F",
                      }}
                      className="pageBreak"
                    >
                      {certificate.institute_name}
                    </li>
                    <p
                      style={{
                        margin: "0",
                        paddingRight: "2rem",

                        fontSize: "14px",
                        fontWeight: "400",
                        lineHeight: "1.25",
                      }}
                      className="pageBreak"
                    >
                      {parse(certificate.certificate_description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* projects */}
            <div style={{ marginTop: "28px", paddingBottom: "20px" }}>
              <p
                style={{
                  color: "#256BD3",
                  fontWeight: "800",
                  fontSize: "20px",
                  paddingLeft: "26px",
                  fontFamily: "Inter",
                }}
                className="pageBreak"
              >
                PROJECTS
              </p>
              <hr
                style={{
                  borderColor: "#8f8f8f",
                  marginLeft: "26px",
                  marginRight: "26px",
                  marginTop: "20px",
                  paddingTop: "0px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                }}
                className="pageBreak"
              />
              {userInfo?.projects?.map((project) => (
                <div
                  
                  style={{ marginLeft: "26px", marginTop: "20px" }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      marginBottom: "10px",
                      color: "#292929",
                    }}
                    className="pageBreak"
                  >
                    • &nbsp;{project.project_title}
                  </p>

                  <li
                    style={{
                      paddingLeft: "13px",
                      fontSize: "14px",
                      listStyle: "none",
                      lineHeight: "1.25",
                      fontWeight: "400",
                      paddingRight: "2rem",
                    }}
                    className="pageBreak"
                  >
                    {parse(project.project_description)}
                  </li>
                  {/* {project.project_description.split("- ").map((keys, index) => (
                    <p style={{ display: "flex", gap: "7px", margin: '0px', alignItems: 'center' }} key={index}>
                      <span>&bull;</span>
                      <span style={{ textAlign: "justify" }}>
                        {parse(keys)}
                      </span>
                    </p>
                  ))} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default TemplateOne;
