import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Conversation from "./Conversation";
import moment from "moment";
import SendIcon from "@mui/icons-material/Send";
import { format } from "timeago.js";
import Logo from "../images/playspots.png";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Picker from "@emoji-mart/react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import data from "@emoji-mart/data";
import { ToastContainer, toast } from "react-toastify";
import { io } from "socket.io-client";

const Chats = () => {
  const user = JSON.parse(localStorage.getItem("userProfile"));
  const [conversations, setConversations] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  const [newConvo, setNewConvo] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [isEmoji, setIsEmoji] = useState(false);
  const [convo, setconvo] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [admin, setAdmin] = useState(null);
  const messageRef = useRef();
  const inputRef = useRef(null);
  const socket = useRef();
  const [showArrow, setShowArrow] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [optionId, setoptionId] = useState(null);
  const [selectedEmojis, setSelectedEmojis] = useState([]);

  const handleEmojiSelect = (emoji) => {
    setSelectedEmojis([...selectedEmojis, emoji.native]);
    setNewConvo((prevConvo) => prevConvo + emoji.native);
  };

  useEffect(() => {
    socket.current = io(`ws://localhost:8900`);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setconvo((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket?.current.emit("addUser", user.id);
  }, [user]);

  // console.log(socket);

  // const fetchProfiles = async()=>{
  //     const res = await axios.get('http://localhost:4001/profile')
  //     setProfiles(res?.data)
  // }

  // useEffect(()=>{
  //   fetchProfiles();
  // },[])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4001/conversation/" + user?.id
        );
        setConversations(res?.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getAdmin = async () => {
      const res = await axios.get(`http://localhost:4001/admin/`);
      setAdmin(res?.data[0]);
    };

    if (!user?.admin) {
      getAdmin();
    }
    getConversations();
  }, [user?.id]);

  useEffect(() => {
    const getChats = async () => {
      const res = await axios.get(
        `http://localhost:4001/chats/${currentChat?._id}`
      );
      setconvo(res?.data);
    };

    getChats();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const message = {
      sender: user?.id,
      text: newConvo,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat.members.find((member) => member !== user.id);

    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newConvo,
    });

    try {
      const res = await axios.post("http://localhost:4001/chats", message);
      setconvo([...convo, res?.data]);
      setNewConvo("");
      setSelectedEmojis([]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChatAdmin = async () => {
    const body = {
      senderId: user?.id,
      receiverId: admin?._id,
    };

    try {
      if (!user?.admin) {
        const res = await axios.post(
          "http://localhost:4001/conversation/",
          body
        );
        setConversations([res?.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateChat = async (userId) => {
    const body = {
      senderId: user?.id,
      receiverId: userId,
    };

    try {
      const res = await axios.post("http://localhost:4001/conversation/", body);
      setConversations([...conversations, res?.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteChat = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:4001/chats/${id}`);
      const convo_arr = convo;
      const index = convo_arr.findIndex((award) => award._id === id);
      convo_arr.splice(index, 1);
      setconvo([...convo]);
      toast("Message Deleted", {
        type: "success",
        position: "bottom-right",
      });
    } catch (error) {
      toast(error);
    }
  };

  useEffect(() => {
    const getProfiles = async () => {
      const res = await axios.get(`http://localhost:4001/users`);
      setProfiles(res?.data);
    };
    getProfiles();
  }, []);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [convo]);

  useEffect(() => {
    if (showOptions === false) {
      setoptionId(null);
    }
  }, [optionId]);

  const filteredProfiles = profiles?.filter((profile) => {
    return !conversations?.some((conv) => conv.members.includes(profile._id));
  });

  const selectedProfile = profiles.filter((profile) => {
    return currentChat?.members.includes(profile._id);
  });

  console.log(selectedProfile, "selectedddddddddd");

  console.log("cconnvoooo", currentChat);

  return (
    <div style={{ background: "lightgray" }}>
      <ToastContainer />
      <div style={{ background: "white", display: "flex" }}>
        <div style={{ flexBasis: "25%", height: "90vh" }}>
          {/* Users */}
          {!user?.admin && !admin ? (
            <div>
              <button onClick={handleChatAdmin}>Chat With Admin</button>
            </div>
          ) : (
            ""
          )}
          {!user?.admin && (
            <p
              style={{
                textAlign: "center",
                fontFamily: "inherit",
                fontSize: "17px",
                background: "lightgray",
                padding: "10px 0",
                color: "white",
              }}
            >
              You can only chat with the Admin
            </p>
          )}
          {conversations &&
            conversations?.map((c) => (
              <div onClick={() => setcurrentChat(c)}>
                <Conversation
                  conversation={c}
                  currentUser={user?.id}
                  isAdmin={admin}
                />
              </div>
            ))}
          {user?.admin ? (
            <>
              <p
                style={{
                  fontFamily: "inherit",
                  fontSize: "19px",
                  paddingLeft: "10px",
                }}
              >
                Create Conversation with fellow Users
              </p>
              {filteredProfiles?.map((pro) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "0 10px",
                    borderRadius: "3px",
                    padding: "10px 5px",
                    gap: "20px",
                    borderBottom: "1px solid lightgray",
                    cursor: "pointer",
                  }}
                  className="chat_profile"
                  onClick={() => handleCreateChat(pro._id)}
                >
                  <Avatar>{pro.name[0]}</Avatar>
                  <div style={{ flex: "1" }}>
                    <p style={{ fontSize: "19px" }}>{pro?.name}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            ""
          )}
        </div>
        <div style={{ flexBasis: "75%", height: "90vh" }}>
          {/* Chats */}
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div
                  style={{ padding: "0 2rem" }}
                  className="chatBoxTop chats-background"
                  onClick={() => setIsEmoji(false)}
                >
                  {convo &&
                    convo?.map((chat, i) => (
                      <div
                        className={
                          chat.sender === user?.id ? "message own" : "message"
                        }
                      >
                        <div className="messageTop" ref={messageRef}>
                          <p
                            className="messageText"
                            onMouseEnter={() => setShowArrow(i)}
                            onMouseLeave={() => setShowArrow(null)}
                          >
                            {chat.text}
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: "500",
                                width: "90px",
                                marginLeft: "15px",
                              }}
                            >
                              {moment(chat.createdAt).format("HH:mm A")}
                            </span>
                            {showArrow === i && (
                              <span
                                style={{
                                  position: "absolute",
                                  transition: "0.3s",
                                  right: "1px",
                                  top: "0",
                                  cursor: "pointer",
                                }}
                              >
                                <KeyboardArrowDownIcon
                                  onClick={() => {
                                    setShowOptions((prev) => !prev);
                                    setoptionId(i);
                                  }}
                                />
                              </span>
                            )}
                            {showOptions && optionId == i ? (
                              <span
                                className="messageOptions"
                                style={{
                                  position: "absolute",
                                  background: "white",
                                  color: "gray",
                                  right: "0px",
                                  top: "43px",
                                  zIndex: "1111",
                                  width: "150px",
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                }}
                              >
                                {/* <p >Edit</p> */}
                                {chat.sender === user?.id ? (
                                  <>
                                    <p
                                      style={{
                                        margin: "0",
                                        padding: "5px",
                                        fontSize: "16px",
                                      }}
                                      onClick={(e) =>
                                        handleDeleteChat(e, chat._id)
                                      }
                                      className="message-opt"
                                    >
                                      Delete Message
                                    </p>
                                    <p
                                      style={{
                                        margin: "0",
                                        padding: "5px",
                                        fontSize: "16px",
                                      }}
                                      className="message-opt"
                                    >
                                      {" "}
                                      Edit Message
                                    </p>
                                  </>
                                ) : (
                                  ""
                                )}
                              </span>
                            ) : (
                              ""
                            )}
                          </p>
                          <p className="messageBottom"></p>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="chatBoxBottom">
                  <button
                    style={{
                      border: "none",
                      margin: "0",
                      padding: "0",
                      cursor: "pointer",
                    }}
                    onClick={() => setIsEmoji(!isEmoji)}
                  >
                    <SentimentSatisfiedAltIcon
                      style={{
                        fontSize: "36px",
                        color: "gray",
                        marginLeft: "20px",
                      }}
                    />
                  </button>
                  <div
                    style={{
                      display: isEmoji ? "block" : "none",
                      position: isEmoji ? "absolute" : "",
                      top: "320px",
                    }}
                  >
                    <Picker
                      data={data}
                      previewPosition="none"
                      onEmojiSelect={handleEmojiSelect}
                    />
                  </div>

                  <input
                    type="text"
                    className="chatMessageInput"
                    placeholder="Type a message..."
                    onChange={(e) => setNewConvo(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit(e);
                      }
                    }}
                    value={newConvo}
                  />
                  {newConvo !== "" ? (
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      <SendIcon style={{ fontSize: "35px", color: "gray" }} />
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              <div
                style={{
                  background: "#f0f2f5",
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <img src={Logo} width="500px" />
                  <h1
                    style={{
                      fontFamily: "inherit",
                      fontSize: "44px",
                      fontWeight: "200",
                      color: "#41525d",
                      margin: "15px 0",
                      letterSpacing: "1px",
                    }}
                  >
                    {" "}
                    PlaySpots Web
                  </h1>
                  <p
                    style={{
                      fontFamily: "inherit",
                      color: "#41525d",
                      margin: "0",
                    }}
                  >
                    Send and receive messages without keeping your phone online
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: "inherit",
                    color: "#41525d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    position: "absolute",
                    bottom: "50px",
                  }}
                >
                  <LockPersonIcon /> End-to-end encrypted
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
