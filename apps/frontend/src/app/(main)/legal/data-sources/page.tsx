import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';

export const metadata: Metadata = { title: 'Data sources and attribution — AirConnect Hanoi' };

export default function DataSources() {
  return (
    <LegalPage title="Data sources and attribution">
      <ul>
        <li>
          <strong>Map:</strong> ©{' '}
          <a className="underline" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, data
          under the Open Database Licence (ODbL); map tiles from tile.openstreetmap.org, used under the OpenStreetMap tile
          usage policy.
        </li>
        <li>
          <strong>Schools:</strong> names, addresses and locations compiled by the project team from public sources.
          Progress information is shown only when a school has reported it and a moderator has verified it; in the
          demonstrator, no school has reported yet.
        </li>
        <li>
          <strong>Air quality:</strong> no live air-quality data is shown yet. When it is, the source will be named here
          and next to every value (planned: the World Air Quality Index project, aqicn.org).
        </li>
        <li>
          <strong>Health advice:</strong> general guidance based on public advice from Vietnamese authorities; not yet
          reviewed by experts and labelled as draft.
        </li>
      </ul>
    </LegalPage>
  );
}
