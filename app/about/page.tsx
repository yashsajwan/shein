import React from 'react'
import About from '../../components/ourService/About'
import getQueryClient from '../../utils/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import Hydrate from '../../utils/hydrate.client';
import { fetchAboutData } from '../../utils/databaseService';

const AboutPage = async() => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["about"], fetchAboutData);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <About/>
      </Hydrate>
  )
}

export default AboutPage;