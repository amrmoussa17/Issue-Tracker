import { Status } from "@prisma/client"
import { Card, Flex, Text } from "@radix-ui/themes"
import Link from "next/link"
import React from "react"

interface Props {
  open: number
  closed: number
  inProgress: number
}
const IssuesSummary = ({ open, closed, inProgress }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
    { label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
  ]
  return (
    <Flex gap="3">
      {containers.map((container) => (
        <Card key={container.status}>
          <Flex direction="column">
            <Link
              href={`/issues/list?status=${container.status}`}
              className="font-medium text-sm"
            >
              {container.label}
            </Link>
          </Flex>
          <Text size="5" className="font-bold">
            {container.value}
          </Text>
        </Card>
      ))}
    </Flex>
  )
}

export default IssuesSummary
