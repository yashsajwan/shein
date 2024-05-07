"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchPrivacyData } from '../../utils/databaseService';

const TermsAndConditions = () => {
  const { data:privacyPolicyData} = useQuery({
    queryKey: ["privacy-policy"],
    queryFn: () => fetchPrivacyData(),
    // 
    // keepPreviousData: true,
    // enabled: isClient,
});
// console.log("privacyPolicyData",privacyPolicyData);
  return (
    <>
    {
  privacyPolicyData&&
  <div className='px-body my-5'
  dangerouslySetInnerHTML={{ __html:privacyPolicyData?.terms}} />
}
    </>
  )
}

export default TermsAndConditions