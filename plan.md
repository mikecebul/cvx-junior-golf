# Revised Plan: Server-Side Linking of Registrations

**Goal:** Modify the registration process to link related registrations securely on the server-side, removing the need for client-side `PATCH` requests and eliminating access control issues.

1.  **Create a Dedicated Server Action for Linking:**
    *   A new server action file will be created at `src/app/actions/linkRegistrations.ts`.
    *   This action, `linkRegistrations`, will accept an array of `registrationIds`.
    *   It will use Payload's local API (`payload.update`) to iterate through the provided IDs and update each registration's `relatedRegistrations` field. This operation will run securely on the server with full permissions.

2.  **Update the Registration Form Logic:**
    *   In `src/blocks/Form/RegistrationForm/use-registration-form-opts.ts`, the `onSubmit` function will be modified.
    *   The existing client-side `fetch` loop that sends `PATCH` requests will be completely removed.
    *   After the registrations are successfully created, a single call will be made to the new `linkRegistrations` server action, passing the array of new `registrationIds`.
    *   The logic will then proceed to create the Stripe checkout session as before.

This plan directly addresses your concern by moving the linking logic to a secure, server-side action.