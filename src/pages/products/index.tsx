import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  ChevronDown,
  Rocket,
  Search,
  Sparkles,
} from "lucide-react";
import router from "next/router";
import { GetServerSideProps } from "next/types";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import MaxWidthWrapper from "src/components/MaxWidthWrapper";
import ProductListing from "src/components/ProductListing";
import { Button, buttonVariants } from "src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { Input } from "src/components/ui/input";

import { cn } from "src/lib/utils";
import { Product } from "src/types/types";

interface Props {
  products: Product[];
}

const Products = ({ products }: Props) => {
  const categoryOptions = [
    { label: "UI Kits", value: "ui_kits" },
    { label: "Icons", value: "icons" },
    { label: "Images", value: "images" },
  ];
  // const sortOptions = [
  //   { label: "Most Popular", value: "ui_kits" },
  //   { label: "Latest", value: "icons" },
  //   { label: "Price", value: "images" },
  //   { label: "Price", value: "images" },
  // ];

  const { control, watch, setValue } = useForm({
    defaultValues: { category: "" }, // Default: All Products
  });

  const selectedCategory = watch("category");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const handleCategoryChange = (category: string) => {
    setValue("category", category);
    console.log(category);

    const newQuery = { ...router.query };

    // If category is not empty, add it to the query, otherwise remove it
    if (category != "Allproducts") {
      newQuery.category = category;
      console.log(category);
    } else {
      delete newQuery.category; // Remove 'category' query parameter
      console.log("delete");
    }

    // Update query parameter in the URL
    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined
    );
  };

  const handleSortChange = (field: string, order: string) => {
    setSelectedSort(`${field}_${order}`); // Optionally set a label for the selected sort
    console.log("rerender");

    // Update the query to include the sorting parameters
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, _sort: field, _order: order },
      },
      undefined
    );
  };
  console.log(selectedSort);

  console.log(products);

  return (
    <MaxWidthWrapper>
      <div className="mt-11 flex justify-center">
        <div className="relative w-7/12">
          <Input
            placeholder="Search..."
            className="pl-2 pr-20 w-full"
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm
          />

          <form>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "absolute right-0 top-1/2 -translate-y-1/2 px-3 py-1 h-full w-32 rounded-r-[5px] bg-accent text-black hover:bg-accent"
                    )}
                  >
                    {selectedCategory != "Allproducts"
                      ? categoryOptions.find(
                          (opt) => opt.value === selectedCategory
                        )?.label
                      : "All Products"}{" "}
                    <ChevronDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {selectedCategory != "Allproducts" && (
                      <>
                        <DropdownMenuItem
                          onSelect={() => handleCategoryChange("Allproducts")}
                        >
                          All Products
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}

                    {categoryOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onSelect={() => handleCategoryChange(option.value)}
                        disabled={option.value === selectedCategory}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            />
          </form>
        </div>
        <Button
          className="relative w-12 ms-4 bg-accent group hover:bg-[#7fb0b2]"
          variant={"ghost"}
          onClick={() => {
            const newQuery = { ...router.query };

            if (searchTerm) {
              newQuery.q = searchTerm;
            } else {
              delete newQuery.q;
            }

            router.push(
              {
                pathname: router.pathname,
                query: newQuery,
              },
              undefined
            );
          }}
        >
          <Search className="absolute top-1/2 -translate-y-1/2 text-black " />
        </Button>

        {/* Sorting Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="ms-36 w-20 flex items-center justify-between">
            Sort by <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* {categoryOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onSelect={() => handleCategoryChange(option.value)}
                disabled={option.value === selectedCategory}
              >
                {option.label}
              </DropdownMenuItem>
            ))} */}
            <DropdownMenuItem
              onSelect={() => handleSortChange("rating", "desc")}
            >
              Most Popular <Sparkles />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => handleSortChange("createdAt", "desc")}
            >
              Latest <Rocket />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => handleSortChange("price", "asc")}>
              Price <ArrowDownNarrowWide />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => handleSortChange("price", "desc")}
            >
              Price <ArrowUpNarrowWide />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {products.map((product, i) => (
              <ProductListing
                key={`product-${i}`}
                product={product}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
export default Products;
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const baseUrl = "http://localhost:3001/products";
  const queryParams = new URLSearchParams();

  if (query.q) queryParams.append("q", query.q as string);
  if (query.category) queryParams.append("category", query.category as string);
  if (query.sort) queryParams.append("_sort", query.sort as string);

  const url = queryParams.toString() ? `${baseUrl}?${queryParams}` : baseUrl;
  console.log(url);

  const res = await fetch(url);

  const products: Product[] = await res.json();

  return { props: { products } };
};
