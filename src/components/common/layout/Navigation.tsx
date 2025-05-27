"use client";

import Link from "next/link";
import { useEffect } from "react";

const MENU = ["about", "experience", "education", "projects", "certifications"];

export function Navigation() {
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
              activeItem.setAttribute("aria-current", "false");
            }

            const newActive = menu.querySelector(
              'a[href="#'.concat(e.target.id, '"]'),
            );
            if (newActive) {
              newActive.classList.add("active");
              newActive.setAttribute("aria-current", "true");
            }
          }
        });
      },
      {
        rootMargin: "0% 0% -70% 0%",
        threshold: 0,
      },
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="nav hidden lg:block"
      aria-label="Resume sections navigation"
    >
      <ul className="mt-16 w-max" role="list">
        {MENU.map((item) => (
          <li key={item}>
            <Link
              className="group [&.active_.nav-indicator]:bg-foreground [&.active_.nav-text]:text-foreground flex items-center py-3 [&.active_.nav-indicator]:w-16"
              href={`#${item}`}
              aria-current="false"
              aria-label={`Navigate to ${item} section`}
            >
              <span
                className="nav-indicator bg-muted-foreground/60 mr-4 h-px w-8 transition-all motion-reduce:transition-none"
                aria-hidden="true"
              ></span>
              <span className="nav-text text-muted-foreground group-hover:text-foreground text-xs font-bold tracking-widest uppercase">
                {item}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
