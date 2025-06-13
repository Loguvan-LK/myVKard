import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  Globe,
  MapPin,
  Download,
  Share2,
  Building,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Tilt } from "react-tilt";
import { BASE_URL } from "../config/config";
import toast from "react-hot-toast";

const VisitingCard = ({ onClose, companyProfile }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const saveCompanyContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${companyProfile.companyName || "Company Name"}
ORG:${companyProfile.companyName || "Company Name"}
EMAIL:${companyProfile.companyEmail || ""}
TEL:${companyProfile.companyPhone || ""}
ADR:;;${companyProfile.companyLocation || ""};;;
${companyProfile.website ? `URL:${companyProfile.website}` : ""}
${companyProfile.linkedin ? `URL:${companyProfile.linkedin}` : ""}
${companyProfile.facebook ? `URL:${companyProfile.facebook}` : ""}
${companyProfile.instagram ? `URL:${companyProfile.instagram}` : ""}
${companyProfile.twitterX ? `URL:${companyProfile.twitterX}` : ""}
${companyProfile.youtube ? `URL:${companyProfile.youtube}` : ""}
NOTE:Industry: ${companyProfile.industry || "Business"}${
      companyProfile.description ? " - " + companyProfile.description : ""
    }
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${companyProfile.companyName || "company"}.vcf`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Company contact saved to device!");
  };

  const shareCompany = () => {
    if (navigator.share) {
      navigator
        .share({
          title: companyProfile.companyName || "Company Profile",
          text: `Check out the company profile for ${
            companyProfile.companyName || "this company"
          }`,
          url: `${window.location.origin}/${companyProfile.uniqueId || ""}`,
        })
        .then(() => toast.success("Shared successfully!"))
        .catch(() => toast.error("Failed to share. Copied to clipboard!"));
    } else {
      const companyText = `${companyProfile.companyName || ""}\n${
        companyProfile.companyEmail || ""
      }\n${companyProfile.companyPhone || ""}\n${
        companyProfile.companyLocation || ""
      }`;
      navigator.clipboard.writeText(companyText);
      toast.success("Company details copied to clipboard!");
    }
  };

  const socialLinks = [
    {
      platform: "linkedin",
      url: companyProfile.linkedin,
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      platform: "facebook",
      url: companyProfile.facebook,
      icon: <Facebook className="w-5 h-5" />,
    },
    {
      platform: "instagram",
      url: companyProfile.instagram,
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      platform: "twitterX",
      url: companyProfile.twitterX,
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      platform: "youtube",
      url: companyProfile.youtube,
      icon: <Youtube className="w-5 h-5" />,
    },
  ].filter((link) => link.url);

  return (
    <>
      <style>
        {`
          .card-bg {
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
          .card-shadow {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.1);
          }
        `}
      </style>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <Tilt
          options={{ max: 15, scale: 1.02, speed: 400, perspective: 1000 }}
          className="w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[600px]"
        >
          <motion.div
            className="relative card-bg rounded-2xl p-6 sm:p-8 card-shadow"
            initial={{ scale: 0.8, y: 100, rotateX: 10 }}
            animate={{ scale: 1, y: 0, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Card Content */}
            <div className="text-white">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                {companyProfile.logo ? (
                  <img
                    src={`${companyProfile.logo}`}
                    alt={`${companyProfile.companyName} logo`}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-lg flex items-center justify-center">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">
                    {companyProfile.companyName || "Sample Company"}
                  </h2>
                  <p className="text-sm sm:text-base text-white/80 truncate">
                    {companyProfile.industry || "Technology Solutions"}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white/70 flex-shrink-0" />
                  <span className="text-white/90 truncate">
                    {companyProfile.companyEmail || "contact@samplecompany.com"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white/70 flex-shrink-0" />
                  <span className="text-white/90">
                    {companyProfile.companyPhone || "+1 (555) 123-4567"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-white/70 flex-shrink-0" />
                  <span className="text-white/90 truncate">
                    {companyProfile.companyLocation || "New York, NY"}
                  </span>
                </div>
                {companyProfile.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-white/70 flex-shrink-0" />
                    <a
                      href={companyProfile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 truncate hover:underline"
                    >
                      {companyProfile.website}
                    </a>
                  </div>
                )}
              </div>

              {/* Social Media Links */}
              {socialLinks.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map(({ platform, url, icon }) => (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {icon}
                    </motion.a>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-white/20 flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={saveCompanyContact}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" />
                  <span>Save Contact</span>
                </motion.button>
                <motion.button
                  onClick={shareCompany}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition-colors"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </Tilt>
      </motion.div>
    </>
  );
};

export default VisitingCard;
