import { Container, Header, Table, Icon, Divider } from 'semantic-ui-react'

const CourseHeader = ({course}) => {
  if (course.icon) {
    return (
      <Header as='h2'>
        <Icon name={course.icon} />
        <Header.Content>{course.name}</Header.Content>
      </Header>
    )
  } else {
    return (
      <Header as='h2'>
        <Header.Content>{course.name}</Header.Content>
      </Header>
    )
  }
}
  
const Content = ({ parts }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Part</Table.HeaderCell>
          <Table.HeaderCell>Exercises</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {parts.map(part =>
        <Table.Row key={part.id}>
          <Part part={part} />
        </Table.Row>
        )
      }
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Total parts={parts}/>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

const Part = ({ part }) => {
  return (
    <>
      <Table.Cell>{part.name}</Table.Cell>
      <Table.Cell>{part.exercises}</Table.Cell>
    </>
  );
}

const Total = ({ parts }) => {
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return (
    <>
      <Table.HeaderCell>Total</Table.HeaderCell>
      <Table.HeaderCell>{total}</Table.HeaderCell>
    </>
  )
}

export const Course = ({ course }) => {
  return (
    <Container>
      <CourseHeader course={course} />
      <Content parts={course.parts} />
      <Divider hidden />
    </Container>
  )
}

