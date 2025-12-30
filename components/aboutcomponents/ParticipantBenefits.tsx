export default function ParticipantBenefits({ isAr }: { isAr: boolean }) {
  const items = [
    {
      title: isAr ? "مهارات حياتية ومهنية قابلة للتطبيق" : "Practical Life & Professional Skills",
      desc: isAr
        ? "اكتسب مهارات يمكن تطبيقها مباشرة في حياتك اليومية وسوق العمل."
        : "Gain skills that can be directly applied in your daily life and the workplace.",
    },
    {
      title: isAr ? "شهادة معتمدة ومصدّقة" : "Certified & Accredited Certificate",
      desc: isAr
        ? "احصل على شهادة رسمية تعزز فرصك الوظيفية."
        : "Receive an official certificate that boosts your career opportunities.",
    },
    {
      title: isAr ? "تأهيل فعلي لسوق العمل" : "Real Job Market Preparation",
      desc: isAr
        ? "استعد للعمل بشكل فعلي من خلال برامج عملية وتجريبية."
        : "Prepare effectively for the job market through practical and hands-on programs.",
    },
    {
      title: isAr ? "فرصة للمشاركة في معرض التوظيف" : "Opportunity to Attend Job Fair",
      desc: isAr
        ? "اعرض مهاراتك وخبراتك أمام الشركات والمؤسسات الباحثة عن مواهبك."
        : "Showcase your skills and experience to companies and organizations seeking talent.",
    },
    {
      title: isAr ? "دعم التوجه نحو العمل الحر والمشاريع الصغيرة" : "Support for Freelancing & Small Businesses",
      desc: isAr
        ? "نوفر لك الإرشاد والموارد لبدء مشاريعك الخاصة والعمل الحر."
        : "We provide guidance and resources to start your own projects and freelance work.",
    },
  ];

  return (
    <section className="bg-white py-28">
      <h2 className="text-3xl font-bold centert mb-16 text-[#397a34]">
        {isAr ? "ما يحصل عليه المشارك" : "What Participants Receive"}
      </h2>

      <div className="flex flex-wrap  justify-center gap-8 px-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex-1 min-w-[350px] max-w-sm rounded-2xl bg-green-50 p-8 text-center shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <h3 className="font-semibold mb-3 text-lg text-[#397a34]">
              {item.title}
            </h3>
            <p className="text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
