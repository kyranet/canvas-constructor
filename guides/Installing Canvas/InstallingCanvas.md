# Installing Canvas

Let's start off by introducing what canvas is. In HTML, the `<canvas>` element can be used to draw images via scripting with JavaScript. The canvas that we're talking about is a Cairo backed canvas implementation for NodeJS. An example of something that can be done with canvas is this.

![Canvas Command](https://raw.githubusercontent.com/kyranet/canvasConstructor/master/guides/assets/canvas-example.png)

Here, the bot is using canvas to edit a template and insert your avatar, and a random users avatar onto the template. So that's just an example of what Canvas can do, let's get down to installing it.

## Installation Steps

Based on what OS you're on, there are different steps to install the required prerequisites.

OS | Command
----- | -----
OS X | `brew install pkg-config cairo pango libpng jpeg giflib`
Ubuntu | `sudo apt install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++`
Fedora | `sudo yum install cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel`
Solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`
Windows | Instructions below

## Installing on Windows

### Step 1

First, you need to run `npm install --global --production windows-build-tools` from a PowerShell or command prompt run as an administrator. This will take a little while, so be prepared to do other stuff while it installs.

**>Notes:**

- While the npm page tells you to install GTK and libjpeg-turbo, those aren't needed! Both canvas and canvas-constructor function perfectly fine without them, so they're really just taking up space that could be used for something else.

### Step 2

The next and final step is simple.

You can either do...

```bash
npm i canvas
```

...to install the stable version, or you could do...

```bash
npm i Automattic/node-canvas#92b192447e9b9ae98da0f801e4e34afdd1dc1ef8
```

...to install a working commit of version 2.0.

Next, to install canvas-constructor, you just need to do

```bash
npm i canvas-constructor
```

If you followed the guide completely, your console should look something like this, and you're good to go!

![Install Screenshot](https://raw.githubusercontent.com/kyranet/canvasConstructor/master/guides/assets/installation-screenshot.png)
