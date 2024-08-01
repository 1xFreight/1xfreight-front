export default function TagComponent({ title }: { title: string }) {
  const styleMapping = () => {
    switch (title.toUpperCase()) {
      case "FTL":
        return "FTL";
      case "LTL":
        return "LTL";
      case "OCEAN":
        return "OCEAN";
      case "AIR":
        return "AIR";
      default:
        return "";
    }
  };

  return <div className={`partner-tag ${styleMapping()}`}>{title}</div>;
}
