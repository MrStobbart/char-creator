import * as React from 'react';
import { useTranslation } from 'react-i18next';

export interface HomePageProps {}
export default function HomePage(props: HomePageProps) {
  const [t] = useTranslation();
  return (
    <div>
      <div className='uk-card uk-card-body uk-card-default uk-width-2-3 uk-align-center'>
        <div style={{ textAlign: 'center' }}>
          {t('Willkommen zum Char Creator!')}
          <hr className='uk-divider-icon uk-margin-top' />
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
          sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
          elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
          diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
          et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet.
        </div>
      </div>
    </div>
  );
}
