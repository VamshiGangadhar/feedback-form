import React, { useState } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import top from "../images/top.png";
import html2pdf from "html2pdf.js";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const FeedbackForm = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    registeredNumber: "",
    dob: "",
    fatherName: "",
    fatherProfession: "",
    fatherMobile: "",
    fatherEmail: "",
    address: "",
    feedback: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const docRef = await addDoc(
        collection(db, "feedback-form-data"),
        formData
      );
      console.log("Document written with ID: ", docRef.id);
      setOpen(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveAsPDF = () => {
    const element = document.getElementById("pageToSave");
    html2pdf()
      .set({ html2canvas: { scale: 2 } })
      .from(element)
      .save();
  };

  return (
    <Box>
      <form
        style={{ textAlign: "center", width: "70%", margin: "auto" }}
        id="pageToSave"
        onSubmit={handleSubmit}
      >
        <img width={"100%"} src={top} alt="top-image" />
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="registeredNumber"
          label="Registered Number"
          value={formData.registeredNumber}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="dob"
          label="Date of Birth"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          required
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <br />
        <TextField
          name="fatherName"
          label="Father's Name"
          value={formData.fatherName}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="fatherProfession"
          label="Father's Profession"
          value={formData.fatherProfession}
          onChange={handleChange}
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="fatherMobile"
          label="Father's Mobile Number"
          value={formData.fatherMobile}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="fatherEmail"
          label="Father's Email"
          type="email"
          value={formData.fatherEmail}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="address"
          label="Permanent Address"
          multiline
          rows={4}
          value={formData.address}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="feedback"
          label="Feedback"
          multiline
          rows={4}
          value={formData.feedback}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Form successfully Submitted!
            </Alert>
          </Snackbar>
          <br />
          <br />
          <Button variant="contained" onClick={handlePrint}>
            Print
          </Button>
          <br />
          <br />
          <Button variant="contained" onClick={handleSaveAsPDF}>
            Save as PDF
          </Button>
          <br />
          <br />
          <Button variant="contained" LinkComponent={Link} to="/data">
            Data
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FeedbackForm;
