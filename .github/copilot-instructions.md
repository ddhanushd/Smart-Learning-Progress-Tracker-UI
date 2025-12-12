# Copilot / AI Agent Instructions — SmartLearningTracker UI

Quick orientation for code-writing agents working on this repository.

- **Project type:** Angular application (Angular CLI generated, v21). Main source: [src](src).
- **Entry points:** app bootstrap in [src/main.ts](src/main.ts) and routes in [src/app/app.routes.ts](src/app/app.routes.ts).

Architecture & patterns
- **Layering:** `src/app/core` contains cross-cutting concerns (models, services). `src/app/features` holds domain UI grouped by feature (e.g., `topics`). See [src/app/core/services/topicservice.ts](src/app/core/services/topicservice.ts) and [src/app/features/topics](src/app/features/topics).
- **Routing:** Routes are defined in [src/app/app.routes.ts](src/app/app.routes.ts) and components are wired by path (e.g., `topics`, `topics/create`). Prefer updating routes there.
- **Service/API contract:** Backend calls are centralized in `TopicService` and use `environment.apiBaseUrl` + `/topics` paths. API responses are wrapped in `ApiResponse<T>` (see [src/app/core/models/api-response.model.ts](src/app/core/models/api-response.model.ts)). Avoid sprinkling HttpClient calls across components — change the service when API behavior changes.
- **State & data flow:** Components use Observables from services. Example: `TopicList` loads topics via `topicService.getAllTopics()` and uses `shareReplay(1)` to cache the stream ([src/app/features/topics/topic-list/topic-list.ts](src/app/features/topics/topic-list/topic-list.ts)). UI-local transient state (editing controls) is stored as a `Record<id, EditState>` on the component.
- **Forms:** Components use `FormBuilder` + Reactive Forms (see `TopicCreate`), and often import `ReactiveFormsModule` in the component `imports` array. Respect current validation and value coercions (e.g., confidence coerced to `Number`).
- **Standalone / imports pattern:** Components include `imports: [...]` in `@Component` (CommonModule, ReactiveFormsModule, FormsModule). When editing or adding components follow this pattern instead of modifying global NgModule unless necessary.
- **UI practices:** Components set `loading`, `submitting`, and `error` flags and update them in subscription callbacks. When refreshing data after mutations call the same `loadTopics()` or service method to keep behavior consistent.

Build / test / run
- Start development server: `npm start` (alias for `ng serve`). The README includes `ng serve` instructions.
- Build: `npm run build` (runs `ng build`).
- Tests: `npm test` (runs `ng test`). Test files live alongside implementations as `*.spec.ts` (e.g., `topic.spec.ts`, `topic-list.spec.ts`).

Repository conventions and gotchas
- **File locations:** Feature components live under `src/app/features/<feature>/*` with `.ts`, `.html`, `.scss`, and `.spec.ts` siblings. Keep this convention for new features.
- **API base URL:** Controlled via `src/environments/environment.ts` and `src/environments/environment.prod.ts`. Update both when pointing to a different backend.
- **Use of models:** Domain types like `Topic`, `Revision`, and `ApiResponse<T>` live in `src/app/core/models`. Use these types for payloads and responses — services expect `Partial<Topic>` for create/update payloads.
- **Observable usage:** Prefer returning Observables from services and handling side-effects in components (as is current practice). Many components call `subscribe()` directly and handle UI flags there — mirror that style for consistency.

Examples (where to look)
- Topic API: [src/app/core/services/topicservice.ts](src/app/core/services/topicservice.ts)
- Topic list UI and edit-state handling: [src/app/features/topics/topic-list/topic-list.ts](src/app/features/topics/topic-list/topic-list.ts)
- Topic create form and status derivation: [src/app/features/topics/topic-create/topic-create.ts](src/app/features/topics/topic-create/topic-create.ts)
- Routing: [src/app/app.routes.ts](src/app/app.routes.ts)

Guidance for automated edits
- When changing HTTP shapes, update `ApiResponse<T>` and `TopicService` first, and then update callers (components/tests).
- Preserve component `imports` arrays and form validators when modifying components.
- For UI changes prefer editing the component `.html` and `.scss` pair next to the `.ts` file.
- Add tests next to changed files as `*.spec.ts` that match existing patterns.

If anything here is ambiguous or you need more examples from a particular area (routing, forms, or API surface), ask and I'll point you to the exact files and lines.
