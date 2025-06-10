import { Button } from "@/components/ui/button";
import {
  BrainCogIcon,
  EyeIcon,
  GlobeIcon,
  MonitorSmartphoneIcon,
  ServerCogIcon,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ThreePDFScene from "@/components/ThreePDFScene";

const features = [
  {
    name: "Store your PDF Documents",
    description:
      "Keep all your important PDF files securely stored and easily accessible anytime, anywhere.",
    icon: GlobeIcon,
  },
  {
    name: "Blazing Fast Responses",
    description:
      "Experience lightning-fast answers to your queries, ensuring you get the information you need instantly.",
    icon: ZapIcon,
  },
  {
    name: "Chat Memorisation",
    description:
      "Our intelligent chatbot remembers previous interactions, providing a seamless and personalized experience.",
    icon: BrainCogIcon,
  },
  {
    name: "Interactive PDF Viewer",
    description:
      "Engage with your PDFs like never before using our intuitive and interactive viewer.",
    icon: EyeIcon,
  },
  {
    name: "Cloud Backup",
    description:
      "Rest assured knowing your documents are safely backed up on the cloud, protected from loss or damage.",
    icon: ServerCogIcon,
  },
  {
    name: "Responsive Across Devices",
    description:
      "Access and chat with your PDFs seamlessly on any device, whether it's your desktop, tablet, or smartphone.",

    icon: MonitorSmartphoneIcon,
  },
];

export default function Home() {
  return (
    <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gray-600 relative">
      <ThreePDFScene />
      <div className="bg-white py-24 sm:py-32 rounded-md drop-shadow-xl relative z-10">
        <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-black">
              Your AI Sidekick for Boring PDFs
            </h2>

            <p className="mt-2 text-5xl font-extrabold tracking-tight text-black sm:text-7xl">
              Make Your PDFs Talk Back! 🗣️
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-700">
              Introducing <span className="font-bold text-black">TalkativePDF.</span>
              <br />
              <br />
              Why just read when you can chat? Upload your PDF, and let our chatbot do the heavy lifting—answering questions, summarizing, and even cracking a joke or two (okay, maybe just one). Whether you're a student, a pro, or just PDF-curious, <span className="text-black font-bold">TalkativePDF</span> turns silent documents into <span className="font-bold">sassy conversations</span>. Productivity? More like fun-ductivity!
            </p>
          </div>

          <Button asChild className="mt-10">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>

        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Image
              alt="App screenshot"
              src="https://imgur.com/mUryYKg.jpeg"
              width={2432}
              height={1442}
              className="mb-[-0%] rounded-xl shadow-2xl ring-1 ring-black/10"
            />
            <div aria-hidden="true" className="relative">
              <div className="absolute bottom-0 -inset-x-32 bg-gradient-to-t from-white/95 pt-[5%]" />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-700 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold text-black">
                  <feature.icon
                    aria-hidden="true"
                    className="absolute left-1 top-1 h-5 w-5 text-black"
                  />
                </dt>

                <dd>{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full bg-gray-800 py-6 flex flex-col items-center justify-center text-sm text-gray-200 mt-8 rounded-b-md">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full max-w-4xl px-4">
          <span className="text-center flex-1">&copy; {new Date().getFullYear()} TalkativePDF. All rights reserved.</span>
          <div className="flex gap-6 mt-2 md:mt-0">
            <a href="https://www.linkedin.com/in/anirudhvasudev/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Anirudh's LinkedIn</a>
            <a href="https://anirudhvasudevan.netlify.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Anirudh's Portfolio</a>
          </div>
        </div>
      </footer>
    </main>
  );
}