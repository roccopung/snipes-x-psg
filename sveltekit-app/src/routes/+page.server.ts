import { homeQuery } from "$lib/sanity/queries";
import { fail } from "@sveltejs/kit";
import {
  MAILCHIMP_API_KEY,
  MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_SERVER_PREFIX,
} from "$env/static/private";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { sanity } }) => {
  const { loadQuery } = sanity;
  const initial = await loadQuery(homeQuery);

  return {
    query: homeQuery,
    options: { initial },
  };
};

export const actions: Actions = {
  subscribe: async ({ request }) => {
    const email = (await request.formData()).get("email")?.toString().trim();
    if (!email) return fail(400, { code: "error" });

    const res = await fetch(
      `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address: email, status: "subscribed" }),
      },
    );

    if (res.ok) return { success: true };
    const body = await res.json();
    if (body.title === "Member Exists") return fail(400, { code: "exists" });
    return fail(500, { code: "error" });
  },
};
