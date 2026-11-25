import ScrollFillText from "./ScrollFillText";

type Props = { eyebrow: string; title: string; description?: string };

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
        {eyebrow}
      </p>
      <ScrollFillText
        as="h2"
        text={title}
        className="text-3xl md:text-4xl font-semibold mb-3 text-foreground"
      />
      {description && (
        <ScrollFillText
          text={description}
          className="text-muted-foreground leading-relaxed"
        />
      )}
    </div>
  );
}