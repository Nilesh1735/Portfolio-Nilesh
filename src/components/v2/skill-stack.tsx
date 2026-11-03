import { STACK } from "@/data/stack";

export default function SkillStack() {
  return (
    <div className="space-y-8">
      {STACK.map((group) => (
        <div key={group.title}>
          <h3 className="mb-3 flex items-center gap-2 text-[15.2px] text-foreground">
            <span aria-hidden="true" style={{ color: "var(--brand-text)" }}>
              ✦
            </span>
            {group.title}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-[12.8px] text-foreground/90"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
