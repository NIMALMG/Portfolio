import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { useState, useEffect } from 'react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mqapnjrg");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  if (state.errors?.some(e => e.code === 'FORM_ERROR')) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 bg-red-100 text-red-700 rounded-lg"
      >
        <p>Form submission failed. Please try again later.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Reload Form
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md">
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 mb-4 bg-green-100 text-green-700 rounded-lg"
        >
          Message sent successfully! I'll get back to you soon.
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full px-4 py-2 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-lg border border-[#7f5af0]/50 text-white focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
            required
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email" 
            name="email"
            className="w-full px-4 py-2 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-lg border border-[#7f5af0]/50 text-white focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="w-full px-4 py-2 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-lg border border-[#7f5af0]/50 text-white focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
            required
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </div>

        <motion.button
          type="submit"
          disabled={state.submitting}
          whileHover={{ scale: 1.05, backgroundColor: '#7f5af0' }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-6 py-3 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-full text-white border border-[#7f5af0]/50 hover:bg-[#7f5af0]/20 transition-colors duration-300 disabled:opacity-50"
        >
          {state.submitting ? 'Sending...' : 'Send Message'}
        </motion.button>
      </form>
    </div>
  );
}
