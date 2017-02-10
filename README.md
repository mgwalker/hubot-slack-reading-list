## hubot-slack-reading-list

A Hubot script for hubot-slack to build reading lists.  By
adding an emoji reaction to messages, those messages are
scanned for URLs, then the URLs are pushed into the reading
list.  Then, either weekly or daily, the bot will post the
reading list to the channel.

![screenshot](http://i.imgur.com/Fmf4wDY.png)

## installation

This is a plugin for [Hubot](https://hubot.github.com) that
also relies on [hubot-slack](https://slackapi.github.io/hubot-slack/).
To install in your Hubot project, run:

```bash
npm install hubot-slack-reading-list --save
```

This will warn you if you don't already have an acceptable
version of Hubot or hubot-slack installed.  Then, add the
script to your Hubot's `external-scripts.json`:

```json
[
  "...",
  "hubot-slack-reading-list",
  "..."
]
```

Then just startup your Hubot.  No environment variables
or anything else required!

## usage

The script only responds to one command, but that
command is flexible.  Here's the basic usage:

```
@bot [daily or weekly] reading list [emoji] <name>
```

The parts of the message in square brackets are optional.
Here is a breakdown of the parts and how they influence
the script's behavior:

| @bot | daily or weekly | reading list | emoji | name |
|:-----|:----------------|:-------------|:------|:-----|
| The script requires that the bot be messaged directly in a room that it's in. | The script can either post the reading list daily or weekly. If neither is specified it defaults to weekly. *Daily* reports occur every weekday at 4:00 PM. *Weekly* reports occur every Friday at 4:00 PM. | This is required to trigger the script. | You can specify what emoji reaction marks a message for the reading list.  If you don't specify one, it defaults to `:book:`. | This is the name of the reading list.  It's not particularly useful, but it's used as the title of the reading list post. |

You can add multiple channels to the same reading list by
issuing the `reading-list` command again, but you can use
only the required parts to do that:

```
@bot reading list <name>
```

The reading list will only be reported in the channel
it was originally created in.
