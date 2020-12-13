import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../components/Context/CurrentUserContext";
import { DarkModeContext } from "../../../components/Context/DarkModeContext";
import { registerUser } from "../../../services/auth";
import { Link, useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
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
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import { toTitleCase } from "../../../utils/toTitleCase";
import TextField from "@material-ui/core/TextField";
import { getAge } from "../../../utils/getAge";
import { useStyles } from "./registerStyles";

export default function Register() {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode] = useContext(DarkModeContext);
  const classes = useStyles({ darkMode });
  const history = useHistory();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = async (registerData) => {
    registerData.email = registerData.email.toLowerCase();
    const userData = await registerUser(registerData);
    setCurrentUser(userData);
    history.push("/");
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    birthday: "",
    gender: "",
    passwordConfirm: "",
  });
  const { name, email, password, birthday, gender, passwordConfirm } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return alert("Password and password confirmation do not match!");
    }
    handleRegister(formData);
  };
  return (
    <div className={darkMode === "light" ? classes.root : classes.rootDark}>
      <div className={classes.logoContainer}>
        <Typography
          className={darkMode === "light" ? classes.title : classes.titleDark}
        >
          Care
        </Typography>
        <img
          className={classes.logo}
          src="https://i.imgur.com/1QePclv.png"
          alt="logo"
        />
      </div>
      {currentUser && (
        <Typography
          className={darkMode === "light" ? classes.user : classes.userDark}
        >
          You already have an account, is this you?
          <br />
          Name: {currentUser?.name}
          <br />
          Email: {currentUser?.email}
          <br />
          Age: {getAge(currentUser?.birthday)}
          <br />
          Gender: {currentUser?.gender}
        </Typography>
      )}
      <form className={classes.form} onSubmit={handleSubmit}>
        <div
          className={
            darkMode === "light"
              ? classes.inputContainer
              : classes.inputContainerDark
          }
        >
          <AccountCircleIcon />
          <FormControl>
            <InputLabel
              className={
                darkMode === "light" ? classes.label : classes.darkLabel
              }
              htmlFor="name"
            >
              Name
            </InputLabel>
            <Input
              className={
                darkMode === "light"
                  ? classes.inputField
                  : classes.inputFieldDark
              }
              type="text"
              inputProps={{ maxLength: 20 }}
              name="name"
              value={name}
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <br />
        <div
          className={
            darkMode === "light"
              ? classes.inputContainer
              : classes.inputContainerDark
          }
        >
          <EmailIcon />
          <FormControl>
            <InputLabel
              className={
                darkMode === "light" ? classes.label : classes.darkLabel
              }
              htmlFor="email"
            >
              Email Address
            </InputLabel>
            <Input
              id="email"
              type="text"
              className={
                darkMode === "light"
                  ? classes.inputField
                  : classes.inputFieldDark
              }
              name="email"
              value={email}
              onChange={handleChange}
            />
          </FormControl>
        </div>
        <br />
        <div
          className={
            darkMode === "light"
              ? classes.inputContainer
              : classes.inputContainerDark
          }
        >
          <LockIcon className={classes.lockIcon} />
          <FormControl>
            <InputLabel
              className={
                darkMode === "light"
                  ? classes.passwordLabel
                  : classes.darkPasswordLabel
              }
              htmlFor="password"
            >
              Password
            </InputLabel>
            <Input
              className={
                darkMode === "light"
                  ? classes.passwordField
                  : classes.passwordFieldDark
              }
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? (
                      <Visibility
                        style={
                          darkMode === "dark"
                            ? { color: "#fff" }
                            : { color: "#000" }
                        }
                      />
                    ) : (
                      <VisibilityOff
                        style={
                          darkMode === "dark"
                            ? { color: "#fff" }
                            : { color: "#000" }
                        }
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <br />
        <div
          className={
            darkMode === "light"
              ? classes.inputContainer
              : classes.inputContainerDark
          }
        >
          <LockIcon className={classes.lockIcon} />
          <FormControl>
            <InputLabel
              className={
                darkMode === "light"
                  ? classes.passwordLabel
                  : classes.darkPasswordLabel
              }
              htmlFor="passwordConfirm"
            >
              Confirm Password
            </InputLabel>
            <Input
              className={
                darkMode === "light"
                  ? classes.passwordField
                  : classes.passwordFieldDark
              }
              name="passwordConfirm"
              id="passwordConfirm"
              type={showPassword ? "text" : "password"}
              value={passwordConfirm}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? (
                      <Visibility
                        style={
                          darkMode === "dark"
                            ? { color: "#fff" }
                            : { color: "#000" }
                        }
                      />
                    ) : (
                      <VisibilityOff
                        style={
                          darkMode === "dark"
                            ? { color: "#fff" }
                            : { color: "#000" }
                        }
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <br />
        <div
          className={
            darkMode === "light"
              ? classes.inputContainer
              : classes.inputContainerDark
          }
        >
          <TextField
            id="date"
            required
            label="Date of Birth"
            type="date"
            className={
              darkMode === "light" ? classes.inputField : classes.inputFieldDark
            }
            name="birthday"
            InputLabelProps={{
              shrink: true,
            }}
            value={birthday}
            onChange={handleChange}
          />
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormHelperText style={{ marginLeft: "-20px" }}>
            What's your gender?
          </FormHelperText>
          <FormControl>
            <NativeSelect
              native
              required
              label="gender"
              value={toTitleCase(gender)}
              onChange={handleChange}
              inputProps={{
                name: "gender",
                id: "gender-native-simple",
              }}
            >
              <option value="" selected disabled hidden>
                Select a gender
              </option>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
              <option value={"Transgender"}>Transgender</option>
              <option value={"Non-binray"}>Non-Binary </option>
              <option value={"Other"}>Other</option>
            </NativeSelect>
          </FormControl>
        </div>
        <br />
        <Button
          type="submit"
          className={
            darkMode === "light"
              ? classes.registerButton
              : classes.registerButtonDark
          }
        >
          Register
        </Button>
      </form>
      <Typography
        className={darkMode === "light" ? classes.login : classes.loginDark}
      >
        Already have an account? &nbsp;
        <Link
          className={
            darkMode === "light" ? classes.loginLink : classes.loginLinkDark
          }
          to="/login"
        >
          Login
        </Link>
      </Typography>
    </div>
  );
}
