// "use client";

// import qs from "query-string";
// import { useState } from "react";
// import { SearchIcon, X } from "lucide-react";
// import { useRouter } from "next/navigation";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export const Search = () => {
//       const router = useRouter();
//       const [value, setValue] = useState("");

//       const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         if (!value) return;

//         const url = qs.stringifyUrl({
//           url: "/search",
//           query: { term: value },
//         }, { skipEmptyString: true });

//         router.push(url);
//       };

//       const onClear = () => {
//         setValue("");
//       };

//     return (
//                   <form
//               onSubmit={onSubmit}
//               className="relative w-full lg:w-[400px] flex items-center"
//             >
//               <Input
//                 value={value}
//                 onChange={(e) => setValue(e.target.value)}
//                 placeholder="Search"
//                 className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-background"
//               />
//               {value && (
//                 <X
//                   className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
//                   onClick={onClear}
//                 />
//               )}
//               <Button 
//                 type="submit"
//                 size="sm"
//                 variant="secondary"
//                 className="rounded-l-none"
//               >
//                 <SearchIcon className="h-5 w-5 text-muted-foreground" />
//               </Button>
//             </form>
//     );
// };


////////////////////////////////////////////////////////////

"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { ClockLoader } from "react-spinners";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const debouncedValue = useDebounce(value);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {

    const url = qs.stringifyUrl({
      url: pathname,
      query: {
        categoryId: currentCategoryId,
        title: debouncedValue,
      }
    }, { skipEmptyString: true, skipNull: true });

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!debouncedValue) return;

    const url = qs.stringifyUrl({
      url: "/search",
      query: { title: debouncedValue },
    }, { skipEmptyString: true });

    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full lg:w-[400px] flex items-center"
    >
      <Input
        value={debouncedValue}
        onChange={(e) => setValue(e.target.value)}
        placeholder="...بحث"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-slate-500/20"
      />
      {value && (
        
          <ClockLoader
            color="#36d7b7"
            size={15}
            onClick={onClear}
            
          />
          //  <X
          //   className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
          //   onClick={onClear}
          // /> 
        
      )}
      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};


