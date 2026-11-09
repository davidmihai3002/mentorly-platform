// Conventional Commits: <tip>: <descriere cu literă mică> (SCRUM-XX)
// Tipuri: feat, fix, refactor, docs, test, chore, perf, ci, build, style, revert
// Cheia tichetului e o convenție de echipă, nu o verifică commitlint.
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Corpul mesajului poate conține linkuri lungi (Jira, GitHub).
    'body-max-line-length': [0],
  },
}
