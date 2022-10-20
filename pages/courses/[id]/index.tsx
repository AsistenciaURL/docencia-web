export async function getServerSideProps({ query }: { query: { id: string } }) {
  const { id } = query
  return {
    props: { id }
  }
}

const Course = ({ id }: { id: string }) => {
  return (
    <div>
      <div>Test</div>
    </div>
  )
}

export default Course
