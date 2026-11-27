import { CONTACT_EMAIL } from '@/lib/site';

/** Date of the current wording of the legal pages. */
export const LEGAL_LAST_UPDATED = '27 November 2026';

/** The team's contact address, or a visible placeholder until it is configured. */
export function ContactEmail() {
  if (!CONTACT_EMAIL) return <strong>[TO BE COMPLETED: contact email]</strong>;
  return <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
}

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="max-w-3xl mx-auto py-12 px-6 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-sm text-amber-800 mb-8">Draft — pending legal review. Last updated {LEGAL_LAST_UPDATED}.</p>
      <div className="space-y-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:text-gray-900 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
        {children}
      </div>
    </article>
  );
}
