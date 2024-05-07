import React from 'react'
import PrivacyPolicy from '../../components/ourService/PrivacyPolicy'
import getQueryClient from '../../utils/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import Hydrate from '../../utils/hydrate.client';
import { fetchPrivacyData } from '../../utils/databaseService';

const PrivacyPolicyPage = async() => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["privacy-policy"], fetchPrivacyData);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <PrivacyPolicy/>
      </Hydrate>
  )
}

export default PrivacyPolicyPage