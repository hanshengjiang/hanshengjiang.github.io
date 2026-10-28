# Hansheng Jiang's website

A responsive, single-page academic website for GitHub Pages. Plain HTML, CSS, and a small vanilla JavaScript file; no build step or package installation is required.

## Edit the site

- `index.html` contains the biography, news, research, recognition, teaching, previous experience, and personal sections. Edit content here.
- `style.css` controls layout, typography, mobile breakpoints, reduced motion, and printing. Main section headings use Nunito in muted charcoal, inspired by the reference site; second-level groups use the same Nunito font in orange at a smaller size. The compact navigation also uses Nunito, with teal links and orange hover/active states. Department and service labels retain the normal system sans font in muted gray. The original system sans body text, teal/copper palette, and desktop/mobile type scales are preserved. Main sections use a single full-width column; Recognition uses spacing instead of row dividers.
- Paper authors and outlets intentionally share the same sans font, black color, and weight 300 (16px desktop, 18px mobile). Preserve the original per-paper italic markup and the weight-500 title style. Academic Service uses the regular body weight of 400. Paper notes and Awards & Honors use hollow circle bullets. Links have no default underline; hover/focus use the original copper color.
- Teaching course details, award years, and experience dates share the same muted 15px metadata style at all screen sizes. Course titles, award names, and experience roles use 17px on desktop and 18px on mobile. Experience teams and locations appear together with the same body font, size, and regular body text color.
- Keep Abstract first in each paper's resource buttons, without a plus/minus icon. The dagger denotes a student or postdoc co-author. On October 26, 2026, only the [surprise-bags](https://pubsonline.informs.org/doi/10.1287/msom.2026.0294) and [multiproduct-pricing](https://pubsonline.informs.org/doi/10.1287/msom.2024.0801) abstracts were refreshed from their published journal versions.
- `site.js` enhances navigation, mobile menus, deep links, news-window sizing, and printing. The banner honors the selected section through smooth scrolling, including when short sections share the bottom scroll position; manual scrolling resumes section tracking. On HTTP(S), it also replaces `/index.html` in the address bar with `/`, preserving query strings and section fragments without reloading. Content, section links, abstracts, and the scrollable news list remain usable without it.
- In Tennis, clicking Iga Świątek’s name toggles her signature photo and caption inline without navigation. The name becomes a keyboard-accessible button with an expanded state; without JavaScript, the photo and caption stay visible.
- `analytics.js` uses the existing **Github Personal Page - GA4** web stream (`G-B92B2ZVMPX`, property `341965603`). It runs only on `hanshengjiang.github.io`, after URL cleanup, so local previews do not count as visits. Archived pages contain no Analytics tag. If the site moves to a custom domain, update the hostname guard.
- `research.html`, `teaching.html`, `recognition.html`, and `miscellaneous.html` redirect old links to the relevant section at the clean directory URL. With JavaScript enabled, existing fragments and query strings are preserved.
- `files/`, `figures/`, and `icons/` retain the existing downloads and images. `archived/pre-one-page/` preserves the previous multi-page site and its matching stylesheet; `archived/experience.html` retains the earlier experience page. See [archive notes](archived/README.md) for the source commit and archival adjustments. Keep the four root redirect pages for existing bookmarks.

Keep section IDs and existing abstract IDs stable so bookmarks continue to work. Paper abstracts use native `<details>` and `<summary>` elements. News stays visible in a compact window with its own thin scrollbar, showing six rows when space permits and every update in print. With JavaScript, wheel and touch gestures scroll the page until the reader clicks anywhere in News or enters it with keyboard focus. Clicking or focusing elsewhere, or pressing Escape, returns scrolling to the page; reaching a news-scroll boundary also allows the page to continue. Add new updates to the top of its single list; preserve the `news-archive` bookmark on its existing row. Teaching is followed by Previous Experience and then the personal section, with all listed courses visible in compact entries. Previous Experience groups roles by organization, retaining team names and city, state, and country without work descriptions. Group Berkeley courses under the full school or department names. Omit role labels and use subtle spacing between course names and muted course details, without dash separators. Preserve descriptive links, heading order, image alt text, and `rel="noopener noreferrer"` on links that open a new tab.

## Preview and check

From this directory, run:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`. Check desktop and narrow mobile widths, keyboard navigation, the menu, abstracts, news scrolling, and print preview. Confirm old links such as `research.html#bag_food` open the matching abstract. Run `node --check site.js` after JavaScript changes.

## Publish

GitHub Pages is configured to deploy from the root of the `master` branch. The existing publishing configuration and Google site-verification file remain in place. Once the reviewed changes are committed locally, publish with:

```sh
git push origin master
```

Watch the repository's **pages build and deployment** workflow, then check `https://hanshengjiang.github.io/` and a legacy paper link such as `https://hanshengjiang.github.io/research.html#bag_food`. In Google Analytics, check Realtime for the existing **Github Personal Page - GA4** property after visiting the published site. Local preview deliberately sends no Analytics traffic.

Stage site files explicitly so unrelated local metadata such as `.DS_Store` is not included.
