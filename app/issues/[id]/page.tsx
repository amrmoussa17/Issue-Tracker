import IssueStatusBadge from "@/app/components/IssueStatusBadge"
import prisma from "@/prisma/client"
import { Card, Heading } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"

interface Props {
  params: {
    id: string
  }
}
const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  })
  if (!issue) notFound()
  return (
    <div className="space-y-2">
      <Heading>{issue.title}</Heading>
      <div className="flex space-x-3">
        <IssueStatusBadge status={issue.status} />
        <p>{issue.createdAt.toDateString()}</p>
      </div>
      <Card className="prose">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  )
}

export default IssueDetailPage
