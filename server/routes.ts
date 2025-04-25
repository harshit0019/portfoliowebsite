import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from client/public for production assets
  app.use('/files', express.static(path.join(process.cwd(), 'client/public/files')));
  // Configure nodemailer transporter
  console.log('Setting up email transporter with: yadavharshit1901@gmail.com');
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yadavharshit1901@gmail.com',
      pass: process.env.EMAIL_PASS
    },
    debug: true, // Enable debugging
    logger: true // Log to console
  });

  // API route for contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate input
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required' });
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      
      // Create email content
      const mailOptions = {
        from: process.env.EMAIL_USER, // From your email to avoid spam filters
        to: "yadavharshit1901@gmail.com", // Your specific email address
        replyTo: email, // Set reply-to as the sender's email
        subject: `Portfolio Contact: ${subject || 'New message from your portfolio'}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 5px;">
            <h2 style="color: #d97706; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">New Contact Message</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-line;">${message}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #6c757d;">This message was sent from your portfolio website contact form.</p>
          </div>
        `
      };
      
      // Send email
      console.log('Sending contact form email...');
      console.log('From:', process.env.EMAIL_USER);
      console.log('To:', "yadavharshit1901@gmail.com");
      console.log('Subject:', mailOptions.subject);
      
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        throw emailError;
      }
      
      return res.status(200).json({ 
        message: 'Message sent! I will get back to you soon.',
        success: true
      });
    } catch (error) {
      console.error('Error processing contact form:', error);
      return res.status(500).json({ message: 'Server error, please try again later' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
