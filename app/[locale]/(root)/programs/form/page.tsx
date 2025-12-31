
import {newApplicationAction} from "./(actions)/newApplicationAction"
import ProgramFormPage from "@/components/aplications/SubmitNewApplication"
import { getProgramsByType } from '@/app/server/programs/services'
type Locale = 'en' | 'ar'

interface CourseFormPageProps {
  params: Promise <{locale:Locale}>
}

export default async function Page({ params }: CourseFormPageProps) {
  const { locale } = await params
const isAr = locale === 'ar'

const allLifePrograms=  (await getProgramsByType("life_programs")).data
const allProfessionalPrograms=  (await getProgramsByType("professional_programs")).data



  return ( 
   <main className=' bg-green-50'>
     <header className="text-center  ">
          <h1 className="text-4xl font-bold  centert text-[#397a34] pt-10 pb-2.5">
            {isAr ? 'نموذج تسجيل البرنامج' : 'Program Registration Form'}
          </h1>
          <p className="text-gray-700 centert max-w-2xl mx-auto">
            {isAr
              ? 'يرجى ملء المعلومات التالية بدقة لإكمال التسجيل.'
              : 'Please fill in the following information accurately to complete your registration.'}
          </p>
        </header>


<ProgramFormPage allLifePrograms={allLifePrograms!} allProfessionalPrograms={allProfessionalPrograms!} action={newApplicationAction} locale={locale}/>

   </main>
  )
}

