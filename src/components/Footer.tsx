export function Footer() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground md:flex-row">
        <div>
          Built with the GitHub REST API. Not affiliated with GitHub.
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://docs.github.com/rest"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            API Docs
          </a>

          <span>·</span>

          <span>© {new Date().getFullYear()} GH Analyzer</span>
        </div>
      </div>
    </footer>
  );
}