'use client';

import LegalPageLayout from '@/components/legal/LegalPageLayout';

const PrivacyPolicy = () => {
    return (
        <LegalPageLayout title="Privacy Policy" lastUpdated="February 9, 2026">
            <p>
                Welcome to Tech-DLT. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect the following information when you use our website:</p>
            <ul>
                <li><strong>Personal information</strong> such as your name, email address, phone number, and messages submitted through contact or career forms</li>
                <li><strong>Technical information</strong> such as IP address, browser type, device information, and website usage data</li>
                <li><strong>Cookies and tracking data</strong> to improve website performance</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
                <li>Respond to inquiries and communication requests</li>
                <li>Process job applications</li>
                <li>Improve our website and services</li>
                <li>Maintain security and prevent fraud</li>
                <li>Comply with legal obligations</li>
            </ul>

            <h2>Data Protection</h2>
            <p>
                We implement appropriate security measures to protect your personal data from unauthorized access, alteration, or disclosure. However, no internet transmission is completely secure.
            </p>

            <h2>Sharing of Information</h2>
            <p>
                We do not sell or rent personal information. We may share data with trusted service providers who assist in operating our website, subject to confidentiality agreements.
            </p>

            <h2>Cookies</h2>
            <p>
                Our website uses cookies to enhance user experience. You can disable cookies in your browser settings.
            </p>

            <h2>Third-Party Links</h2>
            <p>
                Our website may contain links to external sites. We are not responsible for their privacy practices.
            </p>

            <h2>Your Rights</h2>
            <p>
                You may request access, correction, or deletion of your personal data by contacting us.
            </p>

            <h2>Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, contact us at:
            </p>
            <p>
                <strong>Email:</strong> <a href="mailto:info@techdlt.com">info@techdlt.com</a>
            </p>

            <p className="mt-8 italic opacity-70">
                By using our website, you consent to this Privacy Policy.
            </p>
        </LegalPageLayout>
    );
};

export default PrivacyPolicy;
