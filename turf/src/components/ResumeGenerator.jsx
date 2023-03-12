import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ResumeTemplate from './ResumeTemplate';

function ResumeGenerator() {
  const [resumePDF, setResumePDF] = useState(null);
  const resumeRef = useRef(null);

  function generatePDF() {
    html2canvas(resumeRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      doc.addImage(imgData, 'PNG', 10, 10, 180, 0);
      setResumePDF(doc.output('blob'));
    });
  }
  const downloadPDF = () => {
    const capture = document.querySelector('.actual-receipt');
    
    html2canvas(capture, {scale: 10}).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'in', [8, 26]);
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
      
      doc.save('receipt.pdf');
    });
  }
  

  return (
    <div>
      <button onClick={downloadPDF}>Generate Resume PDF</button>
      <div ref={resumeRef}>
        {/* Render your resume template component here */}
        <ResumeTemplate />
      </div>
      {resumePDF && (
        <iframe src={URL.createObjectURL(resumePDF)} width="100%" height="600px" />
      )}
    </div>
  );
}

export default ResumeGenerator;