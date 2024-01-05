import { IconThumbDown, IconThumbUp, IconTrendingDown } from "@tabler/icons-react";
import { BasicTable } from "../../default";
import { Button } from "@chakra-ui/react";
import Rating from "react-rating";
import ReactRatingProps from "../../../ReactRatingProps";
import { DateTime } from "luxon";
import { useState } from "react";

const CustomerReviewAnalysis = ({ product }) => {
  const [reviewType, setReviewType] = useState(() => {
    let positive = 0;
    let negative = 0;

    product.reviews.forEach((review) => {
      if (review.rating >= 3) positive += 1;
      else negative += 1;
    });

    return { positive, negative };
  });

  const reviewTableColumns = [
    {
      header: "Reviewer Name",
      accessorFn: (row) => ({
        fullName: row.user.firstName + " " + row.user.lastName,
        userId: row.user._id,
      }),
      cell: (val) => (
        <Button
          variant={"link"}
          size={"sm"}
          color="black"
          onClick={() => navigate(`/dashboard/users/${val.getValue().userId}`)}
        >
          {val.getValue().fullName}
        </Button>
      ),
    },
    {
      header: "Email",
      accessorFn: (row) => ({
        email: row.user.email,
      }),
      cell: (val) => <p className="text-sm">{val.getValue().email}</p>,
    },
    {
      header: "ID",
      accessorKey: "_id",
      cell: (val) => <p className="text-sm uppercase">{val.getValue()}</p>,
    },
    {
      header: "Rating",
      accessorKey: "rating",
      cell: (val) => <Rating initialRating={val.getValue()} readonly {...ReactRatingProps(16)} className="mt-2" />,
    },
    {
      header: "",
      accessorKey: "rating",
      cell: (val) => (
        <p>
          {val.getValue()}
          <span className="text-[0.5rem] ml-1 text-gray-400">/ 5</span>
        </p>
      ),
    },
    {
      header: "Recommend",
      accessorKey: "wouldRecommend",
      cell: (val) => (
        <div className="flex items-center justify-center">{val.getValue() ? <IconThumbUp /> : <IconThumbDown />}</div>
      ),
    },
    {
      header: "Liked By",
      accessorKey: "totalLike",
      cell: (val) => <p>{val.getValue()}</p>,
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: (val) => (
        <p className="text-sm">{DateTime.fromISO(val.getValue()).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}</p>
      ),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        <ReviewSummaryBox
          title={"Average Rating"}
          value={Number(product?.averageRating).toFixed(2)}
          percentageChange={"--"}
        />
        <ReviewSummaryBox title={"Total Reviews"} value={product?.numReviews} percentageChange={"--"} />
        <ReviewSummaryBox title={"Positive Reviews"} value={reviewType?.positive} percentageChange={"--"} />
        <ReviewSummaryBox title={"Negative Reviews"} value={reviewType?.negative} percentageChange={"--"} />
      </div>
      <div className="my-6">
        <BasicTable data={product ? product.reviews : []} columns={reviewTableColumns} />
      </div>
    </div>
  );
};

const ReviewSummaryBox = ({ title, value, percentageChange }) => {
  return (
    <div className="border-box">
      <p>{title}</p>
      <p className="text-xl font-semibold my-4">{value}</p>
      <div className="flex justify-start text-gray-400">
        <IconTrendingDown size={"16"} />
        <p className="ml-2 text-xs">
          <span>{percentageChange} % </span>
          <span>vs Last month</span>
        </p>
      </div>
    </div>
  );
};

export default CustomerReviewAnalysis;
