import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';

export const metadata: Metadata = { title: 'Community standards — AirConnect Hanoi' };

export default function CommunityStandards() {
  return (
    <LegalPage title="Community standards">
      <p>
        The public feedback board is not open yet. When it opens, every feedback report will be checked by a moderator
        before publication, and a report will be published only if it:
      </p>
      <ul>
        <li>contains no personal data (no names, phone numbers, addresses or photos that identify people);</li>
        <li>contains no insults, threats or hateful content;</li>
        <li>does not name or accuse individuals;</li>
        <li>contains no advertising;</li>
        <li>is about air pollution around schools or about difficulties in implementing solutions;</li>
        <li>is not a duplicate of an existing report.</li>
      </ul>
      <p>
        A published report will be labelled &quot;Unverified report&quot; until the platform team has checked the facts.
        A rejected report will get a reason, and signed-in readers will be able to flag a published report to the
        moderators.
      </p>
    </LegalPage>
  );
}
