# Repository instructions

Read [README.md](README.md) for the site structure, editing conventions, preview checks, and publishing workflow.

## Homepage analytics

- When asked for personal homepage stats, section analytics, or the link to that report, provide [Homepage stats](https://analytics.google.com/analytics/web/#/analysis/a180155243p341965603/edit/QKjlAiQJTRuQxcZ_VGcahQ).

## Paper abstracts

- Show abstract prose without subsection labels such as "Problem definition," "Problem formulation," "Introduction," "Methodology/results," or "Managerial implications." Omit the labels themselves, including any HTML bold tags or LaTeX `\bf` / `\textbf` used for them, while preserving the substantive prose, equations, and dropdown behavior.

## CV workspace and sync

- Keep the CV project in root-level `cv/`; preserve the `/cv/` and `files/tmp/` ignore rules.
- On another Mac, cloning or pulling the homepage brings over committed instructions and ignore rules, but does not transfer `cv/`, its LaTeX source, or `cv/CV.md`. Their absence is expected; homepage Git operations do not sync the CV project.
- `cv/` is a separate Git repository with Overleaf origin `https://git@git.overleaf.com/6171f1aba4c214bcc175bbbf`; its `main` branch tracks `origin/main`. It contains `academic_CV.tex` and `Hansheng_Jiang_UofT_PI_abbreviated_CV_2page.tex`. A GitHub remote and GitHub sync are not configured; check the actual remotes before assuming otherwise.
- To set up another Mac, run `git -c http.version=HTTP/1.1 clone https://git@git.overleaf.com/6171f1aba4c214bcc175bbbf cv` from the homepage root. Preserve any existing local CV files first (the destination must be absent or empty), then reconcile them with the pulled project.
- Before CV Git operations, confirm `git -C cv rev-parse --show-toplevel` resolves to the `cv/` directory, then run commands explicitly in that checkout.
- The existing CV checkout uses the repository-local setting `http.version=HTTP/1.1`. After verifying a new checkout's Git root, apply it with `git -C cv config --local http.version HTTP/1.1`; keep this setting local to the CV repository.
- When present, read `cv/CV.md` for additional local setup notes; the essential rules here apply even when that file is missing. Keep this note excluded from the CV repository through `cv/.git/info/exclude`, as well as from the homepage through `/cv/`.
- The pre-clone local workspace is preserved at `files/tmp/cv-local-backup-20261126/` on this Mac. Its `academic_CV.tex` differs from the Overleaf version; preserve the backup and reconcile deliberately before replacing either version. This ignored backup does not transfer with the homepage.
- Do not force-add `cv/` to the homepage repository or turn it into a submodule. Keep CV source and sync history separate from homepage commits.
