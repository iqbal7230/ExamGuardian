import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { useNavigate, useParams } from 'react-router';
import { CheckCircle, Info, Warning } from '@mui/icons-material';

const CodeDetailsMore = () => {
  const [certify, setCertify] = useState(false);
  const navigate = useNavigate();
  const { examId } = useParams();

  const handleCertifyChange = () => setCertify(!certify);
  const handleCodeTest = () => navigate(`/exam/${examId}/code`);

  return (
    <Card sx={{ m: 4, p: 3, borderRadius: 3, boxShadow: 6 }}>
      <CardContent>
        {/* Title */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Coding Test
        </Typography>

        {/* Description */}
        <Typography variant="body1" paragraph>
          This test will allow you to measure your <strong>Coding skills</strong> at the
          beginner level with a set of multiple-choice questions and coding tasks.
        </Typography>
        

        <Divider sx={{ my: 3 }} />

        {/* Instructions */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Test Instructions
        </Typography>
        <List dense>
          {[
            'This Practice Test consists of Coding Questions.',
            'There are a total of 1 questions. Test Duration is 10 minutes.',
            'There is No Negative Marking for wrong answers.',
            'Do Not switch tabs while taking the test. Switching tabs will End the test.',
            'The test will only run in full screen mode. Switching back ends the test.',
            'You may use blank sheets for rough work.',
            'Clicking on Back or Next will save the answer.',
            'Questions can be reattempted till the test is running.',
            'Click on Finish Test once you are done.',
            'You will be able to view your scores once the test is complete.',
          ].map((instruction, index) => (
            <ListItem key={index} sx={{ alignItems: 'flex-start' }}>
              <ListItemIcon>
                <Info color="primary" />
              </ListItemIcon>
              <ListItemText primary={instruction} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3 }} />

        {/* Confirmation */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          ⚠️ Confirmation
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Your actions will be <strong>proctored</strong>. Any signs of malpractice may lead to{' '}
          <strong>suspension or cancellation</strong> of your test.
        </Typography>

        {/* Checkbox + Button */}
        <Stack direction="column" alignItems="center" spacing={3} mt={2}>
          <FormControlLabel
            control={
              <Checkbox checked={certify} onChange={handleCertifyChange} color="primary" />
            }
            label="I certify that I have read and agree to all the instructions"
          />
          <Button
            onClick={handleCodeTest}
            disabled={!certify}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{
              fontWeight: 'bold',
              borderRadius: 2,
              py: 1.5,
              textTransform: 'none',
            }}
            startIcon={<CheckCircle />}
          >
            Start Coding Test
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

const imgUrl =
  'https://cdn-api.elice.io/api-attachment/attachment/61bd920a02e1497b8f9fab92d566e103/image.jpeg';

export function CodeDetails() {
  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Left Banner */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${imgUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: { xs: 'none', sm: 'block' },
        }}
      />
      {/* Right Content */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={8} square>
        <CodeDetailsMore />
      </Grid>
    </Grid>
  );
}

export default CodeDetails;
