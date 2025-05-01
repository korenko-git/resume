
interface SkillsProps {
  data: { skills: string[]; }
}

export default function Skills({
  data,
}: SkillsProps) {
  return (
    <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
  {data.skills.map((skill: string) => (
    <li className="mr-1.5 mt-2" key={skill}>
      <div className="flex items-center rounded-full border border-neutral-300 dark:border-neutral-700 border-opacity-70 shadow bg-neutral-100 dark:bg-neutral-400/10 px-3 py-1 text-xs font-medium leading-5 text-neutral-700 dark:text-neutral-300">
        {skill}
      </div>
    </li>
  ))}
</ul>
  );
}