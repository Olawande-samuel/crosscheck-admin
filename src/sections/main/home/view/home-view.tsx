import { MainContent } from 'src/layouts/main';

import HomeHero from '../hero';

// ----------------------------------------------------------------------

export function HomeView() {
  return (
    <MainContent layoutQuery="lg">
      <HomeHero />
    </MainContent>
  );
}
