// import "@supabase/supabase-js";

declare module "@supabase/supabase-js" {
  interface User {
    user_metadata?: {
      name?: string;
      // Add other custom fields as needed
    };
  }
}
