import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router";

const CodeDetailsMore = () => {
  const [certify, setCertify] = useState(false);
  const navigate = useNavigate();
  const { examId } = useParams();

  const handleCertifyChange = () => setCertify(!certify);

  const handleCodeTest = () => {
    navigate(`/exam/${examId}/code`);
  };

  return (
    <Card
      elevation={8}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "background.paper",
        mt: 4,
        mx: { xs: 2, sm: 4 },
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
        {/* Heading */}
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
          Test Description
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          This practice test will allow you to measure your Python skills at the
          beginner level through multiple-choice questions. We recommend scoring
          at least <strong>75%</strong> before moving to the next level. It will
          help you identify your strengths and areas for improvement.
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          #Python #Coding #Software #MCQ #Beginner #ProgrammingLanguage
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Instructions */}
        <Typography variant="h5" gutterBottom fontWeight="medium" color="secondary">
          Test Instructions
        </Typography>
        <List sx={{ pl: 2 }}>
          {[
            "This Practice Test consists of only MCQ questions.",
            "There is Negative Marking for wrong answers.",
            "Do Not switch tabs while taking the test. Switching Tabs will End the test.",
            "The test will only run in full screen mode.",
            "Arrange blank sheets for rough work before starting.",
            "Clicking Back or Next will save the answer.",
            "Questions can be reattempted until the test ends.",
            "Click 'Finish Test' once you are done.",
            "You will be able to view your scores after completion.",
          ].map((instruction, idx) => (
            <ListItem key={idx} sx={{ py: 0.8 }}>
              <Typography variant="body1" color="text.primary">
                {instruction}
              </Typography>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3 }} />

        {/* Confirmation */}
        <Typography variant="h5" gutterBottom fontWeight="medium" color="error">
          Confirmation
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Your actions will be monitored, and any signs of misconduct may lead to
          suspension or cancellation of your test.
        </Typography>

        <Stack direction="column" alignItems="center" spacing={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={certify}
                onChange={handleCertifyChange}
                color="primary"
              />
            }
            label={
              <Typography variant="body2" color="text.secondary">
                I certify that I have carefully read and agree to the above
                instructions.
              </Typography>
            }
          />

          <Button
            onClick={handleCodeTest}
            disabled={!certify}
            variant="contained"
            color="primary"
            size="large"
            sx={{
              px: 5,
              py: 1.2,
              fontWeight: "bold",
              borderRadius: 2,
              boxShadow: 4,
              textTransform: "none",
            }}
          >
            Start Coding Test
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

const imgUrl =
  "https://cdn-api.elice.io/api-attachment/attachment/61bd920a02e1497b8f9fab92d566e103/image.jpeg";

export function CodeDetails() {
  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Side Image */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${imgUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Right Side Content */}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <CodeDetailsMore />
      </Grid>
    </Grid>
  );
}

export default CodeDetails;
