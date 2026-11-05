import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/toaster";
import { TooltipProvider } from "./ui/tooltip";

/**
 * The loading splash is deliberately not here.
 *
 * It held the page behind a percentage counter for a fixed 2.5s, and its
 * own comment recorded why: it existed to mask the Spline 3D scene
 * loading. That scene is gone, so the splash was 2.5s of delay in front of
 * a page that paints in ~250ms. The component is still in the tree if a
 * splash is ever wanted for its own sake.
 */
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
    </ThemeProvider>
  );
};
