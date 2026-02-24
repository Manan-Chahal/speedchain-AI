import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { useCreateLead } from "@/hooks/use-leads";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Google Calendar appointment booking link
const GOOGLE_CALENDAR_BOOKING_URL =
  "https://calendar.app.google/ReTU9J8LCyABx4mA8";

interface LeadFormDialogProps {
  children: React.ReactNode;
}

export function LeadFormDialog({ children }: LeadFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const createLead = useCreateLead();

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
    },
  });

  const openCalendar = () => {
    // Use both methods for reliability against popup blockers
    const newWindow = window.open(GOOGLE_CALENDAR_BOOKING_URL, "_blank");
    if (!newWindow || newWindow.closed) {
      // Popup was blocked — redirect current page
      window.location.href = GOOGLE_CALENDAR_BOOKING_URL;
    }
  };

  const onSubmit = (data: InsertLead) => {
    createLead.mutate(data, {
      onSuccess: () => {
        setSuccess(true);
        form.reset();
        // Open Google Calendar booking page
        openCalendar();
      },
    });
  };

  const handleClose = (val: boolean) => {
    setOpen(val);
    if (!val) setSuccess(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-white/10 text-card-foreground">

        {success ? (
          /* ---- SUCCESS STATE ---- */
          <div className="flex flex-col items-center text-center py-6 gap-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold font-heading">You're In! 🎉</DialogTitle>
              <DialogDescription className="text-muted-foreground mt-1">
                We've received your info. A Google Calendar invite should be opening — pick a time that works for you!
              </DialogDescription>
            </DialogHeader>
            <Button
              className="mt-2 w-full bg-brand-cyan hover:bg-brand-red text-white font-semibold py-6 transition-colors duration-300"
              onClick={openCalendar}
            >
              📅 Open Google Calendar
            </Button>
            <button
              onClick={() => handleClose(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          /* ---- FORM STATE ---- */
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold font-heading">
                Book Your Free Demo
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                See how Speedchain AI can automate your content workflow. No
                commitment required.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="bg-background/50 border-white/10 focus:border-brand-cyan/50" {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@company.com" className="bg-background/50 border-white/10 focus:border-brand-cyan/50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc." className="bg-background/50 border-white/10 focus:border-brand-cyan/50" {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-brand-cyan hover:bg-brand-red text-white font-semibold py-6 mt-2 transition-colors duration-300"
                  disabled={createLead.isPending}
                >
                  {createLead.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Get Started → Book My Time"
                  )}
                </Button>
              </form>
            </Form>
          </>
        )}

      </DialogContent>
    </Dialog>
  );
}
