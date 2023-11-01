import style from "./Login.module.css";
import LoginImage from "../../assets/images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let navigate = useNavigate();
  let { token, setToken } = useContext(UserContext);
  let [errorMsg, setErrorMsg] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  async function LogToPage(values) {
    setIsLoading(true);
    let { data } = await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signIn", values)
      .catch((err) => {
        console.log(err.response.data.msg);
        setErrorMsg(err.response.data.msg);
        setIsLoading(false);
      });
    console.log(data);
    setIsLoading(false);
    data.msg === "done" ? navigate("/home") : null;
    setErrorMsg(null);
    window.localStorage.setItem("token", `3b8ny__${data.token}`);
    setToken(data.token);
    console.log(token);
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required and  writen  as moh.eha@gmail.com")
      .email("Please enter valide email")
      .matches(
        /^\w{3,}.?\w{4,}?@(\w{3,}).(\w{3,})$/i,
        "email is required and  writen  as moh.eha@gmail.com"
      ),
    password: Yup.string()
      .required(
        "password is required and sould have from 6-10 number and capital &small litter"
      )
      .matches(
        /^\d{6,10}[A-Z]{1}[a-z]{1}$/i,
        "password must between 6-10 number and capital &small litter"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: LogToPage,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <section className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className={`${style.container} row`}>
          <figure className="col-md-8 m-0 p-md-0">
            <div className="image-container">
              <img src={LoginImage} className="w-100" alt="Regsiter Image" />
            </div>
          </figure>
          <form
            onSubmit={formik.handleSubmit}
            className="col-md-4 d-flex flex-column justify-content-center px-5"
          >
            <h2 className="m-0 fw-bold font-Montserrat">
              Welcome Back <i className="fa-solid fa-heart ms-0 text-main"></i>
            </h2>
            <p className="mb-3">
              Thanks for returning! Please sign in to access your account.
            </p>
            <div className="form-group d-flex flex-column gap-2 justify-content-center">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                id="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className="alert alert-danger">{formik.errors.email}</div>
              ) : null}

              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                id="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className="alert alert-danger">
                  {formik.errors.password}
                </div>
              ) : null}

              {errorMsg ? (
                <div className="alert alert-danger">{errorMsg}</div>
              ) : null}
              <button type="submit" className="btn btn-main">
                {isLoading ? (
                  <i disabled className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Login"
                )}
              </button>
              <p>
                You don't have account yet ?
                <Link to="/signup" className="text-decoration-underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
