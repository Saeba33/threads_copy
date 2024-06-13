import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";

export default function Search() {
    return (
      <ConnectedLayout>
        <div className="mt-10 md:w-[700px] mx-auto w-full">
          <form>
            <input
              className="input"
              type="search"
              placeholder="Rechercher"
            />
          </form>
          <p className="mt-32 text-center text-threads-gray-light">Recherchez des profils à découvrir</p>
        </div>
      </ConnectedLayout>
    );
}