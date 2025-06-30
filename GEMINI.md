# Project Overview

This project is a Next.js website with a deeply integrated Payload CMS for content management. It uses a block-based architecture for page building and features global content for the header, footer, and company information.

## Core Technologies & Documentation

Before starting any task, I will consult the official documentation for the core technologies.

- **Next.js:** `vercel/next.js`
- **Payload CMS:** `payloadcms/payload`
- **TanStack Form:** `tanstack/form`

## How to use GH CLI:

1.  **Find the file:** Use `gh search code --repo <repo_name> "<search_term>"` to find relevant files.
2.  **Find a GitHub issue by title:** Use `gh issue list --search "<issue_title>" --state open --json title,url` to find relevant issues.
3.  **Read a GitHub issue by number:** Use `gh issue view <number> -R mikecebul/cvx-junior-golf`
4.  **Read a GitHub file:** If I have quota, you can use `web_fetch` with the raw GitHub URL to read the content.

# Basic `gh` CLI Usage

1.  **Find a file in a repository:**

    ```bash
    gh search code "<search_term>" --repo owner/repo-name
    ```

    **Common Flags:**

    - --language <string>: Filter results by programming language (e.g., python, javascript).

    - --filename <string>: Filter on a specific filename.

    - --owner <string>: Filter on a specific repository owner (user or organization).

    - --limit <int>: Set the maximum number of results to return (default is 30).

2.  **Find an open issue by its title:**

    ```bash
    gh issue list --search "<issue_title>" --state open
    ```

    **Common Flags:**

    - --state <string>: Filter by state (open, closed, all).

    - --author <string>: Filter by the user who created the issue.

    - --assignee <string>: Filter by the user assigned to the issue. Use @me for issues assigned to you.

    - --label <string>: Filter by a specific label.

3.  **Read an issue by its number:**

    ```bash
    gh issue view <issue_number>
    ```

    **Common Flags:**

    - -c, --comments: View the issue's comments.

4.  **Read a file from the default branch:**

    ```bash
    gh repo view <path/to/file>
    ```

    **Common Flags:**

    - -b, --branch <string>: Select a specific branch to view the file from.

## Package Manager

This project uses `pnpm` as its package manager. Always use `pnpm install` to install dependencies.

## My Operating Procedure

To ensure I provide the best possible assistance, I will follow these steps for every request:

1.  **Consider the Request:** I will first break down the user's request to fully understand the goals and requirements.

2.  **Reference Documentation:** I will consult the official documentation of the relevant technologies to ensure my approach is up-to-date and follows best practices.

3.  **Create & Refine Plan:** I will draft a detailed plan and then critically review it for potential issues, edge cases, or improvements. This is my internal verification step. The refined plan will be saved to a `plan.md` file.

4.  **Present Plan for Approval:** I will present the final, refined plan to you for review. **I will not proceed until you approve it.** If you suggest changes, I will update the plan and present it again for approval.

5.  **Execute:** Once you approve the plan, I will begin implementing the changes.
