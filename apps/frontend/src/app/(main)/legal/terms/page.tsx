import type { Metadata } from 'next';
import LegalPage, { ContactEmail } from '@/components/pages/LegalPage';

export const metadata: Metadata = { title: 'Terms of use — AirConnect Hanoi' };

export default function TermsOfUse() {
  return (
    <LegalPage title="Terms of use">
      <h2>What this site is</h2>
      <p>
        AirConnect Hanoi is an independent demonstrator of a platform connecting Hanoi schools to reduce the impact of air
        pollution on children. It is not an official portal of any public authority, school or organisation.
      </p>

      <h2>Sample content</h2>
      <p>
        Content marked &quot;Sample&quot; or &quot;Draft&quot; is for demonstration only. Information about real schools
        is limited to public information. Nothing on this site is an official statement or a verified fact unless it says
        so.
      </p>

      <h2>Not medical advice</h2>
      <p>
        Health-related content is general information, has not yet been reviewed by experts, and does not replace advice
        from a doctor or the health authorities. In an emergency, contact the emergency services.
      </p>

      <h2>Accounts</h2>
      <p>
        Accounts are limited to test accounts during the demonstrator. Keep your password secret. We may suspend an
        account that breaks these terms.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not try to break, overload or gain unauthorised access to the service, collect other people&apos;s data, or
        post unlawful, insulting or misleading content.
      </p>

      <h2>Third-party data</h2>
      <p>
        Map data © OpenStreetMap contributors, under the Open Database Licence. Other sources are listed on the Data
        sources page.
      </p>

      <h2>No warranty</h2>
      <p>The demonstrator is provided as is, may change or stop at any time, and may contain errors.</p>

      <h2>Contact</h2>
      <p>
        <ContactEmail />
      </p>
    </LegalPage>
  );
}
