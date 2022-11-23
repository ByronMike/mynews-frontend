import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Article from "./Article";
import TopArticle from "./TopArticle";
import styles from "../styles/Home.module.css";

function Home() {
  const bookmarks = useSelector((state) => state.bookmarks.value);
  // 1) Créer une constante hiddenArticles pour manipuler les valeurs de l'état hiddenArticles
  const hiddenArticles = useSelector((state) => state.hiddenArticles.value);

  const [articlesData, setArticlesData] = useState([]);
  const [topArticle, setTopArticle] = useState({});

  useEffect(() => {
    fetch("https://mynews-backend.vercel.app/articles")
      .then((response) => response.json())
      .then((data) => {
        setTopArticle(data.articles[0]);
        setArticlesData(data.articles.filter((data, i) => i > 0));
      });
  }, []);

  // 2) On map les articles LORSQU' ils ne sont PAS dans le local storage
  const articles = articlesData.map((data, i) => {
    if (!hiddenArticles.some((e) => e.title === data.title)) {
      const isBookmarked = bookmarks.some(
        (bookmark) => bookmark.title === data.title
      );
      return <Article key={i} {...data} isBookmarked={isBookmarked} />;
    }
  });

  let topArticles;
  if (bookmarks.some((bookmark) => bookmark.title === topArticle.title)) {
    topArticles = <TopArticle {...topArticle} isBookmarked={true} />;
  } else {
    topArticles = <TopArticle {...topArticle} isBookmarked={false} />;
  }

  return (
    <div>
      <Head>
        <title>Morning News - Home</title>
      </Head>
      {topArticles}
      <div className={styles.articlesContainer}>{articles}</div>
    </div>
  );
}

export default Home;
