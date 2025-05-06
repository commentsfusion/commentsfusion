import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      title: "Instant Engagement",
      description: "Capture attention and spark conversation effortlessly with AI-powered, contact-aware comments that drive meaningful interactions and boost visibility in real time.",
      icon: "⚡"
    },
    {
      title: "All languages supported",
      description: "Expand your reach with AI-driven, multilingual comments that engage and convert audiences worldwide. Communicate effectively, no matter the language!",
      icon: "🌍"
    },
    {
      title: "Secure & Reliable",
      description: "Your data and interactions are fully protected with advanced encryption, ensuring a safe and seamless experience while maximizing client engagement.",
      icon: "🔒"
    },
    {
      title: "Personalized tone",
      description: "Engage with your audience using AI-crafted comments that match your online voice, ensuring authentic and meaningful interactions that drive conversions.",
      icon: "💎"
    }
  ];

  return (
    <section className="py-20 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Powerful Features to Supercharge Your <br/>
            <span className="bg-gradient-to-r from-[#00B4D8] to-[#7B2CBF] bg-clip-text text-transparent">Client Acquisition</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative bg-gradient-to-b from-[#0F0F29] to-[#070720] p-8 rounded-xl border border-transparent hover:border-[#00B4D8] transition-all duration-300"
              style={{
                backgroundImage: `
                  linear-gradient(to bottom, #0F0F29, #070720),
                  linear-gradient(45deg, #00B4D8, #7B2CBF)
                `,
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                border: '2px solid transparent'
              }}
            >
              <div className="text-4xl mb-6 text-cyan-400">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#00B4D8] to-[#7B2CBF] bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-[#B4B4CF] text-lg leading-relaxed">{feature.description}</p>
              
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-xl -z-10 bg-gradient-to-r from-[#00B4D8] to-[#7B2CBF] opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}