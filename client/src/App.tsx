import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route component={NotFound} />
    </Switch>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/56985272729"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9999,
        height: "48px",
        borderRadius: "999px",
        backgroundColor: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "0 20px 0 14px",
        boxShadow: "0 4px 16px rgba(37,211,102,0.45)",
        transition: "transform 0.2s, box-shadow 0.2s",
        textDecoration: "none",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.07)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 24px rgba(37,211,102,0.6)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(37,211,102,0.45)";
      }}
    >
      <svg viewBox="0 0 32 32" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.664 4.615 1.816 6.516L4 29l7.697-1.793A11.94 11.94 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 21.917a9.893 9.893 0 01-5.047-1.384l-.361-.214-3.742.871.939-3.63-.236-.374A9.867 9.867 0 016.083 15C6.083 9.52 10.52 5.083 16 5.083S25.917 9.52 25.917 15 21.48 24.917 16 24.917zm5.44-7.422c-.298-.149-1.766-.871-2.04-.97-.273-.099-.472-.148-.67.15-.198.297-.77.97-.944 1.169-.173.198-.347.223-.645.074-.298-.149-1.258-.463-2.396-1.475-.885-.788-1.484-1.76-1.658-2.058-.173-.298-.018-.459.13-.607.134-.134.298-.347.447-.521.149-.173.198-.297.298-.496.099-.198.05-.372-.025-.521-.074-.149-.67-1.617-.918-2.214-.242-.581-.487-.502-.67-.511l-.57-.01c-.198 0-.521.074-.794.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.073.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.695.626.712.226 1.36.194 1.872.118.571-.085 1.766-.722 2.015-1.42.248-.698.248-1.296.173-1.42-.074-.124-.272-.198-.57-.347z"/>
      </svg>
      <span style={{ color: "white", fontWeight: 600, fontSize: "14px", whiteSpace: "nowrap", letterSpacing: "0.01em" }}>
        Contact us
      </span>
    </a>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <WhatsAppButton />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
