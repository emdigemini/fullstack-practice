import "dotenv/config";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  limiter: Ratelimit.slidingWindow(100, "60 s"),
  redis: Redis.fromEnv()
});

export default ratelimit;