import { Skeleton } from '../ui/skeleton'

const TableSkeleton = (props: any) => (
  <div className="flex flex-col justify-center pt-[6vh] mx-10 border">
    <Skeleton className="h-[6vh] w-full mt-1 rounded-none" />
    <Skeleton className="h-[6vh] w-full mt-1 rounded-none" />
    <Skeleton className="h-[6vh] w-full mt-1 rounded-none" />
    <Skeleton className="h-[6vh] w-full mt-1 rounded-none" />
    <Skeleton className="h-[6vh] w-full mt-1 rounded-none" />
  </div>
)

export default TableSkeleton
