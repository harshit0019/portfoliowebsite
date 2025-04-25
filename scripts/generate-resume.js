import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new PDF document
const doc = new jsPDF();
const resumeText = `
                                HARSHIT YADAV
                7456972664      Linkedin/harshitydv   Github/harshit0019     yadavharshit1901@gmail.com


SKILLS :
 Programming & Database : Python , FastAPI , SQL (PostgreSQL, MSSQL)
 Front-End : HTML , CSS , Tailwind CSS , Streamlit , PyQt
 Data Analysis & Visualization : Power BI , Excel , Google Sheets
 AI Tools and Automation : Prompt engeneering , ChatGPT , Replit AI , Claude
 Sustainability : Carbon Footprint tracking , scope 1 , 2 , 3 emission analysis and reporting .

WORK EXPERIENCE :
ASSOCIATE PROGRAMMER | RMX JOSS                                                     July2024 - Present
 Developed and lead a Carbon Emissions Tracker software using Python, Tkinter, MS SQL Server,
 prompt engeneering and AI tools like ChatGPT. Built to automate emission tracking and reporting
 for Scope 1 and Scope 2 (Scope 3 in progress), supporting sustainability goals and ESG compliance.
 Trained in SAP Business One, resolving queries and writing SQL queries using Microsoft SQL Server to
 extract and analyze operational data.
 Led a data integration and automation project: consolidated multiple weekly reports into a single
 Google Sheet and linked sheets, integrating them into a Power BI dashboard for real-time
 visualization reducing report preparation time by 70% .
 Developed and implemented a Merchant Dashboard in Power BI, integrating order details and BOM
 data from SAP Business One (MS SQL Server) with interactive visualizations.

PROJECTS :
Personal carbon tracker : click here for visit
  A streamlined and interactive web app that calculates an individual's carbon footprint based on
  lifestyle factors like transportation, electricity usage, diet, and waste management.
  Tech used - Python , Pandas , streamlit .
AI-Powered SEO Tag Inspector ( Vibe coding project ) - click here to visit
  Made using prompt engineering with Replit AI, this web app analyzes and previews a website's
  SEO meta tags, showing how they appear on Google and social media platforms.
  Tech used - Prompt Engineering • Replit AI • React • Tailwind CSS • shadcn/ui • Node.js • Express

EDUCATION :
Bachelor of Computer Science                                                                 2021 -2024
Guru Gobind Singh Indraprastha University ,
KCC Institute of Legal and Higher Education , Greater Noida
CGPA: 7.904
Class 12th , Divine Educational Institute , UP                                                2020-2021
percentage - 83%
Class 10th , Divine Educational Institute , UP                                                2018-2019
percentage - 93%

CERTIFICATE AND COURSES :
 PostgreSQL and MySQL course from Udemy .
 Microsoft Excel - Excel from Beginner to Advance from Udemy.
 Programming With Python from Internshala Trainings .
  Web Development from Internshala Trainings .
`;

// Split the text into lines
const lines = resumeText.split('\n');

// Set font and text color
doc.setFont('helvetica', 'normal');
doc.setTextColor(0, 0, 0);

// Add each line to the PDF
let y = 10;
const lineHeight = 7;
const margin = 10;
const pageWidth = doc.internal.pageSize.getWidth();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Add a line break if needed
  if (y > doc.internal.pageSize.getHeight() - margin) {
    doc.addPage();
    y = margin;
  }
  
  // Format title differently
  if (i === 1) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(line, pageWidth / 2, y, { align: 'center' });
    y += lineHeight;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
  }
  // Format section headers
  else if (line.endsWith(':')) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(line, margin, y);
    y += lineHeight;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
  }
  // Format contact info
  else if (i === 2) {
    doc.setFontSize(10);
    doc.text(line, pageWidth / 2, y, { align: 'center' });
    y += lineHeight * 1.5;
  }
  // Format everything else
  else {
    doc.setFontSize(10);
    doc.text(line, margin, y);
    y += lineHeight;
  }
}

// Ensure the directory exists
const outputDir = path.join(__dirname, '../client/public/files');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Save the PDF
const outputPath = path.join(outputDir, 'harshit-yadav-resume.pdf');
doc.save(outputPath);

console.log(`Resume PDF created successfully at: ${outputPath}`);