interface SkillsProps {
  skills: string[];
}

export function Skills({ skills }: SkillsProps) {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
      {skills.map((skill: string) => (
        <li className="mt-2 mr-1.5" key={skill}>
          <div className="border-border border-opacity-70 bg-muted/30 text-muted-foreground lg:group-hover:text-foreground flex items-center rounded-full border px-3 py-1 text-xs leading-5 font-medium shadow">
            {skill}
          </div>
        </li>
      ))}
    </ul>
  );
}
