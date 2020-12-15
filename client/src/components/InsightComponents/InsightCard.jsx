import React, { useContext } from "react";
import Moment from "react-moment";
import "moment-timezone";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { useStateValue } from "../Context/CurrentUserContext";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/styles";
import { yellow, indigo, blue } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DeleteInsight from "../Modals/DeleteInsight";

function InsightCard({
  insight,
  handleDelete,
  handleOpen,
  handleClose,
  openDelete,
  onDelete,
  darkMode,
}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      margin: "20px auto",
      minWidth: "300px",
      width: "300px",
      minHeight: "240px",
      padding: "20px",
      borderRadius: 0,
      boxShadow:
        darkMode === "light" ? "default" : `-1px .5px 4px 2.5px ${indigo[50]}`,
      [theme.breakpoints.up("md")]: {
        minWidth: "350px",
        width: "350px",
        padding: "20px",
        margin: "20px",
      },
      [theme.breakpoints.up("lg")]: {
        minWidth: "500px",
        width: "500px",
        padding: "30px",
        margin: "20px",
      },
      [theme.breakpoints.up("xl")]: {
        minWidth: "550px",
        width: "550px",
        padding: "30px",
        margin: "20px",
      },
    },
    link: {
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      transition: "transform 250ms ease-in-out",
      "&:hover": {
        textDecoration: "underline",
        textDecorationColor: darkMode === "dark" ? yellow[700] : blue[600],
        transition: "transform 250ms ease-in-out",
        cursor: "pointer",
        transform: "scale(1.02)",
      },
    },

    title: {
      color: darkMode === "dark" ? yellow[700] : blue[600],
      fontWeight: "bold",
      fontSize: "24px",
    },
    userContainer: {
      display: "flex",
      padding: "10px 0 3px 0",
      alignItems: "center",
      transition: "transform 250ms ease-in-out",
      "&:hover": {
        transition: "transform 250ms ease-in-out",
        cursor: "pointer",
        transform: "scale(1.005)",
      },
    },
    userName: {
      color: darkMode === "dark" ? yellow[700] : blue[600],
      fontWeight: "bold",
      fontSize: "19px",
    },
    userIcon: {
      color: darkMode === "dark" ? yellow[700] : blue[600],
      marginRight: "8px",
    },
    buttons: {
      marginTop: "20px",
    },
    delete: {
      marginLeft: "20px",
    },
    date: {
      paddingTop: "5px",
      paddingBottom: "10px",
    },
  }));
  const [{ currentUser }] = useStateValue();
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <Link className={classes.link} to={`/insights/${insight?.id}`}>
          <Typography className={classes.title}>{insight?.title}</Typography>
        </Link>
        <div className={classes.userContainer}>
          <Link className={classes.link} to={`/users/${insight?.user?.id}`}>
            <AccountCircleIcon className={classes.userIcon} />
            <Typography className={classes.userName}>
              {insight?.user?.name ? insight?.user?.name : <>Anonymous</>}
            </Typography>
          </Link>
        </div>
        <>
          <Typography className={classes.date}>
            Created at:&nbsp;
            <Moment format="MMM-DD-yyyy hh:mm A">{insight?.created_at}</Moment>
          </Typography>
        </>
        <Typography>{insight?.description}</Typography>
        {insight?.user_id === currentUser?.id && (
          <>
            <div className={classes.buttons}>
              <Link to={`/insights/${insight.id}/edit`}>
                <Button variant="contained" color="primary">
                  Edit
                </Button>
              </Link>
              <Button
                className={classes.delete}
                variant="contained"
                color="secondary"
                onClick={() => handleOpen(insight.id)}
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </Card>
      <DeleteInsight
        insight={insight}
        openDelete={openDelete === insight.id}
        onDelete={onDelete}
        handleOpen={handleOpen}
        handleDelete={handleDelete}
        handleClose={handleClose}
      />
    </>
  );
}

export default InsightCard;
