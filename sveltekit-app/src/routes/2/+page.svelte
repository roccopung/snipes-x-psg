<script lang="ts">
  //@ts-nocheck
  import { useQuery } from "@sanity/sveltekit";
  import { urlFor } from "$lib/sanity/image";
  import { innerWidth, innerHeight } from "svelte/reactivity/window";
  // import gsap from "gsap";
  // import { TextPlugin } from "gsap/TextPlugin";
  import { clickoutside } from "@svelte-put/clickoutside";
  import SEO from "$lib/components/seo/SEO.svelte";
  import Video from "$lib/components/element/Video.svelte";
  import Logo from "$lib/components/svg/Logo.svelte";
  import { formAnimation } from "$lib/states.svelte";
  import { onMount, tick } from "svelte";

  let { data } = $props();
  let query = $derived(useQuery(data));
  let page = $derived($query.data);
  let pageDescription = "Snipes x PSG";

  let formWrapper: HTMLElement | null = $state(null);
  let formInput: HTMLElement | null = $state(null);
  let formLabel: HTMLElement | null = $state(null);
  let formPlaceholder: string = "Email address";
  let formButton: HTMLElement | null = $state(null);
  let inputWidth: number = $state(0);

  let logoWrapper: HTMLElement | null = $state(null);

  const hideLabel = () => {
    formLabel?.classList.add("hidden");
    formInput?.focus();
  };
  const showLabel = () => {
    if (formInput?.value === "") {
      formLabel?.classList.remove("hidden");
    }
  };
  const closeForm = () => {
    const tl = gsap.timeline();
    tl.to([formInput, formLabel, formButton], {
      opacity: 0,
      duration: 0.4,
      ease: "power4.inOut",
    })
      .to(
        formWrapper,
        {
          width: "4rem",
          duration: 0.5,
          ease: "power4.inOut",
        },
        "+=1",
      )
      .to(
        formWrapper,
        {
          scale: 0,
          duration: 1,
          ease: "power4.inOut",
        },
        "+=1",
      );
  };

  onMount(async () => {
    const { default: gsap } = await import("gsap");
    const { TextPlugin } = await import("gsap/TextPlugin");
    gsap.registerPlugin(TextPlugin);
    gsap.set(formLabel, { opacity: 0 });
    gsap.set(formButton, { opacity: 0 });

    const tl = gsap.timeline();

    gsap.fromTo(
      formWrapper,
      { scale: 0 },
      { scale: 1, duration: 1, ease: "power4.inOut", delay: 1.5 },
    );

    tl.to(
      formWrapper,
      {
        width: "30rem",
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: async () => {
          formAnimation.trigger();
          await tick();
          let tl = gsap.timeline();
          gsap.to(formButton, {
            opacity: 0.5,
            duration: 0.1,
            ease: "power2.inOut",
            onComplete: () => gsap.set(formButton, { clearProps: "opacity" }),
          });
          tl.to(formLabel, {
            opacity: 1,
            duration: 0.4,
            text: formPlaceholder,
            ease: "power2.inOut",
          }).to(
            logoWrapper,
            {
              opacity: 1,
              duration: 0.5,
              ease: "power2.inOut",
            },
            6,
          );
        },
      },
      3,
    );
  });
</script>

<div class="font-eurostile relative w-full h-[100dvh] overflow-hidden">
  <div class="absolute top-0 left-0 h-full min-w-full pointer-events-none">
    <Video video={page?.video} loop autoplay={true} muted={true} />
  </div>

  <div
    bind:this={logoWrapper}
    class="fixed top-2 left-1/2 -translate-x-1/2 w-20 opacity-0"
  >
    <img src="/logo-rock-24.png" alt="" />
  </div>

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="px-2 h-4 min-w-4 bg-black/80 w-0 rounded-full text-white flex items-center justify-between fixed bottom-4 left-1/2 -translate-x-1/2"
    bind:this={formWrapper}
    use:clickoutside
    onclick={hideLabel}
    onclickoutside={showLabel}
  >
    {#if formAnimation.finished}
      <label class="whitespace-nowrap" bind:this={formLabel} for="email"
      ></label>
      <input bind:this={formInput} name="email" type="email" />
      <button
        bind:this={formButton}
        onclick={closeForm}
        class="button hover:opacity-100 cursor-pointer">Send</button
      >
    {/if}
  </div>
</div>

<style>
  input {
    &::placeholder {
      color: #fff;
    }
    outline: none;
  }
  .button {
    opacity: 0.5;
    transition: opacity 0.15s ease;
    &:hover {
      opacity: 1;
    }
  }

  input,
  label,
  .button {
    text-box: trim-both cap alphabetic;
  }
</style>
