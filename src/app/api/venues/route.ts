import { NextRequest, NextResponse } from "next/server";
import { SAMPLE_VENUES } from "@/data/venues";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sport = searchParams.get("sport");
  const location = searchParams.get("location");
  const maxPrice = searchParams.get("maxPrice");
  const query = searchParams.get("q");

  let results = [...SAMPLE_VENUES];

  if (sport && sport !== "all") {
    results = results.filter((v) => v.sport === sport);
  }

  if (location && location !== "All Locations") {
    results = results.filter((v) =>
      v.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (maxPrice) {
    const limit = Number(maxPrice);
    if (!isNaN(limit)) {
      results = results.filter((v) => v.pricePerHour <= limit);
    }
  }

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q) ||
        v.sportLabel.toLowerCase().includes(q) ||
        v.amenities.some((a) => a.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    venues: results,
  });
}
