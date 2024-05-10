import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import { Issue } from "@prisma/client"
import { Box, Heading, Card } from "@radix-ui/themes"
import React from "react"
import Markdown from "react-markdown"

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <Box className="space-y-2">
      <Heading>{issue.title}</Heading>
      <div className="flex space-x-3">
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </div>
      <Card className="prose">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </Box>
  )
}

export default IssueDetails
