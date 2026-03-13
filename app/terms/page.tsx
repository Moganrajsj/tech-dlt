'use client';

import LegalPageLayout from '@/components/legal/LegalPageLayout';

const TermsAndConditions = () => {
    return (
        <LegalPageLayout title="Terms and Conditions" lastUpdated="February 9, 2026">
            <p>
                Welcome to Tech-DLT. By accessing and using our website, you agree to the following terms and conditions.
            </p>

            <h2>Use of Website</h2>
            <p>
                You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others.
            </p>

            <h2>Intellectual Property</h2>
            <p>
                All content on this website, including text, graphics, logos, and software, is the property of Tech-DLT and protected by copyright laws. Unauthorized use is prohibited.
            </p>

            <h2>User Submissions</h2>
            <p>
                Any information submitted through forms must be accurate and truthful. We reserve the right to refuse or remove inappropriate content.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
                Tech-DLT is not responsible for any direct or indirect damages arising from the use or inability to use the website.
            </p>

            <h2>Third-Party Services</h2>
            <p>
                Our website may link to third-party services. We are not responsible for their content or policies.
            </p>

            <h2>Modifications</h2>
            <p>
                We reserve the right to modify these terms at any time. Continued use of the website indicates acceptance of updated terms.
            </p>

            <h2>Governing Law</h2>
            <p>
                These terms are governed by applicable local laws.
            </p>

            <h2>Contact Information</h2>
            <p>
                For questions regarding these Terms and Conditions:
            </p>
            <p>
                <strong>Email:</strong> <a href="mailto:info@techdlt.com">info@techdlt.com</a>
            </p>
        </LegalPageLayout>
    );
};

export default TermsAndConditions;
