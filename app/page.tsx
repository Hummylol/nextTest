import NameForm from "./components/NameForm";
import NameList from "./components/NameList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4 items-center justify-center">
      <NameForm/>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <NameList />
      </div>
    </div>
  );
}
