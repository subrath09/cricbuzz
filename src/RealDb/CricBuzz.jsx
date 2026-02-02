import React, { useEffect, useState, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { TfiCup, TfiMedall } from "react-icons/tfi";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";

import "swiper/css";

function CricBuzz() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const slidesPerView = 3;
  const showNav = !loading && matches.length > slidesPerView;

  const fetchUserFromApi = async () => {
    try {
      const res = await fetch(
        "https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json"
      );

      const data = await res.json();

      console.log("NEWS API:", data);

      setNews(data.articles || []);
      setNewsLoading(false);
    } catch (error) {
      console.log(error);
      setNewsLoading(false);
    }
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "cricbuzz"), (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;
          return b.createdAt.seconds - a.createdAt.seconds;
        });

      setMatches(data);
      setLoading(false);
    });
    fetchUserFromApi();
    return () => unsub();
  }, []);

  const NewsCard = ({ item, index }) => {
    return (
      <div
        key={index}
        className="bg-white rounded shadow hover:shadow-lg transition"
      >
        <img
          src={item.urlToImage}
          alt={item.title}
          className="h-44 w-full object-cover rounded-t"
        />

        <div className="p-4">
          <p className="font-semibold line-clamp-2">{item.title}</p>

          <p className="text-sm text-gray-500 mt-2">
            {item.source?.name}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-200 pt-4 min-h-screen">
      <div className="mx-64 max-lg:mx-0">
        {/* HEADER */}
<div className="relative z-50 bg-[#00916f] flex items-center gap-9 max-lg:px-2 max-lg:gap-2.5 py-3 px-4 lg:px-8 text-white text-xs sm:text-sm lg:text-base whitespace-nowrap">

  {/* LOGO */}
  <p className="text-2xl font-bold max-lg:text-lg shrink-0">
    cri
    <span className="bg-white rounded-full text-[#00916f] px-1">
      cb
    </span>
    uzz
  </p>

  {/* ALWAYS VISIBLE */}
  <p >Live Scores</p>
  <p >Schedules</p>
  <p >Teams</p>

  {/* DESKTOP ONLY */}
  <p className="max-lg:hidden">News</p>
  <p className="max-lg:hidden">Series</p>
  <p className="max-lg:hidden">Rankings</p>
  <p className="max-lg:hidden">More</p>

  <button className="bg-white text-gray-600 rounded-full py-1 px-2 max-lg:px-1 ">
    Go Premium
  </button>

  <IoPersonCircleOutline className="h-8 w-8 max-lg:hidden" />

  {/* HAMBURGER */}
  <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="ml-auto lg:hidden flex flex-col gap-[3px]"
  >
    <span className="w-5 h-[2px] bg-white"></span>
    <span className="w-5 h-[2px] bg-white"></span>
    <span className="w-5 h-[2px] bg-white"></span>
  </button>

  {/* SMALL MOBILE DROPDOWN */}
  {mobileMenuOpen && (
    <div className="absolute right-3 top-full mt-2 w-44 bg-white text-gray-800 rounded shadow-xl z-[999] lg:hidden">

      {["News", "Series", "Rankings", "More"].map((item) => (
        <p
          key={item}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {item}
        </p>
      ))}

      <div className="border-t" />

      <div className="px-4 py-2 flex gap-2 items-center">
        <IoPersonCircleOutline className="text-xl" />
        Profile
      </div>
    </div>
  )}
</div>


        {/* MATCHES LINE */}
        <div className="flex bg-[#4a4a4a] gap-4 items-center text-white overflow-x-auto max-lg:text-sm max-lg:gap-2">
          <p className="bg-[#333333] py-2 px-4 whitespace-nowrap">
            Matches
          </p>

          {loading ? (
            <p className="px-4 animate-pulse whitespace-nowrap">
              Loading matches...
            </p>
          ) : (
            matches.slice(0, 6).map((match) => (
              <p
                key={match.id}
                className="hover:bg-gray-600 py-2 px-4 cursor-pointer uppercase whitespace-nowrap"
              >
                {match.team1?.name}{" "}
                <span className="lowercase">vs</span>{" "}
                {match.team2?.name}
              </p>
            ))
          )}
        </div>

        {/* MATCH CARDS */}
        <div className="mt-6 relative">
          {showNav && !isBeginning && (
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-0 z-10 top-1/2 -translate-y-1/2 py-3 px-3 shadow-xl rounded-full text-white bg-[#00916f] max-lg:py-2 max-lg:px-2"
            >
              <FaArrowLeft />
            </button>
          )}

          {loading ? (
            <div className="flex gap-4 flex-wrap">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded shadow px-6 py-6 w-full sm:w-1/2 lg:w-1/3 animate-pulse"
                >
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              spaceBetween={16}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {matches.map((match) => (
                <SwiperSlide key={match.id}>
                  <div className="bg-white rounded-t px-6 pt-4 mx-2 hover:shadow-xl">
                    <p className="text-gray-600 text-sm mb-2 flex justify-between">
                      {match.matchBetween}
                      <span className="bg-gray-600 px-2 text-xs rounded-full flex items-center text-white">
                        T20
                      </span>
                    </p>

                    <div className="text-sm leading-8 px-4">
                      <div className="flex justify-between">
                        <p className="font-semibold uppercase">
                          {match.team1?.name}
                        </p>
                        <p>
                          {match.team1?.runs}/
                          {match.team1?.wickets} (
                          {match.team1?.overs} ov)
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <p className="font-semibold uppercase">
                          {match.team2?.name}
                        </p>
                        <p>
                          {match.team2?.runs}/
                          {match.team2?.wickets} (
                          {match.team2?.overs} ov)
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-green-700 mt-2 flex items-center gap-1 font-medium">
                      <span className="text-red-500 font-bold text-xl mb-1 px-1 animate-ping">
                        ·
                      </span>{" "}
                      Live
                    </p>
                  </div>

                  <div className="bg-[#d4d4d4] mx-2 cursor-pointer rounded-b px-4 text-gray-900 text-sm py-1 shadow flex justify-end">
                    Schedule
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {showNav && !isEnd && (
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-0 z-10 top-1/2 -translate-y-1/2 py-3 px-3 shadow-xl rounded-full max-lg:py-2 max-lg:px-2 text-white bg-[#00916f]"
            >
              <FaArrowRight />
            </button>
          )}
        </div>

        {/* QUICK ACCESS */}
        <div className="bg-white mt-4 mx-2 py-2 flex flex-wrap gap-3 px-4 items-center rounded max-lg:text-sm max-lg:justify-center">
          <p className="text-xl font-bold max-lg:w-full max-lg:text-center">Quick Access</p>

          <p className="flex gap-2 items-center bg-[#edf1f2] py-2 px-2 hover:shadow rounded cursor-pointer">
            <TfiCup className="text-lg" /> IPL
          </p>

          <p className="flex gap-2 items-center bg-[#edf1f2] py-2 px-2 hover:shadow rounded cursor-pointer">
            <TfiCup className="text-lg" /> IND WC
          </p>

          <p className="flex gap-2 items-center bg-[#edf1f2] py-2 px-2 hover:shadow rounded cursor-pointer">
            <TfiMedall className="text-xl" /> Go ad-free
          </p>

          <p className="flex gap-2 items-center bg-[#edf1f2] py-2 px-2 hover:shadow rounded cursor-pointer">
            <FaPeopleGroup className="text-xl" /> IND-Men
          </p>

          <p className="flex gap-2 items-center bg-[#edf1f2] py-2 px-2 hover:shadow rounded cursor-pointer">
            <IoIosPeople className="text-xl" /> IND-Women
          </p>
        </div>

        {!loading && matches.length === 0 && (
          <p className="text-center text-gray-600 mt-6">
            No live matches available
          </p>
        )}

        {/* NEWS SECTION */}
        <div className="mt-10">
          <p className="text-2xl text-[#00916f] font-bold mb-4 pl-4 max-lg:text-center">
            Latest Sports News
          </p>

          {newsLoading ? (
            <p>Loading news...</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_2.2fr] gap-6 pb-8 px-2">
              {/* LEFT SIDE */}
              <div className="bg-white rounded shadow p-4 h-fit max-lg:hidden">
                {news.slice(0, 13).map((item, index) => (
                  <div
                    key={index}
                    className="py-4 font-medium text-gray-800"
                  >
                    {item.description}
                    <p className="border-t border-gray-300 my-4"></p>
                  </div>
                ))}
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col gap-5 max-lg:grid-cols-4">
                {news.slice(0, 13).map((item, index, arr) => {
                  if (index % 3 === 0) {
                    return <NewsCard item={item} index={index} />;
                  }

                  if (index % 3 === 1) {
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                      >
                        <NewsCard item={item} index={index} />
                        <NewsCard
                          item={arr[index + 1]}
                          index={index + 1}
                        />
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CricBuzz;
