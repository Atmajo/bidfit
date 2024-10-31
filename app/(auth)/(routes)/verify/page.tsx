"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyUser } from "@/lib/auth/verification";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function VerificationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<
    "idle" | "verifying" | "success" | "error"
  >("idle");

  useEffect(() => {
    async function performVerification() {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        toast.error("No verification token provided");
        return;
      }

      setStatus("verifying");

      try {
        const result = await verifyUser(token);

        if (result.success) {
          setStatus("success");
          toast.success("Account successfully verified!");

          // Redirect to login after 2 seconds
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          setStatus("error");
          toast.error(result.message);
        }
      } catch (error) {
        setStatus("error");
        toast.error("An unexpected error occurred");
      }
    }

    performVerification();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Account Verification</CardTitle>
        </CardHeader>
        <CardContent>
          {status === "verifying" && (
            <div className="text-center">
              <p>Verifying your account...</p>
              <div className="animate-spin mx-auto my-4">🔄</div>
            </div>
          )}

          {status === "success" && (
            <div className="text-center text-green-600">
              <h2 className="text-2xl font-bold mb-4">
                Verification Successful!
              </h2>
              <p>Your account has been verified. Redirecting to login...</p>
            </div>
          )}

          {status === "error" && (
            <div className="text-center text-red-600">
              <h2 className="text-2xl font-bold mb-4">Verification Failed</h2>
              <p>The verification link may have expired or is invalid.</p>
              <Button
                onClick={() => router.push("/resend-verification")}
                variant="outline"
                className="mt-4"
              >
                Resend Verification Email
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
