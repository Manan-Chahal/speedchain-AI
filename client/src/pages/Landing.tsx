import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { LeadFormDialog } from "@/components/LeadFormDialog";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Check, 
  X, 
  Video, 
  MicOff, 
  Zap, 
  Clock, 
  TrendingUp, 
  PlayCircle,
  ArrowRight,
  Sparkles,
  Bot,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const VIDEOS = [1, 2, 3, 4];

function ExamplesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const cardWidth = card ? card.offsetWidth + 20 : 340;
    el.scrollBy({ left: direction === "right" ? cardWidth : -cardWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-400 hover:text-brand-cyan hover:border-brand-cyan/50 hover:bg-sky-50 transition-all duration-200"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-400 hover:text-brand-cyan hover:border-brand-cyan/50 hover:bg-sky-50 transition-all duration-200"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Left fade edge */}
      <div className="pointer-events-none hidden sm:block absolute left-10 top-0 bottom-0 w-10 bg-gradient-to-r from-background to-transparent z-10" />
      {/* Right fade edge */}
      <div className="pointer-events-none hidden sm:block absolute right-10 top-0 bottom-0 w-10 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth sm:px-12"
        style={{ justifyContent: "safe center" }}
      >
        {VIDEOS.map((i) => (
          <Dialog key={i}>
            <DialogTrigger asChild>
              <motion.div
                data-card
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i - 1) * 0.1, duration: 0.5, ease: "easeOut" }}
                className="group relative flex-shrink-0 w-[260px] sm:w-[300px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-200 cursor-pointer snap-center shadow-md hover:shadow-brand-cyan/20 hover:border-brand-cyan/30 transition-all duration-300"
                style={{ aspectRatio: "9/16" }}
              >
                {/* Video — #t=0.001 forces iOS Safari to decode & show the first frame */}
                <video
                  src={`/demo${i}.mp4#t=0.001`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  muted
                  playsInline
                  preload="metadata"
                  onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
                  onMouseLeave={(e) => {
                    const v = e.currentTarget as HTMLVideoElement;
                    v.pause();
                    v.currentTime = 0;
                  }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-[11px] font-semibold text-white tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse flex-shrink-0" />
                    AI Generated
                  </span>
                </div>

                {/* Play icon — always visible on mobile, hover-only on desktop */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur border border-white/25 flex items-center justify-center opacity-100 sm:opacity-0 sm:scale-75 sm:group-hover:opacity-100 sm:group-hover:scale-100 transition-all duration-300 ease-out">
                    <PlayCircle className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-semibold text-sm leading-snug">Example Output #{i}</p>
                  <p className="text-white/45 text-xs mt-0.5">Email : growth@speedchain.io
                  </p>
                </div>
              </motion.div>
            </DialogTrigger>

            <DialogContent className="max-w-[92vw] sm:max-w-[360px] w-full p-0 overflow-hidden bg-black border-white/10 rounded-2xl">
              <video
                src={`/demo${i}.mp4`}
                className="w-full block"
                style={{ aspectRatio: "9/16" }}
                controls
                autoPlay
                playsInline
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* Mobile hint */}
      <p className="text-center text-muted-foreground/40 text-xs mt-4 md:hidden">Swipe to see more →</p>
    </div>
  );
}

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-brand-cyan flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span>Speedchain AI</span>
          </div>
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <LeadFormDialog>
              <Button size="sm" className="bg-brand-cyan text-white hover:bg-brand-red font-semibold transition-colors duration-300">
                Get Started
              </Button>
            </LeadFormDialog>
            {/* Mobile hamburger */}
            <button
              className="md:hidden ml-1 p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden bg-white border-t border-slate-100 shadow-md"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
                {[
                  { label: "Features", href: "#features" },
                  { label: "How it Works", href: "#how-it-works" },
                  { label: "Pricing", href: "#pricing" },
                ].map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    className="py-2.5 px-2 text-base font-medium text-slate-700 hover:text-brand-cyan rounded-lg hover:bg-sky-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-brand-cyan/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-teal-600/10 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 mb-6 md:mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs sm:text-sm font-medium text-brand-cyan">Now accepting early access founders</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-7xl font-bold font-heading tracking-tight mb-4 md:mb-6 leading-tight">
              Post Daily Content <br />
              <span className="text-gradient-primary">Without Recording Yourself</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-base sm:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              The AI-powered content engine for founders who want to build authority but hate being on camera. 
              Turn 1 idea into 10 videos automatically.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <LeadFormDialog>
                <Button size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg bg-brand-cyan hover:bg-brand-red text-white shadow-lg shadow-brand-cyan/25 rounded-full transition-colors duration-300">
                  Book Free Demo <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </LeadFormDialog>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full bg-transparent border-slate-300 hover:bg-slate-50 text-slate-700"
                onClick={() => document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Examples
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-8 md:py-10 border-y border-slate-200 bg-sky-50/60">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            {[
              { label: "Videos Created", value: "200+" },
              { label: "Founders Served", value: "30+" },
              { label: "Content Pieces", value: "500+" },
              { label: "Hours Saved", value: "1000+" }
            ].map((stat, i) => (
              <div key={i} className="py-2">
                <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Why Most Founders Fail at Content" 
            subtitle="Consistency builds authority. But consistency is impossible when you're busy building a business."
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 md:mt-16">
            {[
              { icon: Clock, title: "No Time to Record", desc: "Setting up lights, camera, and recording takes hours you don't have." },
              { icon: MicOff, title: "Don't Know What to Say", desc: "Staring at a blank page creates writer's block and anxiety." },
              { icon: Video, title: "Editing is Painful", desc: "Learning Premiere Pro or hiring expensive editors slows you down." },
              { icon: TrendingUp, title: "Inconsistent Posting", desc: "Sporadic content gets punished by algorithms and forgotten by audiences." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 sm:p-6 rounded-2xl bg-white shadow-sm border border-slate-200 hover:border-brand-cyan/50 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-brand-cyan/20 transition-colors">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-cyan" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution/Workflow Section */}
      <section id="features" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-cyan/5 -skew-y-3 transform origin-top-left scale-110" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader 
            title="Create Content in Your Voice — Without Recording Every Week"
            subtitle="Speedchain AI creates a digital version of you so content can be produced without repeated recording."
          />

          <div className="relative mt-12 md:mt-20">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent -translate-y-1/2 z-0" />

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 relative z-10">
              {[
                { step: "01", title: "Record Once", desc: "Share a 2–3 minute video and voice sample introducing yourself and your business.", icon: Video },
                { step: "02", title: "Create Your AI Avatar", desc: "We build your AI avatar and voice model that matches your speaking style and tone.", icon: Bot },
                { step: "03", title: "Share Topics", desc: "Tell us your niche, ideas, or weekly topics.", icon: Sparkles },
                { step: "04", title: "We Create Everything", desc: "Scripts, AI avatar videos, B-roll, captions, and professional editing delivered.", icon: Check }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm p-5 sm:p-8 rounded-2xl text-center relative flex flex-col items-center"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-white rounded-full border-4 border-sky-100 flex items-center justify-center mb-4 sm:mb-6 shadow-lg relative z-20">
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-brand-cyan" />
                  </div>
                  
                  {/* Visual Example for Step 2 */}
                  {i === 1 && (
                      <div className="mb-4 w-full aspect-square rounded-lg bg-gradient-to-br from-sky-50 to-teal-50 border border-sky-200 flex items-center justify-center overflow-hidden">
                      <div className="relative w-20 h-20 rounded-full border-2 border-brand-cyan/30 flex items-center justify-center">
                        <Bot className="w-10 h-10 text-brand-cyan opacity-50" />
                        <div className="absolute inset-0 border-2 border-brand-cyan rounded-full animate-ping opacity-20" />
                      </div>
                    </div>
                  )}

                  <div className="text-sm font-bold text-brand-cyan mb-2">STEP {item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-xl font-medium text-foreground">
              Result: You stay consistent online without spending time recording videos.
            </p>
          </div>
        </div>
      </section>

      {/* Real Client Examples Section */}
      <section id="examples" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-5">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              <span className="text-xs font-bold text-brand-cyan uppercase tracking-widest">100% AI Generated</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading tracking-tight mb-4">
              Real Client Examples
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Every video below was created entirely with AI — no camera, no studio, no editing hours.
            </p>
          </motion.div>

          {/* Carousel wrapper */}
          <ExamplesCarousel />
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 md:py-24 bg-sky-50/60 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <SectionHeader title="Is This For You?" />
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto mt-8 md:mt-12">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center"><Check className="w-5 h-5" /></span>
                Perfect For
              </h3>
              {[
                "Founders building personal brands",
                "Consultants & Coaches",
                "SaaS Founders needing organic traffic",
                "Agency owners wanting more leads"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-base sm:text-lg text-muted-foreground">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center"><X className="w-5 h-5" /></span>
                Not For
              </h3>
              {[
                "Meme page admins",
                "People who love editing for hours",
                "Founders who don't care about growth",
                "Spammy affiliate marketers"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-base sm:text-lg text-muted-foreground">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing/Get Started */}
      <section id="pricing" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader title="Start Building Your Authority Today" subtitle="Experience the power of AI content with zero upfront risk." />
          
          <div className="max-w-3xl mx-auto mt-10 md:mt-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-6 sm:p-10 md:p-12 rounded-3xl border bg-brand-cyan/5 border-brand-cyan shadow-2xl shadow-brand-cyan/10 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 mb-6 sm:mb-8">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-brand-cyan" />
                <span className="text-xs sm:text-sm font-bold text-brand-cyan uppercase tracking-wider">Limited Time Offer</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Start Today & Get 1-2 Demo Videos</h3>
              <p className="text-base sm:text-xl text-muted-foreground mb-7 sm:mb-10 leading-relaxed">
                See yourself on screen without ever hitting record. We'll create your first 1-2 demo videos for free. 
                Only start paying after your 3rd video if you absolutely love the results.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-6 mb-8 sm:mb-12 text-left max-w-xl mx-auto">
                {[
                  "No credit card required to start",
                  "Professional AI avatar creation",
                  "Full script & editing included",
                  "Stop anytime — no contracts"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-brand-cyan" />
                    </div>
                    <span className="text-sm sm:text-base text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              
              <LeadFormDialog>
                <Button size="lg" className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-12 text-lg sm:text-xl font-bold rounded-2xl bg-brand-cyan hover:bg-brand-red text-white shadow-xl shadow-brand-cyan/20 transition-colors duration-300">
                  Claim Your Free Demo Videos
                </Button>
              </LeadFormDialog>
              
              <p className="mt-6 sm:mt-8 text-muted-foreground font-medium">
                You can stop anytime. No questions asked.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-sky-50/70">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionHeader title="Frequently Asked Questions" />
          
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Do I need to record any video myself?", a: "No! That's the whole point. Our AI generates the visuals, avatars, or uses stock footage to match your script perfectly." },
              { q: "Can I edit the scripts before you make the video?", a: "Absolutely. You get full approval on all scripts before we generate the final video content." },
              { q: "How fast is delivery?", a: "We typically deliver your weekly batch of content within 48 hours of script approval." },
              { q: "Which platforms does this work for?", a: "Our videos are optimized for vertical formats - perfect for TikTok, Instagram Reels, YouTube Shorts, and LinkedIn video." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-slate-200">
                <AccordionTrigger className="text-base sm:text-lg hover:text-brand-cyan transition-colors text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm sm:text-lg leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-cyan/10 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold font-heading mb-6 md:mb-8 leading-tight"
          >
            Build Authority Without <br />Spending Time on Content
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <LeadFormDialog>
              <Button size="lg" className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 text-lg sm:text-xl rounded-full bg-brand-cyan text-white hover:bg-brand-red font-bold shadow-2xl shadow-brand-cyan/10 transition-colors duration-300">
                Get Started Now - It's Free to Chat
              </Button>
            </LeadFormDialog>
            <p className="mt-5 text-muted-foreground text-sm sm:text-base">No credit card required for demo call.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 border-t border-slate-200 bg-white text-center md:text-left">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 font-bold text-xl mb-4 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-brand-cyan flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white fill-current" />
                </div>
                <span>Speedchain AI</span>
              </div>
              <p className="text-muted-foreground max-w-sm mx-auto md:mx-0">
                Automating content creation for the world's busiest founders. Scale your personal brand while you sleep.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-brand-cyan transition-colors">About</a></li>
                <li><a href="#" className="hover:text-brand-cyan transition-colors">Careers</a></li>
                <li><a href="mailto:growth@speedchain.io" className="hover:text-brand-cyan transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-brand-cyan transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-brand-cyan transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Speedchain AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
