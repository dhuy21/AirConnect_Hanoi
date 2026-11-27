import type { Metadata } from 'next';
import LegalPage, { ContactEmail } from '@/components/pages/LegalPage';

export const metadata: Metadata = { title: 'Accessibility statement — AirConnect Hanoi' };

export default function Accessibility() {
  return (
    <LegalPage title="Accessibility statement">
      <p>
        <strong>Target:</strong> Web Content Accessibility Guidelines (WCAG) 2.2, level AA.
      </p>
      <p>
        <strong>Current status:</strong> the demonstrator has not been audited and does not yet fully meet this target.
        Known limitations include:
      </p>
      <ul>
        <li>some information on the map is conveyed mainly by colour;</li>
        <li>
          the list of schools that replaces the map for keyboard and screen-reader users is not shown on small screens;
        </li>
        <li>keyboard use and contrast have not been checked on every page.</li>
      </ul>
      <p>
        A full audit is planned before any opening to real users. If you meet a barrier, write to <ContactEmail /> and we
        will help you get the information another way.
      </p>
    </LegalPage>
  );
}
