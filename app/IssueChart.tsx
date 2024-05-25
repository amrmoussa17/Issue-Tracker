"use client"
import { Card } from "@radix-ui/themes"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
interface Props {
  open: number
  closed: number
  inProgress: number
}
const IssueChart = ({ open, closed, inProgress }: Props) => {
  const data = [
    { label: "Open Issues", value: open },
    { label: "Closed Issues", value: closed },
    { label: "In Progress Issues", value: inProgress },
  ]
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={600} height={300} data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={50}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default IssueChart
