// "use client"

// import * as React from "react";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   flexRender,
//   getCoreRowModel,
//   getExpandedRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import Link from "next/link";
// import { ArrowUpDown, MoreHorizontal, Pencil, ListCollapse } from "lucide-react"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// // Utility function to check if a class has a course in a category
// const hasCourseInCategory = (classCourses: { id: string, categoryId: string }[], categoryId: string) => {
//   return classCourses.some(course => course.categoryId === categoryId);
// };

// interface DataTableProps<TData, TValue> {
//   data: TData[];
//   categories: { id: string, name: string }[];
// }

// export function DataTable<TData, TValue>({
//   data,
//   categories,

// }: DataTableProps<TData, TValue>) {
//   // Define columns dynamically
//   const columns: ColumnDef<TData, TValue>[] = [
//     {
//       accessorKey: "name",
//       header: ({ column }) => (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Class Name
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       ),
//       cell: ({ row }: any) => {
//         const classIndex = row.original.classIndex; // Replace with the actual field name for classIndex
//         const departments = row.original.department;

//         return (
//           // <span>
//           //   {classIndex > 10
//           //     ? departments.map((department: any) => (
//           //       <div key={department.id}>{department.name}</div>
//           //     ))
//           //     : row.original.name}
//           // </span>
//           <span>{row.original.name} </span>
//         );
//       },
//     },

//     ...categories.map((category) => ({
//       id: category.id,
//       header: category.name,
//       cell: ({ row }: any) => {
//         const classCourses = row.original.courses;
//         return (
//           <span>
//             {hasCourseInCategory(classCourses, category.id) ? '✓' : <span className="bg-red-700">✘</span>}
//           </span>
//         );
//       },
//     })),
//     {
//       id: "actions",
//       cell: ({ row }: any) => {
//         const { id } = row.original;

//         return (
//           <>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="h-4 w-8 p-0">
//                   <span className="sr-only">Open menu</span>
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <Link href={`/admin/users/${id}`}>
//                   <DropdownMenuItem>
//                     <Pencil className="h-4 w-4 mr-2" />
//                     Edit
//                   </DropdownMenuItem>
//                 </Link>
//                 <Link href={`#`}>
//                   <DropdownMenuItem>
//                     <ListCollapse className="h-4 w-4 mr-2" />
//                     Details
//                   </DropdownMenuItem>
//                 </Link>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </>
//         );
//       },
//     },
//   ];

//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//     state: {
//       sorting,
//       columnFilters,
//     },
//   });
//   return (
//     <div>
//       <div className="flex items-center py-4 justify-between">
//         <Input
//           placeholder="Filter Users..."
//           value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
//           onChange={(event) =>
//             table.getColumn("name")?.setFilterValue(event.target.value)
//           }
//           className="max-w-sm"
//         />
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Class</TableHead>
//               {categories.map((cat) => (
//                 <TableHead key={cat.id}>{cat.name}</TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} className="h-24 text-center">
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }

// // //--------------------------------------------------------------------------

// "use client"

// import * as React from "react";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   flexRender,
//   getCoreRowModel,
//   getExpandedRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import Link from "next/link";
// import { ArrowUpDown, MoreHorizontal, Pencil, ListCollapse } from "lucide-react"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Department, Class } from "@prisma/client";

// // Utility function to check if a class has a course in a category
// const hasCourseInCategory = (classCourses: { id: string, categoryId: string }[], categoryId: string) => {
//   return classCourses.some(course => course.categoryId === categoryId);
// };
// const hasDepartments = (classDepartments: { id: string, categoryId: string, departments: [] }[], categoryId: string, departments: []) => {
//   return classDepartments.some(course => course.departments === departments);
// };


// interface DataTableProps<TData, TValue> {
//   data: TData[];
//   categories: { id: string, name: string }[];
//   // subRows: { department: Department[] };
// }

// export function DataTable<TData, TValue>({
//   data,
//   categories,
// }: DataTableProps<TData, TValue>) {
//   // const subRows = ['dept1', 'dept2', 'dept3', 'dept4', 'dept5', 'dept6',]
//   // Define columns dynamically

//   const columns: ColumnDef<TData, TValue>[] = [
//     {
//       accessorKey: "name",
//       header: ({ column }) => (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Class Name
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       ),
//       cell: ({ row }: any) => {
//         const classIndex = row.original.classIndex; // Replace with the actual field name for classIndex
//         const departments = row.original.department;

//         return (
//           <span>
//             {classIndex > 10
//               ? <> <div>{row.original.name} </div> {departments.map((department: any) => (
//                 <div key={department.id}>{department.name}</div>
//               ))}</>
//               : row.original.name}
//           </span>
//         );
//       },

//     },

//     ...categories.map((category) => ({
//       id: category.id,
//       header: category.name,
//       cell: ({ row }: any) => {
//         const classCourses = row.original.courses;
//         const departments = row.original.department;
//         return (


//           <span>
//             <>
//               {departments.length > 0 ?
//                 'Continue'
//                 : <>{hasCourseInCategory(classCourses, category.id) ? '✓' : <span className="bg-red-700">✘</span>}</>
//               }
//             </>
//           </span>

//         );
//       },
//     })),
//     {
//       id: "actions",
//       cell: ({ row }: any) => {
//         const { id } = row.original;

//         return (
//           <>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="h-4 w-8 p-0">
//                   <span className="sr-only">Open menu</span>
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <Link href={`/admin/users/${id}`}>
//                   <DropdownMenuItem>
//                     <Pencil className="h-4 w-4 mr-2" />
//                     Edit
//                   </DropdownMenuItem>
//                 </Link>
//                 <Link href={`#`}>
//                   <DropdownMenuItem>
//                     <ListCollapse className="h-4 w-4 mr-2" />
//                     Details
//                   </DropdownMenuItem>
//                 </Link>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </>
//         );
//       },
//     },
//   ];

//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//     state: {
//       sorting,
//       columnFilters,
//     },
//   });
//   return (
//     <div>
//       <div className="flex items-center py-4 justify-between">
//         <Input
//           placeholder="Filter Users..."
//           value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
//           onChange={(event) =>
//             table.getColumn("name")?.setFilterValue(event.target.value)
//           }
//           className="max-w-sm"
//         />
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Class</TableHead>
//               {categories.map((cat) => (
//                 <TableHead key={cat.id}>{cat.name}</TableHead>
//               ))}
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} className="h-24 text-center">
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }

// // //--------------------------------------------------------------------------



"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { ArrowUpDown, MoreHorizontal, Pencil, ListCollapse } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Department } from "@prisma/client";

// Utility function to check if a class has a course in a category
const hasCourseInCategory = (classCourses: { id: string, categoryId: string }[], categoryId: string) => {
  return classCourses.some(course => course.categoryId === categoryId);
};

// const hasCourseInDepartment = (departmentCourses: { id: string, categoryId: string }[], categoryId: string) => {
//   return departmentCourses.some(course => course.categoryId === categoryId);
// };

interface DataTableProps<TData, TValue> {
  data: TData[];
  categories: { id: string, name: string }[];
}

export function DataTable<TData, TValue>({
  data,
  categories,
}: DataTableProps<TData, TValue>) {
  const [transformedData, setTransformedData] = React.useState<any[]>([]);

  React.useEffect(() => {
    const newTransformedData = data.flatMap((row) => {
      const { classIndex, name, department, courses, id } = row as any;
      if (classIndex > 10) {
        return department.map((dept: Department) => ({
          id: `${id}-${dept.id}`, // unique id for the row
          displayName: '', // empty for department rows
          departmentName: dept.name,
          classCourses: courses,
          // Include the rest of the row's properties for completeness
          ...row,
        }));
      } else {
        return [{
          id,
          displayName: name,
          departmentName: '',
          classCourses: courses,
          // Include the rest of the row's properties for completeness
          ...row,
        }];
      }
    });

    setTransformedData(newTransformedData);
  }, [data]); // Dependency array to update only when `data` changes

  const columns: ColumnDef<TData, TValue>[] = [
    {
      accessorKey: "displayName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Class Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: any) => <>{row.original.classIndex}{row.original.displayName}</>,
    },
    {
      accessorKey: "departmentName",
      header: () => <span>Department</span>,
      cell: ({ row }: any) => row.original.departmentName,
    },
    ...categories.map((category) => ({
      id: category.id,
      header: category.name,
      cell: ({ row }: any) => {
        const classCourses = row.original.classCourses;
        return (
          <span>
            {hasCourseInCategory(classCourses, category.id) ? '✓' : <span className="bg-red-700">✘</span>}
          </span>
        );
      },
    })),
    {
      id: "actions",
      cell: ({ row }: any) => {
        const { id } = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-4 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/admin/users/${id}`}>
                <DropdownMenuItem>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </Link>
              <Link href={`#`}>
                <DropdownMenuItem>
                  <ListCollapse className="h-4 w-4 mr-2" />
                  Details
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: transformedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter Classes..."
          value={(table.getColumn("displayName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("displayName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class</TableHead>
              <TableHead>Department</TableHead>
              {categories.map((cat) => (
                <TableHead key={cat.id}>{cat.name}</TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
