"use client"
import Spinner from "@/app/components/Spinner"
import { issueSchema } from "@/app/ValidationSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Issue } from "@prisma/client"
import { Button, Callout, Text, TextField } from "@radix-ui/themes"
import axios from "axios"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

type Inputs = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(issueSchema),
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data)
      } else {
        await axios.post("/api/issues", data)
      }
      setIsSubmitting(true)
      router.push("/issues")
      router.refresh()
    } catch (error) {
      setError("An unexpected error occurred.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root
          placeholder="Title"
          defaultValue={issue?.title}
          {...register("title")}
        ></TextField.Root>
        <Text color="red" as="p">
          {errors.title?.message}
        </Text>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Text color="red" as="p">
          {errors.description?.message}
        </Text>
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}
export default IssueForm
