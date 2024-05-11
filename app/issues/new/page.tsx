import dynamic from "next/dynamic"
import IssueFormSkeleton from "../_components/IssueFormSkeleton"

const NewIssuePage = async () => {
  const IssueForm = dynamic(() => import("../_components/IssueForm"), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  })

  return <IssueForm />
}

export default NewIssuePage
