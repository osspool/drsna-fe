function renderInline(text) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  return segments.map((segment, index) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong key={`bold-${index}`}>
          {segment.slice(2, -2)}
        </strong>
      );
    }
    return <span key={`text-${index}`}>{segment}</span>;
  });
}

export function MarkdownContent({ content }) {
  if (!content) return null;
  const lines = content.trim().split("\n");
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul
          className="list-disc pl-6 space-y-2 text-muted-foreground"
          key={`list-${elements.length}`}
        >
          {listItems.map((item, idx) => (
            <li key={`list-item-${idx}`}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList();

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3
          className="text-2xl font-heading font-semibold text-foreground mt-8"
          key={`h3-${index}`}
        >
          {renderInline(trimmed.slice(4))}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2
          className="text-3xl font-heading font-bold text-foreground mt-10"
          key={`h2-${index}`}
        >
          {renderInline(trimmed.slice(3))}
        </h2>
      );
    } else if (trimmed.startsWith(">")) {
      elements.push(
        <blockquote
          className="border-l-4 border-primary/50 bg-primary/5 px-4 py-3 rounded-r-2xl text-muted-foreground italic"
          key={`quote-${index}`}
        >
          {renderInline(trimmed.replace(/^>\s?/, ""))}
        </blockquote>
      );
    } else {
      elements.push(
        <p
          className="text-base text-muted-foreground leading-relaxed mt-4"
          key={`p-${index}`}
        >
          {renderInline(trimmed)}
        </p>
      );
    }
  });

  flushList();

  return <div className="space-y-2">{elements}</div>;
}
