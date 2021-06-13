import { Code, DeveloperMode } from '@material-ui/icons'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core'


const Icon = ({ course }) => (
  course === "Node.js" ? <Code /> : <DeveloperMode />
)

const CourseHeader = ({ course }) => {
  const iconName = course === "Node.js" ? 'code' : 'code'
  return (
    <Typography variant="h5" component="h2">
      <Icon course={course} />
      {course}
    </Typography>
  )
}

const Content = ({ parts }) => {
  return (
    <TableBody>
      {parts.map(part =>
        <Part key={part.id} part={part} />)
      }
    </TableBody>
  )
}


const Part = ({ part }) =>
  <TableRow>
    <TableCell>{part.name}</TableCell>
    <TableCell align="right">{part.exercises}</TableCell>
  </TableRow>


const Total = ({ parts }) => {
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
  return (
    <TableRow>
      <TableCell>Exercises total</TableCell>
      <TableCell align="right">{total}</TableCell>
    </TableRow>
  )
}


export const Course = ({ course }) => {
  return (
    <Box my={4}>
      <CourseHeader course={course.name} />
      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Part</TableCell>
              <TableCell align="right">Exercises</TableCell>
            </TableRow>
          </TableHead>

          <Content parts={course.parts} />

          <TableFooter>
            <Total parts={course.parts} />
          </TableFooter>

        </Table>
      </TableContainer>
    </Box>
  )
}
