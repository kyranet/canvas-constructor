# Contributing

**The issue tracker is only for issue reporting or proposals/suggestions. If you have a question, you can find us in our [Discord Server]**.

To contribute to this repository, feel free to create a new fork of the repository and
submit a pull request. We highly suggest [ESLint] to be installed
in your text editor or IDE of your choice to ensure builds from GitHub Actions do not fail.

1. Fork, clone, and select the **main** branch.
2. Create a new branch in your fork.
3. Make your changes.
4. Ensure your linting and tests pass by running `yarn test && yarn lint`
5. Commit your changes, and push them.
6. Submit a Pull Request [here]!

## Canvas Constructor Concept Guidelines

There are a number of guidelines considered when reviewing Pull Requests to be merged. _This is by no means an exhaustive list, but here are some things to consider before/while submitting your ideas._

-   Everything in Canvas Constructor should be generally useful for the majority of users. Don't let that stop you if you've got a good concept though, as your idea still might be a great addition.
-   Everything should follow [OOP paradigms] and generally rely on behaviour over state where possible. This generally helps methods be predictable, keeps the codebase simple and understandable, reduces code duplication through abstraction, and leads to efficiency and therefore scalability.
-   Everything should follow our ESLint rules as closely as possible, and should pass lint tests even if you must disable a rule for a single line.
-   Scripts that are to be ran outside of the scope of the bot should be added to [scripts] directory and should be in the `.mjs` file format.

<!-- Link Dump -->

[discord server]: https://discord.gg/taNgb9d
[here]: https://github.com/kyranet/canvas-constructor/pulls
[eslint]: https://eslint.org/
[oop paradigms]: https://en.wikipedia.org/wiki/Object-oriented_programming
[scripts]: /scripts
