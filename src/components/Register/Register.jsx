import style from "./Register.module.css";
import regsiterImage from "../../assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Register() {
  let [errorMesage, setErrorMesage] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  async function LogUser(values) {
    setIsLoading(true);
    let { data } = await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
      .catch((err) => {
        console.log(err.response.data.msg);
        setErrorMesage(err.response.data.msg);
        setIsLoading(false);
      });
    console.log(data);
    setIsLoading(false);
    data.msg === "done" ? navigate("/login") : null;
    setErrorMsg(null);
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name shuld be grater than 3 char")
      .max(20, "name shuld be less than 20 char")
      .required("name is required"),
    password: Yup.string()
      .required(
        "password is required and sould have from 6-10 number and capital &small litter"
      )
      .matches(
        /^\d{6,10}[A-Z]{1}[a-z]{1}$/i,
        "password must between 6-10 number and capital &small litter"
      ),
    email: Yup.string()
      .required("email is required and  writen  as moh.eha@gmail.com")
      .email("Please enter valide email")
      .matches(
        /^\w{3,}.?\w{4,}?@(\w{3,}).(\w{3,})$/i,
        "email is required and  writen  as moh.eha@gmail.com"
      ),
    age: Yup.number()
      .required("Age is required")
      .min(12, "Must be at least 18 years old")
      .max(100, "Age cannot exceed 100"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(01(0|1|2|5))\d{8}$/, "enter egyption number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: LogUser,
  });
  return (
    <>
      <Helmet>
        <title>Register Page</title>
      </Helmet>
      <section className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className={`${style.container} row`}>
          <figure className="col-md-8 m-0 p-md-0">
            <div className="image-container">
              <img src={regsiterImage} className="w-100" alt="Regsiter Image" />
            </div>
          </figure>
          <form
            onSubmit={formik.handleSubmit}
            className="col-md-4 d-flex flex-column justify-content-center px-5"
          >
            <h2 className="m-0 fw-bold font-Montserrat">Create an account</h2>
            <p className="mb-3">Let's get started for free</p>
            <div className="form-group d-flex flex-column gap-2 justify-content-center">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="name"
                id="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className="alert alert-danger">{formik.errors.name}</div>
              ) : null}
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
              <input
                type="text"
                inputMode="numeric"
                className="form-control"
                placeholder="Age"
                name="age"
                id="age"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.age}
              />
              {formik.errors.age && formik.touched.age ? (
                <div className="alert alert-danger">{formik.errors.age}</div>
              ) : null}

              <input
                type="tel"
                inputMode="numeric"
                className="form-control"
                placeholder="phone"
                name="phone"
                id="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <div className="alert alert-danger">{formik.errors.phone}</div>
              ) : null}

              {errorMesage ? (
                <div className="alert alert-danger">{errorMesage}</div>
              ) : null}
              <button type="submit" className="btn btn-main">
                {isLoading ? (
                  <i disabled className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Create account"
                )}
              </button>
              <p>
                Already have account ?{" "}
                <Link to="/login" className="text-decoration-underline">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
