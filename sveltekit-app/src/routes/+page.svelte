<script lang="ts">
  //@ts-nocheck
  import { useQuery } from "@sanity/sveltekit";
  import { enhance } from "$app/forms";
  import Video from "$lib/components/element/Video.svelte";
  import { onMount, tick } from "svelte";

  let { data } = $props();
  let query = $derived(useQuery(data));
  let page = $derived($query.data);
  let pageDescription = "Snipes x PSG";

  let formWrapper: HTMLElement | null = $state(null);
  let formFields: HTMLElement | null = $state(null);
  let messageEl: HTMLElement | null = $state(null);
  let bottomSection: HTMLElement | null = $state(null);

  let open = $state(false);
  let done = $state(false);
  let message = $state("");

  let _gsap;
  let resizeTimer;

  const openForm = async () => {
    if (open || done || !_gsap) return;

    const top = bottomSection.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });

    const collapsedWidth = formWrapper.offsetWidth;
    open = true;
    await tick();

    // measure the natural width of the expanded content, capped at 92vw
    const targetWidth = Math.min(
      formWrapper.offsetWidth,
      window.innerWidth * 0.92,
    );
    _gsap.set(formWrapper, { width: collapsedWidth });

    const tl = _gsap.timeline();
    tl.to(formWrapper, {
      width: targetWidth,
      duration: 1,
      ease: "expo.inOut",
    }).to(formFields, { opacity: 1, duration: 0.4, ease: "power2.inOut" });
  };

  const handleRsvp = () => {
    return async ({ result }) => {
      if (result.type === "success") {
        done = true;
        message = "Thank you, you're on the list";
        await tick();

        const tl = _gsap.timeline();
        tl.to(formWrapper, {
          width: "auto",
          duration: 0.6,
          ease: "power4.inOut",
        })
          .to(messageEl, { opacity: 1, duration: 0.4, ease: "power2.inOut" })
          .to(
            formWrapper,
            { opacity: 0, duration: 0.4, ease: "power4.inOut" },
            "+=1.2",
          );
      } else {
        message = "Error, try again";
      }
    };
  };

  // While the form is open its width is a fixed px value, which no longer fits
  // after a viewport change. Hide it instantly on resize, then re-measure and
  // restore once resizing settles.
  const handleResize = () => {
    if (!open || done) return;
    _gsap.set([formWrapper, formFields], { opacity: 0 });

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      _gsap.set(formWrapper, { clearProps: "width" });
      const targetWidth = Math.min(
        formWrapper.offsetWidth,
        window.innerWidth * 0.92,
      );
      _gsap.set(formWrapper, { width: targetWidth, opacity: 1 });
      _gsap.set(formFields, { opacity: 1 });
    }, 200);
  };

  onMount(async () => {
    const { default: gsap } = await import("gsap");
    _gsap = gsap;

    gsap.set(formWrapper, { opacity: 0, scale: 0, xPercent: -50 });

    gsap.to(formWrapper, {
      opacity: 1,
      duration: 0.4,
      ease: "power4.out",
      delay: 1.5,
    });

    gsap.to(formWrapper, {
      scale: 1,
      xPercent: -50,
      duration: 0.8,
      ease: "power4.out",
      delay: 1.5,
    });

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  });
</script>

<div class="relative font-eurostile w-full h-[100svh] overflow-hidden">
  <Video video={page?.video} loop autoplay={true} muted={true} />

  <!-- <div
    bind:this={logoWrapper}
    class="fixed top-4 md:top-2 left-1/2 -translate-x-1/2 w-20 opacity-0"
  >
    <img src="/logo-rock-24.png" alt="" />
  </div> -->

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="bg-black/80 text-white px-2 md:px-4 py-2 pb-1.5 flex flex-col md:flex-row items-center gap-1 md:gap-3 overflow-hidden fixed bottom-4 left-1/2 rounded-l md:rounded-full z-10 opacity-0"
    class:cursor-pointer={!open}
    bind:this={formWrapper}
    onclick={openForm}
  >
    <span class="font-eurostile font-bold uppercase whitespace-nowrap"
      >RSVP</span
    >

    {#if open}
      {#if done}
        <p bind:this={messageEl} class="whitespace-nowrap opacity-0">
          {message}
        </p>
      {:else}
        <form
          method="POST"
          action="?/rsvp"
          use:enhance={handleRsvp}
          bind:this={formFields}
          class="flex flex-col gap-1 md:flex-row items-stretch md:items-center md:gap-3 w-full opacity-0"
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            class="bg-transparent outline-none w-full md:w-auto text-center md:text-left"
          />
          <input
            name="lname"
            type="text"
            placeholder="Surname"
            required
            class="bg-transparent outline-none w-full md:w-auto text-center md:text-left"
          />
          <input
            name="fname"
            type="text"
            placeholder="Name"
            required
            class="bg-transparent outline-none w-full md:w-auto text-center md:text-left"
          />
          <input
            name="age"
            type="number"
            min="1"
            placeholder="Age"
            required
            class="bg-transparent outline-none w-full md:w-10 text-center md:text-left"
          />
          <button type="submit" class="button hover:opacity-100 cursor-pointer"
            >Send</button
          >

          {#if message}
            <p class="uppercase whitespace-nowrap">{message}</p>
          {/if}
        </form>
      {/if}
    {/if}
  </div>
</div>

<div
  class="bottom relative h-[100svh] overflow-hidden"
  bind:this={bottomSection}
>
  <img
    class="hidden md:block w-full h-full object-cover"
    src="https://cdn.sanity.io/images/lbh5da21/production/a5c55dbde0180ab7992901c60a4f5ef649946f3e-2000x1125.jpg"
    alt=""
  />
  <img
    class="md:hidden h-full object-cover w-full"
    src="https://cdn.sanity.io/images/lbh5da21/production/4416cba50a098807b067b9d23773429afa472d19-844x1500.jpg"
    alt=""
  />
</div>

<style>
  input {
    &::placeholder {
      color: #fff;
    }
    outline: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
  .button {
    opacity: 0.5;
    transition: opacity 0.15s ease;
    &:hover {
      opacity: 1;
    }
  }

  /*.button {
    text-box: trim-both cap alphabetic;
  }*/
</style>
