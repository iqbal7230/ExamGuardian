import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import AddQuestionForm from "./components/AddQuestionForm";

const AddQuestions = () => {
  return (
    <Box sx={{ p: 3, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Page Header */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Add Questions
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Create and manage exam questions easily
      </Typography>

      {/* Card / Container */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Question Form
        </Typography>
        <AddQuestionForm />
      </Paper>
    </Box>
  );
};

export default AddQuestions;
