import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../reducers/bookmarks";
// 0) On importe la fonction du reducer
import { addHiddenArticles } from "../reducers/hiddenArticles";
import Image from "next/image";
import styles from "../styles/Article.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// On récupère une nouvelle icone
import { faBookmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Article(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const hiddenArticle = useSelector((state) => state.hiddenArticles.value);

  const handleBookmarkClick = () => {
    console.log("clic");
    if (!user.token) {
      return;
    }

    fetch(`https://mynews-backend.vercel.app/users/canBookmark/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(props.isBookmarked);
        if (data.result && data.canBookmark) {
          if (props.isBookmarked) {
            dispatch(removeBookmark(props));
          } else {
            dispatch(addBookmark(props));
          }
        }
      });
  };

  let iconStyle = {};
  if (props.isBookmarked) {
    iconStyle = { color: "#E9BE59" };
  }

  // 1) On créé une fonction qui utilise celle du reducer (NE PAS OUBLIER DE PASSER LES => PROPS !!!)
  const handleHiddenArticleClick = () => {
    dispatch(addHiddenArticles(props));
  };

  return (
    <div className={styles.articles}>
      <div className={styles.articleHeader}>
        <h3>{props.title}</h3>
        <FontAwesomeIcon
          onClick={() => handleBookmarkClick()}
          icon={faBookmark}
          style={iconStyle}
          className={styles.bookmarkIcon}
        />
        <FontAwesomeIcon
        // 3) On appelle la fonction handleHidenArticleClick au clic
          onClick={() => handleHiddenArticleClick()}
          icon={faEyeSlash}
          className={styles.bookmarkIcon}
        />
      </div>
      <h4 style={{ textAlign: "right" }}>- {props.author}</h4>
      <div className={styles.divider}></div>
      <Image
        src={props.urlToImage}
        alt={props.title}
        width={600}
        height={314}
      />
      <p>{props.description}</p>
    </div>
  );
}

export default Article;
