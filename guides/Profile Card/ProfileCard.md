# Profile Card

> _**NOTE:** This tutorial was originally written for_ [_An Idiot's Guide_](https://anidiots.guide)_, as it is using_ [_GuideBot_](https://github.com/AnIdiotsGuide/guidebot) _as a base. Future tutorials will have no bias towards any Discord bot libraries, the only reason it wasn't rewritten with no Discord library in mind, is due to how far the tutorial progressed._

This tutorial follows uses Evie's [Enmap-Based Points System](https://anidiots.guide/coding-guides/enmap-based-points-system) for Discord.js, so if you already have a score / currency system in your Discord bot, you will need to pass those details when you get to populating the image with text.

Right, this is the image you will be creating in this guide.

![Profile image](https://raw.githubusercontent.com/kyranet/canvasConstructor/master/guides/assets/profile-end-result.png)

Okay, now you've seen what you're going to create, I want to go over what I'll be covering in this tutorial.

First you're going to install canvas-constructor and node-canvas 2.0, you will need the [git cli](https://git-scm.com/) for this.

Then you will create the image completely using canvas-constructor, this will bulk up the command, because every element will be created.

Then you will be reducing the lines of code by supplying a pre-made image, and I will then cover the topic of storing the template image in memory \(a cache\), as well as going over the pros and cons of each method.

## Installing Canvas Constructor and Canvas

Alright, before you get to the good stuff you need to install both canvas-constructor and Canvas, so open up a terminal window and type in the following.

```text
npm i canvas-constructor Automattic/node-canvas#92b192447e9b9ae98da0f801e4e34afdd1dc1ef8
```

> _The reason for the commit hash for node-canvas, is that the most recent version of node-canvas on github at the time of writing this tutorial, breaks everything._

## The basic code

Once you have both Canvas and canvas-constructor installed, you need to create the profile command, so inside the `./commands/` folder create a new file called `profile.js` and fill it with the following code and hit save.

```javascript
// eslint-disable-next-line no-unused-vars
exports.run = async (client, message, args, level) => {
  // Your code here.
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "profile",
  category: "economy",
  description: "Display user profile.",
  usage: "profile"
};
```

## The Requires

Now, at the very top of the file, you need to require a few things such as canvas-constructor, snekfetch and Discord.js to name a few, so throw the following at the top.

```javascript
const { Canvas } = require("canvas-constructor"); // You can't make images without this.
const { resolve, join } = require("path"); // This is to get a font file.
const { Attachment } = require("discord.js"); // This is to send the image via discord.
const { get } = require("snekfetch"); // This is to fetch the user avatar and convert it to a buffer.
```

> _**NOTE:**_ We're doing some fancy [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), click the link to read more.

Alright, I'll quickly cover some of the things you've required, instead of doing `const canvas = require("canvas-constructor")` then `canvas.Canvas` you've deconstructed the require and pulled out `Canvas` directly, the same with `resolve`, and `join` from `path`.

Next up you should create an async function below those requires you've just added, and you'll want to pass the `member` object and the `score` object, it should look something like this.

```javascript
async function profile(member, score) {
  // Canvas code will go here.
}
```

We also need to add a bit of regular expressions \(I'll explain why later\), so throw this under the requires you added earlier

```javascript
const imageUrlRegex = /\?size=2048$/g;
```

We've got the basics covered, we have the blank command with the requires, and the async function, we're ready to rock with the meat and potatoes of the tutorial.

## Getting the points

Inside the `exports.run` method of the command, add the following code, I'll explain as you write it what each line does.

```javascript
  // This will check to see if the command was ran in a guild instead of a DM.
  if (message.guild) {
    // This creates a "key" for enmaps Key/Value system.
    // We've declared it as a variable as we'll be using it in multiple places.
    const key = `${message.guild.id}-${message.author.id}`;
    // If the points database does not have the message author in the database...
    if (!client.points.has(key)) {
      // Create an entry for them...
      client.points.set(key, {
        // Using the predefined information below.
        user: message.author.id, guild: message.guild.id, points: 0, level: 1
      });
    }
    // We await both the message.channel.send, and the profile function.
    // Also remember, we wanted to pass the member object, and the points object.
    // Since we're creating a user profile, we should give it a unique file name.
    await message.channel.send(new Attachment(await profile(message.member, client.points.get(key)), `profile-${message.author.id}.jpg`));
  }
```

## Creating the profile

Alright, now we've got the actual command sorted, all we have left is the `profile` function.

> _You should go get a drink, this may take a while lol._

Inside your profile function you need to define a few variables, we're going do to some more fancy [Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), we are passing the entire object, but we actually only need a few things, so here we go.

```javascript
// We only need the level, and points values, we don't need the user or guild id.
const { level, points } = score;
// We're grabbing the body out of snekfetch's get method, but at the same time we're assigning a variable
// to it, avatar.
// Remember when I mentioned the regex before? Now we get to use it, we want to set the size to 128 pixels,
// instead of 2048 pixels.
const { body: avatar } = await get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
// The reason for the displayName length check, is we don't want the name of the user going outside
// the box we're going to be making later, so we grab all the characters from the 0 index through
// to the 17th index and cut the rest off, then append `...`.
const name = member.displayName.length > 20 ? member.displayName.substring(0, 17) + "..." : member.displayName;
```

Okay, from this point on, it's all canvas baby, we're going to do it chunk by chunk for ease, we'll be using the Discord colour scheme, it can be found on their [branding](https://discordapp.com/branding) page.

Since this is a function, we should `return` the canvas we create so let's do just that.

```javascript
return new Canvas(400, 180)
```

Now, here comes the beauty of canvas-constructor's [`chainable` methods](https://schier.co/blog/2013/11/14/method-chaining-in-javascript.html).

```javascript
return new Canvas(400, 180)
  // Create the Blurple rectangle on the right side of the image.
  .setColor("#7289DA")
  .addRect(84, 0, 316, 180)
```

That's the beauty of chainable methods, you don't need to constantly call the same thing over and over, so from this point on, everything I add will just be added onto the previous code block.

```javascript
  // Create the "Dark, but not black" boxes for the left side of the image
  // and the text boxes on the right.
  .setColor("#2C2F33")
  .addRect(0, 0, 84, 180)
  .addRect(169, 26, 231, 46)
  .addRect(224, 108, 176, 46)
```

If you've been following along closely, your profile image should look like this now.

![Boxes... yay](https://raw.githubusercontent.com/kyranet/canvasConstructor/master/guides/assets/profile-boxes.png)

As you can see, we've managed to successfully create an image with multiple boxes of different colors, now we'll do something different, let's create a drop shadow effect on a circular clip path.

```javascript
  // Create a shadow effect for the avatar placement.
  .setShadowColor("rgba(22, 22, 22, 1)") // This is a nice colour for a shadow.
  .setShadowOffsetY(5) // Drop the shadow by 5 pixels.
  .setShadowBlur(10) // Blur the shadow by 10.
  .save() // We should save the instance again.
  // This circle is 2 pixels smaller in the radius to prevent a pixel border.
  .addCircle(84, 90, 62)
  // We need to put something here next.
  // Now we restore the canvas' previous state.
  .restore()
```

That will create the following image:

![Shadows](https://raw.githubusercontent.com/kyranet/canvasConstructor/master/guides/assets/profile-shadow.png)

Now, for the keen eyed observers, you may have noticed this comment line `// We need to put something here next.`, guess what you're about to put the avatar in that circle, so replace that line of text with this.

```javascript
  .addRoundImage(avatar, 20, 26, 128, 128, 64)
```

And boom

![Now with extra avatar.](https://raw.githubusercontent.com/kyranet/canvasConstructor/master/guides/assets/profile-avatar.png)

You're on the home stretch, you've only got to create a "level" plate over the avatar, and then add the text, so let's get that plate sorted \(I won't display how it looks\).

```javascript
  // This creates a rounded corner rectangle, you must use restore to
  // add new elements afterwards.
  .createBeveledClip(20, 138, 128, 32, 5)
  .setColor("#23272A")
  .addRect(20, 138, 128, 32)
  .restore()
```

Due to using another path/clip method, we need to restore the canvas element from before otherwise you won't be able successfully add any text or other new elements, let's move on.

Let's add all of the textual elements now.

```javascript
  // Add all of the text for the template.
  // Let's center the text
  .setTextAlign("center")
  // I'm using a custom font, which I will show you how to add next.
  .setTextFont("10pt Discord")
  // Set the colour to white, since we have a dark background for all the text boxes.
  .setColor("#FFFFFF")
  // Add the name variable.
  .addText(name, 285, 54)
  // Using template literals, you can add text and variables, we're applying the toLocaleString()
  // to break up the number into a nice readable format.
  .addText(`Level: ${level.toLocaleString()}`, 84, 159)
  // Now we want to align the text to the left.
  .setTextAlign("left")
  // Let's add all the points!
  .addText(`Score: ${points.toLocaleString()}`, 241, 136)
```

Alright, and we're just about done, just two things left to do, you need to include a font file \(if you're not using an OS installed font\), this should really be done inside your initialization file, but since we don't have one we'll throw this under the requires at the very top of your file.

```javascript
Canvas.registerFont(resolve(join(__dirname, "./path/to/font/Discord.ttf")), "Discord");
```

And lastly, back inside the `profile()` function, throw `.toBuffer()` on the very end.

Congratulations, you should have a very nice, but basic economy profile image made purely in canvas.

In part two, I will take this guide page and show you how to use a pre-made image instead of making everything on the fly...

Now go create!
