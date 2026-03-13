import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    console.log('--- API CONTACT ROUTE HIT ---');
    try {
        const body = await req.json();
        console.log('Incoming Contact Request:', body);
        const { name, email, message, phone, position, type = 'General' } = body;

        if (!email || (!message && type !== 'Quick')) {
            return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 });
        }

        // Configure Nodemailer transporter
        console.log('Using SMTP Config:', {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            user: process.env.SMTP_USER,
            secure: process.env.SMTP_SECURE,
            hasPass: !!process.env.SMTP_PASS
        });
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.hostinger.com',
            port: Number(process.env.SMTP_PORT) || 465,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER || 'info@techdlt.com',
                pass: process.env.SMTP_PASS,
            },
        });

        let subject = 'New Inquiry from TechDLT Website';
        let title = 'New Website Inquiry';

        if (type === 'Career') {
            subject = 'New Job Application – TechDLT';
            title = 'Job Application Detected';
        } else if (type === 'Quick') {
            subject = 'Quick Inquiry from Footer – TechDLT';
            title = 'Quick Footer Inquiry';
        }

        // Setup email data
        const mailOptions = {
            from: `"${name || 'Web User'}" <${process.env.SMTP_USER}>`,
            to: 'info@techdlt.com',
            replyTo: email,
            subject: subject,
            text: `${title}\n\nType: ${type}\nName: ${name || 'N/A'}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nPosition: ${position || 'N/A'}\n\nMessage:\n${message || 'N/A'}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
                    <div style="background-color: #2563eb; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">${title}</h1>
                    </div>
                    <div style="padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; background-color: #ffffff;">
                        <p style="font-size: 16px; margin-bottom: 20px;">You have received a new ${type.toLowerCase()} submission.</p>
                        
                        <div style="margin-bottom: 20px; padding: 15px; background-color: #f8fafc; border-radius: 8px;">
                            <p style="font-weight: bold; color: #2563eb; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 10px;">Submission Details</p>
                            <p style="margin: 5px 0;"><strong>Source:</strong> ${type}</p>
                            ${name ? `<p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>` : ''}
                            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                            ${phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
                            ${position ? `<p style="margin: 5px 0;"><strong>Position:</strong> ${position}</p>` : ''}
                        </div>

                        ${message ? `
                        <div style="margin-bottom: 20px;">
                            <p style="font-weight: bold; color: #2563eb; margin-bottom: 10px;">Message Contents:</p>
                            <div style="padding: 15px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${message}</div>
                        </div>
                        ` : ''}

                        <p style="font-size: 12px; color: #64748b; margin-top: 30px; text-align: center;">
                            This message was generated automatically by the TechDLT website contact system.
                        </p>
                    </div>
                </div>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error: any) {
        console.error('Error sending email:', error);
        return NextResponse.json({ 
            error: 'Failed to send message', 
            details: error.message || 'Unknown error' 
        }, { status: 500 });
    }
}
