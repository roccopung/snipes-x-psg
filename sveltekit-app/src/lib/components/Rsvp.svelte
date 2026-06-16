<script lang="ts">
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";

  let message = $state("");
  let done = $state(false);

  const handleRsvp: SubmitFunction = () => {
    return async ({ result }) => {
      if (result.type === "success") {
        done = true;
        message = "Thank you, you're on the list";
      } else {
        message = "There was an error, try again";
      }
    };
  };
</script>

<section
  class="rsvp-section min-h-[100dvh] w-[80vw] mx-auto flex flex-col items-center justify-center py-12"
>
  <h3 class="typo-base uppercase text-center">RSVP</h3>

  {#if done}
    <p class="typo-base uppercase text-center mt-8">{message}</p>
  {:else}
    <form
      method="POST"
      action="?/rsvp"
      use:enhance={handleRsvp}
      class="typo-base flex flex-col gap-4 w-full max-w-md mt-8"
    >
      <label class="flex flex-col gap-1 uppercase">
        Name
        <input
          name="fname"
          type="text"
          required
          class="border-b border-black bg-transparent py-1 outline-none"
        />
      </label>
      <label class="flex flex-col gap-1 uppercase">
        Family name
        <input
          name="lname"
          type="text"
          required
          class="border-b border-black bg-transparent py-1 outline-none"
        />
      </label>
      <label class="flex flex-col gap-1 uppercase">
        Age
        <input
          name="age"
          type="number"
          min="1"
          required
          class="border-b border-black bg-transparent py-1 outline-none"
        />
      </label>
      <label class="flex flex-col gap-1 uppercase">
        Email address
        <input
          name="email"
          type="email"
          required
          class="border-b border-black bg-transparent py-1 outline-none"
        />
      </label>

      <button
        type="submit"
        class="uppercase cursor-pointer hover:opacity-50 transition-fast border border-black rounded-m p-1 w-fit mx-auto mt-4 trim"
        >Send</button
      >

      {#if message}
        <p class="uppercase text-center">{message}</p>
      {/if}
    </form>
  {/if}
</section>
