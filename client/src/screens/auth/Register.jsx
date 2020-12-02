import { useState, useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUser/CurrentUserContext";
import { registerUser } from "../../services/auth";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flexFlow: "wrap",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    padding: "20px",
    marginBottom: "20px",
  },

  title: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    fontSize: "36px",
    padding: "15px",
    marginTop: "10px",
    textShadow: "0.5px 4px 10px #999",
  },
  logo: {
    maxWidth: "100px",
    maxHeight: "100px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  registerButton: {
    margin: "20px auto",
    padding: "20px",
    color: "#62B5D9",
    fontSize: "28px",
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    textTransform: "capitalize",
  },
  login: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    fontSize: "26px",
    textDecoration: "none",
    color: "#000",
  },
  loginLink: {
    textDecoration: "none",
    color: "#62B5D9",
  },
  inputField: {
    marginBottom: "20px",
    width: "300px",
    marginLeft: "10px",
  },
  passwordField: {
    marginBottom: "20px",
    width: "300px",
  },
  lockIcon: {
    marginRight: "10px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
  },
});

export default function Register() {
  const classes = useStyles();
  const history = useHistory();

  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = async (registerData) => {
    const userData = await registerUser(registerData);
    setCurrentUser(userData);
    history.push("/");
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={classes.root}>
      <div className={classes.logoContainer}>
        <Typography className={classes.title}>Care</Typography>
        <img
          className={classes.logo}
          src="https://i.imgur.com/1QePclv.png"
          alt="logo"
        />
      </div>
      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister(formData);
        }}
      >
        <div className={classes.inputContainer}>
          <AccountCircleIcon />
          <TextField
            className={classes.inputField}
            type="text"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className={classes.inputContainer}>
          <EmailIcon />
          <TextField
            className={classes.inputField}
            type="text"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className={classes.inputContainer}>
          <LockIcon className={classes.lockIcon} />
          <FormControl>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              className={classes.passwordField}
              name="password"
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <br />
        <Button type="submit" className={classes.registerButton}>
          Register
        </Button>
      </form>
      <Typography className={classes.login}>
        Already have an account? &nbsp;
        <Link className={classes.loginLink} to="/login">
          Login
        </Link>
      </Typography>
    </div>
  );
}
