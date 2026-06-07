<script lang="ts">
  //@ts-nocheck
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import Image from "$lib/components/element/Image.svelte";
  import ArrowNext from "$lib/components/svg/ArrowNext.svelte";
  import ArrowPrev from "$lib/components/svg/ArrowPrev.svelte";
  import { onMount } from "svelte";

  let { items } = $props();
  let emblaApi = $state();
  let options = $derived({
    loop: true,
    align: "center",
    startIndex: Math.floor((items?.length || 0) / 2),
  });
  let selectedIndex = $state(0);

  function onInit(event: CustomEvent) {
    emblaApi = event.detail;
  }

  function scrollPrev() {
    if (emblaApi) emblaApi.scrollPrev();
  }

  function scrollNext() {
    if (emblaApi) emblaApi.scrollNext();
  }
</script>

<section class="w-full py-5 justify-center flex flex-col gap-4 bg-white">
  <div class="relative w-full px-10">
    <div class="embla" use:emblaCarouselSvelte={{ options }} onemblaInit={onInit}>
      <div class="embla__container">
        {#each items as item, index}
          <a
            href={item?.link?.url ?? "#"}
            class="embla__slide aspect-[4/5] ml-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            {#if item?.image?.asset}
              <div class="image-container overflow-hidden w-full">
                <Image image={item?.image} alt="campaign image" />
              </div>
            {/if}
          </a>
        {/each}
      </div>
    </div>
    <button
      class="embla__arrow embla__arrow--left absolute left-2 top-1/2 -translate-y-1/2 hover:opacity-50"
      onclick={scrollPrev}
      aria-label="Previous slide"
    >
      <ArrowPrev />
    </button>
    <button
      class="embla__arrow embla__arrow--right absolute right-2 top-1/2 -translate-y-1/2 hover:opacity-50"
      onclick={scrollNext}
      aria-label="Next slide"
    >
      <ArrowNext />
    </button>
  </div>
</section>

<style>
  .embla {
    overflow: hidden;
    width: 100%;
  }
  .embla__container {
    display: flex;
    align-items: center;
    touch-action: pan-y pinch-zoom;
  }
  .embla__slide {
    transform: translate3d(0, 0, 0);
    flex: 0 0 auto;
    width: 38vw;
  }

  .image-container {
    height: 100%;
    width: auto;
  }

  @media (min-width: 768px) {
    .embla__slide {
      transform: translate3d(0, 0, 0);
      width: 10vw;
      /*padding-right: 1.5rem;*/
    }
  }
</style>
