import asyncHandler from "express-async-handler";
import CheatingLog from "../models/cheatingLogModel.js";

// Save cheating log
const saveCheatingLog = asyncHandler(async (req, res) => {
  const {
    noFaceCount,
    multipleFaceCount,
    cellPhoneCount,
    prohibitedObjectCount,
    examId,
    username,
    email,
    screenshots,
  } = req.body;

  const cheatingLog = new CheatingLog({
    noFaceCount,
    multipleFaceCount,
    cellPhoneCount,
    prohibitedObjectCount,
    examId,
    username,
    email,
    screenshots: screenshots || [],
  });

  const savedLog = await cheatingLog.save();
  res.status(201).json(savedLog);
});

// Get cheating logs by examId
const getCheatingLogsByExamId = asyncHandler(async (req, res) => {
  const examId = req.params.examId;
  const cheatingLogs = await CheatingLog.find({ examId });
  res.status(200).json(cheatingLogs);
});

// Update cheating log
const updateCheatingLog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const cheatingLog = await CheatingLog.findById(id);

  if (!cheatingLog) {
    res.status(404);
    throw new Error("Cheating log not found");
  }

  Object.keys(updates).forEach((key) => {
    cheatingLog[key] = updates[key];
  });

  const updatedLog = await cheatingLog.save();
  res.status(200).json(updatedLog);
});

export { saveCheatingLog, getCheatingLogsByExamId, updateCheatingLog };
