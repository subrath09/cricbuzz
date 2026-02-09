import React, { useEffect, useState, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { TfiCup, TfiMedall } from "react-icons/tfi";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { searchClient } from "../algolia.js/algolia";


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

  const [query, setQuery] = useState("");
const [searchResults, setSearchResults] = useState([]);


  //  FEATURE ONLY
  const [highlightIndex, setHighlightIndex] = useState(null);

  const [activeMatchIndex, setActiveMatchIndex] = useState(0);

  const slidesPerView = 3;
  const showNav = !loading && matches.length > slidesPerView;

  const fetchUserFromApi = async () => {
    try {
      const res = await fetch(
        "https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json",
      );
      const data = await res.json();
      setNews(data.articles || []);
      setNewsLoading(false);
    } catch (error) {
      console.log(error);
      setNewsLoading(false);
    }
  };


const searchMatches = async (text) => {
  setQuery(text);

  if (!text.trim()) {
    setSearchResults([]);
    return;
  }

  try {
    const index = searchClient.initIndex("matches");

    const { hits } = await index.search(text, {
      hitsPerPage: 5,
    });

    setSearchResults(hits);
  } catch (err) {
    console.log(err);
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


   
  const NewsCard = ({ item, index }) => (
    <div
      key={index}
      className="bg-white rounded-t shadow-md hover:shadow-xl transition overflow-hidden group"
    >
      <img
        src={item.urlToImage}
        alt={item.title}
        className="h-48 w-full object-cover group-hover:scale-105 transition"
      />
      <div className="p-4">
        <p className="font-semibold line-clamp-2">{item.title}</p>
        <p className="text-sm text-gray-500 mt-2">{item.source?.name}</p>
      </div>
    </div>
  );

  const goToSearchedMatch = (item) => {
  const index = matches.findIndex(
    (m) =>
      m.id === item.objectID ||
      (m.team1?.name === item.team1?.name &&
        m.team2?.name === item.team2?.name &&
        m.matchBetween === item.matchBetween),
  );

  if (index === -1) return;

  swiperRef.current?.slideTo(index);

  setActiveMatchIndex(index);

  setHighlightIndex(index);
  setTimeout(() => setHighlightIndex(null), 2000);

  setQuery(`${item.team1?.name} vs ${item.team2?.name}`);

  setSearchResults([]);
};


  return (
    <div className="bg-gray-200 pt-4 min-h-screen max-lg:pt-0">
      <div className="mx-64 max-lg:mx-0">
    {/* HEADER */}
<div className="relative z-50 bg-[#00916f] flex items-center gap-6 max-lg:px-2 max-lg:gap-2 py-3 px-4 lg:px-8 text-white text-xs sm:text-sm lg:text-base whitespace-nowrap">
  <p className="text-2xl font-bold max-lg:text-lg shrink-0 hover:cursor-pointer ">
    cri
    <span className="bg-white rounded-full text-[#00916f] px-1">
      cb
    </span>
    uzz
  </p>

  <p>Live Scores</p>
  <p>Schedules</p>
  <p className="max-lg:hidden">Teams</p>

  <p className="max-lg:hidden">News</p>
  <p className="max-lg:hidden">Series</p>
  <p className="max-lg:hidden">Rankings</p>
<div className="relative w-72">
  <input
    type="text"
    placeholder="Search matches"
    value={query}
    onChange={(e) => searchMatches(e.target.value)}
    className="w-full rounded-full px-2 py-1 text-gray-700 "
  />

{searchResults.length > 0 && (
  <div className="absolute top-full left-0 bg-white text-black mt-2 w-full rounded shadow-xl z-50">
    {searchResults.map((item) => (
      <div
        key={item.objectID}
       onClick={() => goToSearchedMatch(item)}

        className="px-3 py-2 hover:bg-[#00916f]/15 cursor-pointer"
      >
        <p className="font-semibold text-sm uppercase">
          {item.team1?.name} <span className="lowercase">vs</span> {item.team2?.name}
        </p>
        <p className="text-xs text-gray-500">
          {item.matchBetween}
        </p>
      </div>
    ))}
  </div>
)}

</div>



  <button className="bg-white text-gray-600 rounded-full py-1 px-2 max-lg:px-1 hover:bg-gray-100 hover:shadow-xl">
    Go Premium
  </button>

  <IoPersonCircleOutline className="h-8 w-8 max-lg:hidden " />

  <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="ml-auto lg:hidden flex flex-col gap-[3px]"
  >
    <span className="w-5 h-[2px] bg-white"></span>
    <span className="w-5 h-[2px] bg-white"></span>
    <span className="w-5 h-[2px] bg-white"></span>
  </button>

  {/* FLOATING MOBILE MENU */}
  {mobileMenuOpen && (
    <div className="absolute top-full right-3 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-xl py-2 text-sm">
      <p className="px-3 py-2 hover:bg-gray-100 cursor-pointer">News</p>
      <p className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Teams</p>
      <p className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Series</p>
      <p className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Rankings</p>

       <p className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 text-center items-center"><IoPersonCircleOutline className="text-lg"/>Profile</p>
    </div>
  )}
</div>


        {/* MATCHES LINE */}
        <div className="flex bg-[#4a4a4a] gap-4 items-center text-white overflow-x-auto max-lg:text-sm max-lg:gap-2">
          <p className="bg-[#333333] py-2 px-4 whitespace-nowrap">Matches</p>

          {loading ? (
            <p className="px-4 animate-pulse whitespace-nowrap">
              Loading matches...
            </p>
          ) : (
            matches.slice(0, 6).map((match, index) => (
              <p
                key={match.id}
                onClick={() => {
                  swiperRef.current?.slideTo(index);
                  setActiveMatchIndex(index);

                  setHighlightIndex(index);
                  setTimeout(() => setHighlightIndex(null), 2000);
                }}
                className={`hover:bg-gray-600  py-2 px-4 cursor-pointer uppercase whitespace-nowrap
                  ${activeMatchIndex === index ? "bg-gray-600 " : ""}
                `}
              >
                {match.team1?.name} <span className="lowercase">vs</span>{" "}
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
              className="absolute left-0 z-10 top-1/2 -translate-y-1/2 py-3 px-3 shadow-xl rounded-full text-white bg-[#00916f]"
            >
              <FaArrowLeft />
            </button>
          )}

          {loading ? (
  <div className="flex gap-4 px-6">
    {[1, 2, 3].map((_, i) => (
      <div
        key={i}
        className="bg-white rounded shadow p-6 w-full animate-pulse"
      >
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            <div className="h-3 bg-gray-300 rounded w-1/4"></div>
          </div>

          <div className="flex justify-between">
            <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            <div className="h-3 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>

        <div className="mt-4 h-3 bg-gray-300 rounded w-20"></div>
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
                setActiveMatchIndex(swiper.activeIndex);
              }}
              spaceBetween={16}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {matches.map((match,index) => (
                <SwiperSlide key={match.id}>
                  <div
                    className={`rounded-t px-6 pt-4 mx-2 hover:shadow-xl transition-colors duration-1000
                      ${highlightIndex === index ? "border-2 border-[#00916f]/30  bg-[#00916f]/20 " : "bg-white"}
                          `}
                  >
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
                          {match.team1?.runs}/{match.team1?.wickets} (
                          {match.team1?.overs} ov)
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <p className="font-semibold uppercase">
                          {match.team2?.name}
                        </p>
                        <p>
                          {match.team2?.runs}/{match.team2?.wickets} (
                          {match.team2?.overs} ov)
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-green-700 mt-2 flex items-center gap-1 font-medium">
                      <span className="text-red-500 font-bold text-xl mb-1 px-1 animate-ping">
                        ·
                      </span>
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
              className="absolute right-0 z-10 top-1/2 -translate-y-1/2 py-3 px-3 shadow-xl rounded-full text-white bg-[#00916f]"
            >
              <FaArrowRight />
            </button>
          )}
        </div>

        {/* QUICK ACCESS */}
        <div className="bg-white mt-4 mx-2 py-2 flex flex-wrap gap-3 px-4 items-center rounded max-lg:text-sm max-lg:justify-center">
          <p className="text-xl font-bold max-lg:w-full max-lg:text-center">
            Quick Access
          </p>

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

        {/* NEWS SECTION */}
        <div className="mt-10">
          <p className="text-2xl text-[#00916f] font-bold mb-4 pl-4 max-lg:text-center">
            Latest Sports News
          </p>

          {newsLoading ? (
            <p>Loading news...</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_2.2fr] gap-6 pb-8 px-2">
              <div className="bg-white rounded shadow p-4 h-fit max-lg:hidden">
                {news.slice(0, 13).map((item, index) => (
                  <div key={index} className="py-4 font-medium text-gray-800">
                    {item.description}
                    <p className="border-t border-gray-300 my-4"></p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-5">
                {news.slice(0, 13).map((item, index, arr) => {
                  if (index % 3 === 0) {
                    return <NewsCard key={index} item={item} index={index} />
                  }

                  if (index % 3 === 1) {
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                      >
                        <NewsCard item={item} index={index} />
                        <NewsCard item={arr[index + 1]} index={index + 1} />
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
