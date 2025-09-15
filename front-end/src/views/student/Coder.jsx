import React, { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import axiosInstance from "../../axios";
import Webcam from "../student/Components/WebCam";
import {
  Button,
  Box,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useSaveCheatingLogMutation } from "../../slices/cheatingLogApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { useCheatingLog } from "../../context/CheatingLogContext";

export default function Coder() {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [questionId, setQuestionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState(null);

  const { examId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { cheatingLog, updateCheatingLog } = useCheatingLog();
  const [saveCheatingLogMutation] = useSaveCheatingLogMutation();

  useEffect(() => {
    if (userInfo) {
      updateCheatingLog((prev) => ({
        ...prev,
        username: userInfo.name,
        email: userInfo.email,
      }));
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchCodingQuestion = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/api/coding/questions/exam/${examId}`,
          { withCredentials: true }
        );

        if (response.data.success && response.data.data) {
          setQuestionId(response.data.data._id);
          setQuestion(response.data.data);

          if (response.data.data.description) {
            setCode(
              `// ${response.data.data.description}\n\n// Write your code here...`
            );
          }
        } else {
          toast.error(
            "No coding question found for this exam. Please contact your teacher."
          );
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load coding question");
      } finally {
        setIsLoading(false);
      }
    };

    if (examId) fetchCodingQuestion();
  }, [examId]);

  const runCode = async () => {
    let apiUrl;
    switch (language) {
      case "python":
        apiUrl = "/run-python";
        break;
      case "java":
        apiUrl = "/run-java";
        break;
      case "javascript":
        apiUrl = "/run-javascript";
        break;
      default:
        return;
    }

    try {
      const response = await axiosInstance.post(apiUrl, { code }, { withCredentials: true });
      setOutput(response.data);
    } catch {
      setOutput("Error running code.");
    }
  };

  const handleSubmit = async () => {
    if (!questionId) {
      toast.error("Question not loaded properly. Please try again.");
      return;
    }

    try {
      const codeSubmissionData = { code, language, questionId };
      const response = await axiosInstance.post(
        "/api/coding/submit",
        codeSubmissionData,
        { withCredentials: true }
      );

      if (response.data.success) {
        try {
          const updatedLog = {
            ...cheatingLog,
            username: userInfo.name,
            email: userInfo.email,
            examId: examId,
            noFaceCount: parseInt(cheatingLog.noFaceCount) || 0,
            multipleFaceCount: parseInt(cheatingLog.multipleFaceCount) || 0,
            cellPhoneCount: parseInt(cheatingLog.cellPhoneCount) || 0,
            prohibitedObjectCount: parseInt(cheatingLog.prohibitedObjectCount) || 0,
            screenshots: cheatingLog.screenshots || [],
          };

          await saveCheatingLogMutation(updatedLog).unwrap();
          toast.success("Test submitted successfully!");
          navigate("/success");
        } catch {
          toast.error("Test submitted but failed to save monitoring logs");
          navigate("/success");
        }
      } else {
        toast.error("Failed to submit code");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit test");
    }
  };

  return (
    <Box className="p-4 md:p-6 h-screen flex flex-col bg-gray-50">
      {isLoading ? (
        <Box className="text-center p-6">Loading question...</Box>
      ) : !question ? (
        <Box className="text-center p-6">
          No coding question found. Please contact your teacher.
        </Box>
      ) : (
        <Grid container spacing={3} className="flex-1 overflow-hidden">
          {/* Question header */}
          <Grid item xs={12}>
            <Paper className="p-4 shadow-md rounded-xl bg-white">
              <Typography variant="h6" className="font-bold mb-2">
                {question.question}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {question.description}
              </Typography>
            </Paper>
          </Grid>

          {/* Main Area */}
          <Grid item xs={12} className="flex flex-1 gap-2 overflow-hidden">
            {/* Code editor + output */}
            <Box className="flex flex-col flex-1">
              {/* Language select */}
              <Box className="mb-3 mt-1 ">
                <FormControl sx={{ minWidth: 100 }}>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={language}
                    label="Language"
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <MenuItem value="javascript">JavaScript</MenuItem>
                    <MenuItem value="python">Python</MenuItem>
                    <MenuItem value="java">Java</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Editor */}
              <Box className="flex-1 border rounded-lg overflow-hidden">
                <Editor
                  height="100%"
                  language={language}
                  value={code}
                  onChange={(value) => setCode(value)}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </Box>

              {/* Output */}
              <Paper className="mt-4 p-3 rounded-lg bg-gray-100 shadow-inner h-32 overflow-auto">
                <Typography variant="subtitle1" className="font-semibold mb-1">
                  Output:
                </Typography>
                <pre className="text-sm whitespace-pre-wrap">{output}</pre>
              </Paper>

              {/* Actions */}
              <Box className="mt-4 flex gap-3">
                <Button variant="contained" onClick={runCode} className="min-w-[120px]">
                  Run Code
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className="min-w-[120px]"
                >
                  Submit Test
                </Button>
              </Box>
            </Box>

            {/* Webcam */}
            <Box className="w-[150px] hidden md:block flex-shrink-0">
              <Paper className="h-full rounded-xl shadow-md overflow-hidden">
                <Webcam
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  cheatingLog={cheatingLog}
                  updateCheatingLog={updateCheatingLog}
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
