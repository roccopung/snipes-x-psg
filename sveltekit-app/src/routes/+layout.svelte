<script lang="ts">
  import "../assets/css/main.css";

  import { PreviewMode, QueryLoader, VisualEditing } from "@sanity/sveltekit";
  import type { LayoutProps } from "./$types";
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import { client } from "$lib/sanity/client";
  const { children, data }: LayoutProps = $props();

  // svelte-ignore state_referenced_locally -- previewEnabled only changes on full page reload
  const { previewEnabled } = data;
</script>

<PreviewMode enabled={previewEnabled}>
  <VisualEditing enabled={previewEnabled}>
    <QueryLoader enabled={previewEnabled} {client}>
      {#if previewEnabled}
        <a
          href={resolve("/preview/disable", {
            redirect: page.url.pathname,
          })}
          class="preview-toggle"
        >
          <span>Preview Enabled</span>
          <span>Disable Preview</span>
        </a>
      {/if}

      <!-- <Menu /> -->
      {@render children()}

      <details
        class="fixed top-2 left-2 cursor-pointer"
        name="menu"
        open={false}
      >
        <summary class="opacity-50">Pages</summary>
        <nav>
          <ul class="flex flex-col gap-1 pt-2">
            <li
              class="opacity-50 hover:opacity-100"
              class:opacity-100={page?.route?.id === "/1"}
            >
              <a href="/1">V1 Roboto</a>
            </li>
            <li
              class="opacity-50 hover:opacity-100"
              class:opacity-100={page?.route?.id === "/2"}
            >
              <a href="/2">V1 Eurostile</a>
            </li>
            <li
              class="opacity-50 hover:opacity-100"
              class:opacity-100={page?.route?.id === "/3"}
            >
              <a href="/3">V2 Roboto</a>
            </li>
            <li
              class="opacity-50 hover:opacity-100"
              class:opacity-100={page?.route?.id === "/4"}
            >
              <a href="/4">V2 Eurostile</a>
            </li>
          </ul>
        </nav>
      </details>
    </QueryLoader>
  </VisualEditing>
</PreviewMode>

<style>
  @media (min-width: 600px) {
    .preview-toggle {
      backdrop-filter: blur(12px);
      border-radius: 0.25rem;
      bottom: 1rem;
      box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
      color: #1f2937;
      display: block;
      font-size: 0.75rem;
      font-weight: 500;
      line-height: 1rem;
      padding-bottom: 0.5rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      padding-top: 0.5rem;
      position: fixed;
      right: 1rem;
      text-align: center;
      text-decoration: none;
      z-index: 50;
    }

    .preview-toggle:hover {
      background-color: #ef4444;
      color: #ffffff;
    }

    .preview-toggle span:first-child {
      display: block;
    }
    .preview-toggle:hover span:first-child {
      display: none;
    }

    .preview-toggle span:last-child {
      display: none;
    }
    .preview-toggle:hover span:last-child {
      display: block;
    }
  }
</style>
