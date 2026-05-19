<script lang="ts">
  //@ts-nocheck
  //
  import { useQuery } from "@sanity/sveltekit";
  import { urlFor } from "$lib/sanity/image";
  import { innerWidth, innerHeight } from "svelte/reactivity/window";
  import gsap from "gsap";
  import { SplitText } from "gsap/SplitText";
  import SEO from "$lib/components/seo/SEO.svelte";
  import Video from "$lib/components/element/Video.svelte";
  import { onMount } from "svelte";

  let { data } = $props();
  let query = $derived(useQuery(data));
  let page = $derived($query.data);
  let pageDescription = "Snipes x PSG";
  let title: HTMLElement | null = $state(null);

  onMount(() => {
    if (!gsap) return;
    gsap.registerPlugin(SplitText);

    function SplitTextAnimation(target, config) {
      let animation,
        onSplit = config.onSplit;
      config.onSplit = (self) => {
        let parent, startTime;
        if (animation) {
          parent = animation.parent;
          startTime = animation.startTime();
          animation.kill();
        }
        animation = onSplit && onSplit(self);
        parent && parent.add(animation, startTime || 0);
      };
      SplitText.create(target, config);
      return animation;
    }

    gsap.set(title, { opacity: 1 });
    const tl = gsap.timeline();
    let split;

    SplitText.create(title, {
      type: "words,lines",
      linesClass: "line",
      autoSplit: true,
      mask: "lines",
      onSplit: (self) => {
        split = gsap.from(self.words, {
          duration: 1.4,
          yPercent: 80,
          opacity: 0,
          stagger: 0.1,
          delay: 1.2,
          ease: "power4.inOut",
        });
        return split;
      },
    });
  });
</script>

<SEO {pageDescription} />

<main>
  <div class="relative w-full h-[100dvh] overflow-hidden">
    <div class="absolute top-0 left-0 h-full min-w-full pointer-events-none">
      <Video video={page?.video} loop autoplay={true} muted={true} />
    </div>
    <h1
      bind:this={title}
      class="absolute top-1/2 -translate-y-1/2 left-2 text-white"
    >
      Snipes x PSG
    </h1>
  </div>
  <img
    class="fixed bottom-2 left-1/2 -translate-x-1/2 w-20"
    src="/logo-rock.png"
    alt=""
  />
</main>

<style>
  h1 {
    font-size: 4rem;
    letter-spacing: -0.025em;
  }
</style>
