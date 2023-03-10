import React, { useContext } from "react";
import Button from "../components/Button";
import "../style/css/tabs/general.scss";
import { deleteUser } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { DeleteOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const General = () => {
  const { userAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const removeUser = async () => {
    deleteUser(userAuth)
      .then(async () => {
        // Remove characters from database
        const characters = await getDocs(
          collection(db, "users", userAuth.uid, "characters")
        );
        characters.forEach(async (character) => {
          await deleteDoc(
            doc(db, "users", userAuth.uid, "characters", character.id)
          );
        });

        // Remove user from database
        await deleteDoc(doc(db, "users", userAuth.uid));

        navigate("/");
      })
      .catch((error) => {
        setError(
          "You need to reauthenticate to delete your account. Please sign out and sign in again."
        );
      });
  };

  return (
    <div className="general-container">
      <div className="error-box">
        {error !== "" && (
          <>
            <span className="red">Error: </span> {" " + error}
          </>
        )}
      </div>
      <Button
        text="Delete Account"
        color="red"
        button_icon={<DeleteOutline fontSize="inherit" />}
        clickHandler={removeUser}
      />
    </div>
  );
};

export default General;
