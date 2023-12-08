interface UniversalButtonProps {
  text: string;
  href: string;
  ariaLabel: string;
}

export default function UniversalButton({ text, href, ariaLabel }: UniversalButtonProps) {
  return (
    <a
      className="py-2 px-3 flex rounded-md no-underline border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      href={href}
      rel="noreferrer"
      aria-label={ariaLabel}
    >
      {text}
    </a>
  );
}
