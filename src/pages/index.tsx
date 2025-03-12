import { Geist, Geist_Mono } from "next/font/google";
import MaxWidthWrapper from "src/components/MaxWidthWrapper";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import { Button, buttonVariants } from "src/components/ui/button";
import Link from "next/link";
import ProductReel from "src/components/ProductReel";
import { GetServerSideProps, NextPage } from "next";
import { Product } from "src/types/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description:
      "Get your assets delivered to your email in seconds and download them right away.",
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description:
      "Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
  },
  {
    name: "For the Planet",
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];

interface Props {
  latestProducts: Product[];
  popularProducts: Product[];
}

const Home: NextPage<Props> = ({ latestProducts, popularProducts }) => {
  console.log(latestProducts, popularProducts);

  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your marketplace for high-quality{" "}
            <span className="text-blue-600">digital assets</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to DigitalHippo. Every asset on our platform is verified by
            our team to ensure our highest quality standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>
        {/* 
        <ProductReel
          query={{ sort: "desc", limit: 4 }}
          href="/products?sort=recent"
          title="Brand new"
        /> */}
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <ProductReel
          title={"Brand new"}
          subtitle="Explore more than 10.000 icons and ui kits to use in websites, logos and social media"
          href="/products?sort=recent"
          products={latestProducts}
        ></ProductReel>
        <ProductReel
          title={"Most popular"}
          subtitle="Explore more than 10.000 icons and ui kits to use in websites, logos and social media"
          href="/products?sort=mostPopular"
          products={popularProducts}
        ></ProductReel>
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const latestRes = await fetch(
    "http://localhost:3001/products?_sort=updatedAt&_order=desc&_limit=4"
  );
  const latestProducts: Product[] = await latestRes.json();

  const popularRes = await fetch(
    "http://localhost:3001/products?_sort=rating&_order=desc&_limit=4"
  );
  const popularProducts: Product[] = await popularRes.json();
  return {
    props: {
      latestProducts,
      popularProducts,
    },
  };
};
