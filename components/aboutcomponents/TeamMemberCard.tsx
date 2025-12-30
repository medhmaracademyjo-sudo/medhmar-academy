type Props = {
  name: string
  role: string
}

export default function TeamMemberCard({ name, role }: Props) {
  return (
    <div className="bg-green-50 rounded-xl p-6 text-center border border-[#6ab742]/30 hover:shadow-lg transition transform hover:-translate-y-1">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#6ab742]/20 border border-[#6ab742]/30 flex items-center justify-center text-sm text-gray-500 font-medium">
        صورة
      </div>

      <h4 className="font-bold text-[#397a34] text-lg centert">{name}</h4>
      <p className="text-sm text-gray-600 mt-2 centert">{role}</p>
    </div>
  )
}
