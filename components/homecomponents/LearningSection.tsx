import { Button } from '@/components/ui/button'

export default function LearningSection() {
  return (
    <section className="bg-green-50">
      <div className="container mx-auto px-6 py-28">
        <div
          className="
            grid grid-cols-1 md:grid-cols-2
            gap-16
            items-center
            max-w-5xl
            mx-auto
            text-center md:text-left
          "
        >
          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-[#397a34]">
              Learn at Your Own Pace
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              Access courses anytime from any device.
            </p>

            <Button
              size="lg"
              className="
                bg-[#397a34]
                text-white
                rounded-full
                px-10
                py-4
                font-semibold
                hover:bg-[#2f642b]
                transition
              "
            >
              Start Learning
            </Button>
          </div>

          {/* Preview Box */}
          <div
            className="
              h-72
              bg-white
              rounded-3xl
              border border-[#6ab742]/30
              shadow-sm
              flex
              items-center
              justify-center
              text-[#397a34]
              font-semibold
              text-lg
            "
          >
            Platform Preview
          </div>
        </div>
      </div>
    </section>
  )
}
