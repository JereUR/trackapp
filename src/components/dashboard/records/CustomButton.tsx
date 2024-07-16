import Loader from '@/components/Loader'
import React from 'react'

const CustomButton = ({ loading }: { loading: boolean }) => {
  return (
    <button
      className="button-resume bg-lime-500 hover:bg-lime-600 w-48 h-10 flex items-center justify-start gap-2.5 rounded-full text-[rgb(19,19,19)] font-semibold border-none relative cursor-pointer transition duration-200 shadow-md pl-2 hover:duration-500 active:scale-97 active:duration-200"
      type="submit"
    >
      <svg
        className="svgIcon"
        viewBox="0 0 512 512"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
      </svg>
      {loading ? (
        <p className="ml-[52px]">
          <Loader color="border-t-lime-500 border-gray-800" />
        </p>
      ) : (
        'Buscar registro'
      )}
    </button>
  )
}

export default CustomButton
