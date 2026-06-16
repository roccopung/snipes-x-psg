<script lang="ts">
  //@ts-nocheck
  import { useQuery } from "@sanity/sveltekit";
  import { urlFor } from "$lib/sanity/image";
  import { innerWidth, innerHeight } from "svelte/reactivity/window";
  import { clickoutside } from "@svelte-put/clickoutside";
  import SEO from "$lib/components/seo/SEO.svelte";
  import Logo from "$lib/components/svg/Logo.svelte";
  import Header from "$lib/components/Header.svelte";
  import LineUp from "$lib/components/LineUp.svelte";
  import UBA from "$lib/components/UnitedByAttitude.svelte";
  import Rsvp from "$lib/components/Rsvp.svelte";

  import { onMount, tick } from "svelte";

  let { data } = $props();
  let query = $derived(useQuery(data));
  let page = $derived($query.data);
</script>

<div class="overflow-hidden">
  <Header />
  <LineUp data={page?.lineUp} />
  <UBA data={page?.unitedByAttitude} />
  <Rsvp />
</div>
