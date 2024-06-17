export default function ErrorText({ text }: { text: string }) {
  return (
    <span className="text-xs text-red-600 py-[2px] px-1 rounded-lg animate-pulse">
      {text}
    </span>
  )
}
