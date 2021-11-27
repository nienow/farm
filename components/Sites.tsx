import * as React from 'react';
import styled from 'styled-components';
import { SITES } from '../data/sites';
import SiteDetails from './SiteDetails';

const SitesContainer = styled.div`
  display: flex;
`

const sites = Object.values(SITES);

const Sites = () => (
  <SitesContainer>
    {sites.map((item) => (
      <SiteDetails key={item.name} site={item} />
    ))}
  </SitesContainer>
)

export default Sites
