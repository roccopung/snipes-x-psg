<script lang="ts">
  import Image from "$lib/components/element/Image.svelte";

  type Props = {
    data: any;
  };

  const { data }: Props = $props();
  let campaignHeight: number = $state(0);
  $effect(() => {
    console.log(campaignHeight);
  });
</script>

<section
  class="united-by-attitude-section min-h-[100dvh] pt-12 pb-6 md:pt-0 flex flex-col items-start md:w-[80vw] mx-auto"
  style:--campaign-mt="calc(50dvh - {campaignHeight / 2}px)"
>
  <div class="flex gap-12 flex-col">
    <h3 class="text-center typo-base uppercase">United By Attitude</h3>

    <div
      class="campaign-grid flex flex-col gap-2 px-2 md:grid md:grid-cols-4 md:py-0 md:px-0"
      bind:clientHeight={campaignHeight}
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
    <h3 class="text-center typo-base uppercase">Shop the look</h3>
  </div>

  <div class="flex flex-col gap-2 px-2 md:grid md:grid-cols-4 md:px-0 pt-12">
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
  @media (min-width: 768px) {
    .united-by-attitude-section {
      padding-top: var(--campaign-mt);
    }
  }
</style>
