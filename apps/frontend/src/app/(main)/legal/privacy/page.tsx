import type { Metadata } from 'next';
import LegalPage, { ContactEmail } from '@/components/pages/LegalPage';

export const metadata: Metadata = { title: 'Privacy notice — AirConnect Hanoi' };

export default function PrivacyNotice() {
  return (
    <LegalPage title="Privacy notice">
      <p>
        <strong>This site is a demonstrator.</strong> AirConnect Hanoi is a prototype shown to possible partners. Its
        content is sample content, and registration and forms are limited to test accounts held by the project team. It
        is not open to the public for sign-up.
      </p>

      <h2>Who is responsible</h2>
      <p>
        The data controllers are the members of the project team:{' '}
        <strong>[TO BE COMPLETED: names of the team members acting as data controllers]</strong>. You can reach us at{' '}
        <ContactEmail />.
      </p>

      <h2>What we process today</h2>
      <ul>
        <li>
          <strong>Visitors.</strong> You can read the site without an account. We do not use analytics, advertising or
          tracking cookies, and we do not set cookies to follow you.
        </li>
        <li>
          <strong>Technical logs.</strong> When you load a page, our hosting provider records technical data such as your
          IP address, the page requested and the time. These logs are used to run and secure the service and are kept for
          a limited period set by the provider.
        </li>
        <li>
          <strong>Test accounts.</strong> Accounts exist only for members of the project team and for partners we give a
          test account to. An account holds an email address, a name, a password (stored only as a secure hash), where
          relevant the school it is linked to, and its creation date. When you sign in, your browser keeps a sign-in token
          in its local storage until you sign out or the token expires.
        </li>
        <li>
          <strong>Map.</strong> The map loads images from the OpenStreetMap tile servers, which receive your IP address as
          for any web request (see the OpenStreetMap Foundation privacy policy).
        </li>
        <li>We do not collect health information about individuals.</li>
      </ul>

      <h2>Where data is stored</h2>
      <p>
        The service is hosted by Railway in its Singapore region. Data is therefore stored and processed outside Vietnam,
        and the provider may process some of it in other countries, including the United States, under its own
        data-processing terms.
      </p>

      <h2>How long we keep it</h2>
      <p>
        The demonstrator holds only test accounts and sample content. We delete your data within 15 days when you ask us
        to, and we delete all demonstrator data when the demonstrator ends. If the platform is later opened to real users,
        detailed retention periods will apply and this notice will be updated first.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to access, correct or delete your data, or to withdraw a consent, by writing to <ContactEmail />. This
        works even without an account. We answer within 15 days.
      </p>

      <h2>Children</h2>
      <p>Accounts are for people aged 16 or older. Younger pupils can use the public pages without an account.</p>

      <h2>Changes</h2>
      <p>
        We will update this notice before any change in how we process data, and show the date of the last update above.
      </p>
    </LegalPage>
  );
}
