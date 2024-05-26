import prisma from "@/prisma/client"
import { Flex, Grid } from "@radix-ui/themes"
import { Metadata } from "next"
import LatestIssues from "./components/LatestIssues"
import IssueChart from "./IssueChart"
import IssuesSummary from "./IssuesSummary"

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  })
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  })
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  })
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Flex direction="column" gap="4">
        <IssuesSummary open={open} closed={closed} inProgress={inProgress} />
        <IssueChart open={open} closed={closed} inProgress={inProgress} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "view a summary of project issues",
}
