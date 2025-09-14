import React from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Card,
  CardContent,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CodingQuestionForm from './CodingQuestionForm';

const CreateExam = ({ formik, title, subtitle, subtext, isSubmitting }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <div className="space-y-6">
      {title && (
        <div className="text-center mb-8">
          <Typography 
            fontWeight="700" 
            variant="h2" 
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2"
            sx={{ 
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              lineHeight: 1.2,
              letterSpacing: '-0.025em'
            }}
          >
            {title}
          </Typography>
          {subtext && (
            <Typography 
              variant="body1" 
              className="text-gray-600 max-w-2xl mx-auto"
              sx={{ fontSize: { xs: '0.95rem', md: '1rem' } }}
            >
              {subtext}
            </Typography>
          )}
        </div>
      )}

      <Box component="form" className="space-y-6">
        {/* Basic Information Section */}
        <Card 
          className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]"
          sx={{ 
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
            borderRadius: 3
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">📋</span>
              </div>
              <Typography 
                variant="h5" 
                className="font-bold text-gray-800"
                sx={{ fontWeight: 700 }}
              >
                Basic Information
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Stack mb={3}>
                  <CustomTextField
                    id="examName"
                    name="examName"
                    label="Exam Name"
                    variant="outlined"
                    fullWidth
                    value={values.examName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.examName && Boolean(errors.examName)}
                    helperText={touched.examName && errors.examName}
                    className="bg-white rounded-lg"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#3b82f6',
                            borderWidth: 2
                          }
                        },
                        '&.Mui-focused': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#6366f1',
                            borderWidth: 2
                          }
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#6366f1'
                      }
                    }}
                  />
                </Stack>
              </div>

              <div>
                <Stack mb={3}>
                  <CustomTextField
                    id="totalQuestions"
                    name="totalQuestions"
                    label="Total Number of Questions"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={values.totalQuestions}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.totalQuestions && Boolean(errors.totalQuestions)}
                    helperText={touched.totalQuestions && errors.totalQuestions}
                    className="bg-white rounded-lg"
                    InputProps={{
                      startAdornment: <span className="mr-2 text-gray-500 text-lg">#</span>
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#3b82f6',
                            borderWidth: 2
                          }
                        }
                      }
                    }}
                  />
                </Stack>
              </div>

              <div>
                <Stack mb={3}>
                  <CustomTextField
                    id="duration"
                    name="duration"
                    label="Exam Duration (minutes)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={values.duration}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.duration && Boolean(errors.duration)}
                    helperText={touched.duration && errors.duration}
                    className="bg-white rounded-lg"
                    InputProps={{
                      startAdornment: <span className="mr-2 text-gray-500 text-lg">⏱️</span>
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#3b82f6',
                            borderWidth: 2
                          }
                        }
                      }
                    }}
                  />
                </Stack>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Section */}
        <Card 
          className="border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]"
          sx={{ 
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
            borderRadius: 3
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">📅</span>
              </div>
              <Typography 
                variant="h5" 
                className="font-bold text-gray-800"
                sx={{ fontWeight: 700 }}
              >
                Exam Schedule
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Stack mb={3}>
                  <CustomTextField
                    id="liveDate"
                    name="liveDate"
                    label="Live Date and Time"
                    type="datetime-local"
                    variant="outlined"
                    fullWidth
                    value={values.liveDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.liveDate && Boolean(errors.liveDate)}
                    helperText={touched.liveDate && errors.liveDate}
                    className="bg-white rounded-lg"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: <span className="mr-2 text-gray-500 text-lg">🚀</span>
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#22c55e',
                            borderWidth: 2
                          }
                        }
                      }
                    }}
                  />
                </Stack>
              </div>

              <div>
                <Stack mb={3}>
                  <CustomTextField
                    id="deadDate"
                    name="deadDate"
                    label="Dead Date and Time"
                    type="datetime-local"
                    variant="outlined"
                    fullWidth
                    value={values.deadDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.deadDate && Boolean(errors.deadDate)}
                    helperText={touched.deadDate && errors.deadDate}
                    className="bg-white rounded-lg"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: <span className="mr-2 text-gray-500 text-lg">🏁</span>
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#22c55e',
                            borderWidth: 2
                          }
                        }
                      }
                    }}
                  />
                </Stack>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coding Question Section */}
        <Card 
          className="border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]"
          sx={{ 
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.05) 0%, rgba(219, 39, 119, 0.05) 100%)',
            borderRadius: 3
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">💻</span>
                </div>
                <Typography 
                  variant="h5" 
                  className="font-bold text-gray-800"
                  sx={{ fontWeight: 700 }}
                >
                  Coding Challenge
                </Typography>
              </div>
              <Chip 
                label="Required" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg"
                size="small"
                sx={{
                  fontWeight: 600,
                  '& .MuiChip-label': {
                    color: 'white'
                  }
                }}
              />
            </div>

            <CodingQuestionForm formik={formik} />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            disabled={isSubmitting || formik.isSubmitting}
            onClick={handleSubmit}
            className="px-12 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                transform: 'translateY(-2px) scale(1.02)'
              },
              '&:disabled': {
                background: '#e5e7eb',
                color: '#9ca3af'
              },
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.1rem',
              fontWeight: 700,
              minWidth: 200,
              height: 56,
              boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
            }}
            startIcon={
              (isSubmitting || formik.isSubmitting) ? 
                <CircularProgress size={20} color="inherit" /> : 
                <span className="text-xl"></span>
            }
          >
            {(isSubmitting || formik.isSubmitting) ? 'Creating Exam...' : 'Create Exam'}
          </Button>
        </div>
      </Box>

      {subtitle && (
        <div className="mt-8 text-center">
          <div className=" bg-opacity-60 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg">
            {subtitle}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateExam;
