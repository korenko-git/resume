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
        <li className="mr-1.5 mt-2" key={skill}>
          <div className="flex items-center rounded-full border border-border border-opacity-70 shadow bg-muted/30 px-3 py-1 text-xs font-medium leading-5 text-muted-foreground">
            {skill}
          </div>
        </li>
      ))}
    </ul>
  );
}
