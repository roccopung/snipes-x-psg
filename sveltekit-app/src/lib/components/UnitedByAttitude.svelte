<script lang="ts">
  import Image from "$lib/components/element/Image.svelte";
  import Gallery from "$lib/components/Gallery.svelte";

  type Props = {
    data: any;
  };

  const { data }: Props = $props();
  let campaignHeight: number = $state(0);

  const goToLooks = () => {
    const looksSection = document.querySelector(".looks-section");
    if (looksSection) {
      looksSection.scrollIntoView({ behavior: "smooth" });
    }
  };
</script>

<section
  class="united-by-attitude-section min-h-[100dvh] pt-12 pb-6 md:pt-0 flex flex-col items-start md:w-[80vw] mx-auto"
>
  <div
    class="campaign-wrapper flex gap-4 flex-col justify-center h-auto md:h-[100svh] w-full"
    bind:clientHeight={campaignHeight}
  >
    <h3 class="text-center typo-base uppercase">Shop the look</h3>
    <div class="px-2 md:py-0 md:px-0">
      {#if data?.campaign?.length > 0}
        <div class="flex flex-col gap-2 md:hidden">
          {#each data?.campaign as item, i}
            <a
              href={item?.link?.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              class="relative aspect-[4/5] overflow-hidden"
            >
              <Image image={item.image} alt="campaign image" />
            </a>
          {/each}
        </div>
        <div class="hidden md:flex w-full">
          <Gallery items={data?.campaign} />
        </div>
      {/if}
    </div>
    <a
      href="https://www.snipes.com/fr-fr/shop-the-look?topic=PSG"
      target="_blank"
      rel="noopener noreferrer"
      class="trim text-center typo-base uppercase hover:opacity-50 p-1 border border-black rounded-m w-fit h-fit mx-auto"
      >Tous les looks</a
    >
  </div>

  <div
    class="flex flex-col gap-2 px-2 py-8 md:grid md:grid-cols-6 md:px-0 md:py-20 looks-section"
  >
    {#if data?.products?.length > 0}
      {#each data?.products as item, i}
        <a
          href={item?.link?.url ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          class="relative aspect-[2/3] overflow-hidden"
        >
          <Image image={item.image} alt="campaign image" />
        </a>
      {/each}
    {/if}
  </div>
</section>
