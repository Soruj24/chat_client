import { Button } from "./components/ui/button";
import { useGetUsersQuery } from "./services/userApi";

function App() {
  const { data } = useGetUsersQuery();
  if (data) {
    console.log(data);
  }
  return (
    <>
      <h1>Home App</h1>
      <Button>Click</Button>
    </>
  );
}

export default App;
