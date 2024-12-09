// import { RoomServiceClient, TrackSource } from 'livekit-server-sdk';
// import { NextRequest, NextResponse } from 'next/server';

// const API_KEY = process.env.LIVEKIT_API_KEY;
// const API_SECRET = process.env.LIVEKIT_API_SECRET;
// const LIVEKIT_URL = process.env.LIVEKIT_URL;

// export async function POST(request: NextRequest) {
//   try {
//     const roomName = request.nextUrl.searchParams.get('roomName');
//     const disableVideo = request.nextUrl.searchParams.get('disableVideo') === 'true';

//     if (typeof roomName !== 'string') {
//       return new NextResponse('Missing required query parameter: roomName', { status: 400 });
//     }

//     const region = request.nextUrl.searchParams.get('region');
//     const livekitServerUrl = region ? getLiveKitURL(region) : LIVEKIT_URL;
//     if (livekitServerUrl === undefined) {
//       throw new Error('Invalid region');
//     }

//     // Initialize RoomServiceClient
//     const roomService = new RoomServiceClient(livekitServerUrl, API_KEY, API_SECRET);

//     // List all participants in the room
//     const participants = await roomService.listParticipants(roomName);

//     // Loop through each participant and disable/enable their video track
//     for (const participant of participants) {
//       const videoTrack = participant.tracks.find((track) => track.source === TrackSource.CAMERA);
//       if (videoTrack) {
//         await roomService.mutePublishedTrack(
//           roomName,
//           participant.identity,
//           videoTrack.sid,
//           disableVideo,
//         );
//       }
//     }

//     return new NextResponse(`All participants' cameras ${disableVideo ? 'turned off' : 'turned on'}`, {
//       status: 200,
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       return new NextResponse(error.message, { status: 500 });
//     }
//   }
// }

// function getLiveKitURL(region: string | null): string {
//   let targetKey = 'LIVEKIT_URL';
//   if (region) {
//     targetKey = `LIVEKIT_URL_${region}`.toUpperCase();
//   }
//   const url = process.env[targetKey];
//   if (!url) {
//     throw new Error(`${targetKey} is not defined`);
//   }
//   return url;
// }


//---------------------------------- without toggling/turn off only 
import { RoomServiceClient, TrackSource } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

export async function POST(request: NextRequest) {
  try {
    const roomName = request.nextUrl.searchParams.get('roomName');

    if (typeof roomName !== 'string') {
      return new NextResponse('Missing required query parameter: roomName', { status: 400 });
    }

    const region = request.nextUrl.searchParams.get('region');
    const livekitServerUrl = region ? getLiveKitURL(region) : LIVEKIT_URL;
    if (livekitServerUrl === undefined) {
      throw new Error('Invalid region');
    }

    // Initialize RoomServiceClient
    const roomService = new RoomServiceClient(livekitServerUrl, API_KEY, API_SECRET);

    // List all participants in the room
    const participants = await roomService.listParticipants(roomName);

    // Loop through each participant and disable their video track (close the cameras)
    for (const participant of participants) {
      const videoTrack = participant.tracks.find((track) => track.source === TrackSource.CAMERA);
      if (videoTrack) {
        await roomService.mutePublishedTrack(
          roomName,
          participant.identity,
          videoTrack.sid,
          true, // Always set to 'true' to disable the video (close cameras)
        );
      }
    }

    return new NextResponse("All participants' cameras have been turned off", {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }
  }
}

function getLiveKitURL(region: string | null): string {
  let targetKey = 'LIVEKIT_URL';
  if (region) {
    targetKey = `LIVEKIT_URL_${region}`.toUpperCase();
  }
  const url = process.env[targetKey];
  if (!url) {
    throw new Error(`${targetKey} is not defined`);
  }
  return url;
}
