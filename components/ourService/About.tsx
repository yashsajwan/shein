"use client"
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchAboutData } from '../../utils/databaseService';

const About = () => {
  const { data:AboutData} = useQuery({
    queryKey: ["about"],
    queryFn: () => fetchAboutData(),
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
  AboutData&&
  <div className='px-body my-5'
  dangerouslySetInnerHTML={{ __html:AboutData?.pageContent}} />
}

 </div>
  )
}

export default About