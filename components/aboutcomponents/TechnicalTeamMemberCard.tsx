// TechnicalTeamMemberCard.tsx
type Props = {
  name: string
  role: string
}

export default function TechnicalTeamMemberCard({ name, role }: Props) {
  return (
    <div className="bg-white border border-[#6ab742]/30 rounded-xl p-4 flex items-center gap-4 max-w-md mx-auto hover:shadow-lg transition transform hover:-translate-y-1">
      
      {/* صورة دائرية على اليسار */}
      <div className="w-24 h-24 rounded-full bg-[#6ab742]/20 border border-[#6ab742]/30 flex items-center justify-center text-sm text-gray-500 font-medium">
        صورة
      </div>

      {/* نص على اليمين */}
      <div className="flex flex-col justify-center">
        <h4 className="font-bold text-[#397a34] text-lg">{name}</h4>
        <p className="text-sm text-gray-600 mt-1">{role}</p>
      </div>
    </div>
  )
}
