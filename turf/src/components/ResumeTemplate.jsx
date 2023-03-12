import axios from "axios";
import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import moment from "moment";
import { toast } from "react-toastify";

const ResumeTemplate = () => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dev-jtzw7l47kq-el.a.run.app/api/employeee/resume1/manish-taneja-ef2812222`
        );
        setUserInfo(response?.data);
      } catch (error) {
        toast(error);
      }
    };
    fetchData();
  }, []);
  const languageString = userInfo?.additional_info?.language.join(", ") + ".";
  console.log("UserrInfooooo", userInfo);
  return (
    <div
      style={{
        width: "21cm",
        padding: "1.5rem 1rem",
        marginTop: "0",
        margin: "auto",
        backgroundColor: "white",
      }}
      className="actual-receipt"
    >
      <div style={{ display: "flex" }}>
        {/* left Side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            backgroundColor: "#323B4C",
            padding: "0 1.5rem",
            flexBasis: "30%",
          }}
          className="left-side"
        >
          {/* Profile Image */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "1.5rem 0 1rem",
              width: "100%",
            }}
          >
            {/* <img
              src={userInfo?.user_image[0]?.profile_image}
              width="130px"
              height="130px"
              style={{ borderRadius: "50%", border: "2px solid white" }}
            /> */}
          </div>

          {/* Contacts */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              margin: "0.5rem 0 1rem",
              width: "100%",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "Inter",
                color: "white",
                letterSpacing: "3px",
                textTransform: "uppercase",
                margin: "0",
              }}
            >
              Contacts
            </p>
            <hr
              style={{
                border: " 1px solid #EEEEEE",
                width: "100%",
                margin: "5px 0 10px 0",
                borderBottom: "none",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="15" cy="15" r="14.5" stroke="#FFFF" />
                <g clipPath="url(#clip0_10425_2)">
                  <path
                    d="M16.9086 10.625C17.519 10.7441 18.0801 11.0427 18.5199 11.4825C18.9597 11.9223 19.2582 12.4833 19.3773 13.0938L16.9086 10.625ZM16.9086 8.125C18.1769 8.2659 19.3596 8.83386 20.2625 9.73563C21.1654 10.6374 21.7348 11.8194 21.8773 13.0875L16.9086 8.125ZM21.2523 18.075V19.95C21.253 20.1241 21.2174 20.2964 21.1477 20.4558C21.0779 20.6153 20.9757 20.7585 20.8474 20.8762C20.7191 20.9938 20.5677 21.0834 20.4028 21.1392C20.2379 21.195 20.0632 21.2157 19.8898 21.2C17.9666 20.991 16.1192 20.3338 14.4961 19.2813C12.986 18.3217 11.7057 17.0414 10.7461 15.5313C9.68982 13.9008 9.03249 12.0444 8.82734 10.1125C8.81172 9.93967 8.83226 9.76548 8.88765 9.60102C8.94304 9.43656 9.03207 9.28543 9.14907 9.15726C9.26606 9.0291 9.40847 8.92669 9.56721 8.85658C9.72595 8.78646 9.89755 8.75016 10.0711 8.75H11.9461C12.2494 8.74701 12.5435 8.85442 12.7734 9.05221C13.0034 9.24999 13.1536 9.52465 13.1961 9.825C13.2752 10.425 13.422 11.0142 13.6336 11.5813C13.7177 11.805 13.7359 12.0481 13.686 12.2818C13.6362 12.5155 13.5204 12.7301 13.3523 12.9L12.5586 13.6938C13.4483 15.2585 14.7439 16.554 16.3086 17.4438L17.1023 16.65C17.2723 16.482 17.4868 16.3662 17.7205 16.3163C17.9543 16.2665 18.1974 16.2847 18.4211 16.3688C18.9881 16.5803 19.5773 16.7271 20.1773 16.8063C20.4809 16.8491 20.7582 17.002 20.9564 17.2359C21.1546 17.4699 21.2599 17.7685 21.2523 18.075Z"
                    stroke="#FFFF"
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
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  fontFamily: "Open Sans",
                  color: "#EEEEEE",
                }}
              >
                {userInfo?.user?.contact_number}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                margin: "10px 0",
              }}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="15" cy="15" r="14.5" stroke="#FFFF" />
                <path
                  d="M10 10H20C20.6875 10 21.25 10.5625 21.25 11.25V18.75C21.25 19.4375 20.6875 20 20 20H10C9.3125 20 8.75 19.4375 8.75 18.75V11.25C8.75 10.5625 9.3125 10 10 10Z"
                  stroke="#FFFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.25 11.25L15 15.625L8.75 11.25"
                  stroke="#FFFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  fontFamily: "Open Sans",
                  color: "#EEEEEE",
                }}
              >
                {userInfo?.user?.email}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="15"
                  cy="15"
                  r="14.3864"
                  fill="#323B4C"
                  stroke="#FFFF"
                  strokeWidth="1.22727"
                />
                <g clipPath="url(#clip0_10425_11)">
                  <path
                    d="M20.625 13.75C20.625 18.125 15 21.875 15 21.875C15 21.875 9.375 18.125 9.375 13.75C9.375 12.2582 9.96763 10.8274 11.0225 9.77252C12.0774 8.71763 13.5082 8.125 15 8.125C16.4918 8.125 17.9226 8.71763 18.9775 9.77252C20.0324 10.8274 20.625 12.2582 20.625 13.75Z"
                    stroke="#FFFF"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 15.625C16.0355 15.625 16.875 14.7855 16.875 13.75C16.875 12.7145 16.0355 11.875 15 11.875C13.9645 11.875 13.125 12.7145 13.125 13.75C13.125 14.7855 13.9645 15.625 15 15.625Z"
                    stroke="#FFFF"
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
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  fontFamily: "Open Sans",
                  color: "#EEEEEE",
                }}
              >
                {userInfo?.additional_info?.new_preferred_location[0]}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              margin: "1rem 0",
              width: "100%",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "Inter",
                color: "white",
                letterSpacing: "3px",
                textTransform: "uppercase",
                margin: "0",
              }}
            >
              Skills
            </p>
            <hr
              style={{
                border: " 1px solid #EEEEEE",
                width: "100%",
                margin: "5px 0 10px 0",
                borderBottom: "none",
              }}
            />
            <div
              style={{
                lineHeight: "26px",
                fontSize: "12px",
                color: "white",
                fontWeight: "400",
              }}
            >
              {userInfo?.skills?.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              margin: "0.5rem 0",
              width: "100%",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "Inter",
                color: "white",
                letterSpacing: "3px",
                textTransform: "uppercase",
                margin: "0",
              }}
            >
              Education
            </p>
            <hr
              style={{
                border: " 1px solid #EEEEEE",
                width: "100%",
                margin: "5px 0 10px 0",
                borderBottom: "none",
              }}
            />
            {userInfo?.education?.map((edu) => (
              <div
                style={{
                  fontFamily: "Open Sans",
                  color: "#292929",
                  lineHeight: "20px",
                  marginBottom: "15px",
                }}
                key={edu.id}
              >
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "capitalize",
                    color: "#FFFF",
                  }}
                >
                  • &nbsp;{edu.degree}
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#EEEEEE",
                      fontWeight: "400",
                    }}
                  >
                    | {edu.course_type} | {edu.passing_year}
                  </span>
                </p>
                <li
                  style={{
                    fontSize: "12px",
                    listStyle: "none",
                    fontWeight: "600",
                    paddingLeft: "13px",
                    color: "#EEEEEE",
                  }}
                >
                  {edu.field_of_study} from {edu.school}
                </li>
                <li
                  style={{
                    fontSize: "12px",
                    listStyle: "none",
                    fontWeight: "400",
                    paddingLeft: "13px",
                    color: "#EEEEEE",
                  }}
                >
                  Marks/Grade:&nbsp; {edu.marks_grade}
                  {edu.marks_type == "Percentage" ? "%" : ""}
                </li>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              margin: "0.5rem 0",
              width: "100%",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "Inter",
                color: "white",
                letterSpacing: "3px",
                textTransform: "uppercase",
                margin: "0",
              }}
            >
              personal
            </p>
            <hr
              style={{
                border: " 1px solid #EEEEEE",
                width: "100%",
                margin: "5px 0 10px 0",
                borderBottom: "none",
              }}
            />
            <div style={{ display: "flex", color: "#FFF", lineHeight: "21px" }}>
              <div
                style={{ fontSize: "12px", fontWeight: "600", width: "126px" }}
              >
                <p>DOB</p>
                <p>Gender</p>
                <p>Marital Status </p>
                <p>Language </p>
              </div>
              <div style={{ fontSize: "12px", fontWeight: "400" }}>
                <p>
                  :&nbsp;&nbsp;{" "}
                  {moment(userInfo?.additional_info?.date_of_birth).format(
                    "MMM DD, YYYY"
                  )}
                </p>
                <p>:&nbsp;&nbsp; {userInfo?.additional_info?.gender}</p>
                <p>:&nbsp;&nbsp; {userInfo?.additional_info?.marital_status}</p>
                <p style={{ display: "flex", gap: "10px" }}>
                  <span>:</span>
                  <span>{languageString}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div style={{ flexBasis: "65%", padding: "2rem" }}>
          {/* profession */}
          <div style={{ lineHeight: "32px" }}>
            <p
              style={{
                fontSize: "24px",
                textTransform: "uppercase",
                fontWeight: "600",
                color: "#292929",
                fontFamily: "Inter",
                letterSpacing: "1px",
              }}
            >
              {userInfo?.user?.username}
            </p>
            <p
              style={{
                fontSize: "18px",
                textTransform: "uppercase",
                fontWeight: "600",
                color: "#5F5F5F",
                fontFamily: "Open Sans",
              }}
            >
              Web developer
            </p>
            <p
              style={{
                fontSize: "13px",
                textTransform: "capitalize",
                fontWeight: "600",
                color: "#5F5F5F",
                fontFamily: "Open Sans",
              }}
            >
              {/* total exp: {userInfo?.summary[0]?.total_experience} Yrs &nbsp;•{" "} */}
              <span
                style={{
                  fontSize: "12x",
                  color: "#FF7400",
                  fontWeight: "500",
                  fontFamily: "Inter",
                }}
              >
                EEF7428S
              </span>
            </p>
          </div>

          {/* summary */}
          <div style={{ marginTop: "3.1rem" }}>
            <p
              style={{
                fontSize: "16px",
                margin: "0",
                fontWeight: "600",
                fontFamily: "Inter",
                letterSpacing: "3px",
                color: "#292929",
                textTransform: "uppercase",
              }}
            >
              Profile summary
            </p>
            <hr
              style={{
                border: "1px solid #8F8F8F",
                width: "100%",
                margin: "4px 0 10px 0",
                borderBottom: "none",
              }}
            />
            <p
              style={{
                fontSize: "10px",
                lineHeight: "14px",
                fontWeight: "400",
                color: "#292929",
                fontFamily: "Open Sans",
                textAlign: "justify",
              }}
            >
              {userInfo?.summary?.map((sum) => parse(sum.profile_summary))}
            </p>
          </div>

          {/* work experience */}
          <div style={{ marginTop: "2rem" }}>
            <p
              style={{
                fontSize: "16px",
                margin: "0",
                fontWeight: "600",
                fontFamily: "Inter",
                letterSpacing: "3px",
                color: "#292929",
                textTransform: "uppercase",
              }}
            >
              work experience
            </p>
            <hr
              style={{
                border: "1px solid #8F8F8F",
                width: "100%",
                margin: "4px 0 10px 0",
                borderBottom: "none",
              }}
            />
            {userInfo?.experiences?.map((exp) => (
              <section style={{ padding: "0.5rem 0" }} key={exp.id}>
                <p
                  style={{
                    fontSize: "14px",
                    textTransform: "capitalize",
                    fontWeight: "600",
                    fontFamily: "Open Sans",
                    color: "#292929",
                  }}
                >
                  • &nbsp;{exp.functional_area}
                </p>
                <div
                  style={{
                    paddingLeft: "13px",
                    lineHeight: "14px",
                    fontWeight: "400",
                    fontSize: "10px",
                    fontFamily: "Open Sans",
                    color: "#292929",
                  }}
                >
                  <li
                    style={{
                      fontSize: "12px",
                      padding: "10px 0",
                      fontWeight: "600",
                      color: "#5F5F5F",
                      fontFamily: "Open Sans",
                      textTransform: "capitalize",
                      listStyle: "none",
                    }}
                  >
                    {exp.organization} |{" "}
                    {moment(exp.start_date).format("MMM YYYY")} -{" "}
                    {!exp.end_date
                      ? "Present"
                      : moment(exp.end_date).format("MMM YYYY")}
                  </li>

                  {exp.key_responsibilites.split("- ").map((keys) => (
                    <p style={{ display: "flex", gap: "7px" }} key={keys}>
                      <span>&bull;</span>
                      <span style={{ textAlign: "justify" }}>
                        {parse(keys)}
                      </span>
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Certicate */}
          <div style={{ marginTop: "2rem" }}>
            <p
              style={{
                fontSize: "16px",
                margin: "0",
                fontWeight: "600",
                fontFamily: "Inter",
                letterSpacing: "3px",
                color: "#292929",
                textTransform: "uppercase",
              }}
            >
              certifications
            </p>
            <hr
              style={{
                border: "1px solid #8F8F8F",
                width: "100%",
                margin: "4px 0 10px 0",
                borderBottom: "none",
              }}
            />
            {userInfo?.certification?.map((certificate) => (
              <section style={{ padding: "0.5rem 0" }} key={certificate.id}>
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      fontFamily: "Open Sans",
                      color: "#292929",
                    }}
                  >
                    • &nbsp;{certificate.certificate_title}
                  </p>
                  <div
                    style={{
                      paddingLeft: "13px",
                      listStyle: "none",
                      lineHeight: "14px",
                      fontWeight: "400",
                      fontSize: "10px",
                      fontFamily: "Open Sans",
                      color: "#292929",
                    }}
                  >
                    <li
                      style={{
                        fontSize: "12px",
                        padding: "10px 0 5px 0",
                        fontWeight: "500",
                        color: "#5F5F5F",
                      }}
                    >
                      {certificate.institute_name}
                    </li>
                    <p
                      style={{
                        margin: "0",
                        paddingRight: "2rem",
                        lineHeight: "14px",
                        fontSize: "10px",
                        fontWeight: "400",
                      }}
                    >
                      {parse(certificate.certificate_description)}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Projects */}
          <div style={{ marginTop: "1rem" }}>
            <p
              style={{
                fontSize: "16px",
                margin: "0",
                fontWeight: "600",
                fontFamily: "Inter",
                letterSpacing: "3px",
                color: "#292929",
                textTransform: "uppercase",
              }}
            >
              projects
            </p>
            <hr
              style={{
                border: "1px solid #8F8F8F",
                width: "100%",
                margin: "4px 0 10px 0",
                borderBottom: "none",
              }}
            />
            {userInfo?.projects?.map((project) => (
              <section
                style={{ padding: "0.4rem 0", color: "#292929" }}
                key={project.id}
              >
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "10px",
                    textTransform: "capitalize",
                    fontFamily: "Open Sans",
                  }}
                >
                  • &nbsp;{project.project_title}
                </p>
                <li
                  style={{
                    paddingLeft: "13px",
                    fontSize: "10px",
                    listStyle: "none",
                    lineHeight: "14px",
                    fontWeight: "400",
                    paddingRight: "2rem",
                  }}
                >
                  {parse(project.project_description)}
                </li>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;
