import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, CircularProgress } from "@mui/material";
import MultipleChoiceQuestion from "./Components/MultipleChoiceQuestion";
import NumberOfQuestions from "./Components/NumberOfQuestions";
import WebCam from "./Components/WebCam";
import { useGetExamsQuery, useGetQuestionsQuery } from "../../slices/examApiSlice";
import { useSaveCheatingLogMutation } from "../../slices/cheatingLogApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useCheatingLog } from "../../context/CheatingLogContext.jsx";

const TestPage = () => {
  const { examId } = useParams();
  const [selectedExam, setSelectedExam] = useState(null);
  const [examDurationInSeconds, setExamDurationInSeconds] = useState(0);
  const { data: userExamdata, isLoading: isExamsLoading } = useGetExamsQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const { cheatingLog, updateCheatingLog, resetCheatingLog } = useCheatingLog();
  const [saveCheatingLogMutation] = useSaveCheatingLogMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMcqCompleted, setIsMcqCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const { data, isLoading } = useGetQuestionsQuery(examId);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (userExamdata) {
      const exam = userExamdata.find((exam) => exam.examId === examId);
      if (exam) {
        setSelectedExam(exam);
        setExamDurationInSeconds(exam.duration);
      }
    }
  }, [userExamdata, examId]);

  useEffect(() => {
    if (data) setQuestions(data);
  }, [data]);

  const handleMcqCompletion = () => {
    setIsMcqCompleted(true);
    resetCheatingLog(examId);
    navigate(`/exam/${examId}/codedetails`);
  };

  const handleTestSubmission = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const updatedLog = {
        ...cheatingLog,
        username: userInfo.name,
        email: userInfo.email,
        examId: examId,
        noFaceCount: parseInt(cheatingLog.noFaceCount) || 0,
        multipleFaceCount: parseInt(cheatingLog.multipleFaceCount) || 0,
        cellPhoneCount: parseInt(cheatingLog.cellPhoneCount) || 0,
        prohibitedObjectCount: parseInt(cheatingLog.prohibitedObjectCount) || 0,
      };

      await saveCheatingLogMutation(updatedLog).unwrap();
      toast.success("Test submitted successfully!");
      navigate("/Success");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save test logs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveUserTestScore = () => setScore(score + 1);

  if (isExamsLoading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {selectedExam?.examName || "Test Page"}
        </h1>

        <Grid container spacing={4}>
          {/* Left Section (Questions) */}
          <Grid item xs={12} md={7}>
            <Box className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <CircularProgress />
                </div>
              ) : (
                <MultipleChoiceQuestion
                  submitTest={isMcqCompleted ? handleTestSubmission : handleMcqCompletion}
                  questions={data}
                  saveUserTestScore={saveUserTestScore}
                />
              )}
            </Box>
          </Grid>

          {/* Right Section (Sidebar) */}
          <Grid item xs={12} md={5}>
            <Grid container spacing={4}>
              {/* Question Tracker */}
              <Grid item xs={12}>
                <Box className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 h-full">
                  <NumberOfQuestions
                    questionLength={questions.length}
                    submitTest={isMcqCompleted ? handleTestSubmission : handleMcqCompletion}
                    examDurationInSeconds={examDurationInSeconds}
                  />
                </Box>
              </Grid>

              {/* Webcam Monitor */}
              <Grid item xs={12}>
                <Box className="bg-white shadow-md rounded-2xl p-4 border border-gray-100 flex justify-center items-center">
                  <WebCam cheatingLog={cheatingLog} updateCheatingLog={updateCheatingLog} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TestPage;
