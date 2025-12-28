// components/aplications/ApplicationsFilter.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  initialLocation?: string;
  initialGender?: "male" | "female";
  initialMinAge?: number;
  initialMaxAge?: number;
  locations?: string[]; // example: ["Riyadh", "Jeddah", "Dammam"]
}

export default function ApplicationsFilter({
  initialLocation,
  initialGender,
  initialMinAge,
  initialMaxAge,
  locations = [],
}: Props) {
  return (
    <form
      method="GET"
      className="flex flex-wrap gap-4 mb-4 items-end"
    >
      {/* Location dropdown */}
      <div className="flex flex-col">
        <label>Location</label>
        <select
          name="location"
          defaultValue={initialLocation}
          className="border rounded-md p-1"
        >
          <option value="">All</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Gender dropdown */}
      <div className="flex flex-col">
        <label>Gender</label>
        <select
          name="gender"
          defaultValue={initialGender}
          className="border rounded-md p-1"
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Age range */}
      <div className="flex flex-col">
        <label>Min Age</label>
        <input
          type="number"
          name="minAge"
          defaultValue={initialMinAge || ""}
          className="border rounded-md p-1 w-24"
        />
      </div>

      <div className="flex flex-col">
        <label>Max Age</label>
        <input
          type="number"
          name="maxAge"
          defaultValue={initialMaxAge || ""}
          className="border rounded-md p-1 w-24"
        />
      </div>

      <Button type="submit" className="bg-[#676e32] text-white rounded-md">
        Apply
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          // Clear filters
          window.location.href = window.location.pathname;
        }}
      >
        Clear
      </Button>
    </form>
  );
}
