import { Button } from '@/components/ui/buttons/Button'
import React, { FC } from 'react'

interface IPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
  maxVisiblePages?: number
  totalCount?: number
}

export const Pagination: FC<IPaginationProps> = ({ currentPage, totalPages, onPageChange, maxVisiblePages = 5 }) => {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return

    onPageChange(page)
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      const half = Math.floor(maxVisiblePages / 2)
      let start = Math.max(2, currentPage - half)
      let end = Math.min(totalPages - 1, currentPage + half)

      if (currentPage <= half + 1) {
        start = 2
        end = maxVisiblePages - 1
      }

      if (currentPage >= totalPages - half) {
        start = totalPages - (maxVisiblePages - 2)
        end = totalPages - 1
      }

      pages.push(1)
      if (start > 2) pages.push('...')
      for (let i = start; i <= end; i++) pages.push(i)
      if (end < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }

    return pages
  }

  const pages = getPageNumbers()

  return (
    <div className="flex justify-center items-center gap-2 mt-4 select-none">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}>
        &lt;
      </button>

      {pages.map((p, idx) =>
        typeof p === 'string' ? (
          <span key={idx} className="px-2 text-gray-500">
            …
          </span>
        ) : (
          <Button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-3 py-1 border rounded ${currentPage === p ? 'bg-orange text-white' : ''}`}>
            {p}
          </Button>
        ),
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50">
        &gt;
      </button>
    </div>
  )
}
