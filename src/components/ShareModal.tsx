// src/components/ShareModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TelegramShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon,
    RedditIcon,
    TelegramIcon,
} from "react-share";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    shareUrl: string;
    title: string;
    description: string;
    hashtags?: string[];
}

export default function ShareModal({
    isOpen,
    onClose,
    shareUrl,
    title,
    description,
    hashtags = [],
}: ShareModalProps) {
    const iconSize = 48;
    const iconBorderRadius = 12;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div
                            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 pointer-events-auto relative border border-amber-500/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-amber-200 hover:text-amber-100 transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={24} />
                            </button>

                            {/* Header */}
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-amber-100 mb-2 font-serif">
                                    Share Your Results! 🪄
                                </h2>
                                <p className="text-amber-200/80 text-sm">
                                    Let the wizarding world know which house you belong to!
                                </p>
                            </div>

                            {/* Share buttons grid */}
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <FacebookShareButton
                                        url={shareUrl}
                                        hashtag={hashtags[0] ? `#${hashtags[0]}` : undefined}
                                    >
                                        <FacebookIcon size={iconSize} round={false} borderRadius={iconBorderRadius} />
                                    </FacebookShareButton>
                                    <span className="text-xs text-amber-200">Facebook</span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <TwitterShareButton
                                        url={shareUrl}
                                        title={description}
                                        hashtags={hashtags}
                                    >
                                        <TwitterIcon size={iconSize} round={false} borderRadius={iconBorderRadius} />
                                    </TwitterShareButton>
                                    <span className="text-xs text-amber-200">Twitter</span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <WhatsappShareButton
                                        url={shareUrl}
                                        title={description}
                                    >
                                        <WhatsappIcon size={iconSize} round={false} borderRadius={iconBorderRadius} />
                                    </WhatsappShareButton>
                                    <span className="text-xs text-amber-200">WhatsApp</span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <LinkedinShareButton
                                        url={shareUrl}
                                        title={title}
                                        summary={description}
                                    >
                                        <LinkedinIcon size={iconSize} round={false} borderRadius={iconBorderRadius} />
                                    </LinkedinShareButton>
                                    <span className="text-xs text-amber-200">LinkedIn</span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <RedditShareButton
                                        url={shareUrl}
                                        title={description}
                                    >
                                        <RedditIcon size={iconSize} round={false} borderRadius={iconBorderRadius} />
                                    </RedditShareButton>
                                    <span className="text-xs text-amber-200">Reddit</span>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <TelegramShareButton
                                        url={shareUrl}
                                        title={description}
                                    >
                                        <TelegramIcon size={iconSize} round={false} borderRadius={iconBorderRadius} />
                                    </TelegramShareButton>
                                    <span className="text-xs text-amber-200">Telegram</span>
                                </motion.div>
                            </div>

                            {/* Copy link section */}
                            <div className="mt-6 pt-4 border-t border-amber-500/20">
                                <p className="text-xs text-amber-200/60 mb-2">Or copy the link:</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={shareUrl}
                                        readOnly
                                        className="flex-1 bg-slate-800/50 border border-amber-500/30 rounded-lg px-3 py-2 text-sm text-amber-100 focus:outline-none focus:border-amber-500/50"
                                    />
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(shareUrl);
                                            // You could add a toast notification here
                                        }}
                                        className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-lg text-sm font-medium hover:from-amber-500 hover:to-amber-400 transition-all"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
