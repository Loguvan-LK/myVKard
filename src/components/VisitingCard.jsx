import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiMail, FiPhone, FiGlobe, FiMapPin, FiDownload, FiShare2 } from 'react-icons/fi';
import { FaBuilding } from "react-icons/fa6";

const shimmerKeyframes = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
`;

const VisitingCard = ({ onClose, companyProfile }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const saveCompanyContact = () => {
    // Create vCard format for company
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${companyProfile.companyName || ''}
ORG:${companyProfile.companyName || ''}
EMAIL:${companyProfile.companyEmail || ''}
TEL:${companyProfile.companyPhone || ''}
ADR:;;${companyProfile.companyLocation || ''};;;
${companyProfile.website ? `URL:${companyProfile.website}` : ''}
${companyProfile.linkedin ? `URL:${companyProfile.linkedin}` : ''}
${companyProfile.facebook ? `URL:${companyProfile.facebook}` : ''}
${companyProfile.instagram ? `URL:${companyProfile.instagram}` : ''}
${companyProfile.twitterX ? `URL:${companyProfile.twitterX}` : ''}
${companyProfile.youtube ? `URL:${companyProfile.youtube}` : ''}
NOTE:Industry: ${companyProfile.industry || 'Business'}${companyProfile.description ? ' - ' + companyProfile.description : ''}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${companyProfile.companyName || 'company'}.vcf`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    // Toast notification simulation
    console.log("Company contact saved to device!");
  };

  const shareCompany = () => {
    if (navigator.share) {
      navigator.share({
        title: companyProfile.companyName,
        text: `Company profile for ${companyProfile.companyName}`,
        url: `${window.location.origin}/${companyProfile.uniqueId || ''}`
      });
    } else {
      const companyText = `${companyProfile.companyName || ''}\n${companyProfile.companyEmail || ''}\n${companyProfile.companyPhone || ''}\n${companyProfile.companyLocation || ''}`;
      navigator.clipboard.writeText(companyText);
      console.log("Company details copied to clipboard!");
    }
  };

  const getSocialIcon = (platform) => {
    const icons = {
      linkedin: '💼',
      facebook: '📘',
      instagram: '📷',
      twitterX: '🐦',
      youtube: '📺'
    };
    return icons[platform] || '🔗';
  };

  return (
    <>
      <style>{shimmerKeyframes}</style>
      <motion.div
        className="fixed inset-0 bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center z-[1000] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 text-white/80 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Mobile Layout */}
        <div className="block md:hidden w-full max-w-sm">
          {/* Main Card */}
          <motion.div
            className="relative w-full bg-gradient-to-br from-[#1e3a5f] to-[#0f2a44] rounded-2xl p-6 mb-6 shadow-2xl"
            initial={{ scale: 0.8, y: 100 }}
            animate={{
              scale: isVisible ? 1 : 0.8,
              y: isVisible ? 0 : 100
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Card Background Effects */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.1\\'%3E%3Ccircle cx=\\'30\\' cy=\\'30\\' r=\\'2\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 rounded-2xl"></div>
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl"
              style={{
                animation: 'shimmer 2s infinite linear'
              }}
            ></div>
            <div className="absolute inset-0 rounded-2xl border border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]"></div>

            {/* Card Content */}
            <div className="relative text-white">
              {/* Header with Logo and Company Info */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white font-bold text-lg">
                      {companyProfile.companyName ? companyProfile.companyName.charAt(0).toLowerCase() : 'r'}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white leading-tight">
                      {companyProfile.companyName || 'revcards'}
                    </h2>
                    <p className="text-orange-300 text-sm font-medium">
                      {companyProfile.industry || 'Business'}
                    </p>
                  </div>
                </div>
                
                {/* QR Code Button */}
                <div className="bg-white/90 rounded-lg p-3 flex flex-col items-center justify-center min-w-[70px]">
                  <div className="w-8 h-8 bg-black rounded mb-1 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-sm"></div>
                  </div>
                  <span className="text-black text-xs font-semibold">QR CODE</span>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FiMail className="text-white/70 w-4 h-4 flex-shrink-0" />
                  <span className="text-white/90 text-sm break-all">
                    {companyProfile.companyEmail || 'abc@revcards.co.uk'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FiPhone className="text-white/70 w-4 h-4 flex-shrink-0" />
                  <span className="text-white/90 text-sm">
                    {companyProfile.companyPhone || '2314256478'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FiMapPin className="text-white/70 w-4 h-4 flex-shrink-0" />
                  <span className="text-white/90 text-sm">
                    {companyProfile.companyLocation || 'america'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FiGlobe className="text-white/70 w-4 h-4 flex-shrink-0" />
                  <span className="text-white/90 text-sm break-all">
                    {companyProfile.website || 'https://revcards.co.uk/'}
                  </span>
                </div>
              </div>

              {/* Save Contact Button (in card) */}
              <motion.button
                onClick={saveCompanyContact}
                className="w-full mt-6 bg-orange-400 hover:bg-orange-500 text-black font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Save Contact</span>
              </motion.button>

              {/* Social Media Indicator */}
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-orange-400 rounded-full"></div>
            </div>
          </motion.div>

          {/* Floating Action Buttons */}
          <div className="flex justify-center space-x-4">
            <motion.button
              onClick={saveCompanyContact}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 font-semibold"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload className="w-4 h-4" />
              <span>Save Company</span>
            </motion.button>

            <motion.button
              onClick={shareCompany}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 font-semibold"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiShare2 className="w-4 h-4" />
              <span>Share</span>
            </motion.button>
          </div>
        </div>

        {/* Desktop/Tablet Layout */}
        <motion.div
          className="hidden md:block relative 
            w-[500px] h-[320px]
            lg:w-[560px] lg:h-[360px]
            xl:w-[600px] xl:h-[380px]
            2xl:w-[650px] 2xl:h-[400px]
            rounded-xl overflow-hidden shadow-2xl"
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{
            scale: isVisible ? 1 : 0.8,
            rotate: isVisible ? 0 : -5,
            y: isVisible ? 0 : 100
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Card Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#004672] to-[#002b4a]">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.1\\'%3E%3Ccircle cx=\\'30\\' cy=\\'30\\' r=\\'2\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{
                animation: 'shimmer 2s infinite linear'
              }}
            ></div>
            <div className="absolute inset-0 rounded-xl border border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]"></div>
          </div>

          {/* Card Content - Desktop */}
          <div className="relative h-full p-6 lg:p-8 text-white flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-4 gap-3">
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                  <FaBuilding className="text-white w-7 h-7 lg:w-8 lg:h-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight break-words">
                    {companyProfile.companyName || 'Sample Company'}
                  </h2>
                  <p className="text-white/80 text-lg lg:text-xl break-words">
                    {companyProfile.industry || 'Technology Solutions'}
                  </p>
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div className="flex-1 space-y-3 lg:space-y-4">
              <div className="flex items-start space-x-3 text-base lg:text-lg">
                <FiMail className="text-white/70 mt-0.5 flex-shrink-0 w-5 h-5 lg:w-6 lg:h-6" />
                <span className="text-white/90 break-all">
                  {companyProfile.companyEmail || 'contact@samplecompany.com'}
                </span>
              </div>

              <div className="flex items-start space-x-3 text-base lg:text-lg">
                <FiPhone className="text-white/70 mt-0.5 flex-shrink-0 w-5 h-5 lg:w-6 lg:h-6" />
                <span className="text-white/90">
                  {companyProfile.companyPhone || '+1 (555) 123-4567'}
                </span>
              </div>

              <div className="flex items-start space-x-3 text-base lg:text-lg">
                <FiMapPin className="text-white/70 mt-0.5 flex-shrink-0 w-5 h-5 lg:w-6 lg:h-6" />
                <span className="text-white/90 break-words">
                  {companyProfile.companyLocation || 'New York, NY'}
                </span>
              </div>

              <div className="flex items-start space-x-3 text-base lg:text-lg">
                <FiGlobe className="text-white/70 mt-0.5 flex-shrink-0 w-5 h-5 lg:w-6 lg:h-6" />
                <span className="text-white/90 break-all">
                  {companyProfile.website || 'www.samplecompany.com'}
                </span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center flex-wrap gap-2 mt-5">
              <span className="text-white/70 text-base lg:text-lg">Connect:</span>
              <div className="flex flex-wrap gap-1">
                <span className="text-xl lg:text-2xl">{getSocialIcon('linkedin')}</span>
                <span className="text-xl lg:text-2xl">{getSocialIcon('facebook')}</span>
                <span className="text-xl lg:text-2xl">{getSocialIcon('instagram')}</span>
                <span className="text-xl lg:text-2xl">{getSocialIcon('twitterX')}</span>
                <span className="text-xl lg:text-2xl">{getSocialIcon('youtube')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center gap-3 mt-6 pt-4 border-t border-white/20">
              <motion.button
                onClick={saveCompanyContact}
                className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 px-5 py-2.5 lg:px-6 lg:py-3 rounded-lg transition-all duration-200 backdrop-blur-sm text-base lg:text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="font-medium whitespace-nowrap">Save Contact</span>
              </motion.button>

              <motion.button
                onClick={shareCompany}
                className="flex items-center justify-center space-x-2 bg-white/20 hover:bg-white/30 px-5 py-2.5 lg:px-6 lg:py-3 rounded-lg transition-all duration-200 backdrop-blur-sm text-base lg:text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiShare2 className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="font-medium whitespace-nowrap">Share</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};


export default VisitingCard;