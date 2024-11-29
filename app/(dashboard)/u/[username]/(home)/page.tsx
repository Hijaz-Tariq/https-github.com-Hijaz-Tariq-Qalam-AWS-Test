import { currentLiveUser } from "@/lib/auth";

import { getUserByUsername } from "@/lib/user-service";
import { StreamPlayer } from "@/components/stream-player";

interface CreatorPageProps {
  params: {
    username: string;
  };
};

const CreatorPage = async ({
  params,
}: CreatorPageProps) => {
  const loggedInUser = await currentLiveUser();
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream || loggedInUser?.id !== user.id) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer
         user={user}
         stream={user.stream}
         isFollowing
       />
    </div>
  );
}

export default CreatorPage;