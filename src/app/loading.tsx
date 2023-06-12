import Loader from "./components/loader";
export default function Loading() {
  return (
    <div className="flex items-start justify-center h-screen bg-blue-200">
      <div className="flex flex-col items-center bg-white w-4/12 h-full">
        <div className="flex flex-col items-center justify-center mt-10">
          <h1 className="text-3xl font-bold mb-52">QuizBlitz</h1>
          <div className="flex  justify-center items-center h-auto w-auto">
            <h1 className="text-lg mr-2">Estamos Creando tu Partida</h1>
            <Loader />
          </div>
        </div>
      </div>
    </div>
  );
}
