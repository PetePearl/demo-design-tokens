import styles from './App.module.css'
import { Button } from "./Button/Button";

function App() {

  return (
    <div className={styles.wrapper}>
        <div className={styles.buttons}>
            <Button>primary button</Button>
            <Button variant='warning'>warning button</Button>
        </div>


    </div>
  )
}

export default App
