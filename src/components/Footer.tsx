import React from 'react'
const FilterIcon = '/images/filter.svg';
const SearchIcon = '/images/search.svg';
const ReviewIcon = '/images/review.svg';
export default function Footer() {
  return (
    <div className="bg-[url('/images/footer-bg.png')]  bg-no-repeat bg-cover w-full h-[160px] fixed bottom-0 left-0" >
    <div className="px-10 flex justify-between">
      <div className="px-1.5">
        <div className="flex justify-center">
          <img src={FilterIcon} alt="FilterIcon" />
        </div>
        <span className=" pt-2 text-sm block text-center text-white font-medium">
          Filter
        </span>
      </div>
      <div className="mt-8 px-1.5" >
        <div className="flex justify-center">
          <img src={SearchIcon} alt="SearchIcon" />
        </div>
        <span className="block text-center pt-2 text-sm text-white font-medium">
          Search
        </span>
      </div>
      <div className="px-1.5">
        <div className="flex justify-center">
          <img src={ReviewIcon} alt="ReviewIcon" />
        </div>
        <span className="block text-center pt-2 text-sm text-white font-medium">
          Add review
        </span>
      </div>

    </div>
  </div>
  )
}
