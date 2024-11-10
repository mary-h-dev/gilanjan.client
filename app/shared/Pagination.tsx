'use client'
import React from 'react'
import MuiPagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'



const Pagination = ({
  count,
  mode,
  idPageParam,
  pageState,
  setPageState,
}: {
  count: number
  mode: 'state' | 'searchParams'
  pageState?: number
  setPageState?:any
  idPageParam?: string
}) => {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const searchParamsIdPage = idPageParam || 'page'
  let currentPage = 1

  if (searchParams.get(searchParamsIdPage)) {
    currentPage = Number(searchParams.get(searchParamsIdPage))
  }

  const controlledPaginationHandler = (event: React.ChangeEvent<unknown>, value: number) => {
    if(value){

      setPageState(value)
    }
  }

  let finalPagination
  if (mode === 'searchParams') {
    ;<MuiPagination
      dir='ltr'
      className='mx-auto w-fit py-5'
      count={+count}
      page={currentPage}
      renderItem={(item: any) => (
        <>
          {item.disabled ?
            <PaginationItem {...item} />
          : <Link
              href={{
                pathname: pathName,
                query: { ...Object.fromEntries(searchParams.entries()), page: item.page },
              }}
            >
              <PaginationItem {...item} />
            </Link>
          }
        </>
      )}
      color='primary'
    />
  } else {
    finalPagination = (
      <MuiPagination
        dir='ltr'
        className='mx-auto w-fit py-5'
        count={+count}
        page={pageState || 1}
        onChange={controlledPaginationHandler}
        color='primary'
      />
    )
  }

  return <>{finalPagination}</>
}

export default Pagination
