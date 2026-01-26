import React from 'react';
import SideMenu, { DEFAULT_SIDE_MENU_ITEMS } from '../components/SideMenu';
import OverviewContent from '../components/OverviewContent';

const MotionPage: React.FC = () => (
  <div className="w-full h-[75vh] flex bg-current/[0.01] overflow-hidden relative transition-all duration-700">
    <SideMenu items={DEFAULT_SIDE_MENU_ITEMS} />

    <main className="flex-1 overflow-hidden relative p-12 md:pb-[59px] md:pt-[0px] mr-[184px] bg-current/[0.01] flex flex-col">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      ></div>
      <div className="relative z-10 w-full h-full flex flex-col">
        <OverviewContent
          badge="// Motion_Overview"
          title="Motion Design"
          accent="Stories"
          subtitle="Kinetic narratives for products and brands."
          description="From microinteractions to launch films, I choreograph motion that clarifies intent, adds delight, and stays performant across platforms. The goal: motion that feels inevitable, not ornamental."
          highlights={[
            { label: 'Tools', value: 'After Effects / GSAP / Lottie' },
            { label: 'Outcome', value: 'Expressive, Performance-Safe Motion' },
          ]}
        />
      </div>
    </main>
  </div>
);

export default MotionPage;
