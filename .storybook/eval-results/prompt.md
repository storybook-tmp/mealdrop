│
│ # Storybook Setup

│ ## Project Info

│ | Property | Value |
│ |----------|-------|
│ | Version | 10.4.0-alpha.10 |
│ | Renderer | @storybook/react |
│ | Framework | @storybook/react-vite |
│ | Builder | @storybook/builder-vite |
│ | Config Dir | `.storybook` |
│ | Language | TypeScript |
│ | Addons | @storybook/addon-onboarding, @storybook/addon-themes,
│ @storybook/addon-docs, @storybook/addon-designs,
│ @storybook/addon-vitest, @storybook/addon-a11y,
│ storybook-addon-pseudo-states, @chromatic-com/storybook |

│ Your goal is to make Storybook fully functional in this project:
│ configure `.storybook/preview.tsx` with the right decorators, add MSW
│ for data, and write up to 10 colocated `*.stories.tsx` files. Add
│ `play` functions only where they prove something non-trivial.

│ ## Rules of engagement (follow strictly — these are time budgets, not
│ suggestions)

│ 1. **Discover with Glob/Grep, not shell.** Never use `ls`, `find`,
│ `cat`, `head`, `tail`, or shell `grep`. Use the `Glob`, `Grep`, and
│ `Read` tools.
│ 2. **Read budget: ~12 files for discovery.** Before writing any code
│ you may Read at most ~12 files (`index.html`, entry, App, providers,
│ routing, root CSS, 2–3 representative pages/components, 1–2 hooks, 1
│ test). If you need more, summarize and move on.
│ 3. **Edit > Write.** For any file you've Read, use `Edit`. Use `Write`
│ only for new files.
│ 4. **Batch the test loop.** Do **not** run vitest after every story.
│ Write all your stories first, then run vitest **once**. Iterate
│ per-failing-file only after the batch run.
│ 5. **One TodoWrite at start, one at end.** Don't churn the todo list
│ mid-task.
│ 6. **Detect the package manager once** from the lockfile
│ (`pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, `bun.lockb` → bun,
│ otherwise npm) and use it for every install in this trial.
│ 7. **Prefer fixing the shared `.storybook/preview.tsx`** over
│ story-local workarounds when multiple stories fail the same way.
│ 8. **Stop when the success criteria are met** — don't keep polishing.

│ ## Plan (do not skip steps, but keep each step lean)

│ ### Step 1 — Discover the runtime (≤12 reads)

│ Identify, in this order, using Glob/Grep first then targeted Reads:

│ - `index.html` — `<link rel="stylesheet">` tags, inline `<style>`
│ blocks, fonts, and any `<div id="...">` mount or portal roots that
│ aren't created by JS
│ - entry file (`main.tsx` / `index.tsx`) — providers wrapping `<App
│  />`, root CSS imports
│ - `App.tsx` — top-level layout, router usage, providers it consumes
│ - providers / context files — what they expose
│ - root CSS — global styles, CSS variables, theme tokens (both
│ JS-imported CSS **and** anything linked from `index.html`)
│ - data hooks — `fetch(...)`, `useQuery`, `axios`, etc. (capture base
│ URL + endpoints actually called during render)
│ - browser state actually read at render —
│ `localStorage`/`sessionStorage`/cookie keys
│ - portal targets — `createPortal(...)` and the DOM ids it mounts to
│ (e.g. `#modal-root`)
│ - 1–2 real page or feature components (your story source-of-truth for
│ JSX patterns)

│ Stop reading once you can answer: _"What providers, CSS, browser
│ state, and network calls must the preview supply for a typical page to
│ render?"_

│ ### Step 2 — Build the shared preview

│ Set up Storybook **once** so most stories work without per-story
│ setup. Put everything shared in `.storybook/preview.tsx`.

│ ```tsx
│ // .storybook/preview.tsx
│ import '../src/index.css';
│ import MockDate from 'mockdate';
│ import { definePreview } from 'storybook/preview';
│ import { initialize, mswLoader } from 'msw-storybook-addon';
│ import { SessionProvider } from '../src/contexts/SessionContext';
│ import { mswHandlers } from './msw-handlers';

│ initialize({ onUnhandledRequest: 'bypass' });

│ export default definePreview({
│ decorators: [
│ (Story) => (
│ <SessionProvider>
│ <Story />
│ </SessionProvider>
│ ),
│ ],
│ loaders: [mswLoader],
│ parameters: { msw: { handlers: mswHandlers } },
│ async beforeEach() {
│ localStorage.setItem('theme', 'dark');
│ MockDate.set('2024-04-01T12:00:00Z');
│ },
│ });
│ ```

│ Rules for the preview:

│ - Use the **real** provider tree and the **real** root CSS import.
│ Don't invent providers.
│ - If the app's CSS is loaded via `<link>` in `index.html` (rather than
│ imported in JS), import the same file from preview so stories render
│ with the same styles.
│ - Seed only the specific browser-state keys the app actually reads. Do
│ **not** clear all of `localStorage`/`sessionStorage`/cookies, and do
│ not reset Storybook's own state.
│ - Use `mockdate` only when render output depends on the date.
│ - Do not mock `window`, `document`, `navigator`, observers, or `fetch`
│ directly.

│ ### Step 3 — Portals (in a decorator, not preview-body.html)

│ If you found `createPortal(..., document.getElementById('foo'))` in
│ Step 1, **add a decorator in `.storybook/preview.tsx` that creates the
│ portal root** before the story renders. Do not use
│ `preview-body.html`.

│ ``tsx
│  // Inline the decorator inside `decorators` so its argument type is
│  inferred:
│  export default definePreview({
│  decorators: [
│  (Story) => {
│  for (const id of ['modal-root', 'drawer-root', 'toast-root']) {
│  if (!document.getElementById(id)) {
│  const el = document.createElement('div');
│  el.id = id;
│  document.body.appendChild(el);
│  }
│  }
│  return <Story />;
│  },
│  // ...your other decorators
│  ],
│  });
│  ``

│ Add the decorator to `decorators` in `definePreview`. Skip this step
│ entirely if portals only target `document.body`.

│ ### Step 4 — MSW handlers (only what stories will hit)

│ Use `msw-storybook-addon`. Install with:

│ `bash
│  <your-package-manager> add -D msw msw-storybook-addon mockdate
│  npx msw init ./public --save
│  `

│ Make sure `.storybook/main.ts` serves `./public`:

│ ```ts
│ // .storybook/main.ts
│ import type { StorybookConfig } from '@storybook/react-vite';

│ const config: StorybookConfig = { staticDirs: ['../public'] };
│ export default config;
│ ```

│ Put handlers in `.storybook/msw-handlers.ts`. Cover only the endpoints
│ your stories will exercise — no catch-alls.

│ ```ts
│ // .storybook/msw-handlers.ts
│ import { http, HttpResponse } from 'msw';

│ export const mswHandlers = {
│ products: [
│ http.get(']8;;https://api.example.com/products',https://api.example.com/products',]8;;
│ () =>
│ HttpResponse.json({ items: [{ id: 'p1', name: 'Example', price: 42 }]
│ })
│ ),
│ ],
│ };
│ ```

│ ### Step 5 — Write up to 10 story files (in one batch)

│ Pick ~10 meaningful targets from the real codebase (low-level reusable
│ → page components). Skip subcomponents, hooks, contexts, helpers, and
│ `App` itself when real page components exist.

│ Each story file: ~3 exports for typical components, up to ~10 when
│ warranted by real usage. Copy JSX patterns from real
│ pages/routes/tests.

│ **Tag every new story file with `['ai-generated', 'needs-work']` from
│ the start.** You will remove `'needs-work'` only after vitest confirms
│ the file passes (Step 7). This way, anything not yet verified —
│ including stories you ran out of time to fix — stays correctly marked.

│ ```tsx
│ import preview from '#.storybook/preview';
│ import { expect } from 'storybook/test';
│ import { Button } from './Button';

│ const meta = preview.meta({
│ component: Button,
│ tags: ['ai-generated', 'needs-work'], // strip 'needs-work' once
│ vitest passes
│ });

│ // Smoke check — one is enough per file
│ export const Primary = meta.story({
│ args: { children: 'Order now' },
│ play: async ({ canvas }) => {
│ await expect(canvas.getByRole('button', { name: /order now/i
│ })).toBeVisible();
│ },
│ });

│ // Non-trivial: asserts the global stylesheet actually loaded
│ export const CssCheck = meta.story({
│ args: { children: 'Submit' },
│ play: async ({ canvas }) => {
│ const button = canvas.getByRole('button', { name: /submit/i });
│ await expect(getComputedStyle(button).backgroundColor).toBe('rgb(32,
│ 32, 32)');
│ },
│ });

│ // Variant-only stories: no play needed
│ export const Clear = meta.story({ args: { children: 'Cancel', clear:
│ true } });
│ export const Large = meta.story({ args: { children: 'Checkout', large:
│ true } });
│ export const WithIcon = meta.story({ args: { icon: 'cart',
│ 'aria-label': 'food cart' } });
│ ```

│ Story rules:

│ - Start every meta with `tags: ['ai-generated', 'needs-work']`.
│ - Show all imports explicitly.
│ - Don't add a custom `title`.
│ - Don't build large story-specific harnesses — fix preview instead.
│ - Don't create new app components.

│ ### Step 6 — Add `play` functions only where they prove something
│ non-trivial

│ **Do not put a `play` on every story.** A `play` is worth writing only
│ when it asserts something the rendered output alone doesn't already
│ prove. Prefer one good `play` per file over five redundant ones.

│ Write a `play` when it can verify:

│ - an **interaction** (form fill + submit, click → menu opens, tab
│ change reveals panel)
│ - **async data** actually arrived from MSW (waiting for mocked content
│ to replace a spinner)
│ - a **portal** rendered into the right root (query via
│ `canvasElement.ownerDocument`)
│ - a **CSS-driven state** that matters semantically (e.g. theme color,
│ disabled styling, layout that confirms the global stylesheet loaded)
│ - **accessibility** that the component is responsible for (correct
│ role/label exposure)

│ **Skip `play` entirely** when a story is just a static variant of the
│ same component (different `args`, no new behavior). Repeating
│ `getByRole(...).toBeVisible()` across `Clear`, `Large`, `WithIcon`
│ etc. is redundant — the render itself already fails the test if the
│ component throws or doesn't mount.

│ Concretely, in a `Button.stories.tsx` with `Primary`, `CssCheck`,
│ `Clear`, `Large`, `WithIcon`:

│ - `Primary` — keep one smoke `play` (one is enough for the file).
│ - `CssCheck` — keep the `play` (it asserts a computed style —
│ non-trivial).
│ - `Clear`, `Large`, `WithIcon` — **no `play`**. They're variant-only
│ stories.

│ Use `expect`, `waitFor` from `storybook/test`. Use `canvas` and
│ `userEvent` from the `play` context (don't import `userEvent`; don't
│ manually `within(canvasElement)`). Use `canvasElement.ownerDocument`
│ only for portal queries.

│ `tsx
│  export const FilledForm = meta.story({
│  play: async ({ canvas, userEvent }) => {
│  await userEvent.type(canvas.getByLabelText('email'), 'a@b.com', {
│  delay: 50 });
│  await userEvent.click(canvas.getByRole('button', { name: /submit/i
│  }));
│  await expect(await canvas.findByText(/welcome/i)).toBeVisible();
│  },
│  });
│  `

│ ### Step 7 — Verify in one batch, then iterate only on failures

│ Once **all** files are written, run vitest once across the new
│ stories:

│ `bash
│  npx vitest --project storybook run
│  `

│ Then run the project's TypeScript check (use the script from
│ `package.json` — typically `tsc --noEmit` or `<pm> run typecheck`).

│ For each failure:

│ 1. Read the error.
│ 2. If multiple stories share the failure, fix the shared preview
│ setup, not the stories.
│ 3. Re-run vitest **only for the affected file(s)**: `npx vitest
│  --project storybook run path/to/Foo.stories.tsx`.
│ 4. Repeat until the file passes, then move on.

│ **After a file passes**, edit its meta and remove `'needs-work'` so
│ its tags become `['ai-generated']`. Files you couldn't fix after a
│ couple of attempts keep `['ai-generated', 'needs-work']` — move on,
│ don't loop forever.

│ ### Step 8 — Clean up

│ Before finishing, remove debug code, broad mocks added during
│ diagnosis, unused deps, and eval artifacts.

│ ## Done when

│ - Every story file you wrote that vitest confirmed passing has had
│ `'needs-work'` stripped, leaving `tags: ['ai-generated']`. Anything
│ still failing keeps `['ai-generated', 'needs-work']`.
│ - `npx vitest --project storybook run` passes for the new files.
│ - The project's TypeScript check passes for changed files.
│ - The shared preview is strong enough that stories don't need
│ per-story fetch/provider workarounds.

│ ## Reference (only fetch if stuck)

│ - Docs index: ]8;;https://storybook.js.org/llms.txthttps://storybook.js.org/llms.txt]8;;
│ - Writing stories: ]8;;https://storybook.js.org/docs/10/writing-stories.md?renderer=react&language=tshttps://storybook.js.org/docs/10/writing-stories...]8;;
│ - Decorators: ]8;;https://storybook.js.org/docs/10/writing-stories/decorators.md?renderer=react&language=tshttps://storybook.js.org/docs/10/writing-stories/deco...]8;;
│ - Play functions: ]8;;https://storybook.js.org/docs/10/writing-stories/play-function.md?renderer=react&language=tshttps://storybook.js.org/docs/10/writing-stories/...]8;;
│ - Vitest integration: ]8;;https://storybook.js.org/docs/10/writing-tests/vitest-plugin.md?renderer=react&language=tshttps://storybook.js.org/docs/10/writing-test...]8;;

│ Append `?codeOnly=true` to any docs URL for code-only snippets. Don't
│ fetch unless a specific question can't be answered from this prompt.