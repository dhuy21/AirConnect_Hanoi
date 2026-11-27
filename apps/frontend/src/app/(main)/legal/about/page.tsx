import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { ContactEmail } from '@/components/pages/LegalPage';

export const metadata: Metadata = { title: 'About and disclaimer — AirConnect Hanoi' };

export default function About() {
  return (
    <LegalPage title="About and disclaimer">
      <p>
        AirConnect Hanoi is an independent, non-profit project by a team of students. It shows how schools in Hanoi could
        share their progress against air pollution, learn from each other and ask for help.
      </p>
      <ul>
        <li>
          <strong>Independent:</strong> not an official portal and not affiliated with any public authority. It aims to
          work with partners under an agreement in the future.
        </li>
        <li>
          <strong>Demonstrator:</strong> sample content; forms limited to test accounts; not indexed by search engines.
        </li>
        <li>
          <strong>Not medical advice:</strong> see the{' '}
          <Link className="underline" href="/legal/terms">Terms of use</Link>.
        </li>
      </ul>
      <p>
        Contact: <ContactEmail />
      </p>
    </LegalPage>
  );
}
