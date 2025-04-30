import { useResume } from "@/contexts/ResumeContext";
import { AboutData } from "@/types/resume";
import Link from "next/link";

export default function Person() {
  const { data } = useResume();
  const sectionData = data?.about as AboutData;

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
        {sectionData.title}
      </h1>
      <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-700 dark:text-slate-200 sm:text-xl">
        {sectionData.subtitle}
      </h2>

      <Link
        href="public/cv-ats.pdf"
        className="inline-flex transition-all border border-slate-300 dark:border-neutral-700 hover:border-opacity-0 border-opacity-50 shadow rounded-md bg-white/70 dark:bg-neutral-700/30 px-3 py-2.5 items-center text-slate-800 dark:text-white font-semibold group p-2 text-sm gap-x-2 mt-4 hover:bg-sky-500/25 mr-4"
      >
        <span>ATS CV</span>
      </Link>

      {sectionData.email && (
        <Link
          href={`mailto:${sectionData.email}`}
          className="inline-flex transition-all border border-slate-300 dark:border-neutral-700 hover:border-opacity-0 border-opacity-50 shadow rounded-md bg-white/70 dark:bg-neutral-700/30 px-3 py-2.5 items-center text-slate-800 dark:text-white font-semibold group p-2 text-sm gap-x-2 mt-4 hover:bg-sky-500/25"
        >
          <span>Email me</span>
          <span className="w-2 h-2 rounded-full bg-green-400 duration-1000 animate-pulse"></span>
        </Link>
      )}
    </>
  );
}
