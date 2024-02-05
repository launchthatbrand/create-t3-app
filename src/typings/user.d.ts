import { type User as OriginalUser } from "@supabase/supabase-js";

declare module "@supabase/supabase-js" {
  interface UserMetadata {
    firstName?: string;
    lastName?: string;
    profileImage?: string;
    // Add other user_metadata fields here
  }

  interface User extends OriginalUser {
    user_metadata?: UserMetadata;
  }
}
