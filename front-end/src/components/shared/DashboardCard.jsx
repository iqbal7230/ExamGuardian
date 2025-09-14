import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
        '&:hover': {
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
        }
      }}
    >
      {cardheading ? (
        <CardContent className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
          <Typography 
            variant="h5" 
            className="text-gray-800 font-semibold"
          >
            {headtitle}
          </Typography>
          <Typography
            variant="subtitle2"
            className="text-gray-600 mt-1"
          >
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent 
          className="flex-1"
          sx={{ p: isSmallScreen ? 2 : 3 }}
        >
          {title && (
            <Stack
              direction={isSmallScreen ? "column" : "row"}
              spacing={isSmallScreen ? 1 : 2}
              justifyContent="space-between"
              alignItems={isSmallScreen ? "flex-start" : "center"}
              className="mb-4"
            >
              <Box>
                <Typography 
                  variant="h6" 
                  className="text-gray-800 font-medium"
                >
                  {title}
                </Typography>
                {subtitle && (
                  <Typography 
                    variant="body2" 
                    className="text-gray-500 mt-0.5"
                  >
                    {subtitle}
                  </Typography>
                )}
              </Box>
              {action && (
                <Box className="flex-shrink-0">
                  {action}
                </Box>
              )}
            </Stack>
          )}

          {/* Main content */}
          <Box className="text-gray-700">
            {children}
          </Box>
        </CardContent>
      )}

      {middlecontent && (
        <>
          <div className="border-t border-gray-100" />
          <Box className="p-3 bg-gray-50/50">
            {middlecontent}
          </Box>
        </>
      )}

      {footer && (
        <>
          <div className="border-t border-gray-100" />
          <Box className="p-3 bg-gray-50 text-gray-600">
            {footer}
          </Box>
        </>
      )}
    </Card>
  );
};

export default DashboardCard;
