> Meteor Power is a mobile RTS point-and-click 2D platformer.
>
> ☄️🤖 _Build solar stations, connect power, avoid meteors!_


## 📱 The post-jam experience

I made quite a few post-jam improvements to this game. Unfortunately, I started a job with Bungie and got busy with house projects before I had time to really finish this.

Some features of the game:
-   2D platforming AI and navigation.
-   High-level commands:
    -   You click on a station site and choose an action that should be taken.
    -   That action is then queued, and the next appropriate bot performs it.
-   Many types of bots, with different abilities and movement mechanics.
-   Many different types of actions:
    -   Building new stations
    -   Running powerlines between stations
    -   Repairing stations
    -   Building barriers to block incoming meteors
-   A polished radial menu for performing actions on target bots or target stations.

This extended version is also [open-source on GitHub](https://github.com/SnoringCatGames/meteor_power).


## ‍💻 The jam

**Theme: "Delay the inevitable"**

Ludum Dare is a semi-annual event where people create a game over the weekend. Ludum Dare is a ranked competition, with a clever voting system that gets more eyes on your game when you in turn rate other games. There are two tracks you can participate in:

-   In the "**Compo**" track, you must create all your own art, music, sounds, etc. from scratch, work by yourself, and finish within 48 hours.
-   In the "**Jam**" track, you can work with a team, you can use art, code, music, sounds, etc. that already existed or was created by someone else, and you get 72 hours to finish.

Additionally, the games all follow some central theme, which is only announced at the start of the jam.

I worked solo and created everything during the event. Except of course for my Scaffolder and Surfacer frameworks (which is fine, you're allowed to use pre-existing code).


## 🎮 Controls

-   Mouse and keyboard.
-   A/S/D/Q/W/E to select a bot.
-   Left-click on a platform to move the bot.
-   Left-click a station button to do that command.


## 💿 Software used

-   **[Godot](https://godotengine.org/):** Game engine.
-   **[Aseprite](https://www.aseprite.org/):** Pixel-art image editor.
-   **[Bfxr](https://www.bfxr.net/):** Sound effects editor.
-   **[DefleMask](https://www.deflemask.com/):** Chiptune music tracker.
-   **[Surfacer](https://godotengine.org/asset-library/asset/968):** Framework for procedural path-finding across 2D platforms.
-   **[Scaffolder](https://godotengine.org/asset-library/asset/969):** Framework for general app and UI infrastructure.
-   **[SurfaceTiler](https://github.com/SnoringCatGames/surface_tiler):** Framework for "next-level" autotiling.

> _The latest version of **Meteor Power** is owned by [Snoring Cat LLC](https://snoringcat.games), but the original version was published by Levi in the Ludum Dare 50 game jam._


![A constructor bot](https://s3-us-west-2.amazonaws.com/levi-portfolio-media/meteor-power/construction_bot_walking_256.gif)
