import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Chip,
    Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SecurityIcon from '@mui/icons-material/Security';
import CodeIcon from '@mui/icons-material/Code';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TimerIcon from '@mui/icons-material/Timer';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const LandingPage = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const features = [
        {
            icon: <SecurityIcon className="text-4xl" />,
            title: "AI-Powered Proctoring",
            description: "Facial recognition & behavior detection for exam integrity.",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <CodeIcon className="text-4xl " />,
            title: "Interactive Code Editor",
            description: "Built-in code editor with real-time compilation.",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: <AnalyticsIcon className="text-4xl" />,
            title: "Detailed Analytics",
            description: "Reports on performance, violations & behavior.",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <TimerIcon className="text-4xl" />,
            title: "Flexible Scheduling",
            description: "Custom exam durations & deadlines.",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: <GroupIcon className="text-4xl " />,
            title: "Multi-User Support",
            description: "Role-based access for teachers & students.",
            color: "from-indigo-500 to-blue-500"
        },
        {
            icon: <VerifiedUserIcon className="text-4xl " />,
            title: "Secure Platform",
            description: "Encryption & secure authentication.",
            color: "from-teal-500 to-green-500"
        }
    ];

    const handleGetStarted = () => {
        if (userInfo) navigate('/app/dashboard');
        else navigate('/auth/register');
    };

    const handleLogin = () => navigate('/auth/login');
    const handleDashboard = () => navigate('/app/dashboard');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">

            {/* Floating Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-10 -right-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"></div>
                <div className="absolute -bottom-16 -left-12 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Navbar */}
            <Container maxWidth="lg" className="relative z-10">
                <Box className="flex justify-between items-center py-6">
                    <Typography
                        variant="h5"
                        className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    >
                        🎓 ExamGuardian
                    </Typography>
                    <div className="flex items-center gap-4">
                        {userInfo ? (
                            <Button
                                variant="contained"
                                onClick={handleDashboard}
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white font-semibold px-6 py-2 rounded-lg transition-all"
                            >
                                Dashboard
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant="text"
                                    onClick={handleLogin}
                                    className="text-gray-600 hover:text-blue-600 font-semibold"
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleGetStarted}
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white font-semibold px-6 py-2 rounded-lg transition-all"
                                >
                                    Get Started
                                </Button>
                            </>
                        )}
                    </div>
                </Box>
            </Container>

            {/* Hero */}
            <Container maxWidth="lg" className="relative z-10">
                <div className="text-center py-10">
                    <Chip
                        label="🚀 AI-Powered Exam Platform"
                        className="mb-6 bg-blue-100 text-blue-700 font-medium px-4 py-1"
                    />
                    <Typography
                        variant="h2"
                        className="font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                        sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, lineHeight: 1.2 }}
                    >
                        Next-Generation Online Proctoring
                    </Typography>
                    <Typography
                        variant="h6"
                        className="text-gray-600  mb-14 mt-5 leading-relaxed text-center"
                    >
                        Create secure online exams with AI proctoring, interactive coding challenges,
                        and powerful analytics.
                    </Typography>


                    <div className="flex flex-col sm:flex-row justify-center mt-6 gap-6">
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleGetStarted}
                            endIcon={<ArrowForwardIcon />}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105"
                        >
                            {userInfo ? 'Go to Dashboard' : 'Start Now'}
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                            className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 font-semibold px-8 py-4 rounded-xl transition-transform hover:scale-105"
                        >
                            Learn More
                        </Button>
                    </div>
                </div>
            </Container>

            {/* Features */}
            <Container maxWidth="lg" className="relative z-10" id="features">
                <div>
                    <div className="text-center mb-10">
                        <Typography
                            variant="h3"
                            className="font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        >
                            Powerful Features
                        </Typography>
                        <Typography variant="body1" className="text-gray-600">
                            Everything you need to run secure, fair, and modern online exams
                        </Typography>
                    </div>

                    <Grid container spacing={4}>
                        {features.map((feature, i) => (
                            <Grid item xs={12} sm={6} lg={4} key={i}>
                                <Card
                                    elevation={0}
                                    sx={{ backgroundColor: "transparent", boxShadow: "none" }}
                                    className="hover:shadow-lg transition-all rounded-2xl"
                                >
                                    <CardContent className="p-8 text-center">
                                        <div
                                            className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                                        >
                                            {feature.icon}
                                        </div>
                                        <Typography
                                            variant="h6"
                                            className="font-bold mb-2 text-gray-800"
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            className="text-gray-600 leading-relaxed"
                                        >
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                </div>
            </Container>

            {/* CTA */}
            <Container maxWidth="lg" className="relative z-10">
                <div >
                    <Paper
                        elevation={0}
                        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
                        className="p-12 text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg"
                    >
                        <Typography variant="h4" className="font-bold mb-4 text-gray-900">
                            Ready to Transform Your Assessments?
                        </Typography>
                        <Typography
                            variant="body1"
                            className="mb-8 opacity-90 text-gray-700  mx-auto py-2"
                        >
                            Join educators and organizations worldwide who trust ExamGuardian for secure online exams.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleGetStarted}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold px-10 py-4 rounded-xl shadow-lg mt-4 hover:shadow-xl transition-transform hover:scale-105"
                        >
                            {userInfo ? "Access Dashboard" : "Get Started Today"}
                        </Button>
                    </Paper>
                </div>
            </Container>



            <style jsx>{`
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
        </div>
    );
};

export default LandingPage;
