# youtube-delay-interceptor

YouTube now detects ad blockers and makes you wait — usually 5-10 seconds — before the video loads. This userscript stops that from happening.

> [!NOTE]
> This script only removes the delay — it doesn't block ads. For that, use uBlock Origin or Brave Shields.

## What it does

When YouTube detects an ad blocker, it injects a small script into the page that wraps the `fetch` function to introduce a delay. This script intercepts that injected script before it runs and wipes it out. No delay, video loads normally.

## Install

You need a userscript manager first. [Violentmonkey](https://violentmonkey.github.io/) works. Tampermonkey works too.

Once that's installed:

1. Click [here](https://github.com/n6ufal/youtube-delay-interceptor/raw/refs/heads/main/youtube-delay-interceptor.user.js) to open the raw script
2. Your userscript manager should prompt you to install it
3. Hit install, done

## Notes

- Runs at `document-start` so it catches the delay script before the page finishes loading
- Stops observing after `DOMContentLoaded` so it's not running forever in the background
- Tested on Chromium-based browsers with Violentmonkey
