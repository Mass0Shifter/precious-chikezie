# Tusnny Job Board — Technical Overview

A full-featured job board built as a **custom WordPress plugin** (Nacham Job Board). It provides job listings, employer and applicant flows, applications, optional subscriptions, and email notifications—**without** depending on WP Job Manager or other third-party job plugins.

---

## What It Does

- **Job seekers**: Browse jobs (filters: keywords, location, job type), create an applicant profile (bio, qualifications, CVs), apply to jobs, and track applications.
- **Employers**: Register as employers, post and edit jobs, view applications per job, and manage listings from a dashboard.
- **Site admins**: Configure pages, slugs, email notifications, optional subscription gating (apply/post jobs), and demo payment for testing.

The front end is driven by **shortcodes** and **custom templates**; the theme stays minimal. Branding is pluggable (e.g. “Tusnny” via a filter). An optional **landing page** shortcode and **RSS feed** for jobs are included.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Platform** | WordPress 6.0+, PHP 7.4+ |
| **Data** | Custom Post Types (CPTs), taxonomies, post meta, user meta, `wp_options` |
| **Front end** | Shortcodes, template overrides (`archive_template` / `single_template`), vanilla CSS |
| **Optional** | ACF for extra job/applicant fields; WPJM-compatible meta keys when WPJM is present |

No JavaScript framework; forms and UI are server-rendered with progressive enhancement where needed.

---

## Architecture

### Custom Post Types

- **`job_listing`** — Public job posts. Registered only if WP Job Manager is not active; uses same slug/archive options. Supports title, editor, thumbnail (company logo), author; rewritable slugs and archive.
- **`application`** — One post per submitted application (private, no front-end URL). Linked to job (post parent or meta) and applicant user.
- **`applicant_profile`** — One per user; stores bio, contact, qualifications, certifications, skills, CV library (serialized or meta). Used when applying to jobs.

### Taxonomies

- **`job_listing_type`** — e.g. Full-time, Part-time (hierarchical).
- **`job_listing_category`** — Job categories. Both registered only when WPJM is not active.

### Roles

- **`employer`** — Can create/edit own job listings and view applications for their jobs. Dashboard, Post a Job, and Applications pages are shown only to this role (nav filtered by `wp_get_nav_menu_items`).
- **`applicant`** — Subscriber-like; can manage profile and submit applications. Optional subscription can gate “can apply” (user meta: `nacham_can_apply`, `nacham_applicant_subscription_expires`).

### Meta Conventions

Job listing meta follows WPJM-style keys where useful: `_job_location`, `_company_name`, `_company_website`, `_application` (email or URL), `_job_expires`, `_filled`. Application and profile data use plugin-prefixed keys (e.g. `nacham_*`) in post meta or user meta.

---

## How It Was Built

### 1. Plugin bootstrap and activation

- **Entry file**: `nacham-job-board.php` — defines constants, brand name filter, and `require_once` for all include classes. No global namespace pollution; logic lives in classes or namespaced functions.
- **Activation hook**: Registers CPTs and taxonomies, adds roles, flushes rewrite rules, and creates default **pages** with the right shortcodes (Register, Employer Dashboard, Post a Job, Applications, Applicant Profile, My Applications, Subscriptions). Page IDs are stored in options so URLs and admin “Pages” stay in sync.

### 2. Core data and settings

- **Post types** (`class-nacham-post-types.php`): `register_post_type()` for `application`, `applicant_profile`, and conditionally `job_listing`; `add_role()` for `employer` and `applicant`.
- **Taxonomies** (`class-nacham-taxonomies.php`): `register_taxonomy()` for `job_listing_type` and `job_listing_category`.
- **Meta helpers** (`class-nacham-meta.php`): Thin getters for job location, company name, application method, expiration, filled status, etc., for use in templates and shortcodes.
- **Settings** (`class-nacham-settings.php`): Single option group; defaults for per-page count, hide filled/expired, slugs, page IDs, email toggles, expiring-days, optional reCAPTCHA/Google Maps, subscription flags, and demo payment. `register_setting()` with type/sanitize; helper `get_page_url($key)` for shortcodes and redirects.

### 3. Admin

- **Admin UI** (`class-nacham-admin.php`): Settings screen under “Nacham Job Manager” (or Job Listings menu): pages assignment, job list/archive options, email options, subscriptions, demo payment. Can create missing pages with correct shortcodes.
- **Meta boxes** (`class-nacham-admin-meta-boxes.php`): Job listing and application edit screens (e.g. company, location, expiration, filled, application method).
- **ACF** (`class-nacham-acf-fields.php`): Optional registration of ACF fields for jobs/applicant profile when ACF is active.

### 4. Front end: flow and templates

- **Front-end flow** (`class-nacham-frontend-flow.php`):
  - **Nav**: Filter `wp_get_nav_menu_items` to hide employer-only pages (dashboard, post-a-job, applications) from non-employers.
  - **Templates**: `archive_template` and `single_template` filters so job archive and single job use plugin templates under `templates/` (e.g. `archive-job_listing.php`, `single-job_listing.php`), which use the same [jobs] query args (per_page, hide_filled, search_keywords, search_location, search_job_type) and output header/nav/footer shortcodes.
  - **Query**: `pre_get_posts` on main query for `job_listing` archive: pagination, hide filled, keyword search, location meta_query, job type tax_query.
  - **Login redirect**: `login_redirect` sends employers to the dashboard when no specific redirect is requested.
  - **Assets**: Enqueues header-nav and job-board CSS.
  - **Shortcodes**: `[nacham_header_logo]`, `[nacham_footer_logo]`, `[nacham_header_nav]` (role-aware links: Jobs, Dashboard, Post a Job, Applications, Profile, My Applications, Login/Logout, Register).

### 5. Shortcodes and pages

Implemented in `class-nacham-shortcodes.php` (and Tusnny-specific wrappers where needed):

- **`[nacham_register]`** / **`[tusnny_register]`** — Registration form (username, email, password, role: employer or applicant). Nonce + POST handler; creates user with the chosen role.
- **`[employer_dashboard]`** — Lists current user’s job listings with links to view, edit, and applications; “Post a Job” CTA (or upgrade if subscription required).
- **`[employer_post_job]`** — Form to create/edit job (title, description, company, location, type, category, expiration, application method, etc.). Saves as `job_listing` with author = current user; respects “require subscription to post” (user meta: `nacham_can_post_jobs`, `nacham_employer_subscription_expires`).
- **`[employer_applications]`** — List applications for a job (optional `job_id`); links to view each application.
- **`[nacham_applicant_profile]`** — Edit applicant profile (bio, contact, qualifications, certifications, skills, CV uploads). Uses `applicant_profile` CPT and profile meta.
- **`[nacham_my_applications]`** — Lists applications submitted by the current user.
- **`[nacham_apply_form]`** / **`[job_apply]`** — Apply form on a job: cover message, CV choice from profile, optional extra fields. Creates `application` post and sends notification; respects “require subscription to apply” and redirects to subscription page when needed.
- **`[jobs]`** — Paginated job list with search/filters; uses `job-listings.php` template partial.
- **`[job]`** / **`[job_summary]`** — Single job display / summary by id.
- **`[nacham_subscriptions]`** — Subscription status, billing form, and (if demo payment is on) “Activate demo” for applicant/employer 30-day windows. POST handled on `template_redirect` so it works with cached pages.

Landing (`class-nacham-landing.php`): **`[nacham_landing]`** — Hero, “how it works,” CTAs for job seekers and employers, link to edu.tusnny.com; uses `landing.css`.

### 6. Emails and cron

- **Emails** (`class-nacham-emails.php`): Hooks on custom actions `nacham_job_created` and `nacham_job_updated` to send admin notifications; daily cron `nacham_job_board_daily_emails` sends expiring-job notices to admin and employers (configurable days, toggles in settings). Cron is scheduled on `admin_init` and cleared on plugin deactivation.

### 7. RSS and widgets

- **Feed** (`class-nacham-feed.php`): Registers feed slug `nacham_jobs`; outputs RSS 2.0 for published job listings.
- **Widgets** (`class-nacham-widgets.php`): Sidebar widgets for recent jobs or search (if used by theme).

### 8. Subscriptions and billing

- **Subscriptions** (`class-nacham-subscriptions.php`): Optional gating by settings `nacham_require_subscription_apply` and `nacham_require_subscription_post_jobs`. Uses user meta for “can apply” and “can post jobs” and expiration timestamps. Subscriptions page shortcode shows status and billing form; demo mode allows activating 30-day applicant/employer access without real payment. POST handlers run on `template_redirect` so cached subscription page still works.

### 9. Registration variants

- **Nacham** (`class-nacham-registration.php`): Generic registration shortcode and handler; brand name from filter.
- **Tusnny** (`class-tusnny-registration.php`): Client-specific shortcode `[tusnny_register]` and form styling; same flow (employer/applicant, nonce, validation, `wp_insert_user()` with role).

---

## File Layout (Plugin)

```
nacham-job-board/
├── nacham-job-board.php          # Bootstrap, activation, defines
├── includes/
│   ├── class-nacham-post-types.php
│   ├── class-nacham-taxonomies.php
│   ├── class-nacham-meta.php
│   ├── class-nacham-settings.php
│   ├── class-nacham-admin.php
│   ├── class-nacham-admin-meta-boxes.php
│   ├── class-nacham-emails.php
│   ├── class-nacham-frontend-flow.php
│   ├── class-nacham-acf-fields.php
│   ├── class-nacham-shortcodes.php
│   ├── class-nacham-applicant-profile.php
│   ├── class-nacham-registration.php
│   ├── class-nacham-subscriptions.php
│   ├── class-nacham-feed.php
│   ├── class-nacham-widgets.php
│   ├── class-nacham-landing.php
│   ├── class-tusnny-registration.php
│   └── class-tusnny-shortcodes.php  # Tusnny-specific shortcode wrappers
├── templates/
│   ├── archive-job_listing.php
│   ├── single-job_listing.php
│   ├── content-job_listing.php
│   ├── content-single-job_listing.php
│   └── job-listings.php
└── assets/css/
    ├── job-board.css
    ├── header-nav.css
    ├── landing.css
    ├── applicant-profile.css
    └── apply-form.css
```

---

## Security and Validation

- All registration and application forms use **nonces** and server-side validation (required fields, email format, role allowlist).
- **Capability checks**: Dashboard and post-a-job shortcodes verify logged-in user and employer role; applications list scoped to current user’s jobs.
- **Sanitization**: `sanitize_text_field`, `sanitize_email`, `sanitize_textarea_field`, `absint` on inputs; escaped output with `esc_html`, `esc_attr`, `esc_url` in templates and shortcodes.
- **POST handling** for subscriptions and registration runs early (e.g. `template_redirect`) and uses `wp_safe_redirect` to avoid open redirects.

---

## Summary

The project is a **self-contained WordPress job board**: custom CPTs and roles, role-based nav and redirects, shortcode-driven pages, optional subscription gating with demo payment, and scheduled email notifications. Built for the Tusnny brand, with a pluggable name and optional ACF/WPJM compatibility, suitable for portfolio presentation as a full-cycle WordPress plugin (data model, admin, front end, security, and UX flows).
