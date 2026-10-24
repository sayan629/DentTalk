import { useUser } from "@clerk/nextjs"


function userSync() {
  const { isSignedIn, isLoaded } = useUser();
  
}

export default userSync