import { revalidatePath } from "next/cache";
import { cleanContentUrlSegment } from "@/lib/optimizely";

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || "";
if (!REVALIDATE_SECRET)
  throw new Error('Env variable "REVALIDATE_SECRET" is not set');

export async function POST(request: Request) {
  console.log("Received revalidate request");
  const secret = request.headers.get("X-Api-Key");

  if (secret !== REVALIDATE_SECRET) {
    console.log('Received invalid "X-Api-Key"');
    return Response.json(
      {
        message:
          'Header "secret" was not included in the request or does not match the revalidation secret',
      },
      { status: 401 },
    );
  }

  const url = new URL(request.url);

  if (!url.searchParams.has("path")) {
    return Response.json(
      { message: 'No header "path" received' },
      { status: 400 },
    );
  }

  const path = url.searchParams.get("path");
  const cleaned = cleanContentUrlSegment(path || "");
  console.log(`Received path "${path}" (cleaned "${cleaned}")`);

  revalidatePath(cleaned);

  return Response.json({ revalidated: true }, { status: 200 });
}
