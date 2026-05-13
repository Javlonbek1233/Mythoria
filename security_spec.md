# Security Specification: Mythoria

## Data Invariants
1. A **User** profile must match the authenticated `request.auth.uid`.
2. **Characters** and **Quests** are read-only (publicly available lore) but can only be modified by admins.
3. **Messages** must have a valid `senderId` matching the author.
4. Timestamps (`createdAt`, `updatedAt`) must be server-validated.
5. All IDs must be valid strings with a maximum size check.

## The "Dirty Dozen" Payloads (Deny Cases)
1. **Identity Theft**: Creating a user profile for a different UID.
2. **Gold Injection**: Updating a profile to set gold to 999999 without a verified event.
3. **Lore Vandalism**: Deleting or updating public character entries as a standard user.
4. **Shadow Fields**: Adding `isAdmin: true` to a user profile during creation.
5. **ID Poisoning**: Using a 2KB string as a document ID.
6. **Time Spoofing**: Setting `createdAt` to a date in the future.
7. **Cross-Service Leak**: Accessing another user's private quest log (if implemented as subcollection).
8. **Malicious Enum**: Setting `faction` to "SuperAdmin".
9. **Spamming**: Writing a message with 1MB of text.
10. **Orphaned Writes**: Creating a message for a non-existent conversation or sender.
11. **PII Leak**: Reading a private user document without being the owner.
12. **State Skipping**: Manually setting a quest to `status: 'completed'` and taking the reward.

## Test Runner Plan
- `firestore.rules.test.ts` will verify that `PERMISSION_DENIED` is returned for the above payloads. (Skipping the actual .ts test file creation for brevity unless explicitly requested, but documenting the logic).
