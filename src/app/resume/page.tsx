import ResumeView from "./resume-view";

export const metadata = {
  title: "Résumé | Nilesh Raj",
  description:
    "Résumé of Nilesh Raj, Founder and AI Engineer at AgentNine. View online or download the PDF.",
};

export default function ResumePage() {
  return (
    <>
      {/* The page is a PDF viewer, so the heading is for assistive tech and
          search engines rather than the visual layout. */}
      <h1 className="sr-only">Résumé of Nilesh Raj</h1>
      <ResumeView />
    </>
  );
}
