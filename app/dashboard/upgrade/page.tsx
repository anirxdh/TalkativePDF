"use client";

import { createCheckoutSession } from "@/actions/createCheckoutSession";
import { createStripePortal } from "@/actions/createStripePortal";
import { Button } from "@/components/ui/button";
import useSubscription from "@/hooks/useSubscription";
import getStripe from "@/lib/stripe-js";
import { useUser } from "@clerk/nextjs";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export type UserDetails = {
  email: string;
  name: string;
};

function PricingPage() {
  const { user } = useUser();
  const router = useRouter();
  const { hasActiveMembership, loading } = useSubscription();
  const [isPending, startTransition] = useTransition();

  const handleUpgrade = () => {
    if (!user) return;

    const userDetails: UserDetails = {
      email: user.primaryEmailAddress?.toString()!,
      name: user.fullName!,
    };

    startTransition(async () => {
      const stripe = await getStripe();

      if (hasActiveMembership) {
        // create stripe portal...
        const stripePortalUrl = await createStripePortal();
        return router.push(stripePortalUrl);
      }

      const sessionId = await createCheckoutSession(userDetails);

      await stripe?.redirectToCheckout({
        sessionId,
      });
    });
  };

  return (
    <div>
      <div className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-base font-semibold leading-7 text-black">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Supercharge your Document Companion
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-2xl px-10 text-center text-lg leading-8 text-gray-700">
          Choose an affordable plan thats packed with the best features for
          interacting with your PDFs, enhancing productivity, and streamlining
          your workflow.
        </p>

        <div className="max-w-md mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 md:max-w-2xl gap-8 lg:max-w-4xl">
          {/* FREE */}
          <div className="ring-1 ring-gray-300 p-8 h-fit pb-12 rounded-3xl">
            <h3 className="text-lg font-semibold leading-8 text-black">
              Starter Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-700">
              Explore Core Features at No Cost
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-black">
                Free
              </span>
            </p>

            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-700"
            >
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-black" />2
                Documents
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-black" />
                Up to 3 messages per document
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-black" />
                Try out the AI Chat Functionality
              </li>
            </ul>
          </div>

          {/* PRO */}
          <div className="ring-2 ring-black rounded-3xl p-8">
            <h3 className="text-lg font-semibold leading-8 text-black">
              Pro Plan
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-700">
              Maximize Productivity with PRO Features
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-black">
                $1.00
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-700">
                / month
              </span>
            </p>

            <Button
              className="bg-black w-full text-white shadow-sm hover:bg-gray-900 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              disabled={loading || isPending}
              onClick={handleUpgrade}
            >
              {isPending || loading
                ? "Loading..."
                : hasActiveMembership
                ? "Manage Plan"
                : "Upgrade to Pro"}
            </Button>

            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-700"
            >
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-black" />
                Store upto 20 Documents
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-black" />
                Ability to Delete Documents
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-black" />
                Up to 100 messages per document
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-black" />
                Full Power AI Chat Functionality with Memory Recall
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-black" />
                Advanced analytics
              </li>
              <li className="flex gap-x-3">
                <CheckIcon className="h-6 w-5 flex-none text-black" />
                24-hour support response time
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PricingPage;