export default function Footer() {
  return (
    <footer className="mt-20 flex flex-col items-center justify-center gap-1 text-sm">
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/goquibble"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          goquibble
        </a>
        <span className="text-ctp-overlay0">/</span>
        <a
          href="https://github.com/goquibble/avatars"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          avatars
        </a>
      </div>
      <span className="text-ctp-overlay0">
        © {new Date().getFullYear()} GoQuibble Avatars
      </span>
    </footer>
  );
}
