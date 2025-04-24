import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      title: "Instant Engagement",
      description: "Capture attention and spark conversation effortlessly with AI-generated, context-aware comments that resonate with your target audience in real time.",
      icon: "👤"
    },
    {
      title: "All languages supported",
      description: "All languages supported! Expand your reach effortlessly with AI-driven multilingual comments that help you communicate effectively, no matter the language!",
      icon: "🌐"
    },
    {
      title: "Secure & Reliable",
      description: "Your data and interactions are fully protected with advanced encryption, ensuring a safe and seamless experience while you engage with your audience.",
      icon: "🔒"
    },
    {
      title: "Personalized tone",
      description: "Engage with your audience using AI-crafted comments that match your unique voice, ensuring authentic and meaningful interactions that drive real connection.",
      icon: "👥"
    }
  ];

  return (
    <section className="py-20 bg-[#070720] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Powerful Features to Supercharge Your
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Client Acquisition</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-black/20 p-8 rounded-xl border border-cyan-500/30 backdrop-blur-sm"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}