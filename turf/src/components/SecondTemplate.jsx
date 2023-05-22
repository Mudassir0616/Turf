import axios from "axios";
import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import moment from "moment";
import { toast } from "react-toastify";

const SecondTemplate = () => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dev-jtzw7l47kq-el.a.run.app/api/employeee/resume1/abhishek-tiwari-ef1104231`
        );
        setUserInfo([response?.data]);
      } catch (error) {
        toast(error);
      }
    };
    fetchData();
  }, []);

  const languageString = userInfo[0]?.additional_info?.language.join(", ") + ".";
  console.log("UserrInfooooo", userInfo[0]);
  return (
    <div>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Nunito"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.co          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Inter"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Inter"
          rel="stylesheet"
        />
      </Head> */}

      <div
        style={{
          fontFamily: "inherit",
          width: "21cm",
          fontWeight: "400",
          //   height: '29.7cm',
          display: "block",
          color: "#292929",
          lineHeight: "1",
          fontSize: "16px",
          padding: "0",
          marginTop: "0",
          margin: "auto",
          background: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#4891FF",
            color: "#FFFF",
            lineHeight: "24px",
            padding: "30px 0",
          }}
        >
          <p
            style={{
              textTransform: "uppercase",
              fontSize: "26px",
              fontWeight: "600",
              margin:'0'
            }}
          >
            {userInfo[0]?.user?.username}
          </p>
          <p
            style={{
              textTransform: "uppercase",
              fontSize: "14px",
              fontWeight: "600",
              paddingTop:'5px',
              margin: "0",
            }}
          >
            senior react developer
          </p>
          <p
            style={{
              fontSize: "12px",
              textTransform: "capitalize",
              margin:'0',
              fontWeight: "600",
            }}
          >
            total exp : {userInfo[0]?.summary[0]?.total_experience} Yrs
            &nbsp;&nbsp;•&nbsp;&nbsp;
            <span
              style={{
                color: "#FFCB9F",
                fontSize: "11px",
            
                fontWeight: "600",
              }}
            >
              {userInfo[0]?.user?.ef_id}
            </span>
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "7px",
              fontSize: "11px",
              fontWeight: "600",
              
            }}
          >
            <p style={{ display: "flex", alignItems: "center", margin:'0' }}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
              </svg>{" "}
              {userInfo[0]?.user?.contact_number}
            </p>

            <p style={{ display: "flex", alignItems: "center", margin:'0' }}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 10H20C20.6875 10 21.25 10.5625 21.25 11.25V18.75C21.25 19.4375 20.6875 20 20 20H10C9.3125 20 8.75 19.4375 8.75 18.75V11.25C8.75 10.5625 9.3125 10 10 10Z"
                  stroke="#FFF"
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
              </svg>{" "}
              {userInfo[0]?.user?.email}
            </p>

            <p style={{ display: "flex", alignItems: "center", margin:'0' }}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_10425_11)">
                  <path
                    d="M20.625 13.75C20.625 18.125 15 21.875 15 21.875C15 21.875 9.375 18.125 9.375 13.75C9.375 12.2582 9.96763 10.8274 11.0225 9.77252C12.0774 8.71763 13.5082 8.125 15 8.125C16.4918 8.125 17.9226 8.71763 18.9775 9.77252C20.0324 10.8274 20.625 12.2582 20.625 13.75Z"
                    stroke="#FFF"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 15.625C16.0355 15.625 16.875 14.7855 16.875 13.75C16.875 12.7145 16.0355 11.875 15 11.875C13.9645 11.875 13.125 12.7145 13.125 13.75C13.125 14.7855 13.9645 15.625 15 15.625Z"
                    stroke="#FFF"
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
              </svg>{" "}
              {userInfo[0]?.additional_info?.new_preferred_location[0]}
            </p>
          </div>
        </div>

        <div style={{ padding: "2rem 3rem" }}>
          {/* Profile Summary */}
          <div style={{ width: "100%" }}>
            <p
              style={{
                textTransform: "uppercase",
                fontSize: "16px",
            
                color: "#256BD3",
                fontWeight: 600,
                margin: 0,
              }}
            >
              profile summary
              <hr
                style={{
                  border: "1px solid #8F8F8F",
                  borderTop: "none",
                  height: "0px",
                  marginTop: "5px",
                }}
              />
            </p>
            <div style={{  color: "#292929" }}>
              <p
                style={{
                  margin: "15px 0",
                  paddingRight: "2rem",
                  lineHeight: "14px",
                  fontSize: "11px",
                  fontWeight: "400",
                  textAlign: "justify",
                }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea exercitationem corrupti ad similique, natus maxime est adipisci corporis officiis, consequatur aut eius nesciunt odit ut autem vitae quidem ullam ex neque temporibus praesentium distinctio minus! Illum dignissimos dolorem reiciendis ab nihil quaerat eius? Pariatur, repellat ipsam, aut tempore delectus veritatis hic dolore veniam excepturi velit laboriosam optio rem est odit.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div style={{ width: "100%", marginTop: "1rem" }}>
            <p
              style={{
                textTransform: "uppercase",
                fontSize: "16px",
            
                color: "#256BD3",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Skills
              <hr
                style={{
                  border: "1px solid #8F8F8F",
                  borderTop: "none",
                  height: "0px",
                  marginTop: "5px",
                }}
              />
            </p>
            <div
              style={{
                lineHeight: "24px",
                color: "#292929",
                fontSize: "12px",
                fontWeight: 400,
                marginTop: "10px",
              }}
            >
              {userInfo[0]?.skills?.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div style={{ width: "100%", marginTop: "1.5rem" }}>
            <p
              style={{
                textTransform: "uppercase",
                fontSize: "16px",
            
                color: "#256BD3",
                fontWeight: "600",
                margin: 0,
              }}
            >
              Work Experience
              <hr
                style={{
                  border: "1px solid #8F8F8F",
                  borderTop: "none",
                  height: "0px",
                  marginTop: "5px",
                }}
              />
            </p>
            {userInfo[0]?.experiences?.map((exp) => (
              <section style={{padding:'5px 0' }} key={exp.id}>
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      textTransform: "capitalize",
                      fontWeight: "600",
                      margin:'0',
                      color: "#292929",
                    }}
                  >
                    • &nbsp;{exp.functional_area}
                  </p>
                  <div
                    style={{
                      paddingLeft: "13px",
                      listStyle: "none",
                      lineHeight: "12px",
                      fontWeight: "400",
                      fontSize: "11px",
                      
                      color: "#292929",
                    }}
                  >
                    <li
                      style={{
                        fontSize: "12px",
                        paddingTop: "10px",
                        fontWeight: "600",
                        color: "#5F5F5F",
                        
                        textTransform: "capitalize",
                      }}
                    >
                      {exp.organization} |{" "}
                      {moment(exp.start_date).format("MMM YYYY")} -{" "}
                      {!exp.end_date
                        ? "Present"
                        : moment(exp.end_date).format("MMM YYYY")}
                    </li>
                    <p style={{ lineHeight: "14px", paddingRight: "2rem", margin:'0' }}>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore incidunt eum tenetur ea voluptas voluptatem nihil voluptatibus asperiores molestiae rem modi deleniti, mollitia molestias animi amet necessitatibus magnam assumenda voluptatum deserunt laborum veniam sed quos architecto? Fugit qui autem repudiandae officia, unde voluptatem ab. Tempora qui unde harum facere adipisci! Sapiente, porro explicabo molestiae dolorum dolor, unde exercitationem nostrum illum perspiciatis quasi doloribus officia quaerat, ad a tempore. Dolore eligendi a tempora eum possimus, quo officiis molestiae incidunt ratione asperiores eveniet ad placeat corrupti dolores sapiente quam laboriosam consectetur soluta illum quaerat consequuntur, magni earum autem ea. Pariatur, sit! Minus illo aperiam quam sapiente voluptas, architecto dolorum quidem voluptate aut veniam est cum placeat, minima asperiores. Eos est reprehenderit perspiciatis laboriosam, in temporibus facere commodi id quos natus eveniet porro, perferendis sapiente voluptatibus facilis dignissimos optio, quo repudiandae? Quae repellendus voluptate unde aperiam consequatur excepturi iste, odio, eveniet esse dolores cum quos sit officiis accusamus praesentium. Similique harum velit ducimus in, consectetur perspiciatis explicabo neque labore alias accusantium id. Quis, error deserunt adipisci laborum itaque reprehenderit iusto cupiditate. Tenetur nihil odio magni soluta obcaecati rem amet reprehenderit iusto cupiditate. Tenetur nihil odio magni soluta obcaecati rem amet reprehenderit iusto 
                    </p>
                    {/* <li>• &nbsp; Accomplishment or responsibility 1 Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>• &nbsp; Accomplishment or responsibility 2</li>
          <li>• &nbsp; Accomplishment or responsibility 3</li> */}
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Educations */}
          <div style={{ width: "100%", marginTop: "1rem" }}>
            <p
              style={{
                textTransform: "uppercase",
                fontSize: "16px",
            
                color: "#256BD3",
                fontWeight: "600",
                margin: 0,
              }}
            >
              Education
              <hr
                style={{
                  border: "1px solid #8F8F8F",
                  borderTop: "none",
                  height: "0px",
                  marginTop: "5px",
                }}
              />
            </p>
            {userInfo[0]?.education?.map((edu) => (
              <div
                style={{  color: "#292929" }}
                key={edu.id}
              >
                <div style={{padding:'7px 0 10px 0'}}>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      textTransform: "capitalize",
                      margin:'0'
                    }}
                  >
                    • &nbsp;{edu.degree}
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#5F5F5F",
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
                      padding: "10px 0 10px 13px",
                      color: "#5F5F5F",
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
                      color: "#5F5F5F",
                    }}
                  >
                    Marks/Grade:&nbsp; {edu.marks_grade}{" "}
                    {edu.marks_type == "Percentage" ? "%" : ""}
                  </li>
                </div>
              </div>
            ))}
          </div>

          {/* Personal */}
          <div style={{ width: "100%", marginTop: "1rem" }}>
            <p
              style={{
                textTransform: "uppercase",
                fontSize: "16px",
            
                color: "#256BD3",
                fontWeight: "600",
                margin: 0,
              }}
            >
              Personal
              <hr
                style={{
                  border: "1px solid #8F8F8F",
                  borderTop: "none",
                  height: "0px",
                  marginTop: "5px",
                }}
              />
            </p>
            <div
              style={{
                display: "flex",
                padding: "0.5rem 0",
                lineHeight: "24px",
              }}
            >
              <div
                style={{ fontSize: "12px", width: "86px", fontWeight: "600"}}
              >
                <p style={{margin:'0'}}>DOB</p>
                <p style={{margin:'0'}}>Gender</p>
                <p style={{margin:'0'}}>Marital Status</p>
                <p style={{margin:'0'}}>Language</p>
              </div>
              <div style={{ fontSize: "12px", fontWeight: "400", margin:'0' }}>
                <p style={{margin:'0'}}>
                  :&nbsp;&nbsp;{" "}
                  {moment(userInfo[0]?.additional_info?.date_of_birth).format(
                    "MMM DD, YYYY"
                  )}
                </p>
                <p style={{margin:'0'}}>:&nbsp;&nbsp; {userInfo[0]?.additional_info?.gender}</p>
                <p style={{margin:'0'}}>:&nbsp;&nbsp; {userInfo[0]?.additional_info?.marital_status}</p>
                <p style={{margin:'0'}}>:&nbsp;&nbsp; {languageString}</p>
              </div>
            </div>
          </div>

          {/* Certificate */}

          <div style={{ width: "100%", marginTop: "1rem" }}>
            <p
              style={{
                textTransform: "uppercase",
                fontSize: "16px",
            
                color: "#256BD3",
                fontWeight: "600",
                margin: 0,
              }}
            >
              Certification
              <hr
                style={{
                  border: "1px solid #8F8F8F",
                  borderTop: "none",
                  height: "0px",
                  margin: "5px 0",
                }}
              />
            </p>
            {userInfo[0]?.certification?.map((certificate) => (
              <section key={certificate.id} style={{padding:'15px 0 5px 0'}}>
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      margin:'0',
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
                      fontSize: "11px",
                      
                      color: "#292929",
                    }}
                  >
                    <li
                      style={{
                        fontSize: "12px",
                        padding: "10px 0 0 0",
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
                        fontSize: "11px",
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

          <div style={{ width: "100%", margin: "1rem 0" }}>
            <p
              style={{
                textTransform: "uppercase",
                fontSize: "16px",
            
                color: "#256BD3",
                fontWeight: "600",
                margin: "10px 0",
              }}
            >
              Projects
              <hr
                style={{
                  border: "1px solid #8F8F8F",
                  borderTop: "none",
                  height: "0px",
                  marginTop: "5px",
                }}
              />
            </p>
            {userInfo[0]?.projects?.map((project) => (
              <section style={{}} key={project.id}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "10px",
                    textTransform: "capitalize",
                  }}
                  className="pageBreak"
                >
                  • &nbsp;{project.project_title}
                </p>
                <li
                  style={{
                    paddingLeft: "13px",
                    fontSize: "11px",
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

export default SecondTemplate;
