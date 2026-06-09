import React, { useState } from 'react';
import BatchPager from '../components/BatchPager';
import GalleryGrid, { GalleryGridItem } from '../components/GalleryGrid';
import GalleryHeader from '../components/GalleryHeader';
import OverviewContent from '../components/OverviewContent';
import PageSection from '../components/PageSection';
import { SideMenuItem } from '../components/SideMenu';

type SectionKey = 'OVERVIEW' | 'GALLERY';

type GalleryItem = GalleryGridItem;

const ARTS_MENU_ITEMS: SideMenuItem<SectionKey>[] = [
  { key: 'OVERVIEW', label: 'Overview' },
  { key: 'GALLERY', label: 'Gallery' },
];

const asset = (name: string) => `${process.env.PUBLIC_URL}/${encodeURIComponent(name)}`;

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'GA-01', title: 'All in our hand', description: 'Hands-on composition exploring tactile balance.', thumb: asset('All in our hand.webp'), full: asset('All in our hand.png') },
  { id: 'GA-02', title: 'Dawn at Louise', description: 'Mist and light over Lake Louise at daybreak.', thumb: asset('Dawn at Louise.webp'), full: asset('Dawn at Louise.jpeg') },
  { id: 'GA-03', title: 'Graphic Novel', description: 'High-contrast panels in a cinematic grid.', thumb: asset('Graphic Novel.webp'), full: asset('Graphic Novel.webp') },
  { id: 'GA-04', title: 'Kannanaskis', description: 'Peaks and clouds captured in crisp mountain air.', thumb: asset('Kannanaskis.webp'), full: asset('Kannanaskis.webp') },
  { id: 'GA-05', title: 'Letters Agenda', description: 'Typographic play with layered stationery.', thumb: asset('Letters Agenda.webp'), full: asset('Letters Agenda.png') },
  { id: 'GA-06', title: 'Music Festival Poster', description: 'Vibrant gradients for a live event identity.', thumb: asset('Music festival poster.webp'), full: asset('Music festival poster.png') },
  { id: 'GA-07', title: 'Old Picture of an Owl', description: 'Grainy archival portrait with modern tone.', thumb: asset('Old picture of an owl.webp'), full: asset('Old picture of an owl.webp') },
  { id: 'GA-08', title: 'The Central Library', description: 'Architectural study of glass and light.', thumb: asset('The Central Library.webp'), full: asset('The Central Library.png') },
  { id: 'GA-09', title: 'The Galleria Trees', description: 'Interior foliage under geometric skylights.', thumb: asset('The Galleria Trees.webp'), full: asset('The Galleria Trees.png') },
  { id: 'GA-10', title: 'The Last Sniff', description: 'Playful moment frozen in vivid detail.', thumb: asset('The last sniff.webp'), full: asset('The last sniff.webp') },
];

const DigitalArtsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('OVERVIEW');
  const [batch, setBatch] = useState(0);
  const itemsPerPage = 2;
  const totalBatches = Math.ceil(GALLERY_ITEMS.length / itemsPerPage);
  const currentItems = GALLERY_ITEMS.slice(batch * itemsPerPage, (batch + 1) * itemsPerPage);

  return (
    <PageSection
      items={ARTS_MENU_ITEMS}
      activeKey={activeSection}
      onSelect={setActiveSection}
      mobileBadge="// Arts_Sections"
      sideBadge="Arts // Sequence"
      contentKey={activeSection}
    >
      {activeSection === 'OVERVIEW' ? (
        <OverviewContent
          badge="// Arts Overview"
          title="Digital Arts"
          accent="Gallery"
          subtitle="Illustration and photography blends."
          description="Personal explorations in color, texture, and cinematic framing. I combine photography and illustration to explore mood, atmosphere, and visual storytelling for product and brand systems."
          highlights={[
            { label: 'Mediums', value: 'Illustration / Adobe Creative Cloud' },
            { label: 'Vibe', value: 'Color & Texture' },
          ]}
        />
      ) : (
        <div className="flex flex-col h-full overflow-hidden">
          <GalleryHeader
            badge="// Gallery_Overview"
            title="Selected"
            accent="Works"
            currentBatch={batch}
            totalBatches={totalBatches}
          />
          <GalleryGrid items={currentItems} tagLabel="Gallery" />
          <BatchPager
            currentBatch={batch}
            totalBatches={totalBatches}
            onNext={() => setBatch((prev) => (prev + 1) % totalBatches)}
          />
        </div>
      )}
    </PageSection>
  );
};

export default DigitalArtsPage;
