import Videos from "./Components/Videos";
import { useGlobalContext } from "./context/global";

function App() {
  const global = useGlobalContext();
  console.log(global);
  return (
    <div className="App">
      <Videos />
    </div>
  );
}

export default App;
