import { homeQuery } from "$lib/sanity/queries";
import { fail } from "@sveltejs/kit";
import { createHash } from "node:crypto";
import {
  MAILCHIMP_API_KEY,
  MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_SERVER_PREFIX,
} from "$env/static/private";
import type { Actions, PageServerLoad } from "./$types";

// export const load: PageServerLoad = async ({ locals: { sanity } }) => {
//   const { loadQuery } = sanity;
//   const initial = await loadQuery(homeQuery);

//   return {
//     query: homeQuery,
//     options: { initial },
//   };
// };

export const actions: Actions = {
  rsvp: async ({ request }) => {
    const data = await request.formData();
    const fname = data.get("fname")?.toString().trim();
    const lname = data.get("lname")?.toString().trim();
    const age = data.get("age")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    if (!fname || !lname || !age || !email) return fail(400, { code: "error" });

    const hash = createHash("md5").update(email.toLowerCase()).digest("hex");
    const res = await fetch(
      `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${hash}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status_if_new: "subscribed",
          merge_fields: { FNAME: fname, LNAME: lname, AGE: age },
        }),
      },
    );

    if (res.ok) return { success: true };
    const body = await res.json().catch(() => ({}));
    console.error("Mailchimp RSVP error", res.status, body);
    return fail(500, { code: "error" });
  },
};
