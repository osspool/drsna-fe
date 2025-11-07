// app/actions/sendContactEmail.ts
'use server';

import { z } from 'zod'; // For validation
import { createMailTransporter, buildFromHeader } from '@/lib/mailer';

// Define the form validation schema
const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function sendContactEmail(prevState, formData) {
  try {
    // Extract form data
    const rawFormData = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    // Validate form data
    const validatedFields = ContactFormSchema.safeParse(rawFormData);

    // Return early if validation fails (with safe guards)
    if (!validatedFields.success) {
      const firstErrorMessage =
        validatedFields.error?.issues?.[0]?.message ||
        'Invalid form submission. Please check your inputs and try again.';
      return {
        message: firstErrorMessage,
        error: true,
        success: false,
      };
    }

    // Configure SMTP transporter based on selected service (gmail, titan, local, etc.)
    const transporter = createMailTransporter();

    // Verify SMTP connection
    await transporter.verify();

    // Create subject (no service field)
    const emailSubject = 'Contact Form: New Message';

    // Prepare email content
    const mailOptions = {
      from: buildFromHeader(validatedFields.data.name),
      replyTo: validatedFields.data.email, // Set reply-to as the form submitter's email
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // Recipient email
      subject: emailSubject,
      text: `
        New Contact Form Submission
        
        Name: ${validatedFields.data.name}
        Email: ${validatedFields.data.email}
        ${validatedFields.data.company ? `Company: ${validatedFields.data.company}` : ''}
        ${validatedFields.data.phone ? `Phone: ${validatedFields.data.phone}` : ''}
        
        Message:
        ${validatedFields.data.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedFields.data.name}</p>
        <p><strong>Email:</strong> ${validatedFields.data.email}</p>
        ${validatedFields.data.company ? `<p><strong>Company:</strong> ${validatedFields.data.company}</p>` : ''}
        ${validatedFields.data.phone ? `<p><strong>Phone:</strong> ${validatedFields.data.phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
          ${validatedFields.data.message.replace(/\n/g, '<br>')}
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success state
    return {
      message: "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.",
      success: true,
      error: false,
    };

  } catch (error) {
    // Handle errors
    console.error('Contact form error:', error);
    return {
      message: "Sorry, something went wrong. Please try again later or contact us directly.",
      success: false,
      error: true,
    };
  }
}
