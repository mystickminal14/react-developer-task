import React, { useContext, useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppContext } from "../../context/ContextApp";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Body is required"),
});

const DrawerList = ({ id, mode, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setRefreshData } = useContext(AppContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (id) {
        handleUpdate(values);
      } else {
        handleSave(values);
      }
    },
  });

  const handleUpdate = (values) => {
    setIsLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        toast.success("Post Successfully Updated");
        setIsLoading(false);
        formik.setValues({
          title: "",
          body: "",
          userId: "",
        });
        navigate("/");
        setRefreshData(true);
      })
      .catch((error) => {
        toast.error("Error updating record: " + error.message);
        setIsLoading(false);
      });
  };

  const handleSave = (values) => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        toast.success("Post Successfully Added");
        setIsLoading(false);
        formik.setValues({
          title: "",
          body: "",
          userId: "",
        });
        navigate("/");
        setRefreshData(true);
      })
      .catch((error) => {
        toast.error("Error saving record: " + error.message);
        setIsLoading(false);
      });
  };

  const setInitialData = () => {
    setIsLoading(true);
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((json) => {
          formik.setValues(json);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error("Error displaying record: " + err.message);
        });
    } else {
      formik.setValues({
        title: "",
        body: "",
        userId: "",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setInitialData();
  }, [id]);

  return (
    <div
      style={{ color: "white", height: "100%" }}
      className="flex p-5 justify-between flex-col"
    >
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>
        <h1 className="t-2xl">
          {id ? (mode === "view" ? "View Post" : "Edit Post") : "Add Post"}
        </h1>
      </div>
      <hr className="mt-3" />
      <form
        className="p-2 flex-1 flex flex-col"
        onSubmit={formik.handleSubmit}
        style={{ height: "100%" }}
      >
        <div>
          <TextField
            name="title"
            style={{color:'white'}}
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: { color: "#fff" },
              readOnly: mode === "view",
            }}
           
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            name="body"
            label="Body"
            multiline
            maxRows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            
            InputProps={{
              style: { color: "#fff" },
              readOnly: mode === "view",
            }}
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.body && Boolean(formik.errors.body)}
            helperText={formik.touched.body && formik.errors.body}
          />
        </div>
      </form>
      {mode !== "view" && (
        <Button
          onClick={formik.handleSubmit}
          variant="outlined"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          {id ? "Update" : "Submit"}
        </Button>
      )}
      <Button
        onClick={onClose}
        variant="outlined"
        color="error"
        style={{ marginTop: "16px" }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default DrawerList;
