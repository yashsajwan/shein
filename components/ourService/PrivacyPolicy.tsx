"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchPrivacyData } from '../../utils/databaseService';

const PrivacyPolicy = () => {
  const { data:privacyPolicyData} = useQuery({
    queryKey: ["privacy-policy"],
    queryFn: () => fetchPrivacyData(),
    // 
    // keepPreviousData: true,
    // enabled: isClient,
});
// console.log("privacyPolicyData",privacyPolicyData);


  return (
//     <div
//  dangerouslySetInnerHTML={{ __html: product?.prodaddinfo }} />
<div>
{
  privacyPolicyData&&
  <div className='px-body my-5'
  dangerouslySetInnerHTML={{ __html:privacyPolicyData?.privacy}} />
}

 </div>
  )
}

export default PrivacyPolicy