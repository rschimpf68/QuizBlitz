import Loader from "./components/loader";
export default function Loading() {
  return (
    <div className="min-h-screen w-full  flex justify-center items-center">
      <div className="flex  justify-center items-center h-auto w-auto">
        <h1>Estamos Creando tu Partida!</h1>
        <Loader />
      </div>
    </div>
  );
}
