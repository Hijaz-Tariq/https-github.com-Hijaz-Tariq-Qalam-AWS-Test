

import {
  useSession as useNextAuthSession,
} from "next-auth/react";

import { auth } from "@/next-auth";

    export const currentUser = async () => {
      const session = await auth();
    
      return session?.user;
    };
    
    export const currentRole = async () => {
      const session = await auth();
    
      return session?.user?.role;
    };
    
    export const useAuth = () => {
      const session = useNextAuthSession();
    
      return session.data?.user;
    }
    
    export const useLiveUser =  () => {
      const session = useNextAuthSession();
      return session.data?.user;
    };
    
    export const currentLiveUser = async () => {
      const session = await auth();
    
      return session?.user;
    };
    