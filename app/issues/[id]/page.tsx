import prisma from "@/prisma/client"
import { Box, Flex, Grid } from "@radix-ui/themes"
import { notFound } from "next/navigation"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"
import DeleteIssueButton from "./DeleteIssueButton"
import { getServerSession } from "next-auth"
import authOptions from "@/app/auth/AuthOptions"
import AssignUserSelectButton from "./AssignUserSelectButton"

interface Props {
  params: {
    id: string
  }
}
const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  })
  if (!issue) notFound()
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="2">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction={"column"} gap={"3"}>
            <AssignUserSelectButton issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  )
}

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: params.id } })
  return {
    title: issue?.title,
    description: "Details of issue" + issue?.id,
  }
}

export default IssueDetailPage
