
type SearchbarProps = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
  };
  
  const Searchbar = ({ searchTerm, setSearchTerm }: SearchbarProps) => {
    return (
      <form className="flex items-center max-w-lg mx-auto">
        <div className="relative w-full">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="Search Users..."
            required
          />
        </div>
        <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
          Search
        </button>
      </form>
    );
  };
  
  export default Searchbar;