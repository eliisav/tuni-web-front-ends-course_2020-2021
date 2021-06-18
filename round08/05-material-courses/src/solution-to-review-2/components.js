import {
  Box,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
} from "@material-ui/core"

const CourseHeader = ({ course }) => (
  <Typography variant='h4'>{course}</Typography>
)

const Content = ({ parts }) => {
  return (
    <Paper>
      <TableContainer>
        <Table style={{ margin: 20, width: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell>Part</TableCell>
              <TableCell>Exercises</TableCell>
            </TableRow>
          </TableHead>
          {parts.map((part) => (
            <Part key={part.id} part={part} />
          ))}
          <TableBody>
            <Total parts={parts}></Total>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

const Part = ({ part }) => (
  <TableRow>
    <TableCell>{part.name}</TableCell>
    <TableCell>{part.exercises}</TableCell>
  </TableRow>
)

const Total = ({ parts }) => {
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return (
    <TableRow>
      <TableCell>Exercises total</TableCell>
      <TableCell>{total}</TableCell>
    </TableRow>
  )
}

export const Course = ({ course }) => {
  return (
    <>
      <CourseHeader course={course.name} />
      <Content parts={course.parts} />
    </>
  )
}
