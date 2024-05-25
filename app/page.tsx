import prisma from "@/prisma/client"
import LatestIssues from "./components/LatestIssues"
import IssuesSummary from "./IssuesSummary"
import IssueChart from "./IssueChart"
import { Flex, Grid } from "@radix-ui/themes"

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
