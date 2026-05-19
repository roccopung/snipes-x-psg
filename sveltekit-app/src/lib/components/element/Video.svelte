<script>
  // @ts-nocheck
  import { urlFor } from "$lib/sanity/image";
  import { getImageDimensions } from "@sanity/asset-utils";
  import { innerWidth, innerHeight } from "svelte/reactivity/window";
  import "media-chrome";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { browser } from "$app/environment";

  let {
    video,
    loop = false,
    muted = false,
    fullscreen = true,
    autoplay = true,
    ratio,
  } = $props();

  // let componentsLoaded = $state(false);
  let isAutoplay = $derived(
    video?.autoplay === true || autoplay === true ? true : false,
  );
  let isMuted = $derived(
    video?.autoplay === true || muted === true ? true : false,
  );
  let isLoop = $derived(
    video?.autoplay === true || loop === true || autoplay === true
      ? true
      : false,
  );

  let src = $derived(video?.url);

  let posterAsset = $derived(
    innerWidth < 768 && video?.poster?.mobileImage
      ? video?.poster?.mobileImage.asset
      : video?.poster?.asset,
  );

  let posterDimensions = $derived(
    posterAsset ? getImageDimensions(posterAsset) : { width: 16, height: 9 },
  );

  let posterSrc = $derived(
    posterAsset
      ? urlFor(posterAsset).width(posterDimensions.width).url() + "&auto=format"
      : null,
  );

  let player = $state(null);
  let aspectRatio = $state(1.77777778);
  let isPlaying = $state(false);
  let isPaused = $state(false);

  // $effect(() => {
  //   if (!player) return;

  //   const onPlay = () => {
  //     {
  //       isPaused = false;
  //       isPlaying = true;
  //     }
  //   };
  //   const onPause = () => {
  //     isPaused = true;
  //     isPlaying = false;
  //   };

  //   player.addEventListener("play", onPlay);
  //   player.addEventListener("pause", onPause);

  //   return () => {
  //     player.removeEventListener("play", onPlay);
  //     player.removeEventListener("pause", onPause);
  //   };
  // });
</script>

{#if browser && src}
  <media-controller
    class="w-full h-full overflow-hidden"
    style="aspect-ratio: {aspectRatio};"
    autohide="-1"
  >
    <video
      class="overflow-hidden"
      bind:this={player}
      {src}
      slot="media"
      crossorigin
      playsinline
      autoplay={isAutoplay}
      loop={isLoop}
      muted={isMuted}
      preload="metadata"
      onloadeddata={(e) => {
        aspectRatio = e.currentTarget.videoWidth / e.currentTarget.videoHeight;
      }}
    ></video>
    {#if posterSrc}
      <media-poster-image
        class="object-cover overflow-hidden z-10"
        slot="poster"
        src={posterSrc}
      ></media-poster-image>
    {/if}

    <media-control-bar class="fixed top-2 right-2 typo-base">
      <media-mute-button class="pointer-events-auto" notooltip>
        <span slot="off">MUTED</span>
        <span slot="low">SOUND ON</span>
        <span slot="medium">SOUND ON</span>
        <span slot="high">SOUND ON</span>
      </media-mute-button></media-control-bar
    >

    {#if !isLoop && !isAutoplay && isPlaying}
      <media-control-bar class="px-2 py-1 flex gap-0.5 z-0">
        <media-play-button
          class="base-play rounded-full aspect-square px-0.5 md:aspect-auto md:px-1"
          notooltip
        ></media-play-button>
        <media-time-range class="overflow-hidden" notooltip></media-time-range>
        <media-volume-range class="hidden xl:flex" notooltip
        ></media-volume-range>
        <media-mute-button
          class="rounded-full text-brown aspect-square px-0.5 md:aspect-auto md:px-1"
          notooltip
        ></media-mute-button>
        {#if fullscreen}
          <media-fullscreen-button
            class="justify-self-end font-bold rounded-full text-brown aspect-square px-0.5 md:aspect-auto md:px-1"
            notooltip
          >
          </media-fullscreen-button>
        {/if}
      </media-control-bar>
    {/if}
  </media-controller>
{/if}

<style>
  media-controller {
    --media-object-fit: cover;
  }

  media-mute-button {
    --media-control-background: none;
    --media-control-hover-background: none;
  }

  media-controller {
    --media-object-fit: cover;
    --media-font: "Roboto";
    --media-control-transition-out: opacity 150ms ease-in;
    --media-control-transition-in: opacity 150ms ease-in;
    --media-background-color: none;
  }

  media-time-range,
  media-volume-range {
    --media-primary-color: var(--color-white);
    --media-control-background: transparent;
    --media-control-hover-background: transparent;
    --media-control-height: 6px;

    --media-range-track-height: 6px;
    --media-range-track-border-radius: 0;
    --media-range-track-background: #fff;

    --media-range-thumb-border-radius: 0;
    --media-range-thumb-opacity: 1;
    --media-range-thumb-height: 6px;
    --media-range-thumb-background: var(--color-brown);
    --media-time-range-buffered-color: transparent;

    --media-time-range-display: block;
  }

  media-controller > * {
    opacity: 1;
  }
</style>
