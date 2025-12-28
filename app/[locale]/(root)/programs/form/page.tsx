import { Button } from '@/components/ui/button'
import { formData } from '@/data/homedata'

type Locale = 'en' | 'ar'

interface CourseFormPageProps {
  params: {
    locale: Locale
  }
}

export default async function CourseFormPage({ params }: CourseFormPageProps) {
  const { locale } = await params
  const isAr = locale === 'ar'

  return (
    <section className="min-h-screen bg-green-50 py-20 text-gray-900" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">

        <header className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-4 text-[#397a34]">
            {isAr ? 'نموذج تسجيل البرنامج' : 'Program Registration Form'}
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            {isAr
              ? 'يرجى ملء المعلومات التالية بدقة لإكمال التسجيل.'
              : 'Please fill in the following information accurately to complete your registration.'}
          </p>
        </header>

        <form className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-md space-y-8">

          <fieldset>
            <legend className="text-xl font-semibold mb-6">{isAr ? 'الاسم الكامل' : 'Full Name'}</legend>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Input label={isAr ? 'الاسم الأول' : 'First Name'} name="firstName" />
              <Input label={isAr ? 'اسم الأب' : 'Father Name'} name="fatherName" />
              <Input label={isAr ? 'اسم الجد' : 'Grandfather Name'} name="grandfatherName" />
              <Input label={isAr ? 'اسم العائلة' : 'Family Name'} name="familyName" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xl font-semibold mb-4">{isAr ? 'الجنس' : 'Gender'}</legend>
            <div className="flex gap-10">
              <Radio name="gender" value="male" label={isAr ? 'ذكر' : 'Male'} />
              <Radio name="gender" value="female" label={isAr ? 'أنثى' : 'Female'} />
            </div>
          </fieldset>

          <Input label={isAr ? 'تاريخ الميلاد' : 'Date of Birth'} name="birthDate" type="date" />

          <Select
            label={isAr ? 'المدينة' : 'City of Residence'}
            name="city"
            options={formData.saudiCities.map(city => ({ value: city, label: city }))}
            placeholder={isAr ? 'اختر المدينة' : 'Select City'}
          />

          <Input label={isAr ? 'المؤهل التعليمي' : 'Educational Qualification'} name="qualification" />
          <Input label={isAr ? 'التخصص' : 'Specialization'} name="specialization" />

          <fieldset>
            <legend className="text-xl font-semibold mb-6">{isAr ? 'بيانات الاتصال' : 'Contact Information'}</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label={isAr ? 'رقم الهاتف' : 'Phone Number'} name="phone" />
              <Input label={isAr ? 'البريد الإلكتروني' : 'Email Address'} name="email" type="email" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xl font-semibold mb-6">{isAr ? 'اختيار البرنامج' : 'Program Selection'}</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label={isAr ? 'البرنامج الحياتي' : 'Life Program'}
                name="lifeProgram"
                options={formData.lifePrograms.map(p => ({ value: p.id, label: p.name }))}
              />
              <Select
                label={isAr ? 'البرنامج الاحترافي' : 'Professional Program'}
                name="professionalProgram"
                options={formData.professionalPrograms.map(p => ({ value: p.id, label: p.name }))}
              />
            </div>
          </fieldset>

          <div className="border-t pt-6">
            <label className="flex items-start gap-3 text-gray-700">
              <input type="checkbox" required className="mt-1" />
              {isAr
                ? 'أؤكد أن جميع المعلومات المقدمة دقيقة وصحيحة.'
                : 'I confirm that all provided information is accurate and correct.'}
            </label>
          </div>

          <Button type="submit" className="w-full bg-[#397a34] text-white hover:bg-green-700 py-6 text-lg">
            {isAr ? 'إرسال الطلب' : 'Submit Application'}
          </Button>

        </form>
      </div>
    </section>
  )
}

function Input({ label, name, type = 'text' }: any) {
  return (
    <div>
      <label className="block mb-2 font-medium text-gray-800">{label}</label>
      <input
        type={type}
        name={name}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#397a34]"
      />
    </div>
  )
}

function Select({ label, name, options, placeholder }: any) {
  return (
    <div>
      <label className="block mb-2 font-medium text-gray-800">{label}</label>
      <select
        name={name}
        required
        defaultValue=""
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#397a34]"
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

function Radio({ name, value, label }: any) {
  return (
    <label className="flex items-center gap-2 font-medium text-gray-800">
      <input type="radio" name={name} value={value} required className="accent-[#397a34]" />
      {label}
    </label>
  )
}
