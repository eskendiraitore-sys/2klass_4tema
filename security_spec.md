# Security Specification & Payload-First TDD

## 1. Data Invariants
1. **Owner-Only Read/List/Update/Delete**: Student submissions contain student names and scores. Only the verified owner teacher (`request.auth.token.email == 'eskendiraitore@gmail.com' && request.auth.token.email_verified == true`) can `get`, `list`, `update`, or `delete` documents in `/submissions/{submissionId}`.
2. **Strict Schema & Bounds on Create**: Students open the shared lesson link without requiring a Google account, so `create` is allowed only when the payload strictly matches `StudentSubmission` (exact required keys, no extra shadow keys, bounded strings, bounded integers, `status == 'submitted'`, and `createdAt == request.time`).
3. **Immutable Fields**: `createdAt`, `studentName`, `studentClass`, `language`, and scores cannot be tampered with after creation; only the verified owner can update `status` to `'reviewed'`.

## 2. Dirty Dozen Adversarial Payloads
1. Unauthenticated `list` on `/submissions` -> DENIED
2. Unauthenticated `get` on `/submissions/sub_1` -> DENIED
3. Authenticated non-owner (`student@gmail.com`) `list` or `get` -> DENIED
4. Unverified admin email (`email_verified: false`) `list` -> DENIED
5. Shadow field injection (`isAdmin: true`) on `create` -> DENIED
6. Missing required field (`quizScore` omitted) on `create` -> DENIED
7. Oversized `studentName` (> 80 chars) -> DENIED
8. Invalid `submissionId` (`../bad/id` or > 128 chars) -> DENIED
9. Out-of-range `quizScore` (e.g. `99`) -> DENIED
10. Spoofed client timestamp (`createdAt != request.time`) -> DENIED
11. Pre-reviewed status (`status: 'reviewed'`) on student `create` -> DENIED
12. Non-owner `update` or `delete` on `/submissions/sub_1` -> DENIED
