/**
 * Annual reports shown on the /annual-report page, newest first.
 * To publish a report: put the PDF in public/reports/ (e.g. public/reports/2025.pdf) and add an entry here.
 * While this list is empty the page shows a "coming soon" note.
 */
export type AnnualReport = {
  year: number;
  /** Link to the PDF, e.g. '/reports/2025.pdf' (or an external URL). */
  href: string;
};

export const annualReports: AnnualReport[] = [
  // { year: 2025, href: '/reports/2025.pdf' },
];
