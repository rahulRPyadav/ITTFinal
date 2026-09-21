import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Star,
  MessageSquare,
  Send,
  User,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { API_BASE_URL } from "../config/api";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerPage = 3;

  // Form states
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [tourId, setTourId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchReviewsAndTours = async () => {
    try {
      const [reviewsRes, toursRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/reviews`),
        axios.get(`${API_BASE_URL}/api/tours`).catch(() => ({ data: [] })),
      ]);
      setReviews(reviewsRes.data.data || reviewsRes.data || []);
      setTours(toursRes.data.data || toursRes.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewsAndTours();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) {
      return alert("Kripya apna naam aur review comment likhein.");
    }

    setSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/api/reviews`, {
        userName,
        rating: Number(rating),
        comment,
        tourId: tourId || null,
      });

      alert("Aapka review successfully submit ho gaya hai!");
      setUserName("");
      setComment("");
      setRating(5);
      setTourId("");
      fetchReviewsAndTours();
    } catch (err) {
      console.error("Review submit error:", err);
      alert("Review submit karne me error aayi.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - reviewsPerPage, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + reviewsPerPage < reviews.length ? prev + reviewsPerPage : prev,
    );
  };

  const displayedReviews = reviews.slice(
    currentIndex,
    currentIndex + reviewsPerPage,
  );
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex + reviewsPerPage < reviews.length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-[#FFF3C8] text-[#458393] text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Sparkles size={12} className="text-[#34A99D]" />
            Client Experiences
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            What Our Travelers Say
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500 max-w-xl mx-auto">
            Explore real feedback from travelers who explored destinations with
            Ishika Travels.
          </p>
        </div>

        {/* Displayed Testimonials Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xs font-bold text-slate-400 animate-pulse">
              Loading testimonials...
            </p>
          </div>
        ) : reviews.length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayedReviews.map((rev) => (
                <div
                  key={rev._id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 flex flex-col justify-between space-y-5 hover:border-[#34A99D]/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="space-y-3">
                    {/* Tour Name Badge */}
                    {rev.tour?.title && (
                      <span className="inline-flex items-center gap-1 bg-[#F0FDF4] text-emerald-700 border border-emerald-200 text-[10px] font-black px-2.5 py-1 rounded-full">
                        <MapPin size={11} className="text-emerald-600" />
                        {rev.tour.title}
                      </span>
                    )}

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 text-amber-500 pt-1">
                      {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-xs sm:text-sm text-slate-700 font-medium italic leading-relaxed break-words whitespace-pre-wrap">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Profile Avatar & User Details */}
                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Profile Icon / Avatar */}
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#458393] to-[#34A99D] flex items-center justify-center text-white font-black text-sm shadow-md">
                        {rev.userName?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">
                          {rev.userName}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400">
                          Verified Traveler
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Buttons */}
            {reviews.length > reviewsPerPage && (
              <div className="flex items-center justify-center gap-4 pt-2">
                <button
                  onClick={handlePrev}
                  disabled={!canGoPrev}
                  className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-black px-4 py-2.5 rounded-2xl shadow-sm transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <span className="text-xs font-bold text-slate-500">
                  Showing {currentIndex + 1} -{" "}
                  {Math.min(currentIndex + reviewsPerPage, reviews.length)} of{" "}
                  {reviews.length}
                </span>

                <button
                  onClick={handleNext}
                  disabled={!canGoNext}
                  className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-black px-4 py-2.5 rounded-2xl shadow-sm transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-bold">
              Abhi tak koi review nahi hai. Aap pehle review likh sakte hain!
            </p>
          </div>
        )}

        {/* Add Your Review Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <MessageSquare className="w-5 h-5 text-[#34A99D]" />
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
              Add Your Review
            </h3>
          </div>

          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 ml-1">
                  Your Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Aapka naam..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#34A99D]/40 focus:border-[#34A99D] transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 ml-1">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#34A99D]/40 focus:border-[#34A99D] transition"
                >
                  <option value={5}>5 - ⭐⭐⭐⭐⭐ (Very Good)</option>
                  <option value={4}>4 - ⭐⭐⭐⭐ (Good)</option>
                  <option value={3}>3 - ⭐⭐⭐ (Average)</option>
                  <option value={2}>2 - ⭐⭐ (Poor)</option>
                  <option value={1}>1 - ⭐ (Bad)</option>
                </select>
              </div>
            </div>

            {/* Select Tour Dropdown */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 ml-1">
                Select Tour (Konsa tour kiya tha?)
              </label>
              <select
                value={tourId}
                onChange={(e) => setTourId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#34A99D]/40 focus:border-[#34A99D] transition"
              >
                <option value="">
                  -- General Feedback (No specific tour) --
                </option>
                {tours.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.title} {t.location ? `(${t.location})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 ml-1">
                Your Review / Comment
              </label>
              <textarea
                rows={3}
                placeholder="Apna tour experience yahan share karein..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#34A99D]/40 focus:border-[#34A99D] transition"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#458393] to-[#34A99D] hover:from-[#34A99D] hover:to-[#458393] text-white py-3.5 rounded-2xl font-black text-xs sm:text-sm shadow-md transition cursor-pointer disabled:opacity-50"
            >
              <Send size={15} />
              <span>
                {submitting ? "Submitting Review..." : "Submit Review"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
