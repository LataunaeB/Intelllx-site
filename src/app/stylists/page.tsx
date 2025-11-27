import Link from "next/link";

export default function StylistsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#21193F] to-[#0F172A] text-white">
      {/* HERO */}
      <section className="relative max-w-5xl mx-auto px-4 py-16 md:py-24 overflow-hidden">
        {/* Soft blurred glow behind hero */}
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[580px] h-[580px] bg-[#6D28D9]/30 blur-[130px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
            ✨ Get Fully Booked — Without Babysitting Your DMs
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Your AI Stylist Booking Assistant replies instantly, shares openings, and books clients — while you focus on the hair.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:ring-offset-2 focus:ring-offset-[#0F172A]"
            >
              Get My AI Stylist System
            </Link>
            <a
              href="#demo"
              className="w-full sm:w-auto border-2 border-white/20 hover:bg-white/5 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors"
            >
              Watch 60-Second Demo
            </a>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          If you're a stylist, this probably sounds familiar…
        </h2>
        
        <div className="space-y-4 text-gray-300 mb-6">
          <p>• Missed DMs = missed money</p>
          <p>• Clients ask the same questions daily</p>
          <p>• Bookings scatter across text, IG, apps</p>
          <p>• You're doing hair and customer service</p>
          <p>• Tech feels overwhelming</p>
        </div>
        
        <p className="text-center text-lg font-semibold text-[#06B6D4]">
          Let's fix that.
        </p>
      </section>

      {/* SOLUTION */}
      <section className="bg-white/5 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Meet Your 24/7 Booking Assistant
          </h2>
          
          <div className="space-y-4 text-gray-300 mb-8">
            <p>• Replies instantly</p>
            <p>• Shares your openings</p>
            <p>• Sends your booking link</p>
            <p>• Reduces no-shows</p>
            <p>• Fits your brand</p>
          </div>
          
          <p className="text-center text-lg font-semibold text-white">
            One link. One system. Zero stress.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-4 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#6D28D9] flex items-center justify-center font-black text-2xl">
              1
            </div>
            <p className="font-semibold text-lg">Quick 10–15 min call</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#6D28D9] flex items-center justify-center font-black text-2xl">
              2
            </div>
            <p className="font-semibold text-lg">I build your site + AI assistant</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#6D28D9] flex items-center justify-center font-black text-2xl">
              3
            </div>
            <p className="font-semibold text-lg">You add link to IG/TikTok — bookings start</p>
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section className="bg-white/5 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              Founding Stylist Rate — $247
            </h2>
            <p className="text-center text-gray-300 mb-8">
              Limited spots while I build case studies.
            </p>
            
            <div className="space-y-3 text-gray-200 mb-8">
              <p>• 1-page booking site</p>
              <p>• AI DM assistant</p>
              <p>• Brand-matching design</p>
              <p>• Booking app integration</p>
              <p>• 30 days support</p>
            </div>
            
            <div className="text-center">
              <Link
                href="/contact"
                className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold py-4 px-8 rounded-xl text-lg inline-block transition-colors focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:ring-offset-2 focus:ring-offset-[#0F172A]"
              >
                Apply for the Founding Rate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
          See the 60-Second "Can I Book?" Automation
        </h2>
        <p className="text-center text-gray-300 mb-8">
          A real conversation — fully automated.
        </p>
        
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="space-y-4 text-sm md:text-base">
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                <p className="text-gray-900">Hey, do you have anything open this Saturday?</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="bg-[#6D28D9] rounded-lg p-4 max-w-[80%]">
                <p className="text-white">Yes! I have 10:30am or 1:00pm available. Which works for you?</p>
              </div>
            </div>
            
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                <p className="text-gray-900">10:30 works!</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="bg-[#6D28D9] rounded-lg p-4 max-w-[80%]">
                <p className="text-white">Perfect! You're locked in for Saturday at 10:30am. You'll get a confirmation shortly. ✨</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#6D28D9] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <p className="text-2xl md:text-3xl font-bold">
            Ready to stop losing clients in your DMs?
          </p>
          <p className="text-lg md:text-xl text-white/90">
            Get your Stylist AI Booking System today.
          </p>
          <Link
            href="/contact"
            className="bg-white text-[#6D28D9] hover:bg-gray-100 font-bold py-4 px-8 rounded-xl text-lg inline-block transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#6D28D9]"
          >
            Get My AI Stylist System
          </Link>
        </div>
      </section>
    </div>
  );
}
