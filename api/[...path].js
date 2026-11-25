import { handleVercelApi } from "../lib/vercelApi.js";

export default function handler(request, response) {
  return handleVercelApi(request, response);
}
