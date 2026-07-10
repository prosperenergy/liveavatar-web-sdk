# HANNA Live MVP

This branch converts the generic LiveAvatar demo launcher into the first secure HANNA vertical slice.

## Configure

Copy `.env.example` to `.env.local` inside `apps/demo` and set:

```env
LIVEAVATAR_API_KEY=your_server_side_key
LIVEAVATAR_AVATAR_ID=your_selected_avatar_uuid
LIVEAVATAR_SANDBOX=true
```

Never expose these values with a `NEXT_PUBLIC_` prefix.

## Run

From the repository root:

```bash
corepack enable
pnpm install
pnpm demo
```

Open `http://localhost:3001` and click **Start HANNA**.

## Current milestone

- HANNA-branded launch screen
- Server-created LiveAvatar LITE session token
- No API key sent to the browser
- Existing LiveAvatar session component reused for WebRTC media
- Friendly startup and error states

## Next milestone

Connect the LITE session audio/text pipeline to the Prosper reasoning backend, then add the HANNA system prompt, transcription, response streaming, interruption handling, and tool calls.
