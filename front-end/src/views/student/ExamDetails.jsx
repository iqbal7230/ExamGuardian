import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { uniqueId } from 'lodash';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetQuestionsQuery, useGetExamDetailsQuery } from '../../slices/examApiSlice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
// const { data: userExams, isLoading, isError } = useGetExamsQuery();

const DescriptionAndInstructions = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const { data: questions, isLoading } = useGetQuestionsQuery(examId);
    const { data: exam, isLoading: examLoading } = useGetExamDetailsQuery(examId);
  
  const testId = uniqueId();

  const [certify, setCertify] = useState(false);
  const handleCertifyChange = () => setCertify(!certify);

  const handleTest = () => {
    const isValid = true;
    if (isValid) {
      navigate(`/exam/${examId}/${testId}`);
    } else {
      toast.error('Test date is not valid.');
    }
  };

  return (
    <Card
      sx={{
        m: 4,
        p: 3,
        borderRadius: 3,
        boxShadow: 4,
        backgroundColor: 'background.paper',
      }}
    >
      <CardContent>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {exam?.title} Beginner Level Practice Test
        </Typography>
        <Typography variant="body1" paragraph>
          This practice test will help you measure your skills at the beginner level with
          multiple choice questions. We recommend scoring at least <strong>75%</strong> before moving
          to the next level.
        </Typography>
        

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          Test Instructions
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="The test consists only of MCQ questions." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccessTimeIcon color="action" />
            </ListItemIcon>
            <ListItemText primary={`${
                exam?.totalQuestions ?? questions?.length ?? 0
              } questions | Duration: 10 minutes.`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <WarningAmberIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Negative marking applies for wrong answers." />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Do not switch tabs. Switching tabs will automatically block/end the test."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="The test runs only in full-screen mode. Exiting full screen ends the test."
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Use blank sheets for rough work if needed." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Clicking Back/Next will save your answer." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Questions can be reattempted while the test is active." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Click Finish Test once you are done." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Scores will be visible after completing the test." />
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          🔒 Confirmation
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Your actions will be proctored. Any signs of malpractice may lead to suspension or
          cancellation of your test.
        </Typography>

        <Stack direction="column" alignItems="center" spacing={3}>
          <FormControlLabel
            control={<Checkbox checked={certify} onChange={handleCertifyChange} color="primary" />}
            label="I certify that I have read and agree to all instructions"
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!certify}
            onClick={handleTest}
            size="large"
            fullWidth
            sx={{ fontWeight: 'bold', borderRadius: 2, py: 1.5 }}
          >
            🚀 Start Test
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

const imgUrl =
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=2070&q=80';

export default function ExamDetails() {
  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${imgUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <DescriptionAndInstructions />
      </Grid>
    </Grid>
  );
}
