"use client"
import React, { useState } from "react"
import { TextField, Button, Callout, Text } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { issueSchema } from "@/app/ValidationSchema"
import { z } from "zod"

type Inputs = z.infer<typeof issueSchema>

const NewIssuePage = () => {
  const [error, setError] = useState("")
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
      await axios.post("/api/issues", data)
      router.push("/issues")
    } catch (error) {
      setError("An unexpected error occurred.")
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
          {...register("title")}
        ></TextField.Root>
        <Text color="red" as="p">
          {errors.title?.message}
        </Text>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Text color="red" as="p">
          {errors.description?.message}
        </Text>
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}
export default NewIssuePage
