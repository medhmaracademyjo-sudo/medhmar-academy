import React from 'react'
        import GeneralObjectives from "@/components/missionvissioncomponents/objectives/GeneralObjectives"
import LifeObjectives from "@/components/missionvissioncomponents/objectives/LifeObjectives"
import CareerObjectives from "@/components/missionvissioncomponents/objectives/CareerObjectives"
import SocialObjectives from "@/components/missionvissioncomponents/objectives/SocialObjectives"
import SustainableObjectives from "@/components/missionvissioncomponents/objectives/SustainableObjectives"






export default function ObjectivesSection({ isAr }: { isAr: boolean }) {
   
  return (
    <div>


<GeneralObjectives isAr={isAr} />
<LifeObjectives isAr={isAr} />
<CareerObjectives isAr={isAr} />
<SocialObjectives isAr={isAr} />
<SustainableObjectives isAr={isAr} />

      
    </div>
  )
}
