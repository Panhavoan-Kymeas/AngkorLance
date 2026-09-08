# AngkorLance — Improvement Plan

> Execution checklist derived from the engineering audit. Ordered by priority.
> Each task has: **why**, **files**, **steps**, **acceptance criteria**.
> An AI agent (or human) should work top‑down and check items off as they land.

## Progress log

Branch: `improvements/p0-fixes`

| Task | Status | Notes |
|---|---|---|
| P0-1 secrets & hygiene | ✅ done | `.env`/`.tar`/uploads untracked, root `.gitignore`, templates filled. **History purge still owed (USER).** |
| P0-2 prod stack | ✅ done | one edge Nginx (`web`), `/api` + `/uploads` proxied (no trailing slash), `env_file`, db healthcheck + `condition`, `VITE_API_URL=/api` build arg, non-root backend image, `.dockerignore`. `docker compose config` validates. Full `up --build` boot not yet run. |
| P0-3 exception handling | ✅ done | RFC 7807 `ProblemDetail` everywhere, typed `ResourceNotFoundException`/`ConflictException`, `AccessDenied`/`Authentication` handlers, generic 500 + `traceId`. Verified by smoke test. |
| P0-4 authz holes | ✅ done | `@PreAuthorize` on job update/delete; `acceptProposal`/`rejectProposal` require job OPEN + proposal PENDING. Smoke-tested (403/409). Unit test still owed → P1-1. |
| P0-5 file upload | ✅ done | uuid filename, MIME allow-list + magic-byte sniff, 5 MB cap, path-escape assert. Fake-image upload → 400 (smoke-tested). `Content-Disposition` not set — png/jpeg/webp only + Spring's `X-Content-Type-Options: nosniff` covers it. |
| P0-6 JWT 401 | ✅ done | `RestAuthEntryPoint` (entry point + access-denied) via `HandlerExceptionResolver`; invalid/expired bearer → 401 JSON. Smoke-tested. |
| P0-7 contract | ✅ done | `tsc -b` in build (passes); image field → `imageUrl`; proposal `proposedPrice` + `status` returned & aligned; `POST /proposals/{id}/reject` added; routes fixed; shared `lib/categories.ts` + `lib/assets.ts` + `lib/apiError.ts`; dead field reads removed. `npm run build` passes. |

Verification run so far: `frontend` `tsc -b` + `vite build` green; `backend` `mvnw test-compile` green; live smoke test against a throwaway Postgres exercised auth, error contract, RBAC, the full post→propose→accept→complete flow, and upload rejection — all as expected.

Not yet done: P1–P3, the git history purge (P0-1, needs force-push), a full `docker compose -f docker-compose.prod.yml up --build` boot, and automated tests (P1-1).

---

## How to use this doc

- Do **P0** before anything else — the app is insecure and does not run in production.
- Do not start a P1 refactor until the P0 items it depends on are done (noted per task).
- When a task changes an API response or route, update the frontend in the **same** change.
- Keep changes small and reviewable; one task ≈ one PR.
- After each task: run `cd backend && ./mvnw verify` and `cd frontend && npm run build` (add `tsc` first — see FE‑BUILD).
- Update the checkbox and add a one‑line note (PR link / commit) when done.

## Conventions

- **Complexity:** S = <½ day, M = ½–2 days, L = >2 days.
- File references use repo‑relative paths and `file:line`.
- "Contract" = the shape of data passed between backend and frontend.

---

# P0 — Critical (broken / insecure / incorrect)

## P0-1 — Remove committed secrets & build artifacts from git
**Why:** `backend/.env` contains a real `JWT_SECRET` → anyone with repo access can forge tokens for any user/role. `frontend.tar` (26 MB) and binary uploads bloat history.
**Files:** `backend/.env`, `frontend/.env`, `frontend/frontend.tar`, `backend/uploads/*.jpg`, `backend/uploads/*.png`, `frontend/screenshots/*`, `backend/.gitignore`, `frontend/.gitignore`, `.gitignore` (root — create).
**Steps:**
- [x] Rotate `JWT_SECRET` to a new 256‑bit random value; keep it **out** of git. *(new secret written to git-ignored `backend/.env`)*
- [x] `git rm --cached` `backend/.env`, `frontend/.env`, `frontend/frontend.tar`, `backend/uploads/*`, junk screenshots (`1.png`, `image.png`). Real README screenshots kept.
- [x] Root `.gitignore` added: `*.env` (+ `!*.env.example`/`!*.env.sample`), `*.tar`, `backend/uploads/*` (+ `!.gitkeep`), `frontend/dist`, `node_modules`.
- [x] `backend/.env.example` and `frontend/.env.sample` filled with placeholder keys + comments. `backend/uploads/.gitkeep` added.
- [ ] **USER ACTION:** purge history with `git filter-repo` (or BFG) **before the repo is made public**; coordinate a re‑clone with collaborators. (Not done here — destructive, needs force‑push.)
**Acceptance:**
- `git ls-files | grep -E '\.env$|frontend\.tar|uploads/[^.]|screenshots/(1|image)\.png'` returns nothing. ✅
- App still boots locally with a `.env` created from the example. ✅ (local `.env` retained, git‑ignored)
**Complexity:** S (history purge adds coordination).

## P0-2 — Make the production stack actually run
**Why:** prod serves no SPA, the `/api` proxy strips the path prefix (all APIs 404), and the backend has no `JWT_SECRET` injected so it cannot start.
**Files:** `docker-compose.prod.yml`, `nginx.prod.conf`, `frontend/nginx.prod.conf`, `frontend/Dockerfile`, `backend/Dockerfile`, new `backend/.env.prod.example`.
**Steps:**
- [ ] Collapse to **one** edge Nginx. Recommended: keep the `frontend` image (it already builds `dist` + runs nginx); delete the standalone `nginx` service. (Or keep `nginx`, mount `dist` into it, and delete `frontend`'s nginx stage — just not both.)
- [ ] In the surviving nginx conf:
  - `location / { try_files $uri /index.html; }`
  - `location /api/ { proxy_pass http://backend:8080; }`  ← **no trailing slash** (keeps the `/api` prefix).
  - `location /uploads/ { proxy_pass http://backend:8080; }`  (backend serves uploaded files at `/uploads/**`).
  - Remove the `/images/` block (path never matches what the backend generates).
- [ ] `backend` service: add `env_file: ./backend/.env.prod` (or explicit `environment:`) with `JWT_SECRET`, `JWT_EXPIRATION_MS`, `FRONTEND_URL`, `UPLOAD_DIR=/var/www/images`, `SPRING_PROFILES_ACTIVE=prod`, `SPRING_DATASOURCE_*`.
- [ ] `frontend` build: pass `VITE_API_URL=/api` as a build `ARG` (relative, so the proxy handles routing). Add `ARG VITE_API_URL` + `ENV VITE_API_URL=$VITE_API_URL` before `npm run build`.
- [ ] Postgres: add a `healthcheck` (`pg_isready`); backend `depends_on: db: { condition: service_healthy }`.
- [ ] Add `restart: unless-stopped` to all services; drop the obsolete `version:` key.
- [ ] Add `backend/.dockerignore` (`target/`, `uploads/`, `.env*`, `.git`).
- [ ] Add a non‑root `USER` to both Dockerfiles.
**Acceptance:**
- `docker compose -f docker-compose.prod.yml up --build` → `http://localhost/` serves the SPA; `curl http://localhost/api/jobs/open` returns JSON; an uploaded image URL loads.
- Backend logs show Flyway ran once and the app started on `prod` profile.
**Complexity:** M. **Depends on:** P1-3 (profiles) is nice‑to‑have here but not required.

## P0-3 — Real exception handling + correct HTTP status codes
**Why:** `GlobalExceptionHandler` catch‑all returns `ex.getMessage()` with HTTP 500 for every unmapped case — including all authorization ("Unauthorized") and not‑found failures. Wrong codes + info leak.
**Files:** `backend/.../advices/GlobalExceptionHandler.java`, `backend/.../service/JobService.java`, `backend/.../service/ProposalService.java`, `backend/.../security/SecurityUtil.java`, new exception classes under `backend/.../exception/`.
**Steps:**
- [ ] Add typed exceptions: `ResourceNotFoundException` (→404), `ConflictException` (→409), `ForbiddenException` or reuse Spring `AccessDeniedException` (→403).
- [ ] Replace every `throw new RuntimeException("...")` in `JobService` / `ProposalService` with the right typed exception:
  - "Job not found" / "Client not found" / "Proposal not found" → `ResourceNotFoundException`
  - "Unauthorized" / "not the owner" / "not allowed to view" → `AccessDeniedException`
  - "Proposal already submitted" → `ConflictException`
  - "Only OPEN jobs can be deleted" / "Cannot update job that is not OPEN" / "must be IN_PROGRESS" → `ConflictException` (409) or `422`.
- [ ] In `GlobalExceptionHandler`: add handlers for the new exceptions + `AccessDeniedException` + `AuthenticationException`. Return **RFC 7807 `ProblemDetail`** (built into Spring 6) with `type`, `title`, `status`, `detail`, and a `traceId`.
- [ ] Keep a catch‑all `Exception` handler but: log it server‑side with the `traceId`, return a **generic** 500 body (no `ex.getMessage()`).
- [ ] `SecurityUtil.getCurrentUserId()` — throw `AuthenticationCredentialsNotFoundException` (→401), not `RuntimeException`.
**Acceptance:**
- Editing another client's job → `403` with a ProblemDetail body (not 500).
- `GET /api/jobs/999999` → `404`.
- Duplicate proposal → `409`.
- Unhandled error → `500` with generic message; full detail only in server logs.
**Complexity:** M. **Do together with P0-7** (frontend error parsing must adapt).

## P0-4 — Close the marketplace authorization holes
**Why:**
1. `PATCH /api/jobs/{id}` and `DELETE /api/jobs/{id}` have **no `@PreAuthorize`** — any authenticated user (incl. FREELANCER) reaches the service; the role rule lives only in the frontend router.
2. `acceptProposal` has no "job must still be OPEN" / "proposal must be PENDING" guard — a client can re‑accept on an `IN_PROGRESS` job, re‑running the reject sweep; a `REJECTED` proposal can be "accepted".
**Files:** `backend/.../controller/JobController.java:81` (`updateJob`), `:92` (`deleteJob`); `backend/.../service/ProposalService.java:84-113` (`acceptProposal`).
**Steps:**
- [ ] Add `@PreAuthorize("hasRole('CLIENT')")` to `updateJob` and `deleteJob`.
- [ ] In `acceptProposal`: after the ownership check, assert `job.getStatus().equals("OPEN")` (or `== JobStatus.OPEN` after P1-7) and `proposal.getStatus().equals("PENDING")`; else throw `ConflictException`.
- [ ] Add a test proving a second `accept` call on the same job returns `409` and does not change any proposal.
**Acceptance:**
- FREELANCER token calling `PATCH`/`DELETE /api/jobs/{id}` → `403`.
- Accepting a proposal twice → first `200`, second `409`; other proposals unchanged on the second call.
**Complexity:** S.

## P0-5 — Harden file upload
**Why:** `FileStorageService.storeFile` builds `UUID + "_" + file.getOriginalFilename()` and resolves it under the upload dir **without normalizing the result** → path traversal via a crafted `originalFilename` (`../../..`). No content‑type / extension / size check → an uploaded `.svg`/`.html` with script is served **same‑origin** in prod (stored XSS).
**Files:** `backend/.../service/FileStorageService.java:30-42`, `backend/.../dto/JobCreateRequestDTO.java` (image field), `backend/src/main/resources/application.yaml` (multipart limits).
**Steps:**
- [ ] Ignore the client filename entirely. Store as `<uuid>.<ext>` where `<ext>` is derived from a **validated** content type.
- [ ] Allow‑list MIME types: `image/png`, `image/jpeg`, `image/webp`. Verify with magic bytes (e.g. `Tika` or a small header check), not just the `Content-Type` header.
- [ ] Enforce an explicit max size in code (e.g. 5 MB) in addition to `spring.servlet.multipart.max-file-size`.
- [ ] After `uploadDir.resolve(name)`, call `.normalize()` and assert `targetLocation.startsWith(uploadDir)`; reject otherwise.
- [ ] Serve uploads with `Content-Disposition: attachment` (or from a cookieless subdomain) — configure in `WebConfig` or the nginx `location /uploads/`.
**Acceptance:**
- Uploading a non‑image (or an image with a script payload renamed `.png`) → `400`.
- A filename containing `../` cannot write outside `uploads/`.
- Uploaded files land as `uploads/<uuid>.png` and load in the UI.
**Complexity:** S–M.

## P0-6 — Reject invalid / expired JWTs with 401
**Why:** `JwtAuthenticationFilter:46-49` — if `validateToken` fails, the filter just continues the chain **unauthenticated**. Expired token → same opaque 403 HTML as no token; no session‑expiry UX.
**Files:** `backend/.../security/JwtAuthenticationFilter.java`, `backend/.../config/SecurityConfig.java`, new `RestAuthenticationEntryPoint`.
**Steps:**
- [ ] Add an `AuthenticationEntryPoint` that writes a `401` + `ProblemDetail` JSON body; register it via `http.exceptionHandling(e -> e.authenticationEntryPoint(...))`.
- [ ] In the filter: if an `Authorization: Bearer` header is **present but invalid/expired**, respond `401` immediately (do not silently continue). Missing header → continue (endpoint may be public).
- [ ] Add an `AccessDeniedHandler` returning `403` + ProblemDetail for authenticated‑but‑wrong‑role.
**Acceptance:**
- Request with an expired token to a protected endpoint → `401` JSON (not 403 HTML).
- Frontend interceptor can rely on `401` meaning "token gone/expired".
**Complexity:** S. **Pairs with P0-7 / FE-AUTH.**

## P0-7 — Fix the frontend ↔ backend contract
**Why:** multiple features are broken purely by data‑shape drift; the frontend build does no type‑checking so none of it fails.
**Sub‑tasks:**

### P0-7a — Add `tsc` to the frontend build  *(FE-BUILD)*
- [ ] `frontend/package.json`: `"build": "tsc -b && vite build"`.
- [ ] Fix every error it surfaces (see the known ones below).
- **Acceptance:** `npm run build` fails on type errors; passes once fixed.

### P0-7b — Job image field name mismatch
- **Backend sends:** `imagePath` (`FreelancerJobResponseDto`, `ClientJobResponseDto`), `jobImagePath` (`JobDetailResponseDto`).
- **Frontend reads:** `jobImage` (`frontend/src/types/jobs.ts`, `components/Jobs/JobCard.tsx:16`, `pages/client/JobDetailPage.tsx:169`, `pages/client/MyJobsPage.tsx:119`, `pages/client/ClientHomePage.tsx`).
- [ ] Pick one name (recommend `imageUrl`) and make backend DTOs + frontend types + components agree.
- [ ] Add `frontend/public/placeholder-job.png` (referenced but missing) or remove the fallback.
- **Acceptance:** job images render in browse list, my‑jobs, and both job‑detail pages.

### P0-7c — Proposal status not returned to the client
- **Problem:** `ProposalResponseDto` (returned by `GET /api/jobs/{id}/proposals`) has **no `status`** field → client UI shows every proposal as `PENDING` after reload; Accept/Reject buttons reappear on decided proposals.
- **Files:** `backend/.../dto/ProposalResponseDto.java`, `frontend/src/types/proposal.ts`, `frontend/src/pages/client/JobDetailPage.tsx:50-54`.
- [ ] Add `status` (and `createdAt` if not already) to `ProposalResponseDto.fromEntity`.
- [ ] Align the field name `proposedPrice` vs `proposedBudget` (backend currently sends `proposedPrice`; frontend type says `proposedBudget`). Pick one.
- [ ] Remove the `(p as any)` normalization hack in `client/JobDetailPage.tsx`.
- **Acceptance:** after accepting a proposal and refreshing, statuses are correct and buttons don't reappear.

### P0-7d — `POST /api/proposals/{id}/reject` doesn't exist
- **Problem:** `frontend/src/api/proposals.ts:51` calls it; `ProposalController` has no such route → Reject button always errors.
- [ ] Decide: (a) add the endpoint (`@PreAuthorize("hasRole('CLIENT')")`, owner check, set `REJECTED`, only if job not `COMPLETED`), **or** (b) remove the Reject button and rely on the accept‑sweep.
- **Acceptance:** the Reject action in `client/JobDetailPage` either works or is gone.

### P0-7e — Broken routes
- [ ] `frontend/src/pages/auth/RegisterPage.tsx:64` — `navigate("/login")` → `navigate("/auth/login")`.
- [ ] `frontend/src/pages/freelancer/MyProposalsPage.tsx:77` — `/freelancer/jobs/open` is not a route → use `/freelancer/browse-jobs`.
- [ ] `frontend/src/components/Footer/Footer.tsx` — `/jobs`, `/post-job`, `/terms`, `/privacy`, `/cookies` don't exist → point at real routes or create stub pages.
- [ ] `frontend/src/pages/client/JobDetailPage.tsx:213` — `navigate(\`/freelancer/${p.freelancerId}\`)` is not a route → remove or point at a real profile route.
- **Acceptance:** no navigation lands on a silent `/` redirect.

### P0-7f — Category value mismatch
- **Problem:** `CreateJobPage.tsx:79-83` writes `web_development`/`mobile_development`/`design`/`writing`/`marketing`; `BrowseJobsPage.tsx:31` filters by `Design`/`Development`/`Marketing` (listed twice)/`Writing`/`Other`. The `LIKE` filter almost never matches.
- [ ] Define one shared category list (constant or `/api/categories` endpoint). Use it in both create and browse. De‑dupe "Marketing".
- **Acceptance:** creating a job in category X and filtering browse by X returns that job.

### P0-7g — Dead field reads (surface once `tsc` is on)
- [ ] `frontend/src/pages/client/CreateJobPage.tsx:42` — `newJob.createdAt` (`newJob` is `number`). Remove the `console.log`; stop appending `deadline` to the FormData (backend has no deadline field).
- [ ] `frontend/src/pages/client/EditJobPage.tsx:41` — `data.deadline` doesn't exist on `JobDetail`. Remove.
- [ ] `EditJobPage` image upload is silently discarded (`updateJobApi` sends JSON only). Either wire a multipart update endpoint or remove the image field from the edit form.

**Complexity (whole P0-7):** M.

---

# P1 — High impact (architecture / reliability / UX / maintainability)

## P1-1 — Test suite for the core rules + CI
**Why:** only `BackendApplicationTests.contextLoads()` exists. No safety net for the marketplace invariants.
**Files:** `backend/pom.xml` (add `spring-security-test`, `testcontainers`, `postgresql` test scope), `backend/src/test/...`, `frontend` (add `vitest`, `@testing-library/react`), `.github/workflows/ci.yml` (new).
**Steps:**
- [ ] **Backend acceptance test** (`@SpringBootTest` + Testcontainers Postgres): client posts job → two freelancers propose → client accepts one → assert accepted/rejected statuses + job `IN_PROGRESS` + second accept `409` + proposal to non‑OPEN job `409`.
- [ ] **`@WebMvcTest` per controller** + `spring-security-test`: 401 without token, 403 wrong role, 200 happy path, 400 validation body shape.
- [ ] **`@DataJpaTest`**: `findByIdAndClientId`, `findByJobIdAndIdNot`, `findByStatusAndCategoryIgnoreCaseContaining`, and the `UNIQUE(job_id, freelancer_id)` constraint.
- [ ] **Filter unit test** for `JwtAuthenticationFilter`: valid / expired / tampered / missing token.
- [ ] **Frontend**: Vitest for `AuthProvider` (rehydrate + logout clears everything), the axios interceptor, and a shared `parseApiError`.
- [ ] **CI**: GitHub Actions — `backend` job (`./mvnw verify`), `frontend` job (`npm ci && npm run build && npm run lint && npm test`). Add a status badge to the README. Enable branch protection.
**Acceptance:** CI green on `main`; the acceptance test fails if P0-4's guard is removed.
**Complexity:** L.

## P1-2 — Introduce a data‑fetching layer (TanStack Query)
**Why:** ~10 pages hand‑roll `useEffect` + `useState` + `loading`/`error` + `toast`. `ProposalDetailPage` fetches **all** proposals to render one.
**Files:** `frontend/src/main.tsx` (wrap in `QueryClientProvider`), new `frontend/src/hooks/queries/*`, all `pages/**` that fetch.
**Steps:**
- [ ] Add `@tanstack/react-query`.
- [ ] Create hooks: `useJobs`, `useJob(id)`, `useMyJobs`, `useJobProposals(jobId)`, `useMyProposals`, `useProposal(id)` + mutations (`useCreateJob`, `useUpdateJob`, `useDeleteJob`, `useCompleteJob`, `useSubmitProposal`, `useAcceptProposal`).
- [ ] Mutations invalidate the relevant query keys (e.g. accept → invalidate `['job', id]` + `['jobProposals', id]`).
- [ ] Replace per‑page fetch blocks with the hooks. Delete the "fetch all then `.find`" in `ProposalDetailPage` (add `GET /api/proposals/{id}` on the backend for the freelancer's own proposal, or keep list + select but cached).
**Acceptance:** no `useEffect(fetch...)` left in `pages/`; navigating back to a list doesn't refetch within the stale window.
**Trade‑off:** one dependency + a caching model to learn.
**Complexity:** M. **Depends on:** P0-7 (stable contract).

## P1-3 — `ddl-auto: validate` + Spring profiles + indexes
**Why:** `ddl-auto: update` runs alongside Flyway (two schema managers, drift risk). `show-sql: true` globally. No prod/test config separation. No indexes on FK / filter columns.
**Files:** `backend/src/main/resources/application.yaml` → split into `application.yaml` + `application-dev.yaml` + `application-prod.yaml` + `application-test.yaml`; new `backend/src/main/resources/db/migration/V7__add_indexes.sql`.
**Steps:**
- [ ] Set `spring.jpa.hibernate.ddl-auto: validate` in base config; Flyway owns the schema.
- [ ] Move `show-sql`/`format_sql` to `dev` only.
- [ ] `V7`: `CREATE INDEX` on `jobs(client_id)`, `jobs(status)`, `jobs(status, category)`, `proposals(job_id)`, `proposals(freelancer_id)`, `proposals(status)`.
- [ ] Run `./mvnw verify` — `validate` will fail if entities and migrations disagree; reconcile any diffs (e.g. column lengths) with a migration, not by loosening `validate`.
- [ ] `test` profile points Flyway/JPA at Testcontainers (or `@DynamicPropertySource`).
**Acceptance:** app starts on `validate` with no DDL; `EXPLAIN` on the open‑jobs query uses an index.
**Complexity:** S–M.

## P1-4 — Fix N+1 on list endpoints
**Why:** `getOpenJobs`, `getClientJobs`/`mapToResponseDto`, `getFreelancerProposals` lazily load `client`, `jobImage`, and `proposals` per row.
**Files:** `backend/.../service/JobService.java:77-90,199-207`; `backend/.../service/ProposalService.java:119-128`; `backend/.../repository/JobRepository.java`, `ProposalRepository.java`.
**Steps:**
- [ ] Add `@EntityGraph(attributePaths = {"client", "jobImage"})` (or `JOIN FETCH` JPQL) to the finders used by list endpoints.
- [ ] Replace `job.getProposals().size()` with a `COUNT` projection query (`Map<Long, Long>` of jobId → count, or a DTO constructor expression).
- [ ] Return a `PagedResponse<T>` DTO from `/api/jobs/open` instead of the raw Spring `Page` (unstable JSON: `pageable`, `sort`, …).
- [ ] Verify with `spring.jpa.properties.hibernate.generate_statistics=true` (dev) — record query count before/after in the PR.
**Acceptance:** a page of 10 open jobs issues a constant number of queries (not `1 + 10 + 10`); `/api/jobs/open` JSON is `{ content, page, size, totalElements, totalPages }` only.
**Complexity:** M. **Note:** update `frontend/src/types/jobs.ts` `BrowseJobsResponse` to match the new shape.

## P1-5 — Consolidate frontend layouts / components; delete dead code
**Why:** `ClientLayout` and `FreelancerLayout` are near‑identical; `PublicLayout` re‑implements the same active‑tab logic; 3 unused `Sidebar*`; empty/mock files; `activePage` state goes stale after `<Link>` navigation.
**Files:** `frontend/src/layouts/*`, `frontend/src/components/Sidebar/*`, `frontend/src/components/layouts/*`, `frontend/src/components/Card/card.tsx`, `frontend/src/pages/client/{CompletedJobsPage,DashboardPage,ProfilePage}.tsx`, `frontend/src/components/Navbar/Navbar.tsx`, stale `*structure*.md` / `components.md`.
**Steps:**
- [ ] Create one `DashboardLayout` taking `role` (or `pages`) — replace `ClientLayout` + `FreelancerLayout`.
- [ ] Derive the active nav item from `useLocation()` each render; delete the `activePage` `useState` in all layouts.
- [ ] Delete: `components/Sidebar/*` (unused), `components/layouts/Header.tsx` + `Sidebar.tsx` (mock), `components/Card/card.tsx` (empty), `pages/client/CompletedJobsPage.tsx` (empty). Turn `client/DashboardPage.tsx` + `client/ProfilePage.tsx` into real pages or remove their routes.
- [ ] Delete stale docs: `folder_sturcture.md` (typo file), `frontend/src/components/components.md`, `frontend/folder_structure.md`.
- [ ] Navbar dropdown: close on outside click, on `Escape`, and on navigation; make it a `<button>` + `aria-expanded` (or use `components/ui/dropdown-menu.tsx`).
- [ ] Add a mobile menu using the existing `components/ui/sheet.tsx` (nav is currently `hidden md:flex` with no hamburger).
- [ ] Add `NotFoundPage` (replace the silent `<Navigate to="/" />` fallback) and an app‑root `ErrorBoundary`.
**Acceptance:** one layout file for dashboards; active tab stays correct when navigating via links; usable nav on a 375px viewport; unknown route shows a 404 page.
**Complexity:** M.

## P1-6 — Single auth source of truth + safe 401 handling
**Why:** `LoginPage` writes `token` + `user` directly *and* calls `login()`; `logout()` removes only `user` (stale JWT survives); `api.ts` 401 handler wipes token + hard‑redirects to `/login` (wrong route) on **any** 401, including a failed login attempt.
**Files:** `frontend/src/api/api.ts:22-31`, `frontend/src/contexts/AuthProvider.tsx:23-31`, `frontend/src/pages/auth/LoginPage.tsx:66-70`.
**Steps:**
- [ ] Centralize token + user in one module/hook. `login()` sets both; `logout()` clears both (`token` **and** `user`).
- [ ] `LoginPage` calls only `login(res.data)` — no direct `localStorage` writes.
- [ ] Interceptor: on `401`, clear auth and `navigate('/auth/login')` **once**; skip this when the failing request URL is `/auth/login` (let the page show its error).
- [ ] Add a proactive expiry check (`expiresAt` is already stored) — on app load / route change, if expired, `logout()`.
**Acceptance:** after logout, `localStorage` has no `token`; a failed login shows an inline/toast error without a full page reload; an expired token routes to `/auth/login` cleanly (no loop).
**Complexity:** S–M. **Pairs with P0-6.**

## P1-7 — Domain types: money, status enums, auditing, optimistic locking
**Why:** `budget`/`proposedPrice` are `Double` (float money); status is stringly‑typed and compared with `.equals` in ~8 places; `updatedAt` never changes on status transitions; no concurrency guard on accept/complete.
**Files:** `backend/.../entity/{Job,Proposal,User,Image}.java`, all `service/*` status comparisons, new migration `V8`, DTOs that carry `budget`/`price`/`status`, `frontend/src/types/*`.
**Steps:**
- [ ] `BigDecimal` for `budget` and `proposedPrice` (entity + DTOs + JSON). Frontend already uses `number` — fine over JSON.
- [ ] `enum JobStatus { OPEN, IN_PROGRESS, COMPLETED }` and `enum ProposalStatus { PENDING, ACCEPTED, REJECTED }`; `@Enumerated(EnumType.STRING)`. Replace string literals.
- [ ] `V8`: add `CHECK` constraints (`budget > 0`, `proposed_price >= 0`, `status IN (...)`) and a `version BIGINT NOT NULL DEFAULT 0` column on `jobs` and `proposals`.
- [ ] Add `@Version` to `Job` and `Proposal`.
- [ ] Enable JPA auditing (`@EnableJpaAuditing`, `@CreatedDate`/`@LastModifiedDate`) or DB triggers; remove the manual `setCreatedAt/setUpdatedAt` calls in `JobService`.
**Acceptance:** money math has no float artifacts; an invalid status can't be persisted; `updatedAt` changes when a proposal is accepted/rejected; a concurrent second `accept` throws `OptimisticLockException` → mapped to `409`.
**Complexity:** M (mechanical but wide).

## P1-8 — Repo hygiene follow‑ups
**Files:** `frontend/package.json`, `frontend/vite.config.ts`, `frontend/tsconfig.app.json`, `backend/.../HealthController.java`, `backend/.../controller/DatabaseController.java`, `index.html`.
**Steps:**
- [ ] Standardize on `lucide-react`; remove `phosphor-react` (abandoned) and migrate its imports (`LoginPage`, `RegisterPage`, `LandingPage`, `FreelancerHomePage`).
- [ ] Resolve Tailwind to a single major version (either use `@tailwindcss/vite` v4 in `vite.config.ts` and drop the v3 postcss setup, or drop the unused `@tailwindcss/vite` dep and keep v3).
- [ ] `tsconfig.app.json` — remove the non‑existent include `src/pages/freelancer/public/LandingPage.tsx`.
- [ ] Delete `HealthController` (debug string `"Hello from backend adfdddfadf!"`) or replace with Actuator; delete `/api/db-status` (`DatabaseController` + `DatabaseService`) — it leaks raw `SQLException` text.
- [ ] `frontend/index.html` — set `<title>AngkorLance</title>` and a real favicon.
- [ ] Remove unused `JobRepository` finders (`findByCategory`, `findByStatus(String)` list, `findByStatusAndCategory`) once confirmed unreferenced.
**Acceptance:** one icon lib, one Tailwind version, no debug endpoints, `npm run build` clean.
**Complexity:** S.

---

# P2 — Valuable (not urgent)

## P2-1 — OpenAPI spec + generated frontend types
- [ ] Add `springdoc-openapi-starter-webmvc-ui` → `/swagger-ui`, `/v3/api-docs`.
- [ ] Frontend: `openapi-typescript` generates `src/types/api.d.ts` from the running spec; use those types in `src/api/*`.
- **Benefit:** contract drift (P0-7) becomes structurally impossible.
- **Complexity:** M.

## P2-2 — Observability baseline
- [ ] Add `spring-boot-starter-actuator`; expose `health` (with `db`, `diskSpace`) + `info`.
- [ ] Structured JSON logging (`logstash-logback-encoder`) + a request `traceId` in MDC (filter), echoed in `ProblemDetail`.
- [ ] `docker-compose.prod.yml` healthchecks hit `/actuator/health`.
- **Complexity:** S–M.

## P2-3 — Server‑side pagination/filtering for `my-jobs` and `my-proposals`
- **Why:** `MyJobsPage` fetches the full list and paginates/filters client‑side while showing server‑style pagination + an "Apply" button that refetches everything.
- [ ] `GET /api/jobs/my-jobs` → accept `Pageable` + `status` + `q`; return `PagedResponse`.
- [ ] `GET /api/my-proposals` → same.
- [ ] Update `frontend/src/pages/client/MyJobsPage.tsx` and `freelancer/MyProposalsPage.tsx` to pass params and render server pages.
- **Complexity:** M.

## P2-4 — Rate‑limit `/api/auth/**`
- [ ] Per‑IP + per‑account limit on `login` / `register` (Bucket4j filter, or Nginx `limit_req` in `nginx.prod.conf`).
- **Complexity:** S.

## P2-5 — Real profile feature
- **Why:** `pages/*/ProfilePage.tsx` are mock/stub; profiles are advertised in the README.
- [ ] `GET /api/me`, `PUT /api/me` (name, bio, skills), `POST /api/me/avatar` (reuse hardened upload).
- [ ] Add `bio`, `skills` to `users` (migration) or a `profiles` table.
- [ ] Wire both profile pages to the API; remove the mock props.
- **Complexity:** M.

## P2-6 — Form UX: inline validation + confirm dialogs
- [ ] Inline field errors on register/login/create‑job/edit‑job (not just toasts); show the password rule up front.
- [ ] Confirm dialog (reuse `components/ui/dialog.tsx`) before Delete Job / Accept Proposal.
- **Complexity:** M.

## P2-7 — Seed / demo data
- [ ] A dev‑profile `CommandLineRunner` or SQL seed (`V?__seed_dev.sql` guarded to dev) creating 2 users per role + a few jobs + proposals, and document demo credentials in the README.
- **Complexity:** S.

## P2-8 — Move JWT to httpOnly cookie (or document the trade‑off)
- [ ] Option A: issue the token in an `HttpOnly; Secure; SameSite=Strict` cookie + a CSRF token for mutations; drop `localStorage`.
- [ ] Option B: keep `localStorage` and add a short "Security model & trade‑offs" section to the README explaining why.
- **Complexity:** M.

---

# P3 — Optional (nice‑to‑have)

- [ ] Dark‑mode toggle (CSS variables already defined in `frontend/src/styles/index.css`).
- [ ] Job categories as a DB table + `GET /api/categories`.
- [ ] Job search (`pg_trgm` or `tsvector`) instead of `LIKE '%x%'`.
- [ ] Notification on accept/reject/complete — behind a `NotificationService` interface, logging impl only (no broker).
- [ ] Refresh tokens + short‑lived access tokens.
- [ ] Storybook for `components/ui/*` + `components/Jobs/*`.
- [ ] `docker-compose.dev.yml`: Postgres healthcheck + `depends_on: condition: service_healthy`.
- [ ] Freelancer "mark delivered" → client "confirm" step before `COMPLETED`.
- [ ] Withdraw proposal (freelancer); close job without accepting (client).

---

# Explicitly OUT of scope (do not add)

- Microservices / splitting jobs & proposals into separate services.
- Event sourcing / CQRS / Kafka / RabbitMQ — a `@Transactional` service method is correct here.
- Kubernetes / Helm / service mesh — `docker-compose` is the right scope.
- GraphQL alongside REST.
- Any LLM / "AI" feature.
- Real payments / escrow / KYC (a mocked "payment pending" state at most).
- WebSockets / real‑time chat as an early deliverable.
- A design‑system rewrite — `shadcn/ui` is already coherent; consolidate, don't replace.
- Redis / a second datastore until there is a measured need.

---

# Appendix A — Known contract mismatches (fix in P0-7)

| Concern | Backend sends | Frontend expects | Files |
|---|---|---|---|
| Job image (list) | `imagePath` | `jobImage` | `FreelancerJobResponseDto` / `ClientJobResponseDto` ↔ `types/jobs.ts`, `JobCard.tsx:16` |
| Job image (detail) | `jobImagePath` | `jobImage` | `JobDetailResponseDto` ↔ `pages/client/JobDetailPage.tsx:169` |
| Proposal price | `proposedPrice` | `proposedBudget` | `ProposalResponseDto` ↔ `types/proposal.ts` |
| Proposal status (client view) | *(absent)* | `status` | `ProposalResponseDto` ↔ `pages/client/JobDetailPage.tsx:53` |
| Reject proposal | *(no endpoint)* | `POST /api/proposals/{id}/reject` | `ProposalController` ↔ `api/proposals.ts:51` |
| Open jobs page shape | raw Spring `Page` | `{content, number, totalPages, totalElements}` | `JobController.getOpenJobs` ↔ `types/jobs.ts` `BrowseJobsResponse` |
| Category values | free text (`web_development`, …) | `Design`/`Development`/… | `CreateJobPage.tsx:79` ↔ `BrowseJobsPage.tsx:31` |
| Create job response | `Long` id | `.createdAt` read | `JobController.createJob` ↔ `CreateJobPage.tsx:42` |
| Register response | `String` | (toast parses `.response.data.data`) | `AuthController.register` ↔ `RegisterPage.tsx` |

# Appendix B — Verification commands

```bash
# Backend
cd backend && ./mvnw verify

# Frontend (after FE-BUILD adds tsc)
cd frontend && npm ci && npm run build && npm run lint && npm test

# Full stack, dev
docker compose -f docker-compose.dev.yml up --build
# then: cd frontend && npm run dev   → http://localhost:5173

# Full stack, prod (after P0-2)
docker compose -f docker-compose.prod.yml up --build   → http://localhost
curl -s http://localhost/api/jobs/open | jq .
```

# Appendix C — Suggested task order

1. P0-1, P0-4, P0-6 (small, isolated, high value)
2. P0-3 + P0-7 (do together — shared surface)
3. P0-5
4. P0-2 (needs a working backend to test against)
5. P1-3, P1-8 (config + hygiene, unblock everything else)
6. P1-1 (tests + CI — lock in the P0 fixes)
7. P1-7, P1-4 (backend domain + performance)
8. P1-6, P1-2, P1-5 (frontend architecture)
9. P2 items as time allows; P3 opportunistically.
