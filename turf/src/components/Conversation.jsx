import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Conversation = ({ conversation, currentUser, isAdmin }) => {
  const [profiles, setProfiles] = useState(null);

  // console.log('iiiiiii',isAdmin)

  useEffect(() => {
    const chatUser = conversation?.members?.find((a) => a !== currentUser);

    const getProfiles = async () => {
      const res = await axios.get(`http://localhost:4001/users/${chatUser}`);
      setProfiles(res?.data[0]);
    };
    if (isAdmin) {
      setProfiles([isAdmin]);
    } else if (isAdmin == null) {
      getProfiles();
    }
  }, []);

  const firstLetter = profiles?.name?.split("")[0];
  // console.log("ppppp", profiles);
  return (
    <div>
      {profiles && (
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
        >
          <Avatar src={isAdmin ? profiles[0]?.userImg : ""}>
            {firstLetter}
          </Avatar>
          <div style={{ flex: "1" }}>
            <p style={{ fontSize: "19px" }}>
              {isAdmin ? profiles[0]?.name : profiles?.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
