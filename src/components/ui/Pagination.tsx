import Image from 'next/image'

import IconLeft from '@/public/icon/iconLeft.svg'
import IconRight from '@/public/icon/iconRight.svg'

interface PaginationProps {
  currentPage: number
  totalPages: number
  paginate: (pageNumber: number) => void
}

export const Pagination = ({ currentPage, totalPages, paginate }: PaginationProps) => {
  return (
    <nav>
      <ul className="flex gap-2 justify-center items-center">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`py-1 px-3 border rounded-[6px] border-[#D9D9D9] ${currentPage === 1 ? 'text-gray-400' : ''}`}>
            &lt;
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i + 1}>
            <button
              onClick={() => paginate(i + 1)}
              className={`py-1 px-3 border rounded-[6px] ${currentPage === i + 1 ? 'bg-[#EA660C] border-[#EA660C] text-white' : 'border-[#D9D9D9]'}`}>
              {i + 1}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`py-1 px-3 border rounded-[6px] border-[#D9D9D9] ${currentPage === totalPages ? 'text-gray-400' : ''}`}>
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  )
}
