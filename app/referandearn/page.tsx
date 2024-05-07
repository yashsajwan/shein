import React from 'react'
import ReferAndEarn from '../../components/referAndEarn/ReferAndEarn'
import HowItWorks from '../../components/referAndEarn/HowItWorks'


const ReferAndEarnPage = async() => {
  return (
    <div className='md:pb-10'>
        <ReferAndEarn/>
        <HowItWorks/>
    </div>
  )
}

export default ReferAndEarnPage