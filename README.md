# Commit Message Guidelines

This project follows the **Conventional Commits** specification for commit messages. This helps automate semantic versioning, generating changelogs, and keeping a clean commit history.

## Format

Each commit message consists of a **header**, an **optional body**, and an **optional footer**. The header has a specific format:

### Header Fields

- **type**: Defines the type of change that you're committing. Must be one of the following:

  - `feat`: A new feature
  - `fix`: A bug fix
  - `docs`: Documentation only changes
  - `style`: Changes that do not affect the meaning of the code (e.g., formatting, missing semicolons)
  - `refactor`: A code change that neither fixes a bug nor adds a feature
  - `test`: Adding or updating tests
  - `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

- **scope**: A short, optional description of the part of the codebase the change relates to. Example: `auth`, `ui`, `api`. This is optional but recommended.

- **subject**: A short description of the change (imperative tense, no period at the end). It should be clear and concise.

### Body (Optional)

The body provides additional contextual information about the commit. Use it to explain **what** and **why** rather than **how**. Each line should be no longer than 100 characters.

### Footer (Optional)

The footer is used to reference issues or breaking changes. Commonly used keywords are:

- `BREAKING CHANGE`: A note about a significant change that breaks backward compatibility.
- `Closes #<issue number>`: Closes an issue when the commit is merged.

### Examples

- `fix(ui)`: correct button alignment issue on mobile
- `fix(api)`: resolve 500 error on user profile fetch
- `refactor(user-page)`: optimize user data fetching logic
- `chore(deps)`: update dependencies to latest versions

### Invalid Commit Examples

- `Update button styles`: This does not specify a type.
- `fix: authentication issue`: The scope is missing and the subject is too vague.

Make sure to follow this format when making commits, so our commit history remains clean and structured, and we can generate accurate changelogs and versioning.
