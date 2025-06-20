"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/libs/utils";
import { Input } from "../ui/input";
import { models } from "@/libs/constants";



export default function ModelSelector({
  setModel,
  selectedModel,
  setProvider
}: {
  setModel: React.Dispatch<React.SetStateAction<string>>;
  selectedModel: string;
  setProvider?: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 text-[#ac1668] dark:text-[#f9f8fb] font-normal text-sm px-3 py-1.5 rounded-lg hover:bg-[#f4d6e7] dark:hover:bg-[#322c38]"
      >
        {selectedModel}
        <ChevronDown className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-3 z-50 w-72 bg-white dark:bg-[#1f1a23] rounded-xl shadow-lg border border-pink-200 dark:border-[#3a2937] overflow-hidden"
          >
            <div className="px-3 py-2">
              <Input
                placeholder="Search models..."
                className="w-full px-3 py-1.5 text-sm border border-pink-300 dark:border-[#4d3a47] rounded-lg outline-none placeholder:text-pink-400 bg-white dark:bg-[#2d2531] text-[#77347c] dark:text-[#f4cbe5]"
              />
            </div>

            <div className="px-3 pb-2">
              <div className="bg-gradient-to-r from-[#ffb0de] to-[#ffd0eb] dark:bg-none border border-pink-300 dark:border-[#8a004c] dark:bg-[#170c12] text-[#b4005c] dark:text-[#f9d2e3] p-3 rounded-lg text-sm font-semibold shadow-sm mb-2">
                <div className="text-lg font-bold">$8/month</div>
                <p className="mt-1">Unlock all models + higher limits</p>
                <button className="mt-2 w-full py-1.5 bg-[#a4005a] hover:bg-[#8a004c] text-white rounded-lg text-sm">
                  Upgrade now
                </button>
              </div>

              <div className="flex flex-col gap-1 max-h-48 overflow-y-auto custom-scrollbar">
                {models?.map((modelItem) => (
                  <button
                    key={modelItem.name}
                    onClick={() => {
                      if (modelItem.active) {
                        setProvider?.(modelItem.provider);
                        setModel(modelItem.name.toLocaleLowerCase());
                        setIsOpen(false);
                      }
                    }}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm",
                      modelItem.active
                        ? "hover:bg-pink-100 dark:hover:bg-[#322935] text-pink-900 dark:text-[#f6d2e2]"
                        : "text-pink-300 cursor-not-allowed"
                    )}
                    disabled={!modelItem.active}
                  >
                    <span>{modelItem.title}</span>
                    {!modelItem.active && <Lock className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
