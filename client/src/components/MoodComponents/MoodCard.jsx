import React from "react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedSharpIcon from "@material-ui/icons/SentimentSatisfiedSharp";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import 'moment-timezone';

export default function MoodCard({ mood, updated, openOptions, handleDelete }) {
  return (
    <Card className="mood-card">
      <div className="mood-container">
        <div className="status">
          {mood.status === "Great" ? (
            <InsertEmoticonIcon
              style={{
                border: "1px solid black",
                background: "#00FF00",
                fontSize: "36px",
              }}
            />
          ) : mood.status === "Poor" ? (
            <SentimentVeryDissatisfiedIcon
              style={{
                border: "1px solid black",
                background: "red",
                fontSize: "36px",
              }}
            />
          ) : mood.status === "Okay" ? (
            <SentimentSatisfiedIcon
              style={{
                border: "1px solid black",
                background: "yellow",
                fontSize: "36px",
              }}
            />
          ) : mood.status === "Good" ? (
            <SentimentSatisfiedSharpIcon
              style={{
                border: "1px solid black",
                background: "#228B22",
                fontSize: "36px",
              }}
            />
          ) : (
            <></>
          )}
          <p>{mood.status}</p>
        </div>
        <div className="time">
          {!updated ? <Moment format="MMM/DD/yyyy hh:mm A">{mood.created_at}</Moment> : <Moment format="MMM/DD/yyyy hh:mm A">{mood.updated_at}</Moment>}
        </div>
        <div
          className="buttons"
          style={openOptions ? { display: "flex" } : { display: "none" }}
        >
          <Button
            component={Link}
            to={`/moods/${mood.id}/edit`}
            variant="contained"
            color="primary"
            className="edit-button"
          >
            <span role="img" aria-label="edit">
              🔧
            </span>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="delete-button"
            onClick={() => handleDelete(mood.id)}
          >
            <span role="img" aria-label="delete">
              🗑️
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
