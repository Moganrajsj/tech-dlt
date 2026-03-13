'use client';

import LegalPageLayout from '@/components/legal/LegalPageLayout';

const CookiesPolicy = () => {
    return (
        <LegalPageLayout title="Cookies Policy" lastUpdated="February 9, 2026">
            <p>
                This Cookies Policy explains how Tech-DLT uses cookies and similar technologies.
            </p>

            <h2>What Are Cookies</h2>
            <p>
                Cookies are small text files stored on your device when you visit a website. They help improve functionality and user experience.
            </p>

            <h2>How We Use Cookies</h2>
            <p>We use cookies to:</p>
            <ul>
                <li>Remember user preferences</li>
                <li>Analyze website traffic</li>
                <li>Improve performance and security</li>
            </ul>

            <h2>Types of Cookies We Use</h2>
            <ul>
                <li><strong>Essential cookies</strong> required for website operation</li>
                <li><strong>Analytics cookies</strong> to understand usage patterns</li>
                <li><strong>Functional cookies</strong> to enhance user experience</li>
            </ul>

            <h2>Managing Cookies</h2>
            <p>
                You can control or disable cookies through your browser settings. Disabling cookies may affect website functionality.
            </p>

            <h2>Updates to This Policy</h2>
            <p>
                We may update this Cookies Policy periodically. Changes will be posted on this page.
            </p>

            <h2>Contact</h2>
            <p>
                For questions about our use of cookies:
            </p>
            <p>
                <strong>Email:</strong> <a href="mailto:info@techdlt.com">info@techdlt.com</a>
            </p>
        </LegalPageLayout>
    );
};

export default CookiesPolicy;
