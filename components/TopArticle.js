import styles from "../styles/Toparticle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";

function TopArticle(props) {
  const dispatch = useDispatch();

  const handlebBookmarkClick = () => {
    if (props.isBookmarked) {
      dispatch(removeBookmark(props));
    } else {
      dispatch(addBookmark(props));
    }
  };

  let iconStyle = {};
  if (props.isBookmarked) {
    iconStyle = { color: "#e9be59" };
  }

  return (
    <div className={styles.topContainer}>
      <img src={props.urlToImage} className={styles.image} alt={props.title} />
      <div className={styles.topText}>
        <h2 className={styles.topTitle}>{props.title}</h2>
        <FontAwesomeIcon
          onClick={() => handlebBookmarkClick()}
          icon={faBookmark}
          className={styles.bookmarkIcon}
		  style={iconStyle}
        />
        {/* <FontAwesomeIcon onClick={() => addBookmarksArticle({...props})} icon={faBookmark} className={styles.bookmarkIcon} /> */}
        <h4>{props.author}</h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default TopArticle;
