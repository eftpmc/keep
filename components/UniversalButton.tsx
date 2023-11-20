interface UniversalButtonProps {
  text: string;
  href: string;
  ariaLabel: string;
}

export default function UniversalButton({ text, href, ariaLabel }: UniversalButtonProps) {
  return (
    <a
      className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border"
      href={href}
      rel="noreferrer"
      aria-label={ariaLabel}
    >
      {text}
    </a>
  );
}
