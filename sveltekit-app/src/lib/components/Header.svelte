<script lang="ts">
  type Props = {
    navWrapper?: HTMLElement | null;
    logoWrapper?: HTMLElement | null;
    navLinks?: HTMLElement | null;
  };

  let {
    navWrapper = $bindable(),
    logoWrapper = $bindable(),
    navLinks = $bindable(),
  }: Props = $props();

  let scrollY = $state(0);

  const goToLineUp = () => {
    const lineUpSection = document.querySelector(".line-up-section");
    if (lineUpSection) {
      lineUpSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToUnitedByAttitude = () => {
    const unitedByAttitudeSection = document.querySelector(
      ".united-by-attitude-section",
    );
    if (unitedByAttitudeSection) {
      unitedByAttitudeSection.scrollIntoView({ behavior: "smooth" });
    }
  };
</script>

<svelte:window bind:scrollY />

<nav
  bind:this={navWrapper}
  class="fixed top-2 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center md:flex-row md:justify-between md:gap-4 md:w-[80vw]
  "
>
  <div
    bind:this={logoWrapper}
    class="{scrollY > 10 ? 'w-0' : 'w-10'} md:w-20 transition-fast"
  >
    <img class="h-full w-full" src="/logo-rock-24.png" alt="" />
  </div>

  <ul
    bind:this={navLinks}
    class="typo-base flex items-center gap-0.5 md:gap-2 whitespace-nowrap"
  >
    <li>
      <button
        onclick={goToLineUp}
        class="uppercase cursor-pointer hover:opacity-50 transition-fast bg-white md:bg-none p-0.5 trim"
        >Line-up</button
      >
    </li>
    <li>
      <button
        onclick={goToUnitedByAttitude}
        class="uppercase cursor-pointer hover:opacity-50 transition-fast bg-white md:bg-none p-0.5 trim"
        >United by attitude</button
      >
    </li>
    <li>
      <button
        class="uppercase cursor-pointer hover:opacity-50 transition-fast bg-white md:bg-none p-0.5 trim"
        >Newsletter</button
      >
    </li>
    <li>
      <button
        class="uppercase cursor-pointer hover:opacity-50 transition-fast bg-white md:bg-none p-0.5 trim"
        >Contact</button
      >
    </li>
  </ul>
</nav>
