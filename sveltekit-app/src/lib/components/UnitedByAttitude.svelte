<script lang="ts">
  import Image from "$lib/components/element/Image.svelte";

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
    class="campaign-wrapper flex gap-12 flex-col justify-center h-auto md:h-[100svh]"
    bind:clientHeight={campaignHeight}
  >
    <h3 class="text-center typo-base uppercase">United By Attitude</h3>

    <div
      class="campaign-grid flex flex-col gap-2 px-2 md:grid md:grid-cols-4 md:py-0 md:px-0"
    >
      {#if data?.campaign?.length > 0}
        {#each data?.campaign as item, i}
          <a
            href={item?.link?.url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            class="relative aspect-[3/2] overflow-hidden"
          >
            <Image image={item.image} alt="campaign image" />
          </a>
        {/each}
      {/if}
    </div>
    <button
      onclick={goToLooks}
      class="text-center typo-base uppercase hover:opacity-50"
      >Shop the looks</button
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

<style>
  /*@media (min-width: 768px) {
    .campaign-wrapper {
      padding-top: var(--campaign-mt);
    }
  }*/
</style>
