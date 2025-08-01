import { IGetAPIResponse, IPostAPIResponse } from "@/type/api-response.interface";

export const MakeDryApiCall = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: Record<string, any> | null | undefined,
  additionalHeaders?: Record<string, string>
): Promise<IPostAPIResponse<T>> => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(additionalHeaders || {}),
      },
      method,
      body: JSON.stringify(body),
    });

    const resText = await res.text();
    // console.log("🔍 Raw response:", resText); // helpful debug

    let parsed: any;

    try {
      parsed = JSON.parse(resText);
    } catch {
      console.error("❌ Failed to parse JSON. Possibly HTML error page.");
      throw new Error("Invalid JSON response from server.");
    }

    // ✅ Normalize unexpected root-level "customer" structure
    if (parsed.customer && !parsed.data) {
      return {
        status: res.status,
        message: parsed.message,
        data: {
          customer: parsed.customer,
        } as T,
        token: parsed.token,
        refreshToken: parsed.refreshToken,
      };
    }

    // ✅ Return as-is for expected structure
    if (res.status >= 400) {
      throw new Error(parsed.message || "Something went wrong");
    }

    return {
      status: parsed.status ?? res.status,
      message: parsed.message,
      data: parsed.data,
      token: parsed.token,
      refreshToken: parsed.refreshToken,
    };
  } catch (error) {
    return {
      error: (error as any).message ?? "Unexpected error",
    };
  }
};


export const MakeDryApiCallForReward = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: Record<string, any> | null,
  additionalHeaders?: Record<string, string>
): Promise<IGetAPIResponse<T>> => {
  try {
    const isMethodWithBody = method === "POST" || method === "PUT" || method === "DELETE";

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(additionalHeaders || {}),
      },
      ...(isMethodWithBody && body ? { body: JSON.stringify(body) } : {}),
    };

    const res = await fetch(url, options);
    const resText = await res.text();
    // console.log("🔍 Raw response:", resText);

    let parsed: any;

    try {
      parsed = JSON.parse(resText);
    } catch {
      console.error("❌ Failed to parse JSON. Possibly HTML error page.");
      throw new Error("Invalid JSON response from server.");
    }

    // 🔁 Normalize login-style response (customer instead of data)
    if (parsed.customer && !parsed.data) {
      return {
        status: res.status,
        message: parsed.message,
        data: {
          customer: parsed.customer,
        } as T,
        token: parsed.token,
        refreshToken: parsed.refreshToken,
      };
    }

    if (res.status >= 400) {
      throw new Error(parsed.message || "Something went wrong");
    }

    return {
      status: parsed.status ?? res.status,
      message: parsed.message,
      data: parsed.data ?? {
        customer_points: parsed.customer_points,
        rewards: parsed.rewards,
      },
      token: parsed.token,
      refreshToken: parsed.refreshToken,
    };
  } catch (error) {
    return {
      error: (error as any).message ?? "Unexpected error",
    };
  }
};