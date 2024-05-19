"use client"
import { Issue, User } from "@prisma/client"
import { Select } from "@radix-ui/themes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Skeleton from "react-loading-skeleton"
import toast, { Toaster } from "react-hot-toast"

const AssignUserSelectButton = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    retry: 3,
    staleTime: 60 * 1000,
  })
  if (isLoading) return <Skeleton />
  if (error) return null
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={async (userId) => {
          try {
            await axios.patch(`/api/issues/${issue.id}`, {
              assignedToUserId: userId === "unassigned" ? null : userId,
            })
          } catch (error) {
            toast.error("changes can't be made.")
          }
        }}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

export default AssignUserSelectButton
