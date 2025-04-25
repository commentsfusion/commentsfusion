import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      title: "Instant Engagement",
      description: "Capture attention and spark conversation effortlessly with AI-powered, context-aware commerce that drive meaningful interactions and boost visibility in real time.",
      icon: "👤"
    },
    {
      title: "All languages supported",
      description: "All languages supported. Expand your reach effortlessly with AI-driven, multilingual comments that engage and convert audiences worldwide, communicate effectively, no matter the language!",
      icon: "🌐"
    },
    {
      title: "Secure & Reliable",
      description: "Your data and interactions are fully protected with advanced encryption, ensuring a safe and seamless experience while maximizing client engagement.",
      icon: "🔒"
    },
    {
      title: "Personalized tone",
      description: "Engage with your audience using AI-crafted comments that match your unique voice, ensuring authentic and meaningful interactions that drive conversions.",
      icon: "👥"
    }
  ];

  return (
    <section className="py-20 bg-[#070720] text-white relative overflow-hidden">
      <div className="container mx-auto px-4">
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

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-black/20 p-8 rounded-xl border border-cyan-500/30 backdrop-blur-sm shadow-[0_0_15px_rgba(0,180,216,0.3)] hover:shadow-[0_0_20px_rgba(0,180,216,0.4)] transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}