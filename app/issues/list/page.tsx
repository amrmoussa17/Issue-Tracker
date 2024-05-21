import { Flex, Link, Table } from "@radix-ui/themes"
import prisma from "@/prisma/client"
import IssueStatusBadge from "../../components/IssueStatusBadge"
import IssuesActions from "./IssuesActions"
import { Issue, Status } from "@prisma/client"
import { ArrowUpIcon } from "@radix-ui/react-icons"
import Pagination from "@/app/components/Pagination"
import IssueTable, { columnNames, IssueQuery } from "./IssueTable"

interface Props {
  searchParams: IssueQuery
}
const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status)
  const statusFilter = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where: {
      status: statusFilter,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  const issueCount = await prisma.issue.count({
    where: { status: statusFilter },
  })

  return (
    <Flex gap="3" direction="column">
      <IssuesActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        itemsCount={issueCount}
      />
    </Flex>
  )
}

export const dynamic = "force-dynamic"

export default IssuesPage
