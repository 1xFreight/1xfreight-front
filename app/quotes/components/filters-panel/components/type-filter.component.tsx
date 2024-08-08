export default function TypeFilterComponent({ type, setType, typeEnum }: any) {
  return (
    <div className={"quote-type-filter-selector"}>
      {(Object.keys(typeEnum) as Array<keyof typeof typeEnum>).map(
        (key, index) => (
          <div
            key={"quote-type-filter-selector" + index}
            className={`type-selector ${type === key ? "active" : ""}`}
            onClick={() => setType(typeEnum[key])}
          >
            {key}
          </div>
        ),
      )}
    </div>
  );
}
