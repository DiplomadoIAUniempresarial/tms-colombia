import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    system: "tms-colombia",
    regulatoryMode: process.env.REGULATORY_MODE ?? "mock",
    rndcEnabled: process.env.RNDC_ENABLED === "true",
  });
}
