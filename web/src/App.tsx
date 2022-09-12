//JSX= Javascript + XML (HTML)

interface ButtonProps {
  title: String
}


function Button(props: ButtonProps) {
  return (
    <button>
      { props.title }
    </button>
  )
}


function App() {
  return (
    <>
      <Button title="Send1" />
      <Button title="Send2" />
      <Button title="Send3" />
    </>
  )
}

export default App
