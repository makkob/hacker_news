import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import styles from "./Newspage.module.css";
import Comments from "../Comments/Comments";
import { Button } from "react-bootstrap";
import { kidsList } from "../../actions/kidsListActions";

export default function Newspage(props) {
  const dispatch = useDispatch();
  const [itemState, onSetItem] = useState();

  const newsState = useSelector((state) => state.newsListState);
  const { news } = newsState;
  const kidsState = useSelector((state) => state.kidsListState);
  const { kids: coments } = kidsState;

  useEffect(() => {
    const item = news.filter(({ id }) => {
      return id == props.match.params.id;
    });

    onSetItem(...item);

    const { kids } = item[0];

    dispatch(kidsList(kids));
    const updateInterval = setInterval(() => {
      dispatch(kidsList(kids));
    }, 60000);
    return () => clearInterval(updateInterval);
  }, []);

  const onUpdateComments = () => {
    const item = news.filter(({ id }) => {
      return id == props.match.params.id;
    });

    onSetItem(...item);

    const { kids } = item[0];
    if (kids) {
      dispatch(kidsList(kids));
    }
  };

  return (
    <>
      <div className={styles.nav}>
        <Link to="/">
          <Button variant="secondary"> Back </Button>
        </Link>
      </div>

      {itemState && (
        <div className={styles.item}>
          <h2>{itemState.title}</h2>
          <a target="_blank" href={itemState.url}>
            Source
          </a>
          <hr />
          <p>
            <strong>Author: </strong> <i> {itemState.by}</i>
          </p>
          <p>
            <strong>Published at:</strong>{" "}
            <i>{new Date(itemState.time * 1000).toString()}</i>
          </p>
          <p>
            <FontAwesomeIcon icon={faComment} /> Comments:{" "}
            {itemState.kids ? itemState.kids.length : 0}
          </p>
        </div>
      )}

      <h2>Replies </h2>

      {coments
        ? coments.map(({ data }) => {
            return (
              <div key={data.id} className={styles.comment} id={data.id}>
                <Comments props={data} />
              </div>
            );
          })
        : "Comments section is empty"}
      <div className={styles.button}>
        <Button
          onClick={() => {
            onUpdateComments();
          }}
          variant="secondary"
        >
          {" "}
          Update comments{" "}
        </Button>
      </div>
    </>
  );
}
