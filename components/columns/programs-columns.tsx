


"use client";

import { ColumnDef } from "@tanstack/react-table";
import { NewProgram } from "@/types/index";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

export const ProgramColumns: ColumnDef<NewProgram>[] = [
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
    accessorKey: "program_name_en",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Name (EN)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => <div className="text-gray-800 font-medium">{row.original.program_title_en}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "program_name_ar",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Name (AR)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-gray-800 font-medium" dir="rtl">
        {row.original.program_title_ar}
      </div>
    ),
    enableSorting: true,
    meta:{hiddenByDefault:true}
  },
  {
    accessorKey: "description_en",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Description (EN)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const desc = row.original.program_description_en ?? "";
      return <div className="text-gray-800 font-medium">{desc.slice(0, 35) + (desc.length > 35 ? "..." : "")}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "description_ar",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Description (AR)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const desc = row.original.program_description_ar ?? "";
      return (
        <div className="text-gray-800 font-medium" dir="rtl">
          {desc.slice(0, 35) + (desc.length > 35 ? "..." : "")}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
    meta:{hiddenByDefault:true}

  },
    {
    accessorKey: "duration_d",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Duration (Day)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => <div className="text-gray-800 font-medium">{row.original.duration_d}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "duration_h",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Duration (Hours)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => <div className="text-gray-800 font-medium">{row.original.duration_h}</div>,
    enableSorting: true,
    meta:{hiddenByDefault:true}
  },
   
  
  
];
