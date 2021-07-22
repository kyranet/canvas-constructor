# Installing Canvas

> **NOTE**: This guide is for installing `canvas` for node.js, if you want to use `canvas-constructor` for web browsers,
> use the package link from unpkg or get the bundle from the
> [webpack branch](https://github.com/kyranet/canvas-constructor/tree/webpack)

Let's start off by introducing what canvas is. In HTML, the `<canvas>` element can be used to draw images via scripting
with JavaScript. The canvas that we're talking about is a Cairo backed canvas implementation for **Node.js**. An example
of something that can be done with canvas is this.

![Canvas Command](https://raw.githubusercontent.com/kyranet/canvas-constructor/master/guides/assets/canvas-example.png)

Here, the bot is using canvas to edit a template and insert your avatar, and a random users avatar onto the template. So
that's just an example of what Canvas can do, let's get down to installing it.

## Installation Steps

Based on what OS you're on, there are different steps to install the required prerequisites.

| OS      | Command                                                                                                                     |
| ------- | --------------------------------------------------------------------------------------------------------------------------- |
| OS X    | `brew install pkg-config cairo pango libpng jpeg giflib`                                                                    |
| Ubuntu  | `sudo apt install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++`                                 |
| Fedora  | `sudo yum install cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel` |
| Solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`                                                 |
| Windows | Instructions below                                                                                                          |

## Installing on Windows

### Step 1

You need to install [`windows-build-tools`](https://github.com/felixrieseberg/windows-build-tools) globally from
PowerShell or cmd.exe run as an administrator, this will take a little while, as it will install C++ build tools
necessary to be able to compile native modules like canvas.

```bash
# Using npm
$ npm install --global windows-build-tools

# Using yarn
$ yarn global add windows-build-tools
```

**>Notes:**

-   While the npm page tells you to install `GTK` and `libjpeg-turbo`, those aren't needed! Both `canvas` and
    `canvas-constructor` function perfectly fine without them, so they're really just taking up space that could be used for
    something else.

### Step 2

The next and final step is simple, install canvas and canvas-constructor

```bash
# Using npm
$ npm i canvas canvas-constructor

# Using yarn
$ yarn add canvas canvas-constructor
```

> **Note**: You can install a development version of `canvas` by replacing `canvas` with `Automattic/node-canvas`,
> or `canvas-constructor` with `kyranet/canvas-constructor` for that matter. However, we do not guarantee stability in
> development branches.

If you followed the guide completely, your console should look something like this, and you're good to go!

```bash
$ yarn add canvas canvas-constructor
yarn add v1.13.0
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 64 new dependencies.
info Direct dependencies
├─ canvas-constructor@2.1.1
└─ canvas@2.3.1
```

![Install Screenshot](https://raw.githubusercontent.com/kyranet/canvas-constructor/master/guides/assets/installation-screenshot.png)
