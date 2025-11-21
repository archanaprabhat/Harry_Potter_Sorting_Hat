import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Link as LinkIcon, Download, Share2, MessageCircle, Send } from "lucide-react";
import html2canvas from "html2canvas";
import { HOUSES } from "@/lib/quiz-data";
import Button from "./Button";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    house: keyof typeof HOUSES;
    userName: string;
    shareUrl: string;
}

const SHARE_MESSAGES = {
    gryffindor: "🦁 GRYFFINDOR\nI’ve been sorted into Gryffindor.\n\nCourage chose me — see where you belong:",
    slytherin: "🐍 SLYTHERIN\nI've been sorted into Slytherin.\n\nAmbition recognizes ambition — find your house:",
    hufflepuff: "🦡 HUFFLEPUFF\nI’ve been sorted into Hufflepuff.\n\nLoyalty found its match — discover your house:",
    ravenclaw: "🦅 RAVENCLAW\nI’ve been sorted into Ravenclaw.\n\nCuriosity led the way — reveal your house:"
};

export default function ShareModal({ isOpen, onClose, house, userName, shareUrl }: ShareModalProps) {
    const [isGenerating, setIsGenerating] = useState(false);

    const shareText = SHARE_MESSAGES[house];

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            alert("Link copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy link:", err);
        }
    };

    const handleDownload = async () => {
        const element = document.getElementById('result-content');
        if (!element) {
            alert("Could not find result content to capture.");
            return;
        }

        try {
            setIsGenerating(true);

            // Capture the actual DOM element
            const canvas = await html2canvas(element, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                backgroundColor: null, // Transparent background if possible, or let it capture the gradient
                logging: false,
                ignoreElements: (element) => {
                    // Ignore elements with the specific class
                    return element.classList.contains('share-hidden');
                },
                onclone: (clonedDoc) => {
                    // Optional: You can manipulate the cloned DOM here if needed
                    // For example, ensuring the background gradient is captured correctly
                    const clonedElement = clonedDoc.getElementById('result-content');
                    if (clonedElement) {
                        clonedElement.style.borderRadius = '0'; // Reset border radius if needed
                    }
                }
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = `hogwarts-sorting-result-${house}.png`;
            link.click();

        } catch (err) {
            console.error("Failed to generate image:", err);
            alert("Failed to generate image. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleWhatsApp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
        window.open(url, '_blank');
    };

    const handleTelegram = () => {
        const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank');
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Hogwarts House',
                    text: shareText,
                    url: shareUrl,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-slate-900 border border-white/10 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <h3 className="text-xl font-serif font-bold text-white">Share Your Results</h3>
                            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            <p className="text-white/80 text-center text-sm">
                                Share your magical discovery with the world!
                            </p>

                            {/* Action Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={handleWhatsApp}
                                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 transition-all group"
                                >
                                    <MessageCircle className="text-[#25D366] group-hover:scale-110 transition-transform" size={32} />
                                    <span className="text-[#25D366] font-medium text-sm">WhatsApp</span>
                                </button>

                                <button
                                    onClick={handleTelegram}
                                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[#0088cc]/20 hover:bg-[#0088cc]/30 border border-[#0088cc]/50 transition-all group"
                                >
                                    <Send className="text-[#0088cc] group-hover:scale-110 transition-transform" size={32} />
                                    <span className="text-[#0088cc] font-medium text-sm">Telegram</span>
                                </button>

                                <button
                                    onClick={handleDownload}
                                    disabled={isGenerating}
                                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 transition-all group"
                                >
                                    {isGenerating ? (
                                        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Download className="text-amber-500 group-hover:scale-110 transition-transform" size={32} />
                                    )}
                                    <span className="text-amber-500 font-medium text-sm">
                                        {isGenerating ? "Generating..." : "Save Image"}
                                    </span>
                                </button>

                                <button
                                    onClick={handleCopyLink}
                                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 transition-all group"
                                >
                                    <LinkIcon className="text-purple-500 group-hover:scale-110 transition-transform" size={32} />
                                    <span className="text-purple-500 font-medium text-sm">Copy Link</span>
                                </button>
                            </div>

                            {/* Native Share (Mobile only usually) */}
                            {typeof navigator !== 'undefined' && navigator.share && (
                                <Button
                                    onClick={handleNativeShare}
                                    variant="outline"
                                    fullWidth
                                    className="mt-2"
                                >
                                    <Share2 size={18} className="mr-2" />
                                    More Options
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
