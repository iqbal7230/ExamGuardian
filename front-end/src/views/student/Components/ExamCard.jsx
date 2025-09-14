import * as React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  IconButton,
  Stack,
  Box,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../../teacher/components/DeleteIcon';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const imgUrl =
  'https://upload.wikimedia.org/wikipedia/commons/1/11/Test-Logo.svg';

export default function ExamCard({ exam }) {
  const { examName, duration, totalQuestions, examId, liveDate, deadDate } = exam;
  const { userInfo } = useSelector((state) => state.auth);
  const isTeacher = userInfo?.role === 'teacher';
  const navigate = useNavigate();
  const isExamActive = new Date(liveDate) <= new Date() && new Date(deadDate) >= new Date();

  const handleCardClick = () => {
    if (isTeacher) {
      toast.error('You are a teacher, you cannot take this exam');
      return;
    }
    if (isExamActive && !isTeacher) {
      navigate(`/exam/${examId}`);
    } else {
      toast.info('Exam is not active currently.');
    }
  };

  return (
    <Card className=" transition-transform duration-300 shadow-lg" sx={{ width: 250 }}>
  <CardActionArea onClick={handleCardClick}>
    <CardMedia
      component="img"
      image={imgUrl}
      alt="Exam"
      sx={{ height: 100, objectFit: 'cover' }}
    />
    <CardContent sx={{ p: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" className="font-semibold text-gray-800">
          {examName}
        </Typography>
        {isTeacher && (
          <IconButton aria-label="delete">
            <DeleteIcon examId={examId} />
          </IconButton>
        )}
      </Stack>

      <Typography variant="body2" color="text.secondary" className="mb-1">
        MCQ Exam
      </Typography>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Chip label={`${totalQuestions} Ques`} color="primary" size="small" />
        <Typography variant="body2" color="textSecondary">
          {duration} mins
        </Typography>
      </Stack>

      <Box mt={1}>
        {isExamActive ? (
          <Chip label="Active" color="success" size="small" />
        ) : (
          <Chip label="Inactive" color="default" size="small" />
        )}
      </Box>
    </CardContent>
  </CardActionArea>
</Card>

  );
}
