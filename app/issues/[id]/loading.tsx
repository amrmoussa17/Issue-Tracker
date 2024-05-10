import { Card } from "@radix-ui/themes"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const LoadingIssueDetailPage = () => {
  return (
    <div className="space-y-2 max-w-xl">
      <Skeleton />
      <div className="flex space-x-3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </div>
      <Card>
        <Skeleton count={3} />
      </Card>
    </div>
  )
}

export default LoadingIssueDetailPage
