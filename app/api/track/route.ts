// import { RoomServiceClient, TrackSource } from 'livekit-server-sdk';
// import { NextRequest, NextResponse } from 'next/server';

// const API_KEY = process.env.LIVEKIT_API_KEY;
// const API_SECRET = process.env.LIVEKIT_API_SECRET;
// const LIVEKIT_URL = process.env.LIVEKIT_URL;

// export async function POST(request: NextRequest) {
//   try {
//     // Parse query parameters for mute/unmute action
//     const roomName = request.nextUrl.searchParams.get('roomName');
//     const mute = request.nextUrl.searchParams.get('mute') === 'true'; // Ensure mute is a boolean (true or false)

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

//     // Loop through each participant and mute/unmute their audio track
//     for (const participant of participants) {
//       const audioTrack = participant.tracks.find((track) => track.source === TrackSource.MICROPHONE);
//       if (audioTrack) {
//         // Mute or unmute the audio track
//         await roomService.mutePublishedTrack(roomName, participant.identity, audioTrack.sid, mute);
//       }
//     }

//     return new NextResponse(`All participants ${mute ? 'muted' : 'unmuted'}`, { status: 200 });
//   } catch (error) {
//     return new NextResponse(error.message, { status: 500 });
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

////////////////////////////////------------------------------ADD Disable video
import { RoomServiceClient, TrackSource } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

export async function POST(request: NextRequest) {
  try {
    // Parse query parameters for mute/unmute action
    const roomName = request.nextUrl.searchParams.get('roomName');
    const mute = request.nextUrl.searchParams.get('mute') === 'true'; // Ensure mute is a boolean (true or false)
    const disableVideo = request.nextUrl.searchParams.get('disableVideo') === 'true'; // For turning off/on cameras

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

    // Loop through each participant and mute/unmute their audio track
    for (const participant of participants) {
      const audioTrack = participant.tracks.find(
        (track) => track.source === TrackSource.MICROPHONE,
      );
      const videoTrack = participant.tracks.find((track) => track.source === TrackSource.CAMERA);
      if (audioTrack) {
        // Mute or unmute the audio track
        await roomService.mutePublishedTrack(roomName, participant.identity, audioTrack.sid, mute);
      }
      // Disable/enable video track
      if (videoTrack) {
        await roomService.mutePublishedTrack(
          roomName,
          participant.identity,
          videoTrack.sid,
          disableVideo,
        );
      }
    }

    return new NextResponse(`All participants ${mute ? 'muted' : 'unmuted'}`, { status: 200 });
  } catch (error) {
    // return new NextResponse(error.message, { status: 500 });
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
