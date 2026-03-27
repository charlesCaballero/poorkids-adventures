import { motion } from "motion/react";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function Privacy() {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
      <header className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="font-headline font-black text-5xl text-on-surface mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-on-surface-variant text-lg">Last updated: March 27, 2026</p>
        </motion.div>
      </header>

      <div className="space-y-12 bg-surface-container p-8 md:p-12 rounded-[2rem] shadow-sm border border-on-surface-variant/5">
        <section className="space-y-4">
          <div className="flex items-center gap-3 text-primary mb-2">
            <Eye size={24} />
            <h2 className="font-headline font-bold text-2xl">Information We Collect</h2>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            At PoorKids Adventures, we value your privacy. We only collect information that you voluntarily provide to us, such as your name and email address when you subscribe to our newsletter or contact us.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-primary mb-2">
            <Lock size={24} />
            <h2 className="font-headline font-bold text-2xl">How We Use Your Data</h2>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            Your data is used solely to provide you with the services you've requested, such as sending you our latest travel guides or responding to your inquiries. We never sell or share your personal information with third parties for marketing purposes.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-primary mb-2">
            <Shield size={24} />
            <h2 className="font-headline font-bold text-2xl">Data Security</h2>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction. However, please remember that no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3 text-primary mb-2">
            <FileText size={24} />
            <h2 className="font-headline font-bold text-2xl">Cookies</h2>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            We use minimal cookies to enhance your browsing experience and analyze our website traffic. You can choose to disable cookies through your browser settings if you prefer.
          </p>
        </section>

        <div className="pt-8 border-t border-on-surface-variant/10 text-center">
          <p className="text-on-surface-variant italic">
            Questions about our privacy practices? <a href="mailto:hello@poorkidsadventures.com" className="text-primary font-bold hover:underline">Contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
