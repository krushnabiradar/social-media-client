import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IconButton, Typography } from "@mui/material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteMessage } from "redux/actions/actionChats";
import { showImage, showVideo } from "utils/media";
import styles from "./styles.module.css";
function DisplayMessage({ user, message, myMessage, messages, auth }) {
  // Styles
  const styledMedia = {
    display: "block",
    objectFit: "cover",
    width: "100%",
    borderRadius: "30px",
  };

  // Sattes And Functions
  const dispatch = useDispatch();
  // handle Delete Message
  const handleDeleteMessage = () => {
    if (!messages) return;
    if (window.confirm("Do you want to delete this message"))
      dispatch(deleteMessage({ messages, message, auth }));
  };

  return (
    <>
      <div className={styles.messageContent} display="flex" alignItems="center">
        {user._id === auth.user._id && (
          <IconButton
            onClick={handleDeleteMessage}
            className={styles.remove_button}
          >
            <DeleteOutlineOutlinedIcon style={{ color: "var(--iconColor)" }} />
          </IconButton>
        )}
        {message.media.map((imageOrVideo, idx) => (
          <div key={idx}>
            {imageOrVideo.secure_url.match(/video/i)
              ? showVideo(imageOrVideo.secure_url, styledMedia)
              : showImage(imageOrVideo.secure_url, styledMedia)}
          </div>
        ))}

        {message.messageText && (
          <div
            border="1px solid var(--lineColor)"
            margin="6px 10px 0px"
            minHeight="44px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding="10px 0"
            borderRadius="30px"
            minWidth="100px"
            sx={
              myMessage
                ? { backgroundColor: "var(--activeColor)" }
                : { backgroundColor: "var(--secondColor)" }
            }
          >
            <Typography
              variant="h6"
              fontSize="16px"
              fontWeight="500"
              padding="10px"
              sx={{ wordbreak: "break-all" }}
            >
              {message.messageText}
            </Typography>
          </div>
        )}
      </div>

      <div margin="0 20px">
        <Typography variant="h6" fontSize="10px">
          {moment(message.createdAt).fromNow()}
        </Typography>
      </div>
    </>
  );
}

export default DisplayMessage;
