import { motion } from "framer-motion";
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
  Bot
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

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span>Speedchain AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <LeadFormDialog>
            <Button size="sm" className="bg-white text-black hover:bg-gray-200 font-semibold">
              Get Started
            </Button>
          </LeadFormDialog>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
        
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-medium text-primary-foreground/80">Now accepting early access founders</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold font-heading tracking-tight mb-6 leading-tight">
              Post Daily Content <br />
              <span className="text-gradient-primary">Without Recording Yourself</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              The AI-powered content engine for founders who want to build authority but hate being on camera. 
              Turn 1 idea into 10 videos automatically.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <LeadFormDialog>
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 rounded-full">
                  Book Free Demo <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </LeadFormDialog>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full bg-transparent border-white/10 hover:bg-white/5">
                View Examples
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Videos Created", value: "500+" },
              { label: "Founders Served", value: "50+" },
              { label: "Content Pieces", value: "1000+" },
              { label: "Hours Saved", value: "2500+" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Why Most Founders Fail at Content" 
            subtitle="Consistency builds authority. But consistency is impossible when you're busy building a business."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
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
                className="p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution/Workflow Section */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left scale-110" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader 
            title="Create Content in Your Voice — Without Recording Every Week"
            subtitle="Speedchain AI creates a digital version of you so content can be produced without repeated recording."
          />

          <div className="relative mt-20">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-y-1/2 z-0" />

            <div className="grid md:grid-cols-4 gap-8 relative z-10">
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
                  className="bg-card/80 backdrop-blur-sm border border-white/10 p-8 rounded-2xl text-center relative flex flex-col items-center"
                >
                  <div className="w-16 h-16 mx-auto bg-background rounded-full border-4 border-card flex items-center justify-center mb-6 shadow-xl relative z-20">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  {/* Visual Example for Step 2 */}
                  {i === 1 && (
                    <div className="mb-4 w-full aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 border border-white/5 flex items-center justify-center overflow-hidden">
                      <div className="relative w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center">
                        <Bot className="w-10 h-10 text-primary opacity-50" />
                        <div className="absolute inset-0 border-2 border-primary rounded-full animate-ping opacity-20" />
                      </div>
                    </div>
                  )}

                  <div className="text-sm font-bold text-primary mb-2">STEP {item.step}</div>
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

      {/* Demo Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader title="See Speedchain AI in Action" />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="group relative aspect-video rounded-2xl overflow-hidden bg-card border border-white/10 cursor-pointer"
                  >
                    {/* Abstract video placeholder */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      i % 2 === 0 ? 'from-indigo-900 via-purple-900 to-black' : 'from-blue-900 via-slate-900 to-black'
                    }`} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <PlayCircle className="w-8 h-8 text-white fill-white/20" />
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                      <h4 className="text-white font-bold text-lg">Example Output #{i}</h4>
                      <p className="text-white/60 text-sm">Generated in 2 minutes</p>
                    </div>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-black border-white/10">
                  <div className="aspect-video w-full relative bg-black flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20" />
                    <div className="text-center z-10 p-8">
                      <PlayCircle className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
                      <h3 className="text-2xl font-bold mb-2">Demo Video Placeholder</h3>
                      <p className="text-muted-foreground">This would be an actual video player in production.</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4">
          <SectionHeader title="Is This For You?" />
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mt-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center"><Check className="w-5 h-5" /></span>
                Perfect For
              </h3>
              {[
                "Founders building personal brands",
                "Consultants & Coaches",
                "SaaS Founders needing organic traffic",
                "Agency owners wanting more leads"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-lg text-muted-foreground">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center"><X className="w-5 h-5" /></span>
                Not For
              </h3>
              {[
                "Meme page admins",
                "People who love editing for hours",
                "Founders who don't care about growth",
                "Spammy affiliate marketers"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-lg text-muted-foreground">
                  <X className="w-5 h-5 text-red-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing/Get Started */}
      <section id="pricing" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader title="Start Building Your Authority Today" subtitle="Experience the power of AI content with zero upfront risk." />
          
          <div className="max-w-3xl mx-auto mt-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-12 rounded-3xl border bg-primary/5 border-primary shadow-2xl shadow-primary/10 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-primary uppercase tracking-wider">Limited Time Offer</span>
              </div>
              
              <h3 className="text-4xl font-bold mb-6">Start Today & Get 1-2 Demo Videos</h3>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                See yourself on screen without ever hitting record. We'll create your first 1-2 demo videos for free. 
                Only start paying after your 3rd video if you absolutely love the results.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-12 text-left max-w-xl mx-auto">
                {[
                  "No credit card required to start",
                  "Professional AI avatar creation",
                  "Full script & editing included",
                  "Stop anytime — no contracts"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              
              <LeadFormDialog>
                <Button size="lg" className="w-full sm:w-auto h-16 px-12 text-xl font-bold rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20">
                  Claim Your Free Demo Videos
                </Button>
              </LeadFormDialog>
              
              <p className="mt-8 text-muted-foreground font-medium">
                You can stop anytime. No questions asked.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionHeader title="Frequently Asked Questions" />
          
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Do I need to record any video myself?", a: "No! That's the whole point. Our AI generates the visuals, avatars, or uses stock footage to match your script perfectly." },
              { q: "Can I edit the scripts before you make the video?", a: "Absolutely. You get full approval on all scripts before we generate the final video content." },
              { q: "How fast is delivery?", a: "We typically deliver your weekly batch of content within 48 hours of script approval." },
              { q: "Which platforms does this work for?", a: "Our videos are optimized for vertical formats - perfect for TikTok, Instagram Reels, YouTube Shorts, and LinkedIn video." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="text-lg hover:text-primary transition-colors text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold font-heading mb-8 leading-tight"
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
              <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-white text-black hover:bg-gray-200 font-bold shadow-2xl shadow-white/10">
                Get Started Now - It's Free to Chat
              </Button>
            </LeadFormDialog>
            <p className="mt-6 text-muted-foreground">No credit card required for demo call.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-background text-center md:text-left">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 font-bold text-xl mb-4 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
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
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Speedchain AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
