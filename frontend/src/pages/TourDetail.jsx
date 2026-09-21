import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, CheckCircle, Phone, MessageCircle, ArrowLeft, AlertCircle, Tag } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const TourDetail = () => {
  const { slug, id } = useParams();
  const tourIdentifier = slug || id;

  const [tour, setTour] = useState(null);
  const [loadingTour, setLoadingTour] = useState(true);
  const [error, setError] = useState(false);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '', email: '', phone: '', travelDate: '', guests: 1, notes: ''
  });

  useEffect(() => {
    if (!tourIdentifier) return;
    setLoadingTour(true);
    setError(false);

    axios.get(`${API_BASE_URL}/api/tours/${tourIdentifier}`)
      .then((res) => {
        if (res.data) {
          setTour(res.data);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching tour detail:", err);
        setError(true);
      })
      .finally(() => setLoadingTour(false));
  }, [tourIdentifier]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/api/bookings`, {
        tourId: tour?._id,
        tourName: tour?.title,
        ...formData
      });
      setBookingLoading(false);
      setBookingSuccess(true);
    } catch (err) {
      setBookingLoading(false);
      // Agar booking backend par save ho gayi ya error aaya, user ko success flow dikha sakte hain ya error alert
      setBookingSuccess(true);
    }
  };

  if (loadingTour) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-20 font-sans">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#34A99D] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-600 font-extrabold text-xs sm:text-sm">Fetching Tour Details...</p>
        </div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-20 font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 max-w-md text-center space-y-4">
          <AlertCircle size={48} className="text-red-500 mx-auto" />
          <h2 className="text-2xl font-black text-slate-900">Tour Not Found</h2>
          <Link to="/tours" className="inline-flex items-center space-x-2 bg-[#458393] hover:bg-[#34A99D] text-white font-extrabold text-xs px-6 py-3 rounded-xl transition shadow-md">
            <ArrowLeft size={16} /> <span>Explore All Destinations</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 font-sans relative min-h-screen">
      <Link to="/tours" className="inline-flex items-center gap-2 text-slate-600 hover:text-[#34A99D] mb-6 font-bold text-xs sm:text-sm transition">
        <ArrowLeft size={16} /> Back to Destinations
      </Link>

      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        <div className="md:col-span-2">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-[#34A99D]/20 mb-6 bg-white">
            <img src={tour.image} alt={tour.title} className="w-full h-72 sm:h-96 object-cover" />
          </div>
          
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs sm:text-sm text-slate-500 mb-4 font-semibold">
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-[#34A99D]/20 shadow-xs">
              <MapPin size={16} className="text-[#34A99D]"/> {tour.location}
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-[#458393]/20 shadow-xs">
              <Clock size={16} className="text-[#458393]"/> {tour.duration}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight">{tour.title}</h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-8 font-medium whitespace-pre-line">{tour.description}</p>

          {tour.inclusions && tour.inclusions.length > 0 && (
            <>
              <h3 className="text-lg font-black text-slate-900 mb-3">Package Highlights & Inclusions</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {tour.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 bg-white p-3.5 rounded-2xl border border-[#34A99D]/20 shadow-xs font-medium">
                    <CheckCircle size={18} className="text-[#34A99D] shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div>
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#34A99D]/20 shadow-xl sticky top-24">
            <div className="inline-flex items-center space-x-1.5 bg-[#FFF3C8] border border-[#E5CB90]/50 px-3 py-1 rounded-full text-[#458393] text-[10px] font-black uppercase mb-3">
              <Tag size={12} className="text-[#34A99D]" />
              <span>CUSTOM QUOTATION</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">Get Best Price Quote</h3>
            <p className="text-xs text-slate-500 font-medium mb-6">Rates depend on car model (Sedan / SUV / Tempo) & total persons.</p>

            <button 
              onClick={() => setShowBookingModal(true)}
              className="w-full bg-[#458393] hover:bg-[#34A99D] active:scale-95 text-white font-black py-3.5 rounded-2xl transition duration-300 shadow-md shadow-[#458393]/20 mb-4 text-xs sm:text-sm cursor-pointer"
            >
              Book / Request Quote 🚀
            </button>

            <div className="border-t border-slate-100 pt-4 space-y-3 text-xs">
              <a href="tel:+917891604638" className="flex items-center gap-2.5 text-slate-700 hover:text-[#34A99D] font-bold transition">
                <div className="p-2 bg-[#FFF3C8] text-[#458393] rounded-xl"><Phone size={14} /></div>
                <span>Call: +91 7891604638</span>
              </a>
              <a 
                href={`https://wa.me/917891604638?text=${encodeURIComponent(`Hi, I want a price quote for: ${tour.title}`)}`} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2.5 text-slate-700 hover:text-[#34A99D] font-bold transition"
              >
                <div className="p-2 bg-green-50 text-green-600 rounded-xl"><MessageCircle size={14} /></div>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl border border-[#34A99D]/20">
            <button 
              onClick={() => { setShowBookingModal(false); setBookingSuccess(false); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>

          {bookingSuccess ? (
  <div className="text-center py-6">
    <div className="bg-green-100 text-green-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <CheckCircle size={30} />
    </div>

    <h3 className="text-xl font-black text-slate-900 mb-2">
      Inquiry Submitted!
    </h3>

    <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
      Thank you for your inquiry. Our Ishika Tour & Travels team will review
      your request and contact you with the best price.
    </p>

    {/* Review Section */}
    <div className="bg-slate-50 rounded-xl p-4 mt-6">
      <h4 className="text-sm font-black text-slate-900 mb-1">
        Thank You
      </h4>
      <p className="text-slate-600 text-xs font-medium leading-relaxed">
        After your tour, please share your experience and leave us a review.
        Your feedback means a lot to us!
      </p>
    </div>

    <button 
      onClick={() => { setShowBookingModal(false); setBookingSuccess(false); }}
      className="mt-6 bg-[#458393] hover:bg-[#34A99D] text-white px-8 py-3 rounded-xl text-xs font-black transition cursor-pointer"
    >
      Close
    </button>
  </div>
) : (
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-1">Request Tour Quote</h3>
                <p className="text-xs text-slate-500 mb-5 font-semibold truncate">{tour.title}</p>

                <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Your full name"
                      value={formData.customerName}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-[#34A99D]"
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Phone</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="Phone number"
                        value={formData.phone}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-[#34A99D]"
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Travel Date</label>
                      <input 
                        type="date" 
                        required 
                        value={formData.travelDate}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-[#34A99D]"
                        onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Email</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="your@email.com"
                        value={formData.email}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-[#34A99D]"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Members / Persons</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="50" 
                        required 
                        value={formData.guests}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-[#34A99D]"
                        onChange={(e) => setFormData({...formData, guests: Number(e.target.value)})}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={bookingLoading}
                    className="w-full bg-[#458393] hover:bg-[#34A99D] text-white font-extrabold py-3 rounded-2xl transition duration-300 mt-2 text-xs sm:text-sm shadow-md cursor-pointer"
                  >
                    {bookingLoading ? 'Submitting...' : 'Send Inquiry Request 🚀'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetail;