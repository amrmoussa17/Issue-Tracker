import { Status } from "@prisma/client"
import { Badge, Flex } from "@radix-ui/themes"

const statusMap: Record<
  Status,
  { label: String; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "open", color: "red" },
  IN_PROGRESS: { label: "in progress", color: "violet" },
  CLOSED: { label: "closed", color: "green" },
}
const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Flex gap="2">
      <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    </Flex>
  )
}

export default IssueStatusBadge
