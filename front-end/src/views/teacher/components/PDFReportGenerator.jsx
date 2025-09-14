import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PDFReportGenerator = ({
  tableRef,
  examData,
  cheatingLogs = [],
  filter = '',
  buttonText = 'Download Report',
  fileName = 'Report',
  disabled = false,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  sx = {},
  ...buttonProps
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const calculateStatistics = () => {
    const totalViolations = cheatingLogs.reduce((total, log) => {
      return total + (log.noFaceCount || 0) + (log.multipleFaceCount || 0) + 
             (log.cellPhoneCount || 0) + (log.prohibitedObjectCount || 0);
    }, 0);

    const highRiskCandidates = cheatingLogs.filter(log => {
      const totalUserViolations = (log.noFaceCount || 0) + (log.multipleFaceCount || 0) + 
                                  (log.cellPhoneCount || 0) + (log.prohibitedObjectCount || 0);
      return totalUserViolations > 5;
    }).length;

    const mediumRiskCandidates = cheatingLogs.filter(log => {
      const totalUserViolations = (log.noFaceCount || 0) + (log.multipleFaceCount || 0) + 
                                  (log.cellPhoneCount || 0) + (log.prohibitedObjectCount || 0);
      return totalUserViolations > 2 && totalUserViolations <= 5;
    }).length;

    return {
      totalCandidates: cheatingLogs.length,
      totalViolations,
      highRiskCandidates,
      mediumRiskCandidates,
      lowRiskCandidates: cheatingLogs.length - highRiskCandidates - mediumRiskCandidates
    };
  };

  const createPDFHeader = (examName, stats) => {
    const header = document.createElement('div');
    header.style.cssText = `
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 3px solid #1976d2;
      padding-bottom: 20px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
    `;
    
    header.innerHTML = `
      <div style="margin-bottom: 15px;">
        <h1 style="margin: 0; color: #1976d2; font-size: 28px; font-weight: bold; text-transform: uppercase;">
          🛡️ Proctoring Violation Report
        </h1>
      </div>
      <div style="margin-bottom: 10px;">
        <h2 style="margin: 0; color: #424242; font-size: 20px; font-weight: 500;">
          📋 Exam: ${examName}
        </h2>
      </div>
      <div style="color: #666; font-size: 14px; margin-top: 10px;">
        <p style="margin: 0;">
          📅 Generated on: ${new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
          })} at ${new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </p>
      </div>
    `;
    
    return header;
  };

  const createSummarySection = (stats) => {
    const summary = document.createElement('div');
    summary.style.cssText = `
      margin: 25px 0;
      padding: 20px;
      background-color: #ffffff;
      border: 2px solid #e3f2fd;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

    summary.innerHTML = `
      <div style="margin-bottom: 15px;">
        <h3 style="margin: 0; color: #1976d2; font-size: 18px; font-weight: bold; display: flex; align-items: center;">
          📊 Executive Summary
        </h3>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; border-left: 4px solid #4caf50;">
          <div style="font-size: 24px; font-weight: bold; color: #2e7d32;">👥 ${stats.totalCandidates}</div>
          <div style="color: #388e3c; font-weight: 500;">Total Candidates</div>
        </div>
        
        <div style="background: #fff3e0; padding: 15px; border-radius: 8px; border-left: 4px solid #ff9800;">
          <div style="font-size: 24px; font-weight: bold; color: #f57c00;">⚠️ ${stats.totalViolations}</div>
          <div style="color: #ef6c00; font-weight: 500;">Total Violations</div>
        </div>
        
        <div style="background: #ffebee; padding: 15px; border-radius: 8px; border-left: 4px solid #f44336;">
          <div style="font-size: 24px; font-weight: bold; color: #d32f2f;">🚨 ${stats.highRiskCandidates}</div>
          <div style="color: #c62828; font-weight: 500;">High Risk (>5 violations)</div>
        </div>
        
        <div style="background: #fff8e1; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
          <div style="font-size: 24px; font-weight: bold; color: #f9a825;">⚡ ${stats.mediumRiskCandidates}</div>
          <div style="color: #f57f17; font-weight: 500;">Medium Risk (3-5 violations)</div>
        </div>
      </div>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; font-size: 14px;">
          <div><strong>📈 Filter Applied:</strong> ${filter || 'None'}</div>
          <div><strong>✅ Low Risk:</strong> ${stats.lowRiskCandidates} candidates</div>
          <div><strong>📋 Export Format:</strong> PDF Report</div>
          <div><strong>🔍 Data Accuracy:</strong> Real-time</div>
        </div>
      </div>
    `;
    
    return summary;
  };

  const createViolationBreakdown = (logs) => {
    const breakdown = document.createElement('div');
    breakdown.style.cssText = `
      margin: 25px 0;
      padding: 20px;
      background-color: #ffffff;
      border: 2px solid #e1f5fe;
      border-radius: 12px;
    `;

    const violationTypes = {
      noFaceCount: { label: '👤 No Face Detected', color: '#e57373' },
      multipleFaceCount: { label: '👥 Multiple Faces', color: '#ffb74d' },
      cellPhoneCount: { label: '📱 Cell Phone Usage', color: '#64b5f6' },
      prohibitedObjectCount: { label: '📚 Prohibited Objects', color: '#81c784' }
    };

    let violationStats = '';
    Object.entries(violationTypes).forEach(([key, config]) => {
      const total = logs.reduce((sum, log) => sum + (log[key] || 0), 0);
      violationStats += `
        <div style="background: ${config.color}20; padding: 12px; border-radius: 8px; border-left: 4px solid ${config.color};">
          <div style="font-size: 20px; font-weight: bold; color: ${config.color};">${total}</div>
          <div style="color: #424242; font-weight: 500;">${config.label}</div>
        </div>
      `;
    });

    breakdown.innerHTML = `
      <h3 style="margin: 0 0 15px 0; color: #0277bd; font-size: 18px; font-weight: bold;">
        📈 Violation Breakdown
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
        ${violationStats}
      </div>
    `;
    
    return breakdown;
  };

  const styleTableForPDF = (tableClone) => {
    // Apply comprehensive table styling
    tableClone.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 11px;
      margin: 20px 0;
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

    // Style all cells
    const cells = tableClone.querySelectorAll('td, th');
    cells.forEach((cell, index) => {
      cell.style.cssText = `
        border: 1px solid #e0e0e0;
        padding: 12px 8px;
        text-align: left;
        vertical-align: middle;
        line-height: 1.4;
      `;
    });

    // Special styling for header cells
    const headerCells = tableClone.querySelectorAll('th');
    headerCells.forEach(cell => {
      cell.style.cssText += `
        background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
        color: white;
        font-weight: bold;
        font-size: 12px;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `;
    });

    // Style data rows with alternating colors
    const rows = tableClone.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
      if (index % 2 === 0) {
        row.style.backgroundColor = '#fafafa';
      } else {
        row.style.backgroundColor = '#ffffff';
      }
      
      // Add hover effect styling
      row.style.transition = 'background-color 0.3s ease';
    });

    // Remove Material-UI specific elements that don't render well in PDF
    const muiElements = tableClone.querySelectorAll('.MuiChip-root, .MuiIconButton-root, .MuiTooltip-popper');
    muiElements.forEach(element => {
      if (element.tagName === 'BUTTON' || element.classList.contains('MuiIconButton-root')) {
        element.style.display = 'none';
      } else if (element.classList.contains('MuiChip-root')) {
        // Convert chips to simple text with background color
        const chipText = element.textContent;
        element.outerHTML = `<span style="
          background: #e3f2fd;
          color: #1976d2;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 500;
        ">${chipText}</span>`;
      }
    });

    return tableClone;
  };

  const generatePDF = async () => {
    if (!tableRef?.current || cheatingLogs.length === 0) {
      alert('No data available to generate PDF report.');
      return;
    }

    setIsGenerating(true);

    try {
      const examName = examData?.examName || 'Unnamed Exam';
      const stats = calculateStatistics();

      // Create main PDF content container
      const pdfContent = document.createElement('div');
      pdfContent.style.cssText = `
        padding: 25px;
        background-color: #ffffff;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 1200px;
        margin: 0 auto;
      `;

      // Add all sections
      const header = createPDFHeader(examName, stats);
      const summary = createSummarySection(stats);
      const violationBreakdown = createViolationBreakdown(cheatingLogs);

      // Clone and style the table
      const tableClone = tableRef.current.cloneNode(true);
      const styledTable = styleTableForPDF(tableClone);

      // Add table header
      const tableHeader = document.createElement('h3');
      tableHeader.style.cssText = `
        margin: 30px 0 15px 0;
        color: #0277bd;
        font-size: 18px;
        font-weight: bold;
      `;
      tableHeader.textContent = '📋 Detailed Violation Records';

      // Append all elements
      pdfContent.appendChild(header);
      pdfContent.appendChild(summary);
      pdfContent.appendChild(violationBreakdown);
      pdfContent.appendChild(tableHeader);
      pdfContent.appendChild(styledTable);

      // Temporarily add to document for rendering
      document.body.appendChild(pdfContent);

      // Generate canvas with high quality
      const canvas = await html2canvas(pdfContent, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: pdfContent.scrollWidth,
        height: pdfContent.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200,
        windowHeight: 800
      });

      // Clean up
      document.body.removeChild(pdfContent);

      // Create PDF with optimal settings
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10; // 10mm top margin

      // Add pages as needed
      pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight - 20;
      }

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split('T')[0];
      const sanitizedExamName = examName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filename = `${fileName}_${sanitizedExamName}_${timestamp}.pdf`;

      // Save PDF
      pdf.save(filename);

    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF report. Please try again or contact support.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      startIcon={isGenerating ? <CircularProgress size={20} /> : <DownloadIcon />}
      onClick={generatePDF}
      disabled={disabled || isGenerating || cheatingLogs.length === 0}
      sx={{
        height: '56px',
        textTransform: 'none',
        fontWeight: 600,
        ...sx
      }}
      {...buttonProps}
    >
      {isGenerating ? (
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2">Generating PDF...</Typography>
        </Box>
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default PDFReportGenerator;
