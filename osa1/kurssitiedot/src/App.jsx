const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part1 = (props) => {
  return (
    <div>
      {props.course.parts[0].name} {props.course.parts[0].exercises}
    </div>
  )
}

const Part2 = (props) => {

  return (
    <div>
      {props.course.parts[1].name} {props.course.parts[1].exercises}
    </div>
  )
}

const Part3 = (props) => {
  return (
    <div>
      {props.course.parts[2].name} {props.course.parts[2].exercises}
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part1 course={props.course} />
      <Part2 course={props.course} />
      <Part3 course={props.course} />
    </div>
  )
}

const Total = (props) => {

  return (
      <p>Number of excercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
      <div>
        <Header course={course} />
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
}

export default App