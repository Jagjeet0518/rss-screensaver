"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateStars } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Parser from "rss-parser";
import { toast } from "sonner";
import { z } from "zod";

const RssParser = new Parser();

export default function Page() {
  const [rssFeedLink, setRssFeedLink] = useState("");
  const [rssFeed, setRssFeed] = useState([]);
  const [currentFeedItem, setCurrentFeedItem] = useState(0);

  const rssLinkSchema = z.string().url("Not a valid URL");

  useEffect(() => {
    document.documentElement.style.setProperty('--shadows-small', generateStars(700));
    document.documentElement.style.setProperty('--shadows-medium', generateStars(200));
    document.documentElement.style.setProperty('--shadows-big', generateStars(100));
  }, []);

  useEffect(() => {
    if (rssFeed.length === 0) return;

    let interval = setInterval(() => {
      setCurrentFeedItem((prevFeedItem) => (prevFeedItem + 1) % rssFeed.length);
    }, 7500);

    return () => {
      clearInterval(interval);
    };
  }, [rssFeed]);

  const fetchRssFeed = async () => {
    const validation = rssLinkSchema.safeParse(rssFeedLink);
    if (validation.success) {
      try {
        let rssString = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(rssFeedLink)).then((response) => response.json());
        if (rssString.contents.length > 0) {
          if (rssString.contents.startsWith("data")) {
            rssString.contents = atob(rssString.contents.split("base64,")[1]);
          }
          let rssFeed = await RssParser.parseString(rssString.contents);
          if (rssFeed.items.length > 0) {
            setRssFeed(JSON.parse(JSON.stringify(rssFeed.items)));
          } else {
            toast.error("No items found in the RSS feed.");
          }
        } else {
          toast.error("No contents found in the RSS feed.");
          return;
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Please enter a valid URL.");
    }
  }

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      {
        rssFeed.length > 0 ? (
          <div className="flex flex-col space-y-4 max-w-3xl">
            <h1 className="text-4xl font-medium title">
              {rssFeed[currentFeedItem].title}
            </h1>
            <p className="text-2xl font-light content text-neutral-200">
              {rssFeed[currentFeedItem].content}
            </p>
            <Link href={rssFeed[currentFeedItem].link} target="_blank" className="text-base text-white/80">
              <div className="flex items-center gap-2 hover:gap-4 hover:text-white transition-all duration-200 ease-in-out">
                <span className="mb-0.5">
                  Read more
                </span>
                <MoveRight className="w-6" />
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col space-y-2 items-center">
            <h1 className="text-4xl font-bold mb-4">RSS Screensaver</h1>
            <p className="text-sm text-white/80">Enter your RSS feed link</p>
            <Input
              placeholder="https://example.com/feed"
              value={rssFeedLink}
              onChange={(e) => setRssFeedLink(e.target.value)}
              className="border border-white/60 focus:outline-none"
            />
            <Button onClick={fetchRssFeed} className="w-full">
              Fetch RSS Feed
            </Button>
          </div>
        )
      }
    </main>
  )
}