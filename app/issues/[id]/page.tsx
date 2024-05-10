import prisma from "@/prisma/client"
import { Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"

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
    <Grid columns={{ initial: "1", sm: "2" }} gap="2">
      <IssueDetails issue={issue} />
      <EditIssueButton issueId={issue.id} />
    </Grid>
  )
}

export default IssueDetailPage
