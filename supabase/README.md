# Shared Scene Thoughts setup

GitHub Pages hosts the Jekyll site. Supabase stores public scene thoughts and reactions. No server code or JavaScript framework is added to the website.

1. Create a Supabase project at https://supabase.com/.
2. In **Authentication → Sign In / Providers**, enable **Anonymous Sign-Ins**. Visitors get an anonymous account when they first post or react; they do not enter an email address.
3. Open the SQL editor and run the complete `supabase/schema.sql` once. It creates the tables, permissions, posting limit, and ranking function.
4. Copy the project URL and publishable key (or legacy `anon` key) from the project's API settings.
5. Set the public configuration in `_config.yml`:

   ```yaml
   scene_thoughts:
     supabase_url: "https://YOUR-PROJECT.supabase.co"
     public_key: "YOUR-PUBLISHABLE-OR-ANON-KEY"
   ```

6. Restart Jekyll locally or push the change to rebuild GitHub Pages. Each detail page will say **Shared diary** instead of **Local preview**.
7. Open a detail page in two different browsers. Post a thought in one, refresh Scene Thoughts in the other, and react. Refresh in the first browser to see the updated count.

Use only a public key in the config; never put a `service_role` or `sb_secret_` key in a static site. Row Level Security is enforced for every write. The visitor ID and creation time come from Supabase, and each visitor can react once with each emoji to a thought. Clicking again removes that reaction. Separate browsers represent separate anonymous visitors.

Ranking happens in the database before pagination: matching scene first, total reactions second, creation time third, stable ID last. The page loads 20 thoughts at a time. A scene selection prioritizes that scene; other scenes remain below it. Refresh fetches other visitors' changes; the feature does not use a realtime subscription.

In local preview, data is stored only in that browser's localStorage, separated by title. Local preview comments are not uploaded automatically when shared mode is enabled. The site never silently falls back to local storage when a configured shared backend fails.

Owners can remove unwanted thoughts in Supabase's table editor; dependent reactions are deleted automatically. The schema limits each anonymous account to five new thoughts per minute. Supabase Auth's own rate limits also apply. If you enable a CAPTCHA requirement for anonymous sign-in, extend the form to collect its token and include it in the `/auth/v1/signup` request before publishing that configuration.

Implementation references: [anonymous sign-ins](https://supabase.com/docs/guides/auth/auth-anonymous), [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security), and [public API keys](https://supabase.com/docs/guides/getting-started/api-keys).
