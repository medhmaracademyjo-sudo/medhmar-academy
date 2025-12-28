"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NewApplication } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

export type PartialApplication = {
  id: string;
  name: string;
  gender: "male" | "female";
  email: string;
  location: string;
  date_of_birth: Date;
  created_at: Date | null;
};


export const ApplicationColumns: ColumnDef<PartialApplication>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Name
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-gray-800">
        {row.original.name}
      </div>
    ),
  },

  {
    accessorKey: "gender",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Gender
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.gender}
      </span>
    ),
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Email
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">
        {row.original.email}
      </div>
    ),
    meta:{hiddenByDefault:true}
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Location
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
  },

  {
    accessorKey: "education_level",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Education
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    meta:{hiddenByDefault:true}
  },

  {
    accessorKey: "major",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Major
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    meta:{hiddenByDefault:true}
  },
  {
    accessorKey: "date_of_birth",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Date of Birth
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.date_of_birth);
      return (
        <div className="text-sm">
          {date.toLocaleDateString()}
        </div>
      );
    },
  },
];
