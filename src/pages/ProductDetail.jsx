import { useParams } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatDistanceToNow, set } from "date-fns";

export default function ProductDetail() {
  const params = useParams();

  const { data, error, isLoading } = useSWR(
    `https://dummyjson.com/products/${params.id}`,
    axios,
  );
  const product = data?.data;

  const [selectedImage, setSelectedImage] = useState(null);

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(product?.minimumOrderQuantity);
  }, [data]);

  console.log("error", error);

  if (error)
    return (
      <div className="w-full h-screen center ">
        {JSON.stringify(error?.response?.data?.message)}
      </div>
    );
  if (isLoading) return "loading...";

  return (
    <main>
      <div className="product  flex min-h-[600px] flex-col md:flex-row">
        <div className="images flex md:w-[55%] border-2 border-gray-400 rounded-lg    bg-gray-200">
          {product?.images?.length > 1 ? (
            <div className="w-[150px]  h-full p-3 flex flex-col gap-3">
              {product?.images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt=""
                  className="border-2 border-gray-300 rounded-lg p-1 bg-gray-100"
                  onMouseOver={() => setSelectedImage(image)}
                />
              ))}
            </div>
          ) : null}
          <div className="">
            <img
              className="w-[500px] "
              src={selectedImage || product?.images[0]}
              alt=""
            />
          </div>
        </div>

        <div className="product-data md:w-[45%] border-2 border-gray-400 rounded-lg p-8 bg-gray-300">
          <h2 className="text-2xl">{product?.title}</h2>
          <p>{product?.price * quantity || 0}</p>
          quantity :<button onClick={() => setQuantity(quantity + 1)}>+</button>
          {quantity}
          <button
            onClick={() => {
              if (quantity < 2 || quantity <= product?.minimumOrderQuantit)
                return;
              setQuantity(quantity - 1);
            }}
          >
            -
          </button>
        </div>
      </div>

      <div className="reviews flex flex-col gap-3">
        {product?.reviews?.map((review, i) => (
          <div key={i} className="bg-slate-300 rounded-xl p-3">
            <h5>{review.reviewerName}</h5>
            <span className="text-xs text-gray-600">
              {formatDistanceToNow(review.date, { addSuffix: true })}
            </span>

            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
