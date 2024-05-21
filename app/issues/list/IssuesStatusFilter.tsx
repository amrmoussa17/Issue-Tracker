"use client"
import { Status } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"

const IssuesStatusFilter = () => {
  const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ]
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "All"}
      onValueChange={(status) => {
        const params = new URLSearchParams()
        const orderBy = searchParams.get("orderBy")
        if (status && status !== "All") params.append("status", status)
        if (orderBy) params.append("orderBy", orderBy)
        const query = params.size ? "?" + params.toString() : ""
        router.push(`/issues/list/${query}`)
      }}
    >
      <Select.Trigger placeholder="Filter by..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || "All"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssuesStatusFilter
