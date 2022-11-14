import AssignStudentForm from 'components/courses/AssignStudentForm'

export async function getServerSideProps({ query }: { query: { id: string } }) {
  const { id } = query
  return {
    props: { courseId: id }
  }
}

type Props = {
  courseId: string
}

const AssignPage = ({ courseId }: Props) => {
  return (
    <div>
      <AssignStudentForm courseId={courseId} />
    </div>
  )
}

export default AssignPage
