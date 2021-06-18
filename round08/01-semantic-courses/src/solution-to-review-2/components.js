import { Container, 
          Header, 
          Divider,
          Table, 
          Icon} 
from 'semantic-ui-react'


const styleObject = {
  margin: 20,
  display: "flex",
  flexDirection: "column",
  alignText: "center",
  justifyContent:'center',
}


const CourseHeader = ({ course }) =>
  <h2>
    {course}
  </h2>


const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />)
      }
    </>
  )
}


const Part = ({ part }) =>
    <Table.Row>
      <Table.Cell>{part.name} </Table.Cell>
      <Table.Cell>{part.exercises}</Table.Cell>
    </Table.Row>


const Total = ({ parts }) => {
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return (
    <Table.Row>
      <Table.Cell>Exercise total</Table.Cell>
      <Table.Cell>{total}</Table.Cell>
    </Table.Row>
  )
}

export const Course = ({ course }) => {
  return (
    <>
    <Container style={styleObject}>
      <Header as ='h2'>
        <Icon name="beer"/>
        <Header.Content>
          <CourseHeader course={course.name}></CourseHeader>
        </Header.Content>
      </Header>
      <Divider />

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Parts</Table.HeaderCell>
            <Table.HeaderCell>Excercises</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Content parts={course.parts}></Content>
          <Total parts={course.parts}></Total>
        </Table.Body>
      </Table>
    </Container>
    </>
  )
}

