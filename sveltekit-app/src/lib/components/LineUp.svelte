<script lang="ts">
  import Image from "$lib/components/element/Image.svelte";

  type Props = {
    data: any;
  };

  const { data }: Props = $props();

  let hoveredArtist = $state<string | null>(null);
  let boxWidths: number[] = $state([]);
  let ratios: number[] = $state([]);
  let mounted = $state(false);

  $effect(() => {
    mounted = true;
  });
</script>

<section class="line-up-section w-[80vw] mx-auto pt-15 md:pt-30">
  <div
    class="hidden w-full md:grid md:grid-cols-4 md:gap-5 transition-opacity duration-500"
    class:opacity-0={!mounted}
  >
    {#if data?.length > 0}
      {#each data as artist, i}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          class="relative aspect-square w-full"
          bind:clientWidth={boxWidths[i]}
          style:z-index={hoveredArtist === artist._key ? 20 : 10}
          onmouseenter={() => (hoveredArtist = artist._key)}
          onmouseleave={() => (hoveredArtist = null)}
        >
          <div
            class="absolute top-0 left-0 w-full h-full overflow-hidden"
            style:height={hoveredArtist === artist._key && ratios[i]
              ? `${Math.round(boxWidths[i] / ratios[i])}px`
              : null}
          >
            <Image
              image={artist.image}
              alt={artist.name}
              bind:ratio={ratios[i]}
              objectPosition="50% 0%"
            />
          </div>
          <div
            class="absolute top-0 left-0 w-full opacity-0 pointer-events-none transition-all duration-50 ease-in-out"
            style:scale={hoveredArtist === artist._key ? 1.5 : 1.45}
            class:opacity-100={hoveredArtist === artist._key}
            style="width: {Math.round(boxWidths[i] / ratios[i])}"
          >
            <Image
              image={artist.frame}
              alt={artist.name}
              objectPosition="50% 0%"
            />
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <div class="md:hidden flex flex-col gap-[30dvh]">
    {#if data?.length > 0}
      {#each data as artist, i}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="relative aspect-square w-full p-[7vw] md:p-5">
          <div>
            <Image
              image={artist.image}
              alt={artist.name}
              bind:ratio={ratios[i]}
              objectPosition="50% 0%"
            />
          </div>
          <div
            class="absolute top-0 left-0 w-full z-20 pointer-events-none scale-120"
          >
            <Image
              image={artist.frame}
              alt={artist.name}
              objectPosition="50% 0%"
            />
          </div>
        </div>
      {/each}
    {/if}
  </div>
</section>
