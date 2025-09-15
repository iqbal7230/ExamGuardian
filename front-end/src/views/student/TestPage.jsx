import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, CircularProgress } from "@mui/material";
import PageContainer from "../../components/container/PageContainer";
import BlankCard from "../../components/shared/BlankCard";
import MultipleChoiceQuestion from "./Components/MultipleChoiceQuestion";
import NumberOfQuestions from "./Components/NumberOfQuestions";
import WebCam from "./Components/WebCam";
import { useGetExamsQuery, useGetQuestionsQuery } from "../../slices/examApiSlice";
import { useSaveCheatingLogMutation } from "../../slices/cheatingLogApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useCheatingLog } from "../../context/CheatingLogContext";

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

  useEffect(() => {
    if (userExamdata) {
      const exam = userExamdata.find((exam) => exam.examId === examId);
      if (exam) {
        setSelectedExam(exam);
        setExamDurationInSeconds(exam.duration);
      }
    }
  }, [userExamdata, examId]);

  const [questions, setQuestions] = useState([]);
  const { data, isLoading } = useGetQuestionsQuery(examId);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
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
      toast.error(
        error?.data?.message || error?.message || "Failed to save test logs. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveUserTestScore = () => {
    setScore(score + 1);
  };

  if (isExamsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PageContainer title="Exam Page" description="MCQ Test Interface">
      <Box className="pt-6 px-3 md:px-8">
        <Grid container spacing={4}>
          {/* Left Half: Questions */}
          <Grid item xs={12} md={8}>
            <BlankCard>
              <Box className=" w-svh p-6 bg-white rounded-2xl shadow-md min-h-[70vh] flex flex-col">
                {isLoading ? (
                  <Box className="flex justify-center items-center h-full">
                    <CircularProgress />
                  </Box>
                ) : (
                  <MultipleChoiceQuestion
                    submitTest={isMcqCompleted ? handleTestSubmission : handleMcqCompletion}
                    questions={data}
                    saveUserTestScore={saveUserTestScore}
                  />
                )}
              </Box>
            </BlankCard>
          </Grid>

          {/* Right Half: Sidebar (Questions count + Camera) */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={4} direction="column">
              {/* Questions/Timer */}
              <Grid item>
                <BlankCard>
                  <Box className="w-full p-2 rounded-2xl bg-gradient-to-r 0  shadow-md">
                    <NumberOfQuestions
                      questionLength={questions.length}
                      submitTest={isMcqCompleted ? handleTestSubmission : handleMcqCompletion}
                      examDurationInSeconds={examDurationInSeconds}
                    />
                  </Box>
                </BlankCard>
              </Grid>

              {/* Webcam */}
              <Grid item>
              
                  <Box className="w-60 h-60 flex items-center justify-center rounded-2xl bg-gray-100 shadow-md overflow-hidden">
                    <WebCam cheatingLog={cheatingLog} updateCheatingLog={updateCheatingLog} />
                  </Box>
                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default TestPage;
