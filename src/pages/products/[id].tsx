import { useContext, useEffect, useRef, useState } from "react";
import { Skeleton } from "src/components/ui/Skeleton";
import Image from "next/image";
import { Button } from "src/components/ui/button";
import { CircleX, Shield, ShieldCheck } from "lucide-react";
import { GetServerSideProps } from "next";
import { Product } from "src/types/types";
import { Separator } from "src/components/ui/separator";
import { ZoomIn } from "lucide-react";
import { cn } from "src/lib/utils";
import { useOnClickOutside } from "src/hooks/useOnclickOutside";
import { CartContext } from "src/context/CartContext";

const ProductDetails = ({ product }: { product: Product }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(modalRef, () => setIsModalOpen(false));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 875);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handler);

    // Correct cleanup function
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const { addedToCart, setAddedToCart } = useContext(CartContext);
  const [addedMessage, setAddedMessage] = useState(false);
  console.log(addedToCart);

  if (!isVisible)
    return (
      <div className="relative">
        <div className="mt-24 flex items-center justify-center w-1/2 mx-auto relative">
          <ProductPlaceholder />
        </div>
      </div>
    );

  return (
    <div className="relative">
      <div className="mt-24 flex items-center justify-center w-1/2 mx-auto relative">
        {/* <ProductPlaceholder /> */}
        <div className="flex w-full z-50">
          <div className="w-1/2">
            <div className="w-11/12 flex flex-col justify-between h-full">
              <h3 className="mt-4 font-bold text-2xl ms-5 text-gray-700 text-[32px]">
                {product.name}
              </h3>
              <div className="flex items-center">
                <p className="mt-11 ms-2">{product.price} €</p>
                <Separator orientation="vertical" className="h-6 mt-11 mx-4" />
                <p className="mt-11 ">{product.label} </p>
              </div>

              <p className="mt-8  ms-2">{product.description}</p>

              <div className="mt-auto">
                <Button
                  variant={"destructive"}
                  className="mt-16 w-full h-12"
                  onClick={() => {
                    setAddedToCart((prevCart) => {
                      const isAlreadyInCart = prevCart.some(
                        (item) => item.id === product.id
                      );
                      if (!isAlreadyInCart) {
                        return [...prevCart, product]; // Add only if not already in cart
                      }
                      return prevCart;
                    });

                    // Show "Added!" for 1 second
                    setAddedMessage(true);
                    setTimeout(() => setAddedMessage(false), 1000);
                  }}
                >
                  {addedMessage ? "Added !" : "Add to cart"}
                </Button>
                ;
                <div className="mt-4 w-48 h-8 mx-auto flex">
                  <Shield className="me-3" />
                  <p>7 Day return policy</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-zinc-100 aspect-square w-1/2 overflow-hidden rounded-xl group hover:cursor-pointer">
            <ZoomIn
              className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100  text-white z-50 hover:cursor-pointer"
              size={48}
              onClick={() => setIsModalOpen(true)}
            />
            <Image
              fill
              loading="eager"
              className="h-full w-full object-cover object-left cursor-pointer"
              src={product.src}
              alt="Product image"
              onClick={() => setIsModalOpen(true)}
            />
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
                <div
                  ref={modalRef}
                  className={cn(
                    "relative bg-white rounded-xl shadow-lg p-2 w-3/4 h-3/4 transition-all duration-500",
                    {
                      "w-[1200px]": product.isRectangular,
                      "w-[690px]": !product.isRectangular,
                    }
                  )}
                  onClick={(e) => e.stopPropagation()} // Prevent modal close on click inside
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-2 right-2 text-white text-2xl"
                  >
                    <CircleX className="mt-4 me-4" size={42} />
                  </button>
                  <Image
                    src={product.src}
                    alt="Expanded Product image"
                    className="h-full w-full object-cover"
                    width={1200}
                    height={500}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const ProductPlaceholder = () => {
  return (
    <div className="flex  w-full ">
      <div className="w-1/2">
        <div className="w-11/12 flex flex-col justify-between h-full">
          <Skeleton className="  h-20 rounded-lg" />
          <Skeleton className="mt-2 w-48 h-8 rounded-lg" />
          <Skeleton className="mt-4 h-48 rounded-lg" />
          <div className="mt-auto">
            {" "}
            <Skeleton className="mt-4 w-full h-12 rounded-lg" />
            <div className="w-11/12">
              <Skeleton className="mt-4 w-48 h-8 rounded-lg mx-auto" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative bg-zinc-100 aspect-square w-1/2 overflow-hidden rounded-xl ">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
};
export default ProductDetails;

// ✅ Fetch data for the specific product
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params?.id) {
    const res = await fetch(`http://localhost:3001/products/${params.id}`);
    const product: Product = await res.json();
    return {
      props: { product },
    };
  }
  return {
    props: {
      product: null,
    },
  };
};
