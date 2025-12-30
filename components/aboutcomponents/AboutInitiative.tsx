export default function AboutInitiative({ isAr }: { isAr: boolean }) {
  return (
    <section className="bg-[#6ab742]/10 py-16">
      <div className="mx-auto px-4 max-w-5xl">
        <div className="mb-8 ">
          <h2 className="text-3xl centert md:text-4xl font-extrabold text-[#397a34]">
            {isAr ? "عن المبادرة" : "About the Initiative"}
          </h2>
        </div>

        <div className="text-gray-700 text-base md:text-lg leading-relaxed text-start md:text-left space-y-4">
          {isAr ? (
            <>
              <p>
                مبادرة وطنية تنموية لتمكين <span className="font-bold text-[#397a34]">الإنسان السعودي</span> وبناء الكفاءة نحو جيلٍ 
                <span className="font-bold"> منتج، مؤهل، وقادر على صناعة مستقبل مشرق</span> بعون الله.
              </p>

              <p>
                تعمل مبادرة <span className="font-bold text-[#397a34]">إتقان</span> على تمكين الأفراد، وخصوصًا الشباب من الجنسين، عبر مسارات متكاملة تجمع بين 
                <span className="font-bold"> التأهيل المهني التطبيقي والتأهيل الحياتي السلوكي</span>، بما يعزز الجاهزية لسوق العمل، ويسهم في بناء مجتمع منتج ومستدام، ويعزز ثقافة العمل والإنتاج والمسؤولية المجتمعية.
              </p>

              <p>
                وسيتم إشراك <span className="font-bold text-[#397a34]">الشباب السعودي من الذكور والإناث</span> بشكل مجاني في البرامج الحياتية والمهنية، وسيتم دعم هذه المبادرة من جهات رسمية ومجتمعية بعون الله تعالى.
              </p>

              <p>
                وستكون هذه المبادرة منتهية <span className="font-bold text-[#397a34]">بالتوظيف</span> من خلال عقد مؤتمرات وملتقيات يتم فيها عرض مهارات وكفاءات الخريجين على الشركات والمؤسسات الطالبة لهذه المهارات.
              </p>
            </>
          ) : (
            <>
              <p>
                A national development initiative aimed at empowering <span className="font-bold text-[#397a34]">Saudi individuals</span> and building competencies to create a 
                <span className="font-bold"> productive, qualified generation</span> capable of shaping a bright future, God willing.
              </p>

              <p>
                The <span className="font-bold text-[#397a34]">Itqan Initiative</span> empowers individuals, especially youth of both genders, through integrated pathways combining 
                <span className="font-bold"> practical professional training and life skills development</span>, enhancing readiness for the labor market, contributing to a productive and sustainable society, and promoting a culture of work, productivity, and social responsibility.
              </p>

              <p>
                Saudi youth, both male and female, will participate free of charge in the <span className="font-bold text-[#397a34]">life and professional programs</span>, and this initiative will be supported by official and community entities, God willing.
              </p>

              <p>
                The initiative will culminate in <span className="font-bold text-[#397a34]">employment opportunities</span> through conferences and forums where graduates’ skills and competencies are showcased to companies and organizations seeking these talents.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
