import { API_KEY, API_URL, AVATAR_ID, IS_SANDBOX } from "../secrets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getErrorMessage(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "LiveAvatar rejected the session request";
  }

  const record = payload as Record<string, unknown>;
  if (typeof record.message === "string" && record.message.trim()) {
    return record.message;
  }

  const data = record.data;
  if (Array.isArray(data) && data[0] && typeof data[0] === "object") {
    const message = (data[0] as Record<string, unknown>).message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  return "LiveAvatar rejected the session request";
}

export async function POST() {
  try {
    const response = await fetch(`${API_URL}/v1/sessions/token`, {
      method: "POST",
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        mode: "LITE",
        avatar_id: AVATAR_ID,
        is_sandbox: IS_SANDBOX,
      }),
      cache: "no-store",
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      return Response.json(
        { error: getErrorMessage(payload) },
        { status: response.status },
      );
    }

    const data = (payload as { data?: Record<string, unknown> } | null)?.data;
    const sessionToken = data?.session_token;
    const sessionId = data?.session_id;

    if (typeof sessionToken !== "string" || !sessionToken) {
      return Response.json(
        { error: "LiveAvatar did not return a session token" },
        { status: 502 },
      );
    }

    return Response.json(
      {
        session_token: sessionToken,
        session_id: typeof sessionId === "string" ? sessionId : null,
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to start HANNA";
    return Response.json({ error: message }, { status: 500 });
  }
}
