import { Header, Icon, Label, Table } from 'semantic-ui-react';

const CourseHeader = ({ course }) => {
  const iconName = course === "Node.js" ? 'node' : 'code'
  return (
    <Header as='h2'>
      <Icon name={iconName} />
      <Header.Content>{course}</Header.Content>
    </Header>
  )
}

const Content = ({ parts }) => {
  return (
    <Table.Body>
      {parts.map(part =>
        <Part key={part.id} part={part} />)
      }
    </Table.Body>
  )
}

const Part = ({ part }) =>
  <Table.Row>
    <Table.Cell width='10'>{part.name}</Table.Cell>
    <Table.Cell>{part.exercises}</Table.Cell>
  </Table.Row>

const Total = ({ parts }) => {
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return (
    <Table.Row>
      <Table.HeaderCell><Label ribbon>Exercises total</Label></Table.HeaderCell>
      <Table.HeaderCell>{total}</Table.HeaderCell>
    </Table.Row>
  )
}

export const Course = ({ course }) => {
  return (
    <>
      <CourseHeader course={course.name} />

      <Table celled>

        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Part</Table.HeaderCell>
            <Table.HeaderCell>Exercises</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        
        <Content parts={course.parts} />
        
        <Table.Footer>
          <Total parts={course.parts}/>
        </Table.Footer>

      </Table>
    </>
  )
}
