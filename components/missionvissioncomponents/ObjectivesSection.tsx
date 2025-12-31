import GeneralObjectives from "@/components/missionvissioncomponents/objectives/GeneralObjectives"
import CareerObjectives from "@/components/missionvissioncomponents/objectives/CareerObjectives"
import LifeObjectives from "@/components/missionvissioncomponents/objectives/LifeObjectives"
import SocialObjectives from "@/components/missionvissioncomponents/objectives/SocialObjectives"
import SustainableObjectives from "@/components/missionvissioncomponents/objectives/SustainableObjectives"

export default function ObjectivesSection({ isAr }: { isAr: boolean }) {
  return (
    <div>
            <CareerObjectives isAr={isAr} />

      <GeneralObjectives isAr={isAr} />
        <SocialObjectives isAr={isAr} />
              <LifeObjectives isAr={isAr} />

       <SustainableObjectives isAr={isAr} />
    
     
    </div>
  )
}
