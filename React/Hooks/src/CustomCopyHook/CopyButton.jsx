import useCopyToClipboard from "./useCopyToClipboard";

export default function CopyButton() {
  const [isCopied, copyToClipboard] = useCopyToClipboard(2000);

  const textToCopy = "React is awesome";

  return (<>
    {textToCopy}<button onClick={() => copyToClipboard(textToCopy)}>
      {isCopied ? "Copied!" : "Copy"}
    </button></>
  );
}
