"use client";

import { useEffect, useState } from "react";
import Parser from "rss-parser";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateStars } from "@/lib/utils";
import { ArrowLeftCircle, ArrowRightCircle, Loader2, MoveRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { toast } from "sonner";
import he from "he";

const RssParser = new Parser();

const rssFeeds = [
  { title: "NY Times Tech", link: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml" },
  { title: "Tech Radar", link: "https://www.techradar.com/rss" },
  { title: "Y Combinator", link: "https://www.ycombinator.com/rss" },
  { title: "Sam Altman", link: "http://blog.samaltman.com/posts.atom" }
]

export default function Page() {
  const [rssFeedLink, setRssFeedLink] = useState("");
  const [rssFeed, setRssFeed] = useState([]);
  const [currentFeedItem, setCurrentFeedItem] = useState(0);
  const [feedHidden, setFeedHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const rssLinkSchema = z.string().url("Not a valid URL");

  useEffect(() => {
    document.documentElement.style.setProperty('--shadows-small', generateStars(700));
    document.documentElement.style.setProperty('--shadows-medium', generateStars(200));
    document.documentElement.style.setProperty('--shadows-big', generateStars(100));
  }, []);

  useEffect(() => {
    if (rssFeed.length === 0) return;

    const interval = setInterval(() => {
      handleFeedChange(() => {
        setCurrentFeedItem((prevFeedItem) => {
          const nextIndex = (prevFeedItem + 1) % rssFeed.length;
          if (nextIndex === 0) {
            fetchRssFeed();
            return 0;
          } else {
            return nextIndex;
          }
        })
      });
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [rssFeed]);

  const handleFeedChange = async (changeFunction) => {
    setFeedHidden(true);
    setTimeout(() => {
      changeFunction();
      setFeedHidden(false);
    }, 1250);
  }

  const fetchRssFeed = async () => {
    setIsLoading(true);
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
          setIsLoading(false);
          return;
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Please enter a valid URL.");
    }
    setIsLoading(false);
  }

  const previousFeedItem = () => {
    if (currentFeedItem === 0) return setCurrentFeedItem(rssFeed.length - 1);
    setCurrentFeedItem((prevFeedItem) => (prevFeedItem - 1) % rssFeed.length);
  }

  const nextFeedItem = () => {
    setCurrentFeedItem((prevFeedItem) => (prevFeedItem + 1) % rssFeed.length);
  }

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      {
        rssFeed.length > 0 ? (
          <div className={`feed-grid px-8 py-4 ${feedHidden ? "opacity-0" : "opacity-100"} transition-all duration-1000 ease-in-out`}>
            <div className="w-full h-full flex items-center md:justify-center justify-end grid-prev">
              <ArrowLeftCircle size={36} className={`cursor-pointer text-white/80 transform transition-all duration-1000 ease-in-out hover:text-white ${feedHidden ? "-translate-x-4" : "translate-x-0"}`} onClick={() => handleFeedChange(previousFeedItem)} />
            </div>
            <div className="w-full h-full flex items-center md:justify-center justify-start grid-next">
              <ArrowRightCircle size={36} className={`cursor-pointer text-white/80 transform transition-all duration-1000 ease-in-out hover:text-white ${feedHidden ? "translate-x-4" : "translate-x-0"}`} onClick={() => handleFeedChange(nextFeedItem)} />
            </div>
            <div className={`flex flex-col space-y-4 max-w-3xl w-fit grid-content transform transition-all duration-1000 ease-in-out ${feedHidden ? "md:-translate-x-4 md:translate-y-0 translate-y-4" : "md:translate-x-0 md:translate-y-0 translate-y-0"}`}>
              <h1 className="lg:text-4xl md:text-3xl text-2xl font-medium title">
                {he.decode(rssFeed[currentFeedItem].title)}
              </h1>
              <p className="lg:text-2xl md:text-xl text-lg font-light content text-neutral-200">
                {he.decode(rssFeed[currentFeedItem].contentSnippet.length > 400 ? rssFeed[currentFeedItem].contentSnippet.substring(0, 400) + "..." : rssFeed[currentFeedItem].contentSnippet)}
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
          </div>
        ) : (
          <div className="flex flex-col gap-2 items-center">
            <Link href={"https://github.com/Jagjeet0518/rss-screensaver"} target="_blank" className="text-base text-white">
              <FaGithub size={32} />
            </Link>
            <h1 className="text-4xl font-bold mb-2">RSS Screensaver</h1>
            <p className="text-sm text-white/80">Enter your RSS feed link</p>
            <Input
              placeholder="https://example.com/feed"
              value={rssFeedLink}
              onChange={(e) => setRssFeedLink(e.target.value)}
              className="border border-white/60 focus:outline-none"
            />
            <Button onClick={fetchRssFeed} className="w-full">
              {
                isLoading ? <span className="animate-spin">
                  <Loader2 className="w-4 h-4" />
                </span> : "Fetch RSS Feed"
              }
            </Button>
            <span className="text-sm text-white/80">
              or try some of these feeds:
            </span>
            <div className="grid grid-cols-2 gap-2 w-full">
              {
                rssFeeds.map((feed, index) => (
                  <Button key={index} onClick={() => { setRssFeedLink(feed.link); }} className="w-full">
                    {feed.title}
                  </Button>
                ))
              }
            </div>
          </div>
        )
      }
    </main>
  )
}