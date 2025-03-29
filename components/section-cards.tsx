"use client";

import { useEffect, useState } from "react";
import { IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios"; // Import axios

export function SectionCards() {
  // State to hold the projected revenue
  const [projectedRevenue, setProjectedRevenue] = useState<number | null>(null); // Allow state to be number or null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Allow error state to be string or null

  // UseEffect to make the API request when the component mounts
  useEffect(() => {
    // Make the API request to the FastAPI backend
    axios
        .post("http://127.0.0.1:8000/sales-forecast-week/", {
          order_date: "2025-03-27",  // You can replace with dynamic value
        })
        .then((response) => {
          // Update the state with the fetched projected revenue
          setProjectedRevenue(response.data.predicted_sales);
          setLoading(false);  // Set loading to false once data is fetched
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Failed to fetch projected revenue");
          setLoading(false);
        });
  }, []);  // Empty dependency array to run only once on component mount

  return (
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {loading
                  ? "Loading..."
                  : error
                      ? error
                      : `$${projectedRevenue !== null ? projectedRevenue.toFixed(2) : "0.00"}`
              }
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Projected Sales</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {loading
                  ? "Loading..."
                  : error
                      ? error
                      : `$${projectedRevenue !== null ? projectedRevenue.toFixed(2) : "0.00"}`
              }
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +20%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Expected growth next quarter <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Based on current trends
            </div>
          </CardFooter>
        </Card>
      </div>
  );
}