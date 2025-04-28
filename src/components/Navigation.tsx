"use client";

import { useEffect } from "react";

const MENU = ["about", "experience", "education", "projects", "certifications"];

export default function Navigation({ }) {
  useEffect(() => {
    const menu = document.querySelector(".nav");
    if (!menu || window.innerWidth < 1024) return;
    const observer = new IntersectionObserver(
      (e) => {
        e.forEach((e) => {
          if (e.isIntersecting) {
            const activeItem = menu.querySelector("a[href].active");
            if (activeItem) {
              activeItem.classList.remove("active");
            }

            const newActive = menu.querySelector('a[href="#'.concat(e.target.id, '"]'));
            if (newActive) {
              newActive.classList.add("active");
            }
          }
        });
      },
      {
        rootMargin: "0% 0% -70% 0%",
        threshold: 0,
      }
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="mt-16 w-max">
        {MENU.map((item) => (
          <li key={item}>
            <a
              className="group flex items-center py-3 [&.active_.nav-indicator]:w-16 [&.active_.nav-indicator]:bg-slate-900 dark:[&.active_.nav-indicator]:bg-slate-200 [&.active_.nav-text]:text-slate-900 dark:[&.active_.nav-text]:text-slate-200"
              href={`#${item}`}
            >
              <span className="nav-indicator mr-4 h-px w-8 bg-slate-300 dark:bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-900 dark:group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-900 dark:group-focus-visible:bg-slate-200 motion-reduce:transition-none" />
              <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 transition-colors group-hover:text-slate-900 dark:group-hover:text-slate-200 group-focus-visible:text-slate-900 dark:group-focus-visible:text-slate-200">
                {item}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>

  );
}